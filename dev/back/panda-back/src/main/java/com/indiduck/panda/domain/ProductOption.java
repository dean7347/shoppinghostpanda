package com.indiduck.panda.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

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

    //생성메서드
    public ProductOption newProductOption(String name,int stock,int price){
        ProductOption newOption =new ProductOption();
        newOption.optionName=name;
        newOption.optionStock=stock;
        newOption.optionPrice=price;
        return newOption;
    }

}
