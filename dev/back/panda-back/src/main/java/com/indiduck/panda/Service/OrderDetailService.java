package com.indiduck.panda.Service;

import com.indiduck.panda.Repository.*;
import com.indiduck.panda.domain.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderDetailService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    ProductRepository productRepository;
    @Autowired
    ProductOptionRepository productOptionRepository;
    @Autowired
    PandaRespository pandaRespository;
    @Autowired
    OrderDetailRepository orderDetailRepository;

    public OrderDetail newOrderDetail(String user,Long productid,Long optionId,int optionCount
                                           ,Long selectpanda)
    {


        Optional<User> getUser = userRepository.findByEmail(user);
        Optional<Product> getProduct = productRepository.findById(productid);
        Optional<ProductOption> getPO = productOptionRepository.findById(optionId);
        Optional<Panda> getPanda = pandaRespository.findById(selectpanda);

        Optional<OrderDetail> byUserAAndOptions = orderDetailRepository.findByUserAndOptions(getUser.get(), getPO.get());
        if(!byUserAAndOptions.isEmpty())
        {
            byUserAAndOptions.get().plusCount(optionCount);
            byUserAAndOptions.get().setPanda(getPanda.get());
            return (byUserAAndOptions.get());
        }else {

            OrderDetail od = OrderDetail.newOrderDetail(getUser.get(), getProduct.get(), getPO.get(), optionCount, getPanda.get());
            orderDetailRepository.save(od);

        return od;
        }

    }

    public OrderDetail newOrderDetail(String user, Long productid, Long optionId, int optionCount) {
        Optional<User> getUser = userRepository.findByEmail(user);
        Optional<Product> getProduct = productRepository.findById(productid);
        Optional<ProductOption> getPO = productOptionRepository.findById(optionId);

        Optional<OrderDetail> byUserAAndOptions = orderDetailRepository.findByUserAndOptions(getUser.get(), getPO.get());
        if(!byUserAAndOptions.isEmpty()) {
            byUserAAndOptions.get().plusCount(optionCount);
            return (byUserAAndOptions.get());
        }else {
            OrderDetail od = OrderDetail.newOrderDetail(getUser.get(), getProduct.get(), getPO.get(), optionCount);
            orderDetailRepository.save(od);
            return od;
        }
    }
}
