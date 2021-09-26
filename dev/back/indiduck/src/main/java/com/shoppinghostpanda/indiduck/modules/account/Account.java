package com.shoppinghostpanda.indiduck.modules.account;


import lombok.*;
import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Getter
@Setter
@EqualsAndHashCode(of= "id")
@Builder @AllArgsConstructor @NoArgsConstructor
public class Account {
    @Id @GeneratedValue
    private Long id;

    //두개있으면 안된다 유니크
    @Column(unique = true)
    private String email;

    @Column(unique = true)
    private String nickname;

    private String password;




}