package com.indiduck.panda.domain;

import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
@Getter
public class ProudctImageFile {

    @Id
    @GeneratedValue
    private Long fileNumber;
    private Long productNumber;
    private String OriginFileName;
    private String storedFileName;
    private boolean isThumNail;
    private int fileSize;
    private LocalDateTime createDate;
    private boolean isDelete;


}
