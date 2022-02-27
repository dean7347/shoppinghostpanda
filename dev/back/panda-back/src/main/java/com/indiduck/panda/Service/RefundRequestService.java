package com.indiduck.panda.Service;


import com.indiduck.panda.Repository.RefundRequestRepository;
import com.indiduck.panda.domain.OrderDetail;
import com.indiduck.panda.domain.RefundRequest;
import com.indiduck.panda.domain.UserOrder;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class RefundRequestService {
    @Autowired
    private final RefundRequestRepository refundRequestRepository;

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
}
