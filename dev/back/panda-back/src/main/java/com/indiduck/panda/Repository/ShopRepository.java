package com.indiduck.panda.Repository;

import com.indiduck.panda.domain.Shop;
import com.indiduck.panda.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.Optional;

@Transactional(readOnly = true)
@Repository
public interface ShopRepository extends JpaRepository<Shop,Long> {

    @EntityGraph(attributePaths = {"shopName"})
    Shop findShopWithShopNameByUser(User user);



}
