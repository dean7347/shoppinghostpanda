package com.indiduck.panda.Service;


import com.indiduck.panda.Repository.OrderDetailRepository;
import com.indiduck.panda.Repository.RefundRequestRepository;
import com.indiduck.panda.Repository.UserOrderRepository;
import com.indiduck.panda.controller.RefundRequestController;
import com.indiduck.panda.domain.OrderDetail;
import com.indiduck.panda.domain.RefundRequest;
import com.indiduck.panda.domain.UserOrder;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class RefundRequestService {
    @Autowired
    private final RefundRequestRepository refundRequestRepository;
    @Autowired
    private final OrderDetailRepository orderDetailRepository;
    @Autowired
    private final UserOrderRepository userOrderRepository;

    public RefundRequest newRefundRequest(UserOrder uo, List<OrderDetail> orderDetails,String message){
        System.out.println("orderDetails서비스꺼 = " + orderDetails);
        RefundRequest rr = RefundRequest.newRefundRequest(uo, message);
        for (OrderDetail orderDetail : orderDetails) {
            rr.addOrderDetail(orderDetail);
        }
        uo.setRefund(rr);
        refundRequestRepository.save(rr);


        return rr;
    }

    public boolean confrimRefund(RefundRequestController.ConfirmRefundRequest confirmRefundRequest){
        List<RefundRequestController.RefundArray> refundArray = confirmRefundRequest.getRefundArray();
        for (RefundRequestController.RefundArray array : refundArray) {
            long key = array.getKey();
            Optional<OrderDetail> byId = orderDetailRepository.findById(key);
            byId.get().confrimRefund(array.getRefundConfrimOrder());
        }

        long refundMoney = confirmRefundRequest.getRefundMoney();
        long userOrderId = confirmRefundRequest.getUserOrderId();
        Optional<UserOrder> byId = userOrderRepository.findById(userOrderId);
        UserOrder userOrder = byId.get();
        userOrder.getRefundRequests().setRefundMoney(refundMoney);
        userOrder.confirmRefundMoney(refundMoney);
        List<OrderDetail> detail = userOrder.getDetail();
        for (OrderDetail orderDetail : detail) {
            orderDetail.refundCount();
        }


        return true;
    }
}
