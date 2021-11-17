package com.indiduck.panda.controller;


import com.indiduck.panda.Repository.ShopRepository;
import com.indiduck.panda.Repository.UserOrderRepository;
import com.indiduck.panda.Repository.UserRepository;
import com.indiduck.panda.Service.ShopService;
import com.indiduck.panda.config.JwtTokenUtil;
import com.indiduck.panda.domain.*;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RequiredArgsConstructor
@RestController
public class ShopController {

    @Autowired
    private ShopService shopService;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    ShopRepository shopRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    UserOrderRepository userOrderRepository;

    //샵 생성메소드
    @RequestMapping(value = "/createShop", method = RequestMethod.POST)
    public ResponseEntity<?> createShop(@CurrentSecurityContext(expression = "authentication")
                                                Authentication authentication, @RequestBody CreateShopDAO createShopDAO) throws Exception{
        String name = authentication.getName();

        System.out.println("createShopDAO = " + createShopDAO);

        try{ Shop newShop = shopService.createNewShop(
                name,
                createShopDAO.shopName,
                createShopDAO.representative,
                createShopDAO.crn,createShopDAO.telnum,
                createShopDAO.freepee,createShopDAO.nofree,createShopDAO.priPhone,
                createShopDAO.csPhone,createShopDAO.csTime,createShopDAO.toPanda,
                createShopDAO.reship,createShopDAO.returnpee,createShopDAO.tradepee,
                createShopDAO.returnaddress,createShopDAO.candate,createShopDAO.noreturn,
                createShopDAO.tagree,createShopDAO.iagree,createShopDAO.comaddress,createShopDAO.avdtime);
            if (newShop!=null){
                return ResponseEntity.ok(new shopControllerResultDto(true,"샵등록 성공"));
            }
        }catch (Exception e){
            return ResponseEntity.ok(new shopControllerResultDto(false,"샵등록 실패 "));
        }


        return ResponseEntity.ok(new shopControllerResultDto(false,"샵등록 실패 "));

    }

