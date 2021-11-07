package com.indiduck.panda.controller;


import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.indiduck.panda.Repository.OrderDetailRepository;
import com.indiduck.panda.Repository.ShopRepository;
import com.indiduck.panda.Repository.UserOrderRepository;
import com.indiduck.panda.Repository.UserRepository;
import com.indiduck.panda.Service.OrderDetailService;
import com.indiduck.panda.config.ApiKey;
import com.indiduck.panda.domain.*;
import com.indiduck.panda.domain.dto.ResultDto;
import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.request.CancelData;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;
import lombok.Data;

import lombok.RequiredArgsConstructor;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.*;
@CrossOrigin
@RestController
@RequiredArgsConstructor
public class OrderDetailController {
    @Autowired
    OrderDetailService orderDetailService;
    @Autowired
    UserRepository userRepository;
    @Autowired
    OrderDetailRepository orderDetailRepository;
    @Autowired
    ShopRepository shopRepository;
    @Autowired
    private ApiKey apiKey;

    @Autowired
    UserOrderRepository userOrderRepository;

    //상품 주문
    @RequestMapping(value = "/api/addcart", method = RequestMethod.POST)
    public ResponseEntity<?> createShop(@CurrentSecurityContext(expression = "authentication")
                                                Authentication authentication, @RequestBody CreateOrderDetailDAO createProductDAO) throws Exception {

        System.out.println("CreateOrderDetailDAO = " + createProductDAO);
        List<detailOptionDAO> cart = createProductDAO.cart;
        for (detailOptionDAO detailOptionDAO : cart) {
            try {
                if(createProductDAO.selectpanda==null)
                {
                    System.out.println("컨트롤러");
                    orderDetailService.newOrderDetail(authentication.getName(), createProductDAO.productid
                            , detailOptionDAO.optionId, detailOptionDAO.optionCount);
                }else
                {

                    System.out.println("컨트롤러");

                    orderDetailService.newOrderDetail(authentication.getName(), createProductDAO.productid
                            , detailOptionDAO.optionId, detailOptionDAO.optionCount, createProductDAO.selectpanda);
                }

            }catch (Exception e)

            {
                System.out.println("오더디테일 컨트롤러 에러발생"+e);

                return ResponseEntity.ok(new ResultDto(false,"상품을 담는중 오류가 발생했습니다" +
                        "계속 발생할시 1:1 문의바랍니다"));
            }
        }


        return ResponseEntity.ok(new ResultDto(true,"상품담기 성공"));
    }

    //상품카트
    @RequestMapping(value = "/api/mycart", method = RequestMethod.GET)
    public ResponseEntity<?> viewMyCart(@CurrentSecurityContext(expression = "authentication")
                                             Authentication authentication) throws Exception {
        Optional<User> byEmail = userRepository.findByEmail(authentication.getName());
        Optional<List<OrderDetail>> byUserAndOrderStatus = orderDetailRepository.findByUserAndOrderStatus(byEmail.get(), OrderStatus.결제대기);
        List<OrderDetail> orderDetails = byUserAndOrderStatus.get();

        DetailedCart myCart = new DetailedCart(orderDetails);




        return ResponseEntity.ok(new thisResultDto(true,myCart));
    }

    //결제페이지
    @RequestMapping(value = "/api/payment", method = RequestMethod.POST)
    public ResponseEntity<?> payMyCart(@CurrentSecurityContext(expression = "authentication")
                                                Authentication authentication,@RequestBody paymentDAO paymentDAO) throws Exception {
        Optional<User> byEmail = userRepository.findByEmail(authentication.getName());
        List<OrderDetail> byUserAndOrderStatus = new ArrayList<>();
        for (Long id : paymentDAO.shopId) {
            Optional<Shop> byId = shopRepository.findById(id);
            if(byId!=null)
            {
//
                Optional<List<OrderDetail>> byUserAndOrderStatusAndShop = orderDetailRepository.findByUserAndOrderStatusAndShop(byEmail.get(), OrderStatus.결제대기, byId.get());
                byUserAndOrderStatus.addAll(byUserAndOrderStatusAndShop.get());

            }

        }

        DetailedCart myCart = new DetailedCart(byUserAndOrderStatus);





        return ResponseEntity.ok(new thisResultDto(true,myCart));
    }

