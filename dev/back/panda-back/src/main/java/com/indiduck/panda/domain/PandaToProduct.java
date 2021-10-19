package com.indiduck.panda.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class PandaToProduct {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Panda panda;

    @ManyToOne(fetch = FetchType.LAZY)
    private Product product;

    private String link;

    //==생성메서드==//
    public static PandaToProduct newPandaToProduct(String link)
    {
        PandaToProduct ptp = new PandaToProduct();
        ptp.link=link;
        return ptp;
    }

    //연관관계메서드
    public void setPanda(Panda panda)
    {
        this.panda=panda;
        panda.getPandaToproducts().add(this);

    }

    public void setProduct(Product product)
    {
        this.product=product;
        product.getPandas().add(this);
    }

}


