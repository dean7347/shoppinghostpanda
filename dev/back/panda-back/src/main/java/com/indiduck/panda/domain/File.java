package com.indiduck.panda.domain;


import lombok.*;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.*;

@Getter
@Entity
@Setter
@NoArgsConstructor
public class File {
//파일 저장 클래스
    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false)
    private String origFilename;

    @Column(nullable = false)
    private String filename;

    @Column(nullable = false)
    private String filePath;

    private boolean isThumb;

    @ManyToOne(fetch = FetchType.LAZY)
    private Product product;

    @Builder
    public File(Long id, String origFilename, String filename, String filePath) {
        this.id = id;
        this.origFilename = origFilename;
        this.filename = filename;
        this.filePath = filePath;
    }

    //==//


}