    //결제완료
    @RequestMapping(value = "/api/payment/complete", method = RequestMethod.POST)
    public ResponseEntity<?> finishpayment(@CurrentSecurityContext(expression = "authentication")
                                               Authentication authentication,@RequestBody finishPaymentDAO finishpaymentDAO) throws Exception {

        //TODO:여기 상품 검증 실패면 취소로직해줘야댐
        Payment tokentoInfo = getTokentoInfo(finishpaymentDAO.impuid);
//        orderDetailService.paymentOrderDetail(tokentoInfo);
        String customData = tokentoInfo.getCustomData();
        JSONObject jsonObject=new JSONObject(customData);
        //디테일배열
        Optional<User> byEmail = userRepository.findByEmail(authentication.getName());
        JSONArray detail =jsonObject.getJSONArray("detaildId");
        HashSet<Shop> shopId =new HashSet<>();
        HashSet<OrderDetail> orders= new HashSet<>();
        HashSet<Verification> Veri=new HashSet<>();

        List<OrderDetail> orderDetails =new ArrayList<>();
        for (Object o : detail) {
            Optional<OrderDetail> byId = orderDetailRepository.findById(Long.parseLong(o.toString()));
            orderDetails.add(byId.get());
            shopId.add(byId.get().getShop());
            orders.add(byId.get());
        }

        for (Shop shop : shopId) {
            Veri.add(new Verification(shop));

        }


        for (Verification verification : Veri) {
            for (OrderDetail order : orders) {
                if(order.getShop().getId()== verification.shopId)
                {
                    if(order.getPanda() ==null)
                    {
                        verification.amount+=Math.round(order.getTotalPrice());
                        verification.pure+=Math.round(order.getTotalPrice());

                    }else
                    {
                        verification.amount+=(Math.round(order.getTotalPrice()*0.95));
                        verification.pure+=Math.round(order.getTotalPrice());

                    }

                }
            }
            if(verification.free > verification.pure)
            {

                verification.amount= verification.amount+ verification.shipprice;
            }
        }

        DetailedCart myCart = new DetailedCart(orderDetails);

        int allamount = 0;
        for (Verification verification : Veri) {
            allamount+=verification.amount;
        }

        BigDecimal amount = tokentoInfo.getAmount();

        System.out.println("검증중");
        System.out.println("allamount = " + allamount);
        System.out.println("amount.intValue() = " + amount.intValue());
        System.out.println(allamount+amount.intValue());
        if(allamount==amount.intValue())
        {
            System.out.println("검증성공");
            System.out.println(myCart);
            boolean b = orderDetailService.newUserOrder(byEmail.get(), myCart, tokentoInfo.getMerchantUid(),
                    tokentoInfo.getName(),tokentoInfo.getBuyerTel(),tokentoInfo.getBuyerPostcode(),tokentoInfo.getBuyerAddr());
            if(b){
                return ResponseEntity.ok(new tfResultDto(b));

            }else
            {
                paymentAlreadyCancelled(finishpaymentDAO.impuid);
                return ResponseEntity.ok(new tfResultDto(false));
            }

        }else
        {
            paymentAlreadyCancelled(finishpaymentDAO.impuid);
            return ResponseEntity.ok(new tfResultDto(false));

        }

    }
    @RequestMapping(value = "/api/test2", method = RequestMethod.POST)
    public ResponseEntity<?> testt(@CurrentSecurityContext(expression = "authentication")
                                          Authentication authentication) throws Exception {
        List<UserOrder> all = userOrderRepository.findAll();
        for (UserOrder userOrder : all) {
            System.out.println("userOrder = " + userOrder.getDetail());
        }
        return ResponseEntity.ok(new tfResultDto(false));
    }


