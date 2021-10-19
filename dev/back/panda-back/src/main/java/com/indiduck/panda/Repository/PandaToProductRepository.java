package com.indiduck.panda.Repository;

import com.indiduck.panda.domain.PandaToProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional(readOnly = true)
@Repository
public interface PandaToProductRepository extends JpaRepository<PandaToProduct,Long> {


    List<PandaToProduct> findByProductId(Long productId);
}
