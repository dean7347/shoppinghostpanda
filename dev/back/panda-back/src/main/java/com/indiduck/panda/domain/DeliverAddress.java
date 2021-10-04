package com.indiduck.panda.domain;

import lombok.Getter;

import javax.persistence.*;

@Getter
@Entity
public class DeliverAddress {

    @Id
    @GeneratedValue
    private long id;

    private String addressName;
    private String userAddress1;
    private String userAddress2;
    private String userAddress3;

    @ManyToOne(fetch = FetchType.LAZY)
    private User userName;

}
