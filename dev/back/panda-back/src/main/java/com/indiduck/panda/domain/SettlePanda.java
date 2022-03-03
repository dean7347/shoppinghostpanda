package com.indiduck.panda.domain;


import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class SettlePanda {
    @Id
    @GeneratedValue
    private Long id;

    //정산등록된날자
    LocalDateTime enrollSettle;
    //실제 정산된 날자
    LocalDateTime depositDate;
    //정산된 금액
    int depoist;
    //정산된 userOrder
    @OneToMany(mappedBy = "settlePanda")
    private List<OrderDetail> orderDetails= new ArrayList<>();
    //정산될 판다
    @ManyToOne(fetch = FetchType.LAZY)
    private Panda panda;
    //입금했는지여부
    boolean isDeposit;

    public static SettlePanda createSettlePanda(List<OrderDetail> od,Panda panda)
    {
        SettlePanda settle= new SettlePanda();
        settle.enrollSettle=LocalDateTime.now();
        int depoistmoney=0;
        for (OrderDetail orderDetail : od) {
            depoistmoney+=orderDetail.getPandaMoney();
            orderDetail.setEnrollRefundPanda(true);
        }
        settle.panda=panda;
        settle.depoist=depoistmoney;
        settle.orderDetails=od;
        return settle;

    }

}


