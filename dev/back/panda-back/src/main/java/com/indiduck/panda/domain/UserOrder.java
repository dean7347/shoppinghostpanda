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

    //판매일자
    private LocalDateTime createdAt;
    private LocalDateTime checkedAt;
    //배송일자 + 10일뒤에 구매확정
    private LocalDateTime shippedAt;
    private LocalDateTime refundAt;
    private LocalDateTime arriveAt;
    //구매확정일자
    private LocalDateTime finishAt;
    //입금예정일
    private LocalDateTime expectCalculate;
    //입금 완료일
    private LocalDateTime depositCompleted;

    private String mid;

    private String reveiverName;
    private String receiverPhone;
    private String receiverZipCode;
    private String receiverAddress;
    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;
    
    @OneToMany(mappedBy = "userOrder")
    private List<OrderDetail> detail= new ArrayList<>();


    //택배 송장 등록시 작성되는칼럼
    //택배사
    private String courierCom;
    //운송장 번호
    private String waybillNumber;
    //배송메모
    private String memo;
    //결제정보 저장을 위한칼람
    //uid가 중복되서 저장될 수 있으므로 주의할것
    //특히 전체 취소시 결제 금액만을 취소해줘야 한다
    // mid와 겹치는 칼럼 일단 공백
    private String uid;
    //영수증 주소
    private String receiptUrl;

    //샵이 가져갈 돈
    int shopMoney=0;

    //쇼핑호스트 판다가 가져갈 돈
    int hostMoney=0;

    //이 주문에서 판다에게 지급된 돈
    int pandaMoney=0;

    //버림했기때문에 남은돈이 발생한다
    int balance=0;
    //지급 상태
    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;
    


    //==생성메서드==//
    public static UserOrder newUserOrder(User user,Shop shop,String mid,
                                         String name,String phoneNumber,String zipCode,String Address,String receipt,String memo)
    {
        System.out.println("생성메서드 네임"+name);
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
        uo.orderStatus=OrderStatus.결제완료;
        uo.receiptUrl=receipt;
        uo.memo=memo;
        //TODO 아래에서 디테일이 변경되어도 재계산 작업을 해주어야 한다
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
           this.amount+=Math.round(orderDetail.getTotalPrice()*0.95);
           this.PureAmount+=orderDetail.getTotalPrice();

       }
       else
       {
           this.amount+=orderDetail.getTotalPrice();
           this.PureAmount+=orderDetail.getTotalPrice();
       }

    }

    //==비지니스 메서드 ==//

    //정산메서드. 오더 디테일이 바뀌면 실행해주자
    //구매확정시 -> 주문취소가 아닌것들 가격 계산해서
    // 상품가격75%+택배비를 샵머니에 넣고
    // 호스트 머니에는 상품가격의 25%에서 판다가격을 뺀 가격을 넣는다

    public void settle()
    {
        int pandamoney = 0;
        for (OrderDetail orderDetail : detail) {
            if(orderDetail.getOrderStatus()!=OrderStatus.주문취소)
            pandamoney+=orderDetail.getPandaMoney();
        }
        this.hostMoney=(int) Math.floor(this.amount*0.25)-pandamoney;
        this.shopMoney =(int) Math.floor(this.amount*0.75);
        this.pandaMoney=(int) Math.floor(pandamoney);
        if(this.PureAmount <this.freeprice)
        {
            this.shopMoney+=this.shipPrice;
        }
        this.balance=this.fullprice -hostMoney-shopMoney-pandaMoney;

    }

    //택배비를 포함한 최종금액을 리턴한다
    public long finalPrice()
    {
        long fp=0;
        if(this.freeprice>=this.PureAmount)
        {
            fp=this.PureAmount;
        }else
        {
            fp=this.PureAmount+this.shipPrice;
        }
        return fp;
    }
    public void batchConfirm(LocalDateTime ldt)
    {
        this.orderStatus=OrderStatus.구매확정;
        this.finishAt=ldt;
        System.out.println(" = 스테이터스 변경시도" );
    }

    public void batchTest(LocalDateTime ldt)
    {
        this.arriveAt=ldt;
    }

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
    public void changeStatuspaymentfinishtoready(){
        if(this.orderStatus==OrderStatus.결제완료)
        {
            this.orderStatus=OrderStatus.준비중;
//           this.detail
            for (OrderDetail orderDetail : this.detail) {
                orderDetail.setOrderready(OrderStatus.준비중);
            }
        }

    }
    //스테이터스의 변경과 작업
    //주문취소
    public void cancelOrder()
    {
        for (OrderDetail orderDetail : detail) {
            orderDetail.setOrderStatus(OrderStatus.주문취소);
        }
        this.orderStatus=OrderStatus.주문취소;
        //TODO: 환불로직
    }
    //결제완료 -> 준비중
    public void readyOrder()
    {
        for (OrderDetail orderDetail : detail) {
            if(orderDetail.getOrderStatus()!=OrderStatus.주문취소)
            {
                orderDetail.setOrderStatus(OrderStatus.준비중);
                orderDetail.setPaymentM(PaymentStatus.지급예정);
            }
        }
        this.checkedAt=LocalDateTime.now();
        this.orderStatus= OrderStatus.준비중;
        this.paymentStatus=PaymentStatus.지급예정;
        this.settle();
    }
    //준비중 -> 발송중
    public void sendOutOrder(String com,String num)
    {
        for (OrderDetail orderDetail : detail) {
            if(orderDetail.getOrderStatus()!=OrderStatus.주문취소)
            {
                orderDetail.setOrderStatus(OrderStatus.발송중);
            }
        }
        this.orderStatus= OrderStatus.발송중;
        this.courierCom=com;
        this.waybillNumber=num;
        this.shippedAt=LocalDateTime.now();
    }
    // xxx -> 구매확정
    public void confirmOrder()
    {
        for (OrderDetail orderDetail : detail) {
            if(orderDetail.getOrderStatus()!=OrderStatus.주문취소)
            {
                orderDetail.setOrderStatus(OrderStatus.구매확정);
                orderDetail.setPaymentM(PaymentStatus.지급대기);

            }
        }
        this.finishAt=LocalDateTime.now();
        this.paymentStatus=PaymentStatus.지급대기;
        this.settle();
        this.orderStatus= OrderStatus.구매확정;
    }
    // xxx -> 결제취소 ?

//    // xxx -> 환불신청 개별환불과 전체환불 구분할것것
//   public void refundOrder()
//    {
//        for (OrderDetail orderDetail : detail) {
//            if(orderDetail.getOrderStatus()!=OrderStatus.주문취소)
//            {
//                orderDetail.setOrderStatus(OrderStatus.구매확정);
//            }
//        }
//        this.orderStatus= OrderStatus.구매확정;
//    }


//    @ManyToOne(fetch = FetchType.LAZY)
//    private OrderDetail orderDetails;
}
