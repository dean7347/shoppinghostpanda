package com.indiduck.panda.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter @Setter
public class Shop {

    @Id
    @GeneratedValue
    private Long id;

    private String shopName;
    //사업자 등록번호
    private String CRN;

    private int freePrice;
    //택배사
    private String courier;

    private String address;

    private String number;

    private boolean isApprove;

    @OneToMany(mappedBy = "shop")
    private List<Product> products;

    @OneToOne(mappedBy = "shop")
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
