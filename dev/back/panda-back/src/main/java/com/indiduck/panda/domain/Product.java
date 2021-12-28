package com.indiduck.panda.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.EqualsAndHashCode;
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
@EqualsAndHashCode(of = "id")
@Getter
public class Product {

    @Id
    @GeneratedValue
    private Long id;

    @OneToMany(mappedBy = "product",cascade = CascadeType.PERSIST)
    private List<File> images=new ArrayList<>();

    private String productName;
    private int productPrice;

    @Lob @Basic(fetch = FetchType.EAGER)
    private String productDesc;
    private LocalDateTime productRegAt;
    private LocalDateTime productEditAt;
    private LocalDateTime productDeleteAt;


    private int productHits;

    //전자상거래등에서의상품등의정보제공에관한고시
    private int type;
    @Lob
    private String lowvalue;


   @OneToMany(mappedBy = "product",cascade = CascadeType.PERSIST)
    private List<ProductOption> productOptions=new ArrayList<>();

    @OneToMany(mappedBy = "products")
    private List<ProductCategory> categorys=new ArrayList<>();

    @OneToMany(mappedBy = "products")
    private List<OrderDetail> orderDetails=new ArrayList<>();

    @OneToMany(mappedBy = "product")
    private List<PandaToProduct> pandas=new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    private Shop shop;
    //연관관계 메서드
    public void setName (String text){
        this.productName=text;
    }
    public void setDesc(String text)
    {
        this.productDesc=text;
    }
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
    public static Product newProDuct(String name, String desc,int type,String lowvalue){
        Product pro = new Product();
        pro.productName=name;
        pro.productDesc=desc;
        pro.type=type;
        pro.lowvalue=lowvalue;
        pro.productRegAt=LocalDateTime.now();


        return pro;
    }
    //==비즈니스==//
    public void delFile(File file)
    {
        images.remove(file);
    }





    //==조회==//



}
