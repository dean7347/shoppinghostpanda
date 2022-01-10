package com.indiduck.panda.controller;

import com.indiduck.panda.Repository.OrderDetailRepository;
import com.indiduck.panda.Repository.UserOrderRepository;
import com.indiduck.panda.Repository.UserRepository;
import com.indiduck.panda.Service.JwtUserDetailsService;
import com.indiduck.panda.Service.OrderDetailService;
import com.indiduck.panda.Service.UserOrderService;
import com.indiduck.panda.domain.*;
import com.indiduck.panda.domain.dao.TFMessageDto;
import com.indiduck.panda.domain.dto.UserDto;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.hibernate.criterion.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequiredArgsConstructor
public class UserController {
    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final OrderDetailRepository orderDetailRepository;
    @Autowired
    private final UserOrderRepository userOrderRepository;
    @Autowired
    private final UserOrderService userOrderService;
    

    @GetMapping("/api/dashboard")
    public ResponseEntity<?> mainDashBoard(@CurrentSecurityContext(expression = "authentication")
                                                       Authentication authentication) { // 회원 추가
        String name = authentication.getName();
        Optional<User> byEmail = userRepository.findByEmail(name);
        List<UserOrder> byUserId = userOrderRepository.findByUserId(byEmail.get());
        Optional<List<OrderDetail>> byUserAndOrderStatus = orderDetailRepository.findByUserAndOrderStatus(byEmail.get(), OrderStatus.결제대기);
        Optional<List<OrderDetail>> orderDetailByUser = orderDetailRepository.findOrderDetailByUser(byEmail.get());

        int ready=0;
        int finish=0;
        int cancel=0;
        int cart=0;
        for (UserOrder userOrder : byUserId) {
            if((userOrder.getOrderStatus()==(OrderStatus.발송중))||(userOrder.getOrderStatus()==(OrderStatus.준비중))||(userOrder.getOrderStatus()==(OrderStatus.결제완료)))
            {
                ready++;
            }

            if((userOrder.getOrderStatus()==(OrderStatus.배송완료))||(userOrder.getOrderStatus()==(OrderStatus.구매확정)))
            {
                ready++;
            }
            if((userOrder.getOrderStatus()==(OrderStatus.환불대기))||(userOrder.getOrderStatus()==(OrderStatus.환불완료))||(userOrder.getOrderStatus()==(OrderStatus.주문취소)))
            {
                cancel++;
            }
            if((userOrder.getOrderStatus()==(OrderStatus.결제대기)))
            {
                cart++;
            }
        }
        if(byUserAndOrderStatus.get().isEmpty())
        {
            cart=0;
        }else
        {
            byUserAndOrderStatus.get().size();
        }
        //유저의 내역이 비었을경우
        if(byUserId.isEmpty())
        {
            ready=0;
            finish=0;
            cancel=0;
        }
        return ResponseEntity.ok(new dashBoardDto(true,ready,finish,cancel,cart));
    }

    //주문취소
    @PostMapping("/api/userordercancel")
    public ResponseEntity<?> cancelOrder(@CurrentSecurityContext(expression = "authentication")
                                                       Authentication authentication,  @RequestBody SituationDto situationDto) {
        UserOrder userOrder = userOrderService.cancelOrder(situationDto.detailId);

        if(userOrder!=null)
        {
            //TODO : 주문취소 환불 로직
            return ResponseEntity.ok(new TFMessageDto(true,"변경성공"));

        }
        return ResponseEntity.ok(new TFMessageDto(false,"취소할 수 없는주문입니다"));


    }


    @GetMapping("/api/recentsituation")
    public ResponseEntity<?> recentSituation(@CurrentSecurityContext(expression = "authentication")
                                                   Authentication authentication,@PageableDefault(sort="createdAt",direction = Sort.Direction.DESC ) Pageable pageable) {
        String name = authentication.getName();
        Optional<User> byEmail = userRepository.findByEmail(name);
        Page<UserOrder> allByUserId = userOrderRepository.findAllByUserId(byEmail.get(),pageable);
        System.out.println("allByUserId = " + allByUserId.get());
        List<recentSituation> pageList = new ArrayList<>();
        System.out.println("allByUserId = " + allByUserId.get());
//        for (UserOrder userOrder : allByUserId) {
//            System.out.println("userOrder = " + userOrder.getReveiverName());
//        }
        HashSet<String> proname=new HashSet<>();

        for (UserOrder userOrder : allByUserId) {
            proname=new HashSet<>();
            List<OrderDetail> detail = userOrder.getDetail();
            for (OrderDetail orderDetail : detail) {
                String productName = orderDetail.getProducts().getProductName();
                proname.add(productName);

            }
            pageList.add(new recentSituation(userOrder.getId(),proname.toString(),userOrder.getFullprice(),
                    userOrder.getCreatedAt(),userOrder.getOrderStatus().toString()));
        }
        return ResponseEntity.ok(new pageDto(true,allByUserId.getTotalPages(),allByUserId.getTotalElements(),pageList));
    }

//디테일 내려주는곳
    @PostMapping("/api/situationdetail")
    public ResponseEntity<?> situationDetail(@CurrentSecurityContext(expression = "authentication")
                                                     Authentication authentication,  @RequestBody SituationDto situationDto) {
                String name = authentication.getName();
        Optional<User> byEmail = userRepository.findByEmail(name);

        Optional<UserOrder> byId = userOrderRepository.findById(situationDto.detailId);
        UserOrder userOrder = byId.get();
        List<OrderDetail> detail = userOrder.getDetail();
        List<DetailOrderList> dol =new ArrayList<>();



        recentSituationDto rsd = new recentSituationDto(true,userOrder.getId(),userOrder.getAmount(),userOrder.getShipPrice()
        ,userOrder.getFullprice(),userOrder.getReveiverName(),userOrder.getReceiverAddress(),userOrder.getReceiverPhone(),detail);


        return ResponseEntity.ok(rsd);
    }


