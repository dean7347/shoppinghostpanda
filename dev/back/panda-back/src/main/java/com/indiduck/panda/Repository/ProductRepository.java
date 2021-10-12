package com.indiduck.panda.Repository;

import com.indiduck.panda.domain.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;


@Transactional(readOnly = true)
public interface ProductRepository extends JpaRepository<Product,Long> {


    @Query("select p from Product p")
    Page<Product> findFreeView(Pageable pageable);
//        Page<Product> findAllBy(Pageable pageable);

}