    @RequestMapping(value = "/api/test", method = RequestMethod.POST)
    public ResponseEntity<?> test(@CurrentSecurityContext(expression = "authentication")
                                                   Authentication authentication) throws Exception {
//        System.out.println(apiKey.getRESTAPIKEY()+"  "+apiKey.getRESTAPISECRET());
        //TODO:여기 상품 검증 실패면 취소로직해줘야댐
        Payment tokentoInfo = getTokentoInfo("imp_982372597875");
//        orderDetailService.paymentOrderDetail(tokentoInfo);
        String customData = tokentoInfo.getCustomData();
        JSONObject jsonObject=new JSONObject(customData);
        //디테일배열
        Optional<User> byEmail = userRepository.findByEmail(authentication.getName());
        JSONArray detail =jsonObject.getJSONArray("detaildId");
        HashSet<Shop> shopId =new HashSet<>();
        HashSet<OrderDetail> orders= new HashSet<>();
        HashSet<Verification> Veri=new HashSet<>();

        List<OrderDetail> orderDetails =new ArrayList<>();
        for (Object o : detail) {
            Optional<OrderDetail> byId = orderDetailRepository.findById(Long.parseLong(o.toString()));
            orderDetails.add(byId.get());
            shopId.add(byId.get().getShop());
            orders.add(byId.get());
        }

        for (Shop shop : shopId) {
            Veri.add(new Verification(shop));

        }


        for (Verification verification : Veri) {
            for (OrderDetail order : orders) {
                if(order.getShop().getId()== verification.shopId)
                {
                    if(order.getPanda() ==null)
                    {
                        verification.amount+=Math.round(order.getTotalPrice());
                        verification.pure+=Math.round(order.getTotalPrice());

                    }else
                    {
                        verification.amount+=(Math.round(order.getTotalPrice()*0.95));
                        verification.pure+=Math.round(order.getTotalPrice());

                    }

                }
            }
            if(verification.free > verification.pure)
            {

                verification.amount= verification.amount+ verification.shipprice;
            }
        }

        DetailedCart myCart = new DetailedCart(orderDetails);

        int allamount = 0;
        for (Verification verification : Veri) {
            allamount+=verification.amount;
        }

        BigDecimal amount = tokentoInfo.getAmount();

        System.out.println("검증중");
        System.out.println("allamount = " + allamount);
        System.out.println("amount.intValue() = " + amount.intValue());
        System.out.println(allamount+amount.intValue());
        if(allamount==amount.intValue())
        {
            System.out.println("검증성공");
            System.out.println(myCart);
            boolean b = orderDetailService.newUserOrder(byEmail.get(), myCart, tokentoInfo.getMerchantUid(),
                    tokentoInfo.getName(),tokentoInfo.getBuyerTel(),tokentoInfo.getBuyerPostcode(),tokentoInfo.getBuyerAddr());
            if(b){
                return ResponseEntity.ok(new tfResultDto(b));

            }else
            {
                return ResponseEntity.ok(new tfResultDto(false));
            }

        }else
        {
            return ResponseEntity.ok(new tfResultDto(false));

        }





    }
    @Data
    public class Verification {
        private Long shopId;
        private int amount;
        private int pure;
        private int free;
        private int shipprice;
        public Verification(Shop shopId)
        {
            this.shopId=shopId.getId();
            this.free=shopId.getFreePrice();
            this.shipprice=shopId.getNofree();
        }


    }

