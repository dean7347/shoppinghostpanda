package com.indiduck.panda.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
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
    private List<File> images=new ArrayList<>();

    private String productName;
    private int productPrice;

    @Lob @Basic(fetch = FetchType.EAGER)
    private String productDesc;
    private LocalDateTime productRegAt;
    private int productHits;

    @OneToMany(mappedBy = "product")
    @JsonManagedReference
    private List<ProductOption> productOptions=new ArrayList<>();

    @OneToMany(mappedBy = "products")
    @JsonManagedReference
    private List<ProductCategory> categorys=new ArrayList<>();

    @OneToMany(mappedBy = "products")
    @JsonManagedReference
    private List<OrderDetail> orderDetails=new ArrayList<>();

    @OneToMany(mappedBy = "product")
    @JsonManagedReference
    private List<PandaToProduct> pandas=new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    private Shop shop;
    //연관관계 메서드
    public void setShop(Shop shop){
        this.shop = shop;
        shop.getProducts().add(this);
    }

    public void setProductOptions(ProductOption po)
    {
        this.productOptions.add(po);
        po.setProduct(this);
    }

    public void setImage(File file)
    {
        this.images.add(file);
        file.setProduct(this);

    }

    public void setThumbImage(File file)
    {
        this.images.add(file);
        file.setProduct(this);
        file.setIsthumb(true);

    }
    //==생성==//
    public static Product newProDuct(String name, String desc){
        Product pro = new Product();
        pro.productName=name;
        pro.productDesc=desc;


        return pro;
    }
    //==비즈니스==//





    //==조회==//



}
