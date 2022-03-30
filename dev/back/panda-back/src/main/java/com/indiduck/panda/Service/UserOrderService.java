package com.indiduck.panda.Service;

import com.indiduck.panda.Repository.ShopRepository;
import com.indiduck.panda.Repository.UserOrderRepository;
import com.indiduck.panda.Repository.UserRepository;
import com.indiduck.panda.controller.UserOrderController;
import com.indiduck.panda.domain.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserOrderService {


    @Autowired
    private ShopRepository shopRepository;
    @Autowired
    private UserOrderRepository userOrderRepository;
    @Autowired
    private final RefundRequestService refundRequestService;


    //구매자가 호출하는것
    public UserOrder cancelOrder(long userorderId) {
        Optional<UserOrder> byId = userOrderRepository.findById(userorderId);
        for (OrderDetail orderDetail : byId.get().getDetail()) {
            //주문을 취소할수 있는 상태는 결제완료상태일때만 가능하다
            if ((orderDetail.getOrderStatus() != OrderStatus.결제완료)) {
                return null;
            }
        }
        String mid = byId.get().getMid();
        boolean b = refundRequestService.allCancelForSeller(mid, byId.get());
        if (!b) {
            return null;
        }
        byId.get().cancelOrder();
        return byId.get();


    }

    //부분취소

    public boolean extendConfirm(long ui) {
        Optional<UserOrder> byId = userOrderRepository.findById(ui);
        return byId.get().extendConfirm();

    }


    //판매자의 호출스테이터스
    public UserOrder ChangeOrder(long id, String status, String cur, String wayb) {
        Optional<UserOrder> byId = userOrderRepository.findById(id);
        UserOrder userOrder = byId.get();
        switch (status) {
            case "준비중":
                if (userOrder.getOrderStatus() == OrderStatus.주문취소) {
                    return null;
                }
                userOrder.readyOrder();
                break;
            //cur = couriercom /waybillnumber
            case "발송중":
                userOrder.sendOutOrder(cur, wayb);

                break;
            case "구매확정":
                userOrder.confirmOrder();
                break;
            case "주문취소":
                boolean b = refundRequestService.allCancelForSeller(userOrder.getMid(), byId.get());
                if (b == false) {

                    return null;
                } else {
                    userOrder.cancelOrder();

                }
                break;
            case "환불신청":
                userOrder.refundOrder(cur);
                break;
            case "상점확인중":
                userOrder.checkRefund();
        }
        return userOrder;

    }


}
