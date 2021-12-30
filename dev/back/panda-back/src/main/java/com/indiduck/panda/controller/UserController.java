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
                                                       Authentication authentication,  Pageable pageable) { // 회원 추가
        String name = authentication.getName();
        Optional<User> byEmail = userRepository.findByEmail(name);
//        Optional<User> byEmail = userRepository.findByEmail("customer@gmail.com");

        Page<UserOrder> allByUserId = userOrderRepository.findAllByUserId(byEmail.get(),pageable);
        List<UserOrder> byUserId = userOrderRepository.findByUserId(byEmail.get());
        System.out.println("byUserId = " + byUserId);
//        System.out.println("byId = " + allByUserId);
        Optional<List<OrderDetail>> byUserAndOrderStatus = orderDetailRepository.findByUserAndOrderStatus(byEmail.get(), OrderStatus.결제대기);

        int ready=0;
        int finish=0;
        int cancel=0;
        int cart=0;

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
        }else
        {

        }
        return ResponseEntity.ok(new dashBoardDto(ready,finish,cancel,cart));


    }


    @Data
    private class dashBoardDto {
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
        public dashBoardDto(int ready,int fin,int cancel, int cartProduct)
        {

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
}
