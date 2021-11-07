package com.indiduck.panda.domain;

import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class UserOrder {
    @Id
    @GeneratedValue
    private long id;

    private long orderDetailId;

    //주문자
    @ManyToOne(fetch = FetchType.LAZY)
    private User userId;
    //상점
    @ManyToOne(fetch = FetchType.LAZY)
    private Shop shop;

    //택배비가 포함된 금액을 말합니다
    int fullprice=0;

    //택배비가 포함되지 않은 판다할인 적용 결제금액을 말합니다.
    int amount=0;
    //판다금액과 택배비가 없는 가격
    int PureAmount =0;
    //무료배송 금액(이상 무료)
    int freeprice=0;
    //택배비
    int shipPrice=0;


    private LocalDateTime createdAt;
    private LocalDateTime checkedAt;
    private LocalDateTime shippedAt;
    private LocalDateTime refundAt;
    private LocalDateTime arriveAt;
    private LocalDateTime finishAt;

    private String mid;

    private String reveiverName;
    private String receiverPhone;
    private String receiverZipCode;
    private String receiverAddress;
    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;
    
    @OneToMany(mappedBy = "userOrder")
    private List<OrderDetail> detail= new ArrayList<>();
    


    //==생성메서드==//
    public static UserOrder newUserOrder(User user,Shop shop,String mid,
                                         String name,String phoneNumber,String zipCode,String Address)
    {
        UserOrder uo = new UserOrder();
        uo.setUser(user);
        uo.setShop(shop);
        uo.freeprice=shop.getFreePrice();
        uo.shipPrice=shop.getNofree();
        uo.createdAt=LocalDateTime.now();
        uo.mid=mid;
        uo.reveiverName=name;
        uo.receiverPhone=phoneNumber;
        uo.receiverZipCode=zipCode;
        uo.receiverAddress=Address;

        return  uo;
    }

    //==연관관계 메서드 ==//
    public void setUser(User user)
    {
        this.userId=user;
        user.getUserOrders().add(this);
    }
    public void setShop(Shop shop)
    {
        this.shop=shop;
        shop.getUserOrders().add(this);
    }
    public void setDetail(OrderDetail orderDetail)
    {
        this.detail.add(orderDetail);
       orderDetail.setUserOrder(this);
       if(orderDetail.getPanda()!=null)
       {
           this.amount+=orderDetail.getTotalPrice()*0.95;
           this.PureAmount+=orderDetail.getTotalPrice();

       }
       else
       {
           this.amount+=orderDetail.getTotalPrice();
           this.PureAmount+=orderDetail.getTotalPrice();
       }

    }

    //==비지니스 메서드 ==//
    public void Calculate()
    {
        if(this.PureAmount >=this.freeprice)
        {
            this.fullprice=this.amount;
        }else
        {
            this.fullprice=this.amount+this.shipPrice;

        }

    }

//    @ManyToOne(fetch = FetchType.LAZY)
//    private OrderDetail orderDetails;
}
