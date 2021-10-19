package com.indiduck.panda.domain;

import lombok.Getter;

import javax.persistence.*;
import java.util.List;

@Getter
@Entity
public class Panda {

    @Id
    @GeneratedValue
    private Long id;

    @OneToOne
    private User user;

    private String pandaName;
    private String mainCh;
    @Lob
    private String intCategory;

    private boolean Terms;
    private boolean info;

    private boolean recognize;

    @OneToMany(mappedBy = "panda")
    private List<PandaToProduct> pandaToproducts;

    //==생성메서드==//
    public static Panda newPanda(String pandaName,String mainCh,String intCategory,boolean T,boolean I){
        Panda panda= new Panda();
        panda.pandaName=pandaName;
        panda.mainCh=mainCh;
        panda.intCategory=intCategory;
        panda.Terms=T;
        panda.info=I;
        return panda;

    }

    //==연관관계메서드 ==//
    public void setUser(User user)
    {
        this.user=user;
        user.setPanda(this);
    }

}





