package com.indiduck.panda.Repository;

import com.indiduck.panda.domain.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface UserOrderRepository extends JpaRepository<UserOrder,Long> {

    Page<UserOrder> findAllByShop(Shop shop, Pageable pageable);
    Page<UserOrder> findAllByShopAndOrderStatus(Shop shop, OrderStatus orderStatus,Pageable pageable);
//    Page<UserOrder> findAllByShopAndOrderStatus(Shop shop, OrderStatus orderStatus);
    Page<UserOrder> findAllByUserId(User user,Pageable pageable);
    List<UserOrder> findByUserId(User user);
    Optional<UserOrder> findById(Long id);
    //정산일자 기준
    Optional<List<UserOrder>>findByShopAndDepositCompletedNotNullAndDepositCompletedBetween(Shop shop,LocalDateTime start,LocalDateTime end);

    // 정산예정일기준
    Optional<List<UserOrder>>findByShopAndExpectCalculateNotNullAndExpectCalculateBetween(Shop shop,LocalDateTime start,LocalDateTime end);

    //판매일자 기준
    Optional<List<UserOrder>>findByShopAndCreatedAtNotNullAndCreatedAtBetween(Shop shop,LocalDateTime start,LocalDateTime end);

    //구매확정일자 기준
    Optional<List<UserOrder>>findByShopAndFinishAtNotNullAndFinishAtBetween(Shop shop,LocalDateTime start,LocalDateTime end);


}
