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
}
