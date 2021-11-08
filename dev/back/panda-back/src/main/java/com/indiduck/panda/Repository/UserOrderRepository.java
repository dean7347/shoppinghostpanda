package com.indiduck.panda.Repository;

import com.indiduck.panda.domain.OrderStatus;
import com.indiduck.panda.domain.Shop;
import com.indiduck.panda.domain.User;
import com.indiduck.panda.domain.UserOrder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserOrderRepository extends JpaRepository<UserOrder,Long> {

    Page<UserOrder> findAllByShop(Shop shop, Pageable pageable);
    Optional<List<UserOrder>> findAllByShopAndOrderStatus(Shop shop, OrderStatus orderStatus);
//    Page<UserOrder> findAllByShopAndOrderStatus(Shop shop, OrderStatus orderStatus);


}
