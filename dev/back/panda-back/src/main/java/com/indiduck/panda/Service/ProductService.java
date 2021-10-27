package com.indiduck.panda.Service;

import com.indiduck.panda.Repository.*;
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
@Transactional
public class ProductService {
    @Autowired
    ProductRepository productRepository;

    @Autowired
    FileRepository fileRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    ProductOptionRepository productOptionRepository;

    @Autowired
    ProductOptionService productOptionService;

    @Autowired
    FileService fileService;

    @Autowired
    ShopRepository shopRepository;

    public Product createNewProduct(String user, List<String> thumb,String title, String descriptoin,
                                    List<String> images,List<ProductOption> options){

        Product newProduct = Product.newProDuct(title,descriptoin);
        productRepository.save(newProduct);

        images.forEach(e ->{
            File filebyFilepath1 = fileService.getFilebyFilepath(e);
            newProduct.setImage(filebyFilepath1);
        });
        thumb.forEach(e ->{
            File fileByFilename = fileRepository.myqueryfind(e);
            newProduct.setThumbImage(fileService.getFilebyFilepath(e));
        });

        options.forEach( e->
                {
                    ProductOption productOption = productOptionService.saveOption(e);
                    newProduct.setProductOptions(productOption);
                }

        );
        Optional<User> byEmail = userRepository.findByEmail(user);
        Optional<Shop> byUserUsername = shopRepository.findByUserId(byEmail.get().getId());
        newProduct.setShop(byUserUsername.get());


        return newProduct;

    }
}
