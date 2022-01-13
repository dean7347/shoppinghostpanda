package com.indiduck.panda.domain;


import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class OrderDetail {

    @Id
    @GeneratedValue
    private long id;

    private int  productCount;
    private int IndividualPrice;
    private int totalPrice;
    private LocalDateTime paymentAt;
    private LocalDateTime createdAt;
    private LocalDateTime checkedAt;
    private LocalDateTime shippingAt;
    private LocalDateTime finishedAt;



    @ManyToOne(fetch = FetchType.LAZY)
    private UserOrder userOrder;

    @ManyToOne(fetch = FetchType.LAZY)
    private Product products;

//    @ManyToOne(fetch = FetchType.LAZY)
//    private UserOrder userOrder;
    @ManyToOne(fetch = FetchType.LAZY)
    private ProductOption options;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    private Panda panda;

    @ManyToOne(fetch = FetchType.LAZY)
    private Shop shop;

    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;
    //지급된 날자
    private LocalDateTime paidAt;


    //12%
    private int pandaMoney=0;


    //==생성메서드==//
    public static OrderDetail newOrderDetail(User user,Product product, ProductOption productOption,int optionCount,Panda panda){
        OrderDetail od = new OrderDetail();
        od.setUser(user);
        od.setProduct(product);
        od.setProductOption(productOption);
        od.IndividualPrice=productOption.getOptionPrice();
        od.totalPrice=productOption.getOptionPrice()*optionCount;
        od.productCount=optionCount;
        od.setPanda(panda);
        od.orderStatus = OrderStatus.결제대기;
        od.createdAt=LocalDateTime.now();
        od.setShop(product.getShop());
        od.paymentStatus=PaymentStatus.지급대기;
        int mo = (int) Math.floor(od.totalPrice*0.95);
        od.pandaMoney= (int) Math.floor(mo*0.12);
        return od;

    }
    //판다가 없을때
    public static OrderDetail newOrderDetail(User user,Product product, ProductOption productOption,int optionCount){
        OrderDetail od = new OrderDetail();
        od.setUser(user);
        od.setProduct(product);
        od.setProductOption(productOption);
        od.IndividualPrice=productOption.getOptionPrice();
        od.totalPrice=productOption.getOptionPrice()*optionCount;
        od.productCount=optionCount;
        od.orderStatus = OrderStatus.결제대기;
        od.createdAt=LocalDateTime.now();
        od.setShop(product.getShop());
        od.pandaMoney=0;

        return od;

    }
    //==연관관계매서드==//
    private void setUser(User user)
    {
        this.user=user;
        user.getOrders().add(this);

    }
    private void setProduct(Product product)
    {
        this.products=product;
        product.getOrderDetails().add(this);
    }
    private void setProductOption(ProductOption productOption)
    {
        this.options=productOption;
        productOption.getOrderDetail().add(this);

    }

    public void deletePanda(Panda panda)
    {
        panda.deleteOrderdetail(this);

    }
    
    //판다수정
    public void setPanda(Panda panda)
    {
        if(panda!=null)
        {
            panda.deleteOrderdetail(this);
        }

        this.panda=panda;
        panda.getOrderDetailPandas().add(this);
        int mo = (int) Math.floor(this.totalPrice*0.95);
        this.pandaMoney= (int) Math.floor(mo*0.12);
    }
    public void setShop(Shop shop)
    {
        this.shop=shop;
        shop.getDetails().add(this);
    }
    public void setUserOrder(UserOrder userOrder)
    {
        this.userOrder=userOrder;
        this.orderStatus=OrderStatus.결제완료;
        this.paymentAt=LocalDateTime.now();
    }
    public void setPaymentM(PaymentStatus paymentStatus)
    {
        this.paymentStatus=paymentStatus;
    }

    //=비즈니스 매서드=//
    //숫자변경
    public void plusCount(int count)
    {
        this.productCount+=count;
        this.totalPrice=this.getIndividualPrice()*this.productCount;
        if(panda!=null)
        {
            int mo = (int) Math.floor(this.totalPrice*0.95);
            this.pandaMoney= (int) Math.floor(mo*0.12);
        }
    }

    //가격이 변경될경우
    public void update(int count)
    {
        this.productCount=count;
        this.totalPrice=this.getIndividualPrice()*this.productCount;
        if(panda!=null)
        {
            int mo = (int) Math.floor(this.totalPrice*0.95);
            this.pandaMoney= (int) Math.floor(mo*0.12);
        }


    }
    public void setOrderStatus(OrderStatus status)
    {
        //주문취소//준비중//발송중//구매확정
        this.orderStatus=status;
        if(status==OrderStatus.주문취소)
        {

        }
        if(status==OrderStatus.준비중)
        {
            this.checkedAt=LocalDateTime.now();

        }
        if(status==OrderStatus.발송중)
        {
            this.shippingAt=LocalDateTime.now();
        }
        if(status==OrderStatus.구매확정)
        {
            this.finishedAt=LocalDateTime.now();
            if(this.orderStatus!=OrderStatus.주문취소) {
                this.paymentStatus = PaymentStatus.지급예정;
            }

        }
    }
    public void setOrderready(OrderStatus status)
    {
        this.orderStatus=status;
        this.checkedAt=LocalDateTime.now();
    }
    public void editOption()
    {
        this.IndividualPrice=this.getOptions().getOptionPrice();
        this.totalPrice=this.getIndividualPrice()*this.productCount;




    }
}
