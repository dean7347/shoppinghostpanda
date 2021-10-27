package com.indiduck.panda.Repository;

import com.indiduck.panda.domain.OrderDetail;
import com.indiduck.panda.domain.OrderStatus;
import com.indiduck.panda.domain.ProductOption;
import com.indiduck.panda.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional(readOnly = true)
@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail,Long> {


    Optional<OrderDetail> findByUserAndOptions(User user, ProductOption option);


    Optional<List<OrderDetail>> findByUserAndOrderStatus(User user, OrderStatus orderStatus);
}
