package com.indiduck.panda.Repository;

import com.indiduck.panda.domain.UserOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserOrderRepository extends JpaRepository<UserOrder,Long> {
}
