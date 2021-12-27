package com.indiduck.panda.Repository;

import com.indiduck.panda.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional(readOnly = true)
@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail,Long> {


    Optional<OrderDetail> findByUserAndOptionsAndOrderStatus(User user, ProductOption option,OrderStatus orderStatus);


    Optional<List<OrderDetail>> findByUserAndOrderStatus(User user, OrderStatus orderStatus);
    Optional<List<OrderDetail>> findByUserAndOrderStatusAndShop(User user, OrderStatus orderStatus, Shop shop);
    Optional<List<OrderDetail>> findByUserAndOrderStatusAndOptions_Sales(User user, OrderStatus orderStatus,Boolean OptionsSales);
    Optional<List<OrderDetail>> findByUserAndOrderStatusAndShopAndOptions_Sales(User user, OrderStatus orderStatus, Shop shop,Boolean OptionsSales);




}
