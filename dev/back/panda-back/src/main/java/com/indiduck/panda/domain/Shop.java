package com.indiduck.panda.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter @Setter
public class Shop {

    @Id
    @GeneratedValue
    private Long id;
    //shopName
    private String shopName;
    //representative
    private String representative;
    //crn
    private String CRN;

    //telnum
    private String number;

    //freepee
    private int freePrice;

    //nofree
    private int nofree;
    //priPhone
    private String priPhone;
 //csPhone
    private String csPhone;

    //csTime
    @Lob
    private String csTime;

    //toPanda
    @Lob
    private String toPanda;

    //reship
    private String reship;

    //returnpee
    private String returnpee;

    //tradepee
    private String tradepee;

    //returnaddress
    private String returnaddress;

    //candate
    private String candate;

    //noreturn
    private String noreturn;

    //Termsagree
    private boolean Termsagree;

    //Infoagree
    private boolean Infoagree;

    //승인받았는지에 대한 내역
    private boolean isApprove;




    //예상된 획득 수수료
    int expectedFees;
    //정산 가능 수수료
    int possibleFees;


    @OneToMany(mappedBy = "shop")
    private List<Product> products;

    @OneToMany(mappedBy = "shop")
    private List<OrderDetail> details;

    @OneToMany(mappedBy = "shop")
    private List<UserOrder> userOrders;

    @OneToOne(optional = true,mappedBy = "shop")
    private User user;

    //== 연관관계메서드 ==//
    public void setUser(User user){
        this.user = user;
        user.setShop(this);
    }

    //==생성메서드 ==//
    public static Shop createShop(String shopName,String CRN,int freePrice
    ,String address,String number,User user){
        Shop shop = new Shop();
        shop.setShopName(shopName);
        shop.setCRN(CRN);
        shop.setFreePrice(freePrice);
        shop.setAddress(address);
        shop.setNumber(number);
        shop.setApprove(false);
        shop.setUser(user);

        return shop;
    }

    //==비즈니스 로직==//


}
