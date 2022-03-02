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
    private List<UserOrder> userOrder= new ArrayList<>();
    //정산될 판다
    @ManyToOne(fetch = FetchType.LAZY)
    private Panda panda;
    //입금했는지여부
    boolean isDeposit;
}
