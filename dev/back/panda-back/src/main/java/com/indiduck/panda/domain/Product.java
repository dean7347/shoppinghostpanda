package com.indiduck.panda.domain;

import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

/**
 * 상품 엔티티 설계
 */

@Entity
@Getter
public class Product {

    @Id
    @GeneratedValue
    private Long id;

    private String proudctName;
    private int productPrice;
    private int productStock;
    private String productDesc;
    private LocalDateTime productDate;
    private int productHits;

    @OneToMany(mappedBy = "products")
    private List<ProductCategory> categorys;

    @OneToMany(mappedBy = "products")
    private List<OrderDetail> orderDetails;

    @OneToMany(mappedBy = "product")
    private List<PandaToProduct> pandas;

    @ManyToOne(fetch = FetchType.LAZY)
    private Shop shop;



}
