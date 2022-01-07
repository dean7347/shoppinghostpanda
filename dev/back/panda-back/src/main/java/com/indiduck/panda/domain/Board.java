package com.indiduck.panda.domain;


import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
public class Board {


    @Id
    @GeneratedValue
    private Long id;
    String title;
    String contents;
}