    public void paymentAlreadyCancelled(String merchuid)
    {
        CancelData cancel_data = new CancelData(merchuid, true); //imp_uid를 통한 전액취소
        IamportClient client;
        String test_api_key = apiKey.getRESTAPIKEY();
        String test_api_secret = apiKey.getRESTAPISECRET();
        //결제내역에서
        String test_imp_uid = merchuid;


        client = new IamportClient(test_api_key, test_api_secret);
        try {
            IamportResponse<Payment> payment_response = client.cancelPaymentByImpUid(cancel_data);

        } catch (IamportResponseException e) {
            System.out.println(e.getMessage());

            switch(e.getHttpStatusCode()) {
                case 401 :
                    //TODO
                    break;
                case 500 :
                    //TODO
                    break;
            }
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

    }

    public Payment getTokentoInfo(String merchuid) {
        IamportClient client;
//        String test_api_key = "imp_apikey";
//        String test_api_secret = "ekKoeW8RyKuT0zgaZsUtXXTLQ4AhPFW3ZGseDA6bkA5lamv9OqDMnxyeB9wqOsuO9W3Mx9YSJ4dTqJ3f";
//        String test_imp_uid = "imp_448280090638";
        //restapi키

        String test_api_key = apiKey.getRESTAPIKEY();
        String test_api_secret = apiKey.getRESTAPISECRET();
        //결제내역에서
        String test_imp_uid = merchuid;


        client = new IamportClient(test_api_key, test_api_secret);
        try {
            IamportResponse<com.siot.IamportRestClient.response.Payment> payment_response = client.paymentByImpUid(test_imp_uid);
            System.out.println("결제정보");

            return payment_response.getResponse();
        } catch (IamportResponseException e) {
            System.out.println(e.getMessage());

            switch(e.getHttpStatusCode()) {
                case 401 :
                    //TODO
                    break;
                case 500 :
                    //TODO
                    break;
            }
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }


//        return NewrestTemplate.postForObject("https://api.iamport.kr/payments/"+imp, newentity, String.class);

        return null;
    }
    @Data
    public class GetTokenVO {
        private String access_token;
        private long now;
        private long expired_at;



    }

    //옵션삭제
    @RequestMapping(value = "/api/cart/removeoption", method = RequestMethod.POST)
    public ResponseEntity<?> removeoption(@CurrentSecurityContext(expression = "authentication")
                                                Authentication authentication, @RequestBody removeDetailDAO removeDetailDAO) throws Exception {

        try {
            orderDetailRepository.deleteById(removeDetailDAO.orderDetailId);
            return ResponseEntity.ok(new ResultDto(true,"성공적으로 삭제했습니다"));

        }catch (Exception e)
        {
            return ResponseEntity.ok(new ResultDto(false,"삭제실패"));
        }
        
    }


    ///////////
    @Data
    public static class DetailedCart{

        HashSet<DetailedShop> ds = new HashSet<>();

        public DetailedCart(List<OrderDetail> orderDetails){

            for (OrderDetail orderDetail : orderDetails) {
                if (ds.contains(new DetailedShop(orderDetail)))
                {
                    for (DetailedShop d : ds) {
                        if(d.shopId==orderDetail.getShop().getId())
                        {
                            if(d.dp.contains(new DetailedProduct(orderDetail)))
                            {
                                for (DetailedProduct detailedProduct : d.dp) {
                                    if(detailedProduct.productId==orderDetail.getProducts().getId())
                                    {
                                        detailedProduct.dO.add(new DetailedOption(orderDetail));
                                    }
                                }
                            }
                            else
                            {
                                d.dp.add(new DetailedProduct(orderDetail));

                            }
                        }
                    }
                }
                else
                {
                    ds.add(new DetailedShop(orderDetail));
                }




            }
        }
    }

    @Data
    public static class DetailedShop {
        Long shopId;
        String shopName;
        int freePrice;
        int shipPrice;
        HashSet<DetailedProduct> dp = new HashSet<>();



        public DetailedShop(OrderDetail od) {
            shopId = od.getShop().getId();
            shopName = od.getShop().getShopName();
            freePrice=od.getShop().getFreePrice();


            shipPrice=od.getShop().getNofree();
            dp.add(new DetailedProduct(od));
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            DetailedShop that = (DetailedShop) o;
            return Objects.equals(shopId, that.shopId);
        }

        @Override
        public int hashCode() {

            return Objects.hash(shopId);
        }
        


    }







    @Data
    public static class DetailedProduct{
        Long productId;
        String productName;
        String thumbNail;
        HashSet<DetailedOption> dO = new HashSet<DetailedOption>();

        public DetailedProduct(OrderDetail od){


            productId =od.getProducts().getId();
            productName=od.getProducts().getProductName();
            for (File image : od.getProducts().getImages()) {
                if(image.isIsthumb()==true)
                {
                    thumbNail=image.getFilepath();
                    break;
                }
            }
            dO.add(new DetailedOption(od));
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            DetailedProduct that = (DetailedProduct) o;
            return Objects.equals(productId, that.productId);
        }

        @Override
        public int hashCode() {
            return Objects.hash(productId);
        }
    }

    @Data
    public static class DetailedOption{
        Long optionId;
        int optionCount;
        int originPrice;
        String optionName;
        Long detailedId;
        String pandaName;
        boolean discount=false;
        public DetailedOption(OrderDetail detail){
            detailedId=detail.getId();
            optionId=detail.getOptions().getId();
            optionCount=detail.getProductCount();
            originPrice=detail.getOptions().getOptionPrice();
            optionName=detail.getOptions().getOptionName();
            if(detail.getPanda() !=null)
            {
                pandaName=detail.getPanda().getPandaName();
                discount=true;
            }
        }

    }


    ///




        @Data
        static class CreateOrderDetailDAO {
            private Long productid;
            private List<detailOptionDAO> cart;
            private Long selectpanda;
        }

        @Data
        static class detailOptionDAO {
            private Long optionId;
            private int optionCount;
            private String originPrice;
            private String optionPrice;

        }

        @Data
        static class thisResultDto {
            boolean success;
            DetailedCart dtos;

            public thisResultDto(boolean b, DetailedCart mycart) {
                success = b;
                dtos = mycart;
            }
        }

    @Data
    static class tfResultDto {
        boolean success;


        public tfResultDto(boolean b) {
            success = b;

        }
    }
        @Data
    static class removeDetailDAO {
        private Long orderDetailId;
    }

    @Data
    static class paymentDAO {
        private ArrayList<Long> shopId;
    }
    @Data
    static class finishPaymentDAO {
        String impuid;
        String merchantuid;
        String paymethod;
        String paid_amount;
        String stat;
    }
}
