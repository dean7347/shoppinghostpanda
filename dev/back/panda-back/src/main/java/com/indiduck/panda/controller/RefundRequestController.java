package com.indiduck.panda.controller;


import com.indiduck.panda.Repository.UserOrderRepository;
import com.indiduck.panda.Service.RefundRequestService;
import com.indiduck.panda.domain.OrderDetail;
import com.indiduck.panda.domain.Panda;
import com.indiduck.panda.domain.RefundRequest;
import com.indiduck.panda.domain.UserOrder;
import com.indiduck.panda.domain.dao.TFMessageDto;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequiredArgsConstructor
public class RefundRequestController {

    @Autowired
    private final UserOrderRepository userOrderRepository;
    @Autowired
    private final RefundRequestService refundRequestService;

    @RequestMapping(value = "/api/readRefundRequest", method = RequestMethod.POST)
    public ResponseEntity<?> readRefundRequest(@CurrentSecurityContext(expression = "authentication")
                                                Authentication authentication, @RequestBody UserOrderId userOrderId) throws Exception {
        System.out.println("userOrderId = " + userOrderId);
        Optional<UserOrder> byId = userOrderRepository.findById(userOrderId.uoid);
        System.out.println("byId = " + byId);
        RefundRequest refundRequests=null;
        if(byId.get().getRefundRequest() !=null)
        {
            refundRequests=byId.get().getRefundRequest();
            return ResponseEntity.ok(new RefundDTO(true,refundRequests.getRefundMessage(),byId.get().getRefundRequest().getId()
                    ,byId.get(),refundRequests));
        }
        return null;




    }


    @RequestMapping(value = "/api/confirmRefundRequest", method = RequestMethod.POST)
    public ResponseEntity<?> confirmRefundRequest(@CurrentSecurityContext(expression = "authentication")
                                                       Authentication authentication, @RequestBody ConfirmRefundRequest confirmRefundRequest) throws Exception {
        System.out.println("confirmRefundRequest = " + confirmRefundRequest);

        boolean b = refundRequestService.confrimRefund(confirmRefundRequest);

        if(b)
        {
            return ResponseEntity.ok(new TFMessageDto(true,"성공"));

        }
        return ResponseEntity.ok(new TFMessageDto(false,"요청에 실패했습니다 해당 현상이 계속될경우 문의해주세요"));
    }

    @RequestMapping(value = "/api/refundlist", method = RequestMethod.POST)
    public ResponseEntity<?> refundList(@CurrentSecurityContext(expression = "authentication")
                                                          Authentication authentication, @RequestBody ConfirmRefundRequest confirmRefundRequest) throws Exception {
        System.out.println("confirmRefundRequest = " + confirmRefundRequest);

        boolean b = refundRequestService.confrimRefund(confirmRefundRequest);


        if(b)
        {

            return ResponseEntity.ok(new TFMessageDto(true,"성공"));

        }
        return ResponseEntity.ok(new TFMessageDto(false,"요청에 실패했습니다 해당 현상이 계속될경우 문의해주세요"));

    }

    @Data
    private static class UserOrderId {
        long uoid;
    }

    @Data
    private static class RefundDTO
    {
        boolean success;
        long requestId;
        long userOrderId;
        String refundMessage;
        //결제한 전체금액
        long allPrice;
        //배송비
        int shipPrice;
        //배송비를 제외한 상품 금액
        long allPriceMinusShipPrice;
        //이 주문에서 전체 환불한 금액?
        long allRefundMoney;

        //환불 리스트
        List<RefundList> refundListList=new ArrayList<>();

        public RefundDTO(boolean su,String mes,long requestId, UserOrder uo,RefundRequest refundRequest) {
            this.success=su;
            this.refundMessage=mes;
            this.requestId = requestId;
            this.userOrderId = uo.getId();
            this.allPrice = uo.finalPrice();
            this.shipPrice = uo.getShipPrice();
            this.allRefundMoney=uo.getFinalRefundMoney();
            this.allPriceMinusShipPrice = uo.getAmount();
            System.out.println("refundRequest.getOrderDetails() = " + refundRequest.getOrderDetails());
            for (OrderDetail orderDetail : refundRequest.getOrderDetails()) {
                this.refundListList.add(new RefundList(orderDetail.getId(),orderDetail.getProducts().getProductName(),
                        orderDetail.getProductCount(),orderDetail.getReqRefund(),orderDetail.getPanda(),
                        orderDetail.getTotalPrice(),orderDetail.getIndividualPrice(),orderDetail.getOptions().getOptionName(),refundRequest.getRefundMoney(),orderDetail.getConfirmRefund()));
            }

        }
    }

    @Data
    private static class RefundList {
        long orderDetailId;
        String productName;
        //주문갯수
        String optionName;
        int orderCount;
        //환불신청갯수
        int refundCount;
        //환불신청된액수
        long refundMoney;
        //환불 완료된 갯수
        int compleCount;

        //판다여부
        boolean isPanda;
        //이 옵션의 총가격
        long optionAllPrice;
        //이 옵션의 개별가격
        long optionIndividualPrice;

        public RefundList(long orderDetailId, String productName, int orderCount,
                          int refundCount, Panda isPanda, long optionAllPrice, long optionIndividualPrice,String optionName,long refundMoney,int com) {
            this.orderDetailId = orderDetailId;
            this.productName = productName;
            this.optionName=optionName;
            this.orderCount = orderCount;
            this.refundCount = refundCount;
            if(isPanda!=null)
            {
                this.isPanda = true;
            }else{
                this.isPanda=false;
            }
            this.compleCount=com;
            this.optionAllPrice = optionAllPrice;
            this.optionIndividualPrice = optionIndividualPrice;
            this.refundMoney=refundMoney;
        }
    }

    @Data
    public static class ConfirmRefundRequest {
        long userOrderId;
        long refundMoney;
        List<RefundArray> refundArray;

    }

    @Data
    public static class RefundArray {
        long expectMoney;
        long idx;
        long individualPrice;
        boolean issale;
        long key;
        long odid;
        int originOrder;
        int refundConfrimOrder;
        int refundOrder;

    }
}
