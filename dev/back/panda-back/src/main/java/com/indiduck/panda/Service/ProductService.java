package com.indiduck.panda.Service;

import com.indiduck.panda.Repository.FileRepository;
import com.indiduck.panda.Repository.ProductRepository;
import com.indiduck.panda.Repository.UserRepository;
import com.indiduck.panda.domain.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {
    @Autowired
    ProductRepository productRepository;

    @Autowired
    FileRepository fileRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    ProductOptionService productOptionService;

    public Product createNewProduct(String user, List<Long> Image, String productName, int productPrice, List<ProductOption> productOptions, String productDesc){
        Optional<User> byEmail = userRepository.findByEmail(user);
        productOptionService.saveOption(productOptions);
        Shop shop = byEmail.get().getShop();
        List<File> collect = Image.stream().map(s -> fileRepository.findById(s).get()).collect(Collectors.toList());
        Product pro=Product.newProDuct(shop,collect,productName,productPrice,productOptions,productDesc);
        productRepository.save(pro);
        return pro;
    }
}
