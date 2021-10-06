package com.indiduck.panda.Service;

import com.indiduck.panda.Repository.ProductOptionRepository;
import com.indiduck.panda.Repository.ProductRepository;
import com.indiduck.panda.domain.ProductOption;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductOptionService {

    @Autowired
    ProductOptionRepository productOptionRepository;
    public void saveOption(List<ProductOption> pro)
    {
        pro.forEach(e-> productOptionRepository.save(e));
    }
}
