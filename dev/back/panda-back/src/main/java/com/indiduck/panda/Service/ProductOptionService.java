package com.indiduck.panda.Service;

import com.indiduck.panda.Repository.ProductOptionRepository;
import com.indiduck.panda.Repository.ProductRepository;
import com.indiduck.panda.domain.ProductOption;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class ProductOptionService {

    @Autowired
    ProductOptionRepository productOptionRepository;

    public ProductOption saveOption(ProductOption option){
        ProductOption newO=new ProductOption()
                .newProductOption(option.getOptionName(), option.getOptionStock(), option.getOptionPrice());
        productOptionRepository.save(newO);
        return newO;
    }

    public void delOption(Long optionId)
    {
        Optional<ProductOption> byId = productOptionRepository.findById(optionId);
        byId.get();
    }
}
