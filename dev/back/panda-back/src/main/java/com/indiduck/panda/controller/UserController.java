package com.indiduck.panda.controller;

import com.indiduck.panda.Repository.OrderDetailRepository;
import com.indiduck.panda.Repository.UserOrderRepository;
import com.indiduck.panda.Repository.UserRepository;
import com.indiduck.panda.Service.JwtUserDetailsService;
import com.indiduck.panda.domain.OrderDetail;
import com.indiduck.panda.domain.OrderStatus;
import com.indiduck.panda.domain.User;
import com.indiduck.panda.domain.UserOrder;
import com.indiduck.panda.domain.dto.UserDto;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.hibernate.criterion.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
            if((userOrder.getOrderStatus()==(OrderStatus.환불대기))||(userOrder.getOrderStatus()==(OrderStatus.환불완료)))
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


    @GetMapping("/api/recentsituation")
    public ResponseEntity<?> recentSituation(@CurrentSecurityContext(expression = "authentication")
                                                   Authentication authentication,  Pageable pageable) {
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


    @GetMapping("/api/situationdetail")
    public ResponseEntity<?> situationDetail(@CurrentSecurityContext(expression = "authentication")
                                                     Authentication authentication,  @RequestBody SituationDto situationDto) {
        String name = authentication.getName();

        return ResponseEntity.ok(new pageDto(true,allByUserId.getTotalPages(),allByUserId.getTotalElements(),pageList));
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
        //최근 주문현황
        List<recentOrder> recentOrder=new ArrayList<>();
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
    private class SituationDto {
        //주문번호
        Long detailId;
    }

    @Data
    private class recentSituationDto {
        //주문번호
        Long detailId;
    }
}
