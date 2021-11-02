package com.indiduck.panda.Repository;

import com.indiduck.panda.domain.DeliverAddress;
import com.indiduck.panda.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional(readOnly = true)
@Repository
public interface DeliverAddressRespository extends JpaRepository<DeliverAddress,Long> {

    Optional<DeliverAddress> findAllByUser(User user);
}
