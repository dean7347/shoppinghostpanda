package com.indiduck.panda.domain;


import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
public class Comment {

    @Id
    @GeneratedValue
    private long id;

    //삭제여부
    boolean isdelete;

    //덧글을 판매자가 확인했는지
    boolean isCheck;
    //작성자
    private String creater;
    private LocalDateTime createdAt;
    private LocalDateTime deleteAt;

    @ManyToOne(fetch = FetchType.LAZY)
    private Board board;

}
