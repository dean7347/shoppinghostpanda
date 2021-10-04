package com.indiduck.panda.domain;

import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
@Getter
public class PandaToProduct {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    private Panda panda;

    @ManyToOne
    private Product product;

    private String link;
}
