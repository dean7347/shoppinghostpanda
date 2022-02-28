package com.indiduck.panda.domain;


import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class RefundRequest {

    @Id
    @GeneratedValue
    private Long id;

    @Lob
    private String refundMessage;

    @OneToMany(mappedBy = "refundRequest")
    private List<OrderDetail> orderDetails=new ArrayList<>();

    @OneToOne(mappedBy = "refundRequests")
    private UserOrder userOrder;

    @ManyToOne(fetch = FetchType.LAZY)
    private Shop shop;


    //생성일(환불신청일)
    private LocalDateTime createdAt;

    //판매자가 확인한날
    private LocalDateTime checkedAt;
    //환불 완료된날
    private LocalDateTime finishAt;
    //최종환불된 금액
    private long refundMoney;


    //==생성메서드==//
    public static RefundRequest newRefundRequest(UserOrder userOrder,String message){
        RefundRequest rr = new RefundRequest();
        rr.createdAt=LocalDateTime.now();
        rr.userOrder=userOrder;
        rr.refundMessage=message;
        rr.shop=userOrder.getShop();
        rr.refundMoney=0;

        return rr;





    }
    //비즈니스 메서드
    public void addOrderDetail(OrderDetail orderDetail)
    {
        this.orderDetails.add(orderDetail);
        orderDetail.setRefundRequest(this);
    }
    public void setOrderStatus(OrderStatus os)
    {
        for (OrderDetail orderDetail : orderDetails) {
            orderDetail.setOrderStatus(os);
        }
    }
    public void setRefundMoney(long money)
    {
        this.refundMoney=money;
    }








}
