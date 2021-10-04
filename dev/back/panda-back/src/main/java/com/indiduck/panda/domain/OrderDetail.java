package com.indiduck.panda.domain;


import lombok.Getter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
public class OrderDetail {

    @Id
    @GeneratedValue
    private long id;

    private Long orderNumber;
    private Long productNumber;
    private int  productCount;
    private int productPrice;
    private OrderStatus orderDetailStatus;
    private boolean refundCheck;

    @ManyToOne(fetch = FetchType.LAZY)
    private Product products;

    @ManyToOne(fetch = FetchType.LAZY)
    private UserOrder userOrder;
}
