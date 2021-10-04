package com.indiduck.panda.domain;

import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.List;

@Getter
@Entity
public class Category {

    @Id
    @GeneratedValue
    private Long id;

    @OneToMany(mappedBy = "category")
    private List<ProductCategory> parentId;
    private String name;
}
