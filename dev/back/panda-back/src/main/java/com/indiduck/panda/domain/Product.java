package com.indiduck.panda.domain;

import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Stream;

/**
 * 상품 엔티티 설계
 */

@Entity
@Getter
public class Product {

    @Id
    @GeneratedValue
    private Long id;

    @OneToMany(mappedBy = "product")
    private List<File> images;

    private String productName;
    private int productPrice;

    @Lob @Basic(fetch = FetchType.EAGER)
    private String productDesc;
    private LocalDateTime productRegAt;
    private int productHits;

    @OneToMany(mappedBy = "product")
    private List<ProductOption> productOptions;

    @OneToMany(mappedBy = "products")
    private List<ProductCategory> categorys;

    @OneToMany(mappedBy = "products")
    private List<OrderDetail> orderDetails;

    @OneToMany(mappedBy = "product")
    private List<PandaToProduct> pandas;

    @ManyToOne(fetch = FetchType.LAZY)
    private Shop shop;
    //연관관계 메서드
    public void setShop(Shop shop){
        this.shop = shop;
        shop.getProducts().add(this);
    }

    public void setImage(List<File> file)
    {
        this.images=file;
        file.forEach(e -> e.setProduct(this));
    }
    public void setProductOptions(List<ProductOption> po)
    {
        this.productOptions=po;
        po.forEach(e -> e.setProduct(this));
    }
    //==생성==//
    public static Product newProDuct(Shop shop,List<File> Image,String productName,int productPrice,List<ProductOption> productOptions,String productDesc){
        Product pro = new Product();
        pro.setShop(shop);
        pro.setImage(Image);
        pro.productName=productName;
        pro.productPrice=productPrice;
        pro.setProductOptions(productOptions);
        pro.productDesc=productDesc;


        return pro;
    //==비즈니스==//

    }


    //==조회==//



}
