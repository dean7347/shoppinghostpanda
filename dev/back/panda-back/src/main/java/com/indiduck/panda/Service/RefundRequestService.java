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

    public RefundRequest newRefundRequest(UserOrder uo, List<OrderDetail> orderDetails, String message, User user) {
        System.out.println("orderDetails서비스꺼 = " + orderDetails);
        RefundRequest rr = RefundRequest.newRefundRequest(uo, message, user);

        refundRequestRepository.save(rr);
        uo.setRefund(rr);


        return rr;
    }


    //판매자캔슬
    public boolean allCancelForSeller(String mind, UserOrder userOrder) {
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
            switch (e.getHttpStatusCode()) {
                case 401:
                    //TODO
                    System.out.println("e = " + e);
                    return false;
                case 500:
                    //TODO
                    System.out.println("e = " + e);
                    return false;

            }
            return false;
        } catch (IOException e) {
            // TODO Auto-generated catch block

            e.printStackTrace();
            return false;

        } catch (Exception e) {
            return false;
        }
        return true;
    }

    //환불로인한 캔슬
    public boolean allCancel(String mind, UserOrder userOrder) {
//        String test_api_key = apiKey.getRESTAPIKEY();
//        String test_api_secret = apiKey.getRESTAPISECRET();
//        IamportClient iamportClient = new IamportClient(test_api_key, test_api_secret);
//        CancelData cancel_data = new CancelData(mind, true); //imp_uid를 통한 전액취소
//
//        try {
//            userOrder.getRefundRequest().setOrderStatus(OrderStatus.환불완료);
//            IamportResponse<Payment> payment_response = iamportClient.cancelPaymentByImpUid(cancel_data);
//            String receiptUrl = payment_response.getResponse().getReceiptUrl();
//            userOrder.setReceiptUrl(receiptUrl);
//
//        } catch (IamportResponseException e) {
//            System.out.println(e.getMessage());
//
//            switch(e.getHttpStatusCode()) {
//                case 401 :
//                    //TODO
//                    System.out.println("e = " + e);
//                    return false;
//                case 500 :
//                    //TODO
//                    System.out.println("e = " + e);
//
//                    return false;
//
//            }
//        } catch (IOException e) {
//            // TODO Auto-generated catch block
//            e.printStackTrace();
//            return false;
//
//        }
        return true;
    }

    public boolean confirmTrade(RefundRequestController.ConfirmRefundRequest confirmRefundRequest)
    {
        long userOrderId = confirmRefundRequest.getUserOrderId();
        Optional<UserOrder> byId = userOrderRepository.findById(userOrderId);
        UserOrder userOrder = byId.get();

        List<RefundRequestController.RefundArray> refundArray = confirmRefundRequest.getRefundArray();
        for (RefundRequestController.RefundArray array : refundArray) {
            System.out.println("오디아이디array = " + array);
            Optional<OrderDetail> odid = orderDetailRepository.findById(array.getOdid());
            if(odid.get().getProductCount()-array.getRefundConfrimOrder() <0)
            {
                System.out.println("여기걸림");
                return false;
            }
            odid.get().tradeConfirm(array.getRefundConfrimOrder());
        }
        userOrder.confirmUserOrderTrade();
        RefundRequest refundRequest = refundRequestRepository.findById(confirmRefundRequest.getRefundId()).get();
        refundRequest.confrimTrade();
        return true;


    }

    public boolean confrimRefund(RefundRequestController.ConfirmRefundRequest confirmRefundRequest) {
        List<RefundRequestController.RefundArray> refundArray = confirmRefundRequest.getRefundArray();
        String test_api_key = apiKey.getRESTAPIKEY();
        String test_api_secret = apiKey.getRESTAPISECRET();
        IamportClient iamportClient = new IamportClient(test_api_key, test_api_secret);
//        System.out.println("confirmRefundRequest = " + confirmRefundRequest);

        long refundMoney = confirmRefundRequest.getRefundMoney();
        long userOrderId = confirmRefundRequest.getUserOrderId();
        Optional<UserOrder> byId = userOrderRepository.findById(userOrderId);
        UserOrder userOrder = byId.get();
        //가격검증
        long comMoney=0;
        for (RefundRequestController.RefundArray array : refundArray) {
            System.out.println("오디아이디array = " + array);
            Optional<OrderDetail> odid = orderDetailRepository.findById(array.getOdid());
            if(array.isIssale()==true)
            {
               comMoney+= Math.round(odid.get().getIndividualPrice()*0.95)*array.getRefundConfrimOrder();
            }else
            {
                comMoney+= Math.round(odid.get().getIndividualPrice())*array.getRefundConfrimOrder();

            }
        }
        System.out.println("comMoney = " + comMoney);
        if(refundMoney!=comMoney)
        {
            System.out.println("검증안된금액");
            return false;
        }

        //환불
        String test_already_cancelled_imp_uid = byId.get().getMid();
        CancelData cancel_data = new CancelData(test_already_cancelled_imp_uid, true, BigDecimal.valueOf(refundMoney)); //imp_uid를 통한 500원 부분취소


        try {
            IamportResponse<Payment> payment_response = iamportClient.cancelPaymentByImpUid(cancel_data);
            System.out.println("payment_response = " + payment_response.getResponse());
            Payment response = payment_response.getResponse();// 이미 취소된 거래는 response가 null이다
            System.out.println("페이먼트메시지" + payment_response.getMessage());
            if (response == null) {
                System.out.println("환불할 수 없는 상품입니다");
                System.out.println(" 유저오더 아이디 ");
//                환불로직

                return false;


            } else {
                userOrder.setReceiptUrl(response.getReceiptUrl());

            }
        } catch (IamportResponseException e) {
            System.out.println(e.getMessage());

            switch (e.getHttpStatusCode()) {
                case 401:
                    //TODO
                    break;
                case 500:
                    //TODO
                    break;
            }
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (Exception e) {

            System.out.println("환불요청 최종 실패 = " + e.getMessage());
            return false;
        }
        //유저오더에서 금액 빼고, 상태수정하기( 배송일까지)
        //FOR문돌면서 오더 디테일 정보 수정하기
        //

//        userOrder.getRefundRequest().setRefundMoney(refundMoney);
//        userOrder.confirmRefundMoney(refundMoney);
        for (RefundRequestController.RefundArray array : refundArray) {
            System.out.println("오디아이디array = " + array);
            Optional<OrderDetail> odid = orderDetailRepository.findById(array.getOdid());
            if(odid.get().getProductCount()-array.getRefundConfrimOrder() <=0)
            {
                return false;
            }
            odid.get().partialRefund(array.getRefundConfrimOrder());
        }
        userOrder.confirmRefundMoney(comMoney);
        RefundRequest refundRequest = refundRequestRepository.findById(confirmRefundRequest.getRefundId()).get();
        refundRequest.confirmRefund(comMoney);
        System.out.println(" 성공");
        return true;
    }
}
