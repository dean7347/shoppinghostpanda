package com.indiduck.panda.domain;


import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
public class OrderDetail {

    @Id
    @GeneratedValue
    private long id;

    private int  productCount;
    @ManyToOne(fetch = FetchType.LAZY)
    private Product products;




    @ManyToOne(fetch = FetchType.LAZY)
    private UserOrder userOrder;
}
