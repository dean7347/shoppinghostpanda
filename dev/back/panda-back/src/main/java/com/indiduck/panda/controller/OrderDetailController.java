package com.indiduck.panda.controller;


import com.google.gson.Gson;
import com.google.gson.JsonParser;
import com.indiduck.panda.Repository.OrderDetailRepository;
import com.indiduck.panda.Repository.ShopRepository;
import com.indiduck.panda.Repository.UserRepository;
import com.indiduck.panda.Service.OrderDetailService;
import com.indiduck.panda.config.ApiKey;
import com.indiduck.panda.domain.*;
import com.indiduck.panda.domain.dto.ResultDto;
import com.siot.IamportRestClient.IamportClient;
import lombok.Data;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@RestController
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
                    orderDetailService.newOrderDetail(authentication.getName(), createProductDAO.productid
                            , detailOptionDAO.optionId, detailOptionDAO.optionCount);
                }else
                {
                    orderDetailService.newOrderDetail(authentication.getName(), createProductDAO.productid
                            , detailOptionDAO.optionId, detailOptionDAO.optionCount, createProductDAO.selectpanda);
                }

            }catch (Exception e)

            {
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
        System.out.println("myCart = " + myCart);






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
    //결제페이지
    @RequestMapping(value = "/api/payment/complete", method = RequestMethod.POST)
    public ResponseEntity<?> finishpayment(@CurrentSecurityContext(expression = "authentication")
                                               Authentication authentication,@RequestBody finishPaymentDAO finishpaymentDAO) throws Exception {
        Optional<User> byEmail = userRepository.findByEmail(authentication.getName());
        System.out.println("결제검증로직");
        System.out.println(finishpaymentDAO);
        
        //import와 통신하기
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("imp_uid",finishpaymentDAO.impuid);
        params.add("merchant_uid",finishpaymentDAO.merchantuid);


        return ResponseEntity.ok(new tfResultDto(true));
    }

    @RequestMapping(value = "/api/test", method = RequestMethod.POST)
    public ResponseEntity<?> test(@CurrentSecurityContext(expression = "authentication")
                                                   Authentication authentication) throws Exception {
        System.out.println(apiKey.getRESTAPIKEY()+"  "+apiKey.getRESTAPISECRET());
        //결제내역에서
        String paymentresult = getTokentoInfo("imp_533942314486", "1636078940675");
        JSONObject jsonObject = new JSONObject(paymentresult);
        System.out.println("변환완료");
        Object response = jsonObject.get("response");
        JSONObject resp = new JSONObject(response.toString());
        resp.get("buyer_name");
        System.out.println(jsonObject);

        System.out.println(resp.get("buyer_name"));

        return ResponseEntity.ok(new tfResultDto(true));
    }


    public String getTokentoInfo(String imp,String merchuid) {

        RestTemplate restTemplate = new RestTemplate();

        //서버로 요청할 Header
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);


        Map<String, Object> map = new HashMap<>();
        map.put("imp_key", apiKey.getRESTAPIKEY());
        map.put("imp_secret", apiKey.getRESTAPISECRET());


        Gson var = new Gson();
        String json = var.toJson(map);
        //서버로 요청할 Body
        HttpEntity<String> entity = new HttpEntity<>(json, headers);

        String s = restTemplate.postForObject("https://api.iamport.kr/users/getToken", entity, String.class);


        Gson str = new Gson();
        s = s.substring(s.indexOf("response") + 10);
        s = s.substring(0, s.length() - 1);
        GetTokenVO vo = str.fromJson(s, GetTokenVO.class);
        String access_token = vo.getAccess_token();
        //겟토큰
        System.out.println("gettoken");
        System.out.println(access_token);
        RestTemplate NewrestTemplate = new RestTemplate();
        headers.setBearerAuth(access_token);
        Map<String, Object> newmap = new HashMap<>();
        newmap.put("imp_uid", imp);
        newmap.put("merchant_uid", merchuid);

        Gson newvar = new Gson();
        String newjson = newvar.toJson(newmap);
        System.out.println(newjson);
        HttpEntity<String> newentity = new HttpEntity<>(newjson, headers);
        String s1 = NewrestTemplate.postForObject("https://api.iamport.kr/payments/"+imp, newentity, String.class);

        System.out.println("파싱결과");
        System.out.println();


        return NewrestTemplate.postForObject("https://api.iamport.kr/payments/"+imp, newentity, String.class);

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
    static class DetailedCart{

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
    static class DetailedShop {
        Long shopId;
        String shopName;
        int freePrice;
        int shipPrice;
        HashSet<DetailedProduct> dp = new HashSet<>();



        public DetailedShop(OrderDetail od) {
            shopId = od.getShop().getId();
            shopName = od.getShop().getShopName();
            freePrice=od.getShop().getFreePrice();
            shipPrice=od.getShop().getShipPrice();
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
    static class DetailedProduct{
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
    static class DetailedOption{
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
