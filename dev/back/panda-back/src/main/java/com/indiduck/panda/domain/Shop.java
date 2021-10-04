package com.indiduck.panda.domain;

import lombok.Getter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
public class Shop {

    @Id
    @GeneratedValue
    private Long id;

    private String ShopName;
    //사업자 등록번호
    private String CRN;

    private int freePrice;
    //택배사
    private String courier;

    private String address;

    @OneToMany(mappedBy = "shop")
    private List<Product> products;

    @OneToOne(mappedBy = "shop")
    private User user;


}
