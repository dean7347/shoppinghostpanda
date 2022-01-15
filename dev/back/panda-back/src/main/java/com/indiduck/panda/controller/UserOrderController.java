package com.indiduck.panda.controller;


import com.indiduck.panda.Repository.UserOrderRepository;
import com.indiduck.panda.Repository.UserRepository;
import com.indiduck.panda.Service.UserOrderService;
import com.indiduck.panda.domain.User;
import com.indiduck.panda.domain.UserOrder;
import com.indiduck.panda.domain.dao.TFMessageDto;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@CrossOrigin
@RequiredArgsConstructor

public class UserOrderController {
    @Autowired
    private final UserOrderService userOrderService;
    @Autowired
    private final UserOrderRepository userOrderRepository;
    @Autowired
    private final UserRepository userRepository;



    @RequestMapping(value = "/api/editstatus", method = RequestMethod.POST)
    public ResponseEntity<?> editStatus(@CurrentSecurityContext(expression = "authentication")
                                                Authentication authentication, @RequestBody ChangeAction changeAction) throws Exception {


        UserOrder userOrder = userOrderService.ChangeOrder(changeAction.userOrderId, changeAction.state, changeAction.courier, changeAction.waybill);
        if(userOrder.getOrderStatus().toString().equals(changeAction.state))
        {
            return ResponseEntity.ok(new TFMessageDto(true,"성공적으로 변경했습니다"));
            
        }
        return ResponseEntity.ok(new TFMessageDto(false,"취소할 수 없는주문입니다"));

    }

    @RequestMapping(value = "/api/shopdashboard", method = RequestMethod.POST)
    public ResponseEntity<?> shopDashBoard(@CurrentSecurityContext(expression = "authentication")
                                                Authentication authentication, @RequestBody ShopDashBoard shopDashBoard) throws Exception {

        LocalDateTime startDay= LocalDateTime.of(shopDashBoard.startYear,shopDashBoard.startMonth+1,shopDashBoard.startDay
                ,0,0,0,0);
        LocalDateTime endDay= LocalDateTime.of(shopDashBoard.endYear,shopDashBoard.endMonth+1,shopDashBoard.endDay
                ,23,59,59,999999999);
        try{
            String name = authentication.getName();
            Optional<User> byEmail = userRepository.findByEmail(name);
            Shop shop = byEmail.get().getShop()
        }catch (Exception e)
        {

        }

        return ResponseEntity.ok(new TFMessageDto(false,"취소할 수 없는주문입니다"));

    }

    @Data
    static class ChangeAction {
        //필수항목
        long userOrderId;
        String state;
        //발송중 항목에는 해당 항목을 넣어서 보낸다 없다면 ""을 담아서 보낸다
        String courier;
        String waybill;
    }

    private class ShopDashBoard {
        int startYear;
        int startMonth;
        int startDay;

        int endYear;
        int endMonth;
        int endDay;

        String status;
    }
}
