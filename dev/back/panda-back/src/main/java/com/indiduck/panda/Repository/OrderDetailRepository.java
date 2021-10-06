package com.indiduck.panda.Repository;

import com.indiduck.panda.domain.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)
public interface OrderDetailRepository extends JpaRepository<OrderDetail,Long> {
}