    @PostMapping("/api/situationdetailv2")
    public ResponseEntity<?> situationDetailV2(@CurrentSecurityContext(expression = "authentication")
                                                     Authentication authentication,  @RequestBody SituationDto situationDto) {
        String name = authentication.getName();
        Optional<User> byEmail = userRepository.findByEmail(name);

        Optional<UserOrder> byId = userOrderRepository.findById(situationDto.detailId);
        UserOrder userOrder = byId.get();
        List<OrderDetail> detail = userOrder.getDetail();
        List<DetailOrderList> dol =new ArrayList<>();
        HashSet<String> proname=new HashSet<>();



        for (OrderDetail orderDetail : userOrder.getDetail()) {
            proname.add(orderDetail.getProducts().getProductName());
        }
        System.out.println("내려주는데이타 = " + proname);



        recentSituationDtoV2 rsd = new recentSituationDtoV2(true,userOrder.getId(),userOrder.getAmount(),userOrder.getShipPrice()
                ,userOrder.getFullprice(),userOrder.getReveiverName(),userOrder.getReceiverAddress(),userOrder.getReceiverPhone(),detail
                ,proname.toString(),detail.get(0).getPaymentAt(),detail.get(0).getShop().getShopName(),detail.get(0).getShop().getCsPhone(),
                userOrder.getOrderStatus(),userOrder.getPureAmount(),userOrder.getFreeprice());


        return ResponseEntity.ok(rsd);
    }

    @Data
    private class pageDto{
        boolean success;
        int totalpage;
        Long totalElement;
        List<recentSituation> pageList=new ArrayList<>();
        public pageDto(boolean su,int totalP,Long totalE, List<recentSituation> pl)
        {
            success=su;
            totalpage=totalP;
            totalElement=totalE;
            pageList=pl;
        }
    }


    @Data
    private class recentSituation{
        //주문번호
        long num;
        //상품이름
        String productName;
        //결제가격
        int price;
        //주문일자
        LocalDateTime orderAt;
        //주문 상태
        String status;
        //프로덕트 아이디

        public recentSituation(Long no,String pn,int pri,LocalDateTime dateTime,String stat )
        {
            num=no;
            productName=pn;
            price=pri;
            orderAt=dateTime;
            status=stat;

        }
    }
    @Data
    private class dashBoardDto {
        boolean success;
        //준비중,배송중
        int readyProduct;
        //배송완료상품
        int finishProduct;
        //취소,반품상품
        int cancelProduct;
        //장바구니 갯수
        int cartProduct;
        public dashBoardDto(boolean result,int ready,int fin,int cancel, int cart)
        {
            success=result;
            readyProduct=ready;
            finishProduct=fin;
            cancelProduct=cancel;
            cartProduct=cart;

        }

    }

    @Data
    private class recentOrder {
        //주문번호
        int crn;
        //상품명
        String name;
        //가격
        int price;
        //주문일자
        LocalDateTime orderAt;
        //상태태
        OrderStatus status;
    }

    @Data
    private static class SituationDto {
        //주문번호
        long detailId;
    }

    @Data
    private class recentSituationDtoV2 {
        boolean success;
        //주문번호
        Long detailId;
        //결제금액
        int price;
        //배송비
        int shipprice;
        //순수한 가격
        int pureamount;
        //총금액
        int allamount;
        //무료배송금액
        int freeprice;
        //받는사람
        String receiver;
        //주소
        String address;
        //받는사람전화번호
        String receiverPhone;
        //상품DTO
        HashSet<DetailOrderList> products=new HashSet<>();
        List<DetailOrderList> orderDetails=new ArrayList<>();
        //추가된것
        String proName;
        LocalDateTime orderAt;
        String shopName;
        String shopPhone;
        OrderStatus status;


