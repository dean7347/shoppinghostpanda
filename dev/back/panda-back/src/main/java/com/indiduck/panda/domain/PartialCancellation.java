//package com.indiduck.panda.domain;
//
//import lombok.Getter;
//import lombok.Setter;
//
//import javax.persistence.*;
//import java.time.LocalDateTime;
//import java.util.ArrayList;
//import java.util.List;
//
//
//@Entity
//@Getter
//@Setter
//public class PartialCancellation {
//
//    //부분취소
//
//    @Id
//    @GeneratedValue
//    private Long id;
//
//    @Lob
//    private String reson;
//
//    @OneToMany(mappedBy = "partialCancellation")
//    private List<OrderDetail> orderDetails=new ArrayList<>();
//    //취소로 환불된 금액
//    private long refundMoney;
//    LocalDateTime createAt;
//    LocalDateTime editAt;
//
//    public static PartialCancellation partialCancellation(List<OrderDetail> orderDetails)
//    {
//        PartialCancellation pc= new PartialCancellation();
//        pc.setOrderDetails(orderDetails);
//        return pc;
//
//    }
//}