    //TODO:샵 수정 메소드
    //TODO:샵 삭제 메소드
    //TODO:샵 조회 메소드
    @GetMapping("/haveshop")
    @ResponseBody
    public ResponseEntity<?> haveShop(@CookieValue(name = "accessToken") String usernameCookie)
    {

        String usernameFromToken = jwtTokenUtil.getUsername(usernameCookie);
        if(usernameFromToken !=null)
        {
            Optional<User> byEmail = userRepository.findByEmail(usernameFromToken);
            System.out.println("byEmail = " + byEmail.get().getEmail());

            Optional<Shop> byUser = shopRepository.findByUserId(byEmail.get().getId());
            System.out.println("byUser = " + byUser);

            if(byUser.isEmpty())
            {
                return ResponseEntity.status(HttpStatus.OK).body(new haveShopDto("null",false,false,false));
            }
            return ResponseEntity.status(HttpStatus.OK).body(new haveShopDto(byUser.get().getShopName(),true,
                    byUser.get().isApprove(),true));
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("올바르지 못한 요청입니다 ");

    }


    //샵 대시보드 메인
    @RequestMapping(value = "/api/shop/dashboard", method = RequestMethod.GET)
    public ResponseEntity<?> dashboard(@CurrentSecurityContext(expression = "authentication")
                                                Authentication authentication, Pageable pageable) throws Exception{
        try{
            String name = authentication.getName();
            Optional<User> byEmail = userRepository.findByEmail(name);
            Page<UserOrder> allByShop = userOrderRepository.findAllByShop(byEmail.get().getShop(), pageable);

            long totalElements = allByShop.getTotalElements();
            int totalPages = allByShop.getTotalPages();



            List<userOrderShopDto> uosd= new ArrayList<>();
            for (UserOrder userOrder : allByShop) {
                uosd.add(new userOrderShopDto(userOrder));

            }

            return ResponseEntity.ok(new uorsDto(true,totalElements,totalPages,uosd));

        }catch (Exception e)
        {
            return ResponseEntity.ok(new uorsDto(false,0,0,null));
        }

    }

    //샵 대시보드 메인
    @RequestMapping(value = "/api/shop/dashboard/orderStatus", method = RequestMethod.GET)
    public ResponseEntity<?> dashboardnochecked(@CurrentSecurityContext(expression = "authentication")
                                               Authentication authentication, Pageable pageable,@RequestParam String orderstatus) throws Exception{


        try{
            String name = authentication.getName();
            Optional<User> byEmail = userRepository.findByEmail(name);
            Page<UserOrder> allByShop = userOrderRepository.findAllByShopAndOrderStatus(byEmail.get().getShop(),OrderStatus.valueOf(orderstatus) , pageable);

            long totalElements = allByShop.getTotalElements();
            int totalPages = allByShop.getTotalPages();



            List<userOrderShopDto> uosd= new ArrayList<>();
            for (UserOrder userOrder : allByShop) {
                uosd.add(new userOrderShopDto(userOrder));

            }

            return ResponseEntity.ok(new uorsDto(true,totalElements,totalPages,uosd));

        }catch (Exception e)
        {
            return ResponseEntity.ok(new uorsDto(false,0,0,null));
        }

    }

    //주문확인
    @RequestMapping(value = "/api/shop/confirm", method = RequestMethod.POST)
    public ResponseEntity<?> dashboard(@CurrentSecurityContext(expression = "authentication")
                                               Authentication authentication, @RequestBody ConfirmDto confirmDto) throws Exception{

        Optional<UserOrder> byId = userOrderRepository.findById(confirmDto.userorderId);
        byId.get().changeStatuspaymentfinishtoready();
        if(byId.get().getOrderStatus() == OrderStatus.준비중)
        {
            userOrderRepository.save(byId.get());
            return ResponseEntity.ok(new shopControllerResultDto(true,"성공적으로 상태가 변경되었습니다"));
        }

        return ResponseEntity.ok(new shopControllerResultDto(false,"상태변경에 실패했습니다"));


    }

//    @RequestMapping(value = "/api/shop/nochecked", method = RequestMethod.GET)
//    public ResponseEntity<?> nochecked(@CurrentSecurityContext(expression = "authentication")
//                                               Authentication authentication) throws Exception{
//
//        try{
//            String name = authentication.getName();
//            Optional<User> byEmail = userRepository.findByEmail(name);
//            Optional<List<UserOrder>> allByUserId = userOrderRepository.findAllByShopAndOrderStatus(byEmail.get().getShop(),OrderStatus.결제완료);
//
//        int size = allByUserId.get().size();
//        return ResponseEntity.ok(new uorsCheck(true,size));
//
//        }catch (Exception e)
//        {
//            return ResponseEntity.ok(new uorsCheck(false,0));
//
//        }
//
//    }




    //==DAO DTO ==//

    @Data
    static class userOrderShopDto {

        private Long userOrderId;
        private String orderuser;
        private String orderuserPhone;
        private String receiverName;
        private String receiverZipCode;
        private String receiverAddress;
        private String receiverPhone;
        private  int amount;
        private int pureamount;
        private int shipprice;
        private int fullprice;

        private OrderStatus orderStatus;
        private List<OrderItems> orders=new ArrayList<>();


        public userOrderShopDto(UserOrder uo){
            userOrderId=uo.getId();
            orderuser=uo.getUserId().getUserRName();
            orderuserPhone=uo.getUserId().getUserPhoneNumber();
            receiverName=uo.getReveiverName();
            receiverZipCode=uo.getReceiverZipCode();
            receiverAddress=uo.getReceiverAddress();
            receiverPhone=uo.getReceiverPhone();
            orderStatus=uo.getOrderStatus();
            amount=uo.getAmount();
            pureamount=uo.getPureAmount();
            if(uo.getPureAmount()>=uo.getFreeprice())
            {
                shipprice=0;



            }else
            {
                shipprice=uo.getShipPrice();
            }
            fullprice=uo.getFullprice();

            HashSet<Long> pro=new HashSet<>();
            //pro에 프로덕트 목록을 만든다
            for (OrderDetail od : uo.getDetail()) {
                pro.add(od.getProducts().getId());
            }

            for (Long aLong : pro) {
                orders.add(new OrderItems(aLong));
            }

            for (OrderDetail orderDetail : uo.getDetail()) {
                for (OrderItems order : orders) {
                    if(orderDetail.getProducts().getId()==order.productId)
                    {
                        order.productName=orderDetail.getProducts().getProductName();
                        order.options.add(new ProductOptions(orderDetail));
                    }
                }
            }




        }

        @Data
        private static class OrderItems {
            Long productId;
            String productName;
            List<ProductOptions> options=new ArrayList<>();
            public OrderItems(Long productId)
            {
                this.productId=productId;


            }
        }
        @Data
        private static class ProductOptions {
            Long optionId;
            String optionName;
            int optionCount;
            boolean ispanda;
            public ProductOptions(OrderDetail od)
            {
                optionId=od.getOptions().getId();
                optionName=od.getOptions().getOptionName();
                optionCount=od.getProductCount();
                if(od.getPanda() !=null){
                    ispanda=true;
            }else
                {
                    ispanda=false;
                }
            }
        }
    }
        @Data
        static class CreateShopDAO {
        private String shopName;
        private String representative;
        private String crn;
        private String telnum;
        private int freepee;
        private int nofree;
        private String priPhone;
        private String csPhone;
        private String csTime;
        private String toPanda;
        private String reship;
        private int returnpee;
        private int tradepee;
        private String returnaddress;
        private String candate;
        private String noreturn;
        private boolean tagree;
        private boolean iagree;
        private String comaddress;
        private String avdtime;

    }

    @Data
    static class haveShopDto {

        private String shopName;
        private boolean success;
        private boolean isShop;
        private boolean isApprove;
        public haveShopDto(String name,Boolean isShop,Boolean ap,Boolean su){

            this.shopName=name;
            this.isShop=isShop;
            this.isApprove =ap;
            this.success=su;

        }
    }
    @Data
    static class shopControllerResultDto {
        boolean success;
        String  message;

        public shopControllerResultDto(boolean b, String mes) {
            success = b;
            message = mes;
        }
    }

    @Data
    static class uorsDto {
        boolean success;
        long totalElements;
        int totalPages;
        List<userOrderShopDto> uosd;

        public uorsDto(boolean b,long te,int tp,  List<userOrderShopDto> getuosd) {
            success = b;
            totalElements=te;
            totalPages=tp;
            uosd=getuosd;

        }
    }

    @Data
    private class uorsCheck {
        boolean success;
        int num;
        public uorsCheck(boolean b, int numb) {
            success=b;
            num=numb;
        }
    }

    @Data
    private static  class OrderStatusDto {
        String orderstatus;
    }

    @Data
    private static class ConfirmDto {
        Long userorderId;
    }
}
