package com.indiduck.panda.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class ProductOption {

    @Id @GeneratedValue
    private Long id;

    private String optionName;
    private int optionStock;
    private int optionPrice;

    @ManyToOne
    private Product product;

    @OneToMany(mappedBy = "options")
    private List<OrderDetail> orderDetail=new ArrayList<>();

    //생성메서드
    public ProductOption newProductOption(String name,int stock,int price){
        ProductOption newOption =new ProductOption();
        newOption.optionName=name;
        newOption.optionStock=stock;
        newOption.optionPrice=price;
        return newOption;
    }

}
