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
    private LocalDateTime createdAt;
    private LocalDateTime paymentAt;
    private LocalDateTime checkedAt;
    private LocalDateTime shippingAt;
    private LocalDateTime FinishedAt;



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
        return od;

    }
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
    public void setPanda(Panda panda)
    {
        this.panda=panda;
        panda.getOrderDetailPandas().add(this);
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

    //=비즈니스 매서드=//
    public void plusCount(int count)
    {
        this.productCount+=count;
        this.totalPrice=this.getIndividualPrice()*this.productCount;
    }
    public void setOrderStatus(OrderStatus status)
    {
        this.orderStatus=status;
        this.paymentAt=LocalDateTime.now();
    }
}
