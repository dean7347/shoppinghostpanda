package com.indiduck.panda.Service;


import com.indiduck.panda.Repository.OrderDetailRepository;
import com.indiduck.panda.Repository.RefundRequestRepository;
import com.indiduck.panda.Repository.UserOrderRepository;
import com.indiduck.panda.config.ApiKey;
import com.indiduck.panda.controller.RefundRequestController;
import com.indiduck.panda.domain.*;
import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.request.CancelData;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.math.BigDecimal;
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
    @Autowired
    private ApiKey apiKey;

    public RefundRequest newRefundRequest(UserOrder uo, List<OrderDetail> orderDetails, String message, User user){
        System.out.println("orderDetails서비스꺼 = " + orderDetails);
        RefundRequest rr = RefundRequest.newRefundRequest(uo, message,user);
        for (OrderDetail orderDetail : orderDetails) {
            rr.addOrderDetail(orderDetail);
        }
        uo.setRefund(rr);
        refundRequestRepository.save(rr);


        return rr;
    }


    //판매자캔슬
    public boolean allCancelForSeller(String mind,UserOrder userOrder)
    {
        String test_api_key = apiKey.getRESTAPIKEY();
        String test_api_secret = apiKey.getRESTAPISECRET();
        IamportClient iamportClient = new IamportClient(test_api_key, test_api_secret);
        CancelData cancel_data = new CancelData(mind, true); //imp_uid를 통한 전액취소

        try {
            IamportResponse<Payment> payment_response = iamportClient.cancelPaymentByImpUid(cancel_data);
            String receiptUrl = payment_response.getResponse().getReceiptUrl();
            userOrder.setReceiptUrl(receiptUrl);

        } catch (IamportResponseException e) {
            System.out.println(e.getMessage());
            switch(e.getHttpStatusCode()) {
                case 401 :
                    //TODO
                    System.out.println("e = " + e);
                    return false;
                case 500 :
                    //TODO
                    System.out.println("e = " + e);
                    return false;

            }
            return false;
        } catch (IOException e) {
            // TODO Auto-generated catch block

            e.printStackTrace();
            return false;

        } catch ( Exception e)
        {
            return  false;
        }
        return true;
    }
    //환불로인한 캔슬
    public boolean allCancel(String mind,UserOrder userOrder)
    {
        String test_api_key = apiKey.getRESTAPIKEY();
        String test_api_secret = apiKey.getRESTAPISECRET();
        IamportClient iamportClient = new IamportClient(test_api_key, test_api_secret);
        CancelData cancel_data = new CancelData(mind, true); //imp_uid를 통한 전액취소

        try {
            userOrder.getRefundRequests().setOrderStatus(OrderStatus.환불완료);
            IamportResponse<Payment> payment_response = iamportClient.cancelPaymentByImpUid(cancel_data);
            String receiptUrl = payment_response.getResponse().getReceiptUrl();
            userOrder.setReceiptUrl(receiptUrl);

        } catch (IamportResponseException e) {
            System.out.println(e.getMessage());

            switch(e.getHttpStatusCode()) {
                case 401 :
                    //TODO
                    System.out.println("e = " + e);
                    return false;
                case 500 :
                    //TODO
                    System.out.println("e = " + e);

                    return false;

            }
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return false;

        }
        return true;
    }

    public boolean confrimRefund(RefundRequestController.ConfirmRefundRequest confirmRefundRequest){
        List<RefundRequestController.RefundArray> refundArray = confirmRefundRequest.getRefundArray();
        String test_api_key = apiKey.getRESTAPIKEY();
        String test_api_secret = apiKey.getRESTAPISECRET();
        IamportClient iamportClient = new IamportClient(test_api_key, test_api_secret);

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

        //환불
        String test_already_cancelled_imp_uid = byId.get().getMid();
        CancelData cancel_data = new CancelData(test_already_cancelled_imp_uid, true, BigDecimal.valueOf(refundMoney)); //imp_uid를 통한 500원 부분취소
        try {
            IamportResponse<Payment> payment_response = iamportClient.cancelPaymentByImpUid(cancel_data);

            Payment response = payment_response.getResponse();// 이미 취소된 거래는 response가 null이다
            userOrder.setReceiptUrl(response.getReceiptUrl());
            System.out.println(payment_response.getMessage());
            System.out.println("response = " + response);
            if(response==null)
            {
                return false;

            }
        } catch (IamportResponseException e) {
            System.out.println(e.getMessage());

            switch(e.getHttpStatusCode()) {
                case 401 :
                    //TODO
                    break;
                case 500 :
                    //TODO
                    break;
            }
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }



        return true;
    }
}
