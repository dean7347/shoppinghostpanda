package com.indiduck.panda.domain;

import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
public class ProductReply {

    @Id
    @GeneratedValue
    private long id;

    private String content;


    private LocalDateTime reportingDate;
    private Long replyOriginNumber;
    private int replyOrder;
    private int reply_depth;


    //연관관계
    @ManyToOne(fetch = FetchType.LAZY)
    Product productNumber;

    //연관관계
    @ManyToOne(fetch = FetchType.LAZY)
    private User writerName;


}