        public recentSituationDtoV2(boolean su,Long detailId, int price, int shipprice, int allamount,
                                  String receiver, String address, String receiverPhone, List<OrderDetail> dol,String pn,LocalDateTime oa,
                                    String sn, String sp, OrderStatus os,int pa,int fp) {
            this.proName=pn;
            this.orderAt=oa;
            this.shopName=sn;
            this.shopPhone=sp;
            this.status=os;
            this.success=su;
            this.detailId = detailId;
            this.price = price;
            this.shipprice = shipprice;
            this.allamount = allamount;
            this.receiver = receiver;
            this.address = address;
            this.receiverPhone = receiverPhone;
            this.pureamount=pa;
            this.freeprice=fp;
            for (OrderDetail orderDetail : dol) {
                String img=null;
                List<File> images = orderDetail.getProducts().getImages();
                for (File image : images) {
                    if(image.isIsthumb())
                    {
                        img= image.getFilepath();
                        break;
                    }
                }
                products.add(new DetailOrderList(orderDetail.getProducts().getProductName(),img,orderDetail.getProducts().getId()));
            }

            for (OrderDetail orderDetail : dol) {
                for (DetailOrderList product : products) {

                    if(product.productName==orderDetail.getProducts().getProductName()){
                        if(orderDetail.getPanda()==null)
                        {
                            product.setOptions(new OptionList(orderDetail.getOptions().getOptionName(),orderDetail.getProductCount(),
                                    orderDetail.getIndividualPrice(),orderDetail.getTotalPrice(),"null",orderDetail.getId()
                                    ,orderDetail.getOrderStatus()));
                        }else
                        {
                            product.setOptions(new OptionList(orderDetail.getOptions().getOptionName(),orderDetail.getProductCount(),
                                    orderDetail.getIndividualPrice(),orderDetail.getTotalPrice(),orderDetail.getPanda().getPandaName(),orderDetail.getId()
                                    ,orderDetail.getOrderStatus()));
                        }

                    }
                }
            }



        }
    }

    @Data
    private class recentSituationDto {
        boolean success;
        //주문번호
        Long detailId;
        //결제금액
        int price;
        //배송비
        int shipprice;
        //총금액
        int allamount;
        //받는사람
        String receiver;
        //주소
        String address;
        //받는사람전화번호
        String receiverPhone;
        //상품DTO
        HashSet<DetailOrderList> products=new HashSet<>();
        List<DetailOrderList> orderDetails=new ArrayList<>();

        public recentSituationDto(boolean su,Long detailId, int price, int shipprice, int allamount,
                                  String receiver, String address, String receiverPhone, List<OrderDetail> dol) {
            this.success=su;
            this.detailId = detailId;
            this.price = price;
            this.shipprice = shipprice;
            this.allamount = allamount;
            this.receiver = receiver;
            this.address = address;
            this.receiverPhone = receiverPhone;
            for (OrderDetail orderDetail : dol) {
                String img=null;
                List<File> images = orderDetail.getProducts().getImages();
                for (File image : images) {
                    if(image.isIsthumb())
                    {
                       img= image.getFilepath();
                    }
                }
                products.add(new DetailOrderList(orderDetail.getProducts().getProductName(),img,orderDetail.getProducts().getId()));
            }

            for (OrderDetail orderDetail : dol) {
                for (DetailOrderList product : products) {

                    if(product.productName==orderDetail.getProducts().getProductName()){
                        if(orderDetail.getPanda()==null)
                        {
                            product.setOptions(new OptionList(orderDetail.getOptions().getOptionName(),orderDetail.getProductCount(),
                                    orderDetail.getIndividualPrice(),orderDetail.getTotalPrice(),"null",orderDetail.getId()
                            ,orderDetail.getOrderStatus()));
                        }else
                        {
                            product.setOptions(new OptionList(orderDetail.getOptions().getOptionName(),orderDetail.getProductCount(),
                                    orderDetail.getIndividualPrice(),orderDetail.getTotalPrice(),orderDetail.getPanda().getPandaName(),orderDetail.getId()
                                    ,orderDetail.getOrderStatus()));
                        }

                    }
                }
            }



        }
    }




    @Data
    private class DetailOrderList{
        String productName;
        String imgPath;
        List<OptionList> options= new ArrayList<>();
        long proId;

        public DetailOrderList(String pn,String img,long pi) {
            productName=pn;
            imgPath=img;
            proId=pi;
        }
        public void setOptions(OptionList list)
        {
            options.add(list);

        }
    }

    @Data
    private class OptionList{
        String optionName;
        int optionCount;
        int optionPrice;
        int allAmount;
        String pandaName;
        boolean discount;
        long odid;
        OrderStatus orderStatus;

        public OptionList(String optionName, int optionCount, int optionPrice, int allAmount, String pandaName,long odid,OrderStatus odst) {
            this.optionName = optionName;
            this.optionCount = optionCount;
            this.optionPrice = optionPrice;
            this.allAmount = allAmount;
            this.pandaName = pandaName;
            this.odid=odid;
            this.orderStatus=odst;
            if(pandaName=="null")
            {
                discount=false;
            }
            else{
                discount=true;
            }
        }
    }
}
