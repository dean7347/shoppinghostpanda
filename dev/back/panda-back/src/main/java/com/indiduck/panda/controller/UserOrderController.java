package com.indiduck.panda.controller;


import com.indiduck.panda.Repository.UserOrderRepository;
import com.indiduck.panda.Service.UserOrderService;
import com.indiduck.panda.domain.UserOrder;
import com.indiduck.panda.domain.dao.TFMessageDto;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequiredArgsConstructor

public class UserOrderController {
    @Autowired
    private final UserOrderService userOrderService;
    @Autowired
    private final UserOrderRepository userOrderRepository;



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

    @Data
    static class ChangeAction {
        //필수항목
        long userOrderId;
        String state;
        //발송중 항목에는 해당 항목을 넣어서 보낸다 없다면 ""을 담아서 보낸다
        String courier;
        String waybill;
    }
}
