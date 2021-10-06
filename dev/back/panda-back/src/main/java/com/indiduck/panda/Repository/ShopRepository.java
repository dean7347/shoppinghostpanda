package com.indiduck.panda.Repository;

import com.indiduck.panda.domain.Shop;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

@Transactional(readOnly = true)
@Repository
public interface ShopRepository extends JpaRepository<Shop,Long> {



}
