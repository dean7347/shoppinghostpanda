package com.indiduck.panda.Repository;

import com.indiduck.panda.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;


@Transactional(readOnly = true)
public interface ProductRepository extends JpaRepository<Product,Long> {
}
