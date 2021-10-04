package com.indiduck.panda.domain;

import lombok.Getter;

import javax.persistence.*;
import java.util.List;

@Getter
@Entity
public class Panda {

    @Id
    @GeneratedValue
    private Long id;

    @OneToOne
    private User user;

    @OneToMany(mappedBy = "panda")
    private List<PandaToProduct> products;
}
