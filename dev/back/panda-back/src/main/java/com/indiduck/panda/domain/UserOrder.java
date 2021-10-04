package com.indiduck.panda.domain;

import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
public class UserOrder {
    @Id
    @GeneratedValue
    private long id;

    private long orderDetailId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User userId;

    private LocalDateTime orderAt;
    private String address1;
    private String address2;
    private String address3;
    private String reveiverName;
    private String receiverPhone;

    @ManyToOne(fetch = FetchType.LAZY)
    private OrderDetail orderDetails;
}
