package com.indiduck.panda.domain;

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

}
