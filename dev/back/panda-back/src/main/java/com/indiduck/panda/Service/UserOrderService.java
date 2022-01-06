package com.indiduck.panda.Service;

import com.indiduck.panda.Repository.ShopRepository;
import com.indiduck.panda.Repository.UserOrderRepository;
import com.indiduck.panda.Repository.UserRepository;
import com.indiduck.panda.domain.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
@Service
@RequiredArgsConstructor
@Transactional
public class UserOrderService {


    @Autowired
    private ShopRepository shopRepository;
    @Autowired
    private UserOrderRepository userOrderRepository;

    public UserOrder cancelOrder(long userorderId)
    {
        Optional<UserOrder> byId = userOrderRepository.findById(userorderId);
        for (OrderDetail orderDetail : byId.get().getDetail()) {
            //주문을 취소할수 있는 상태는 결제완료상태일때만 가능하다
            if((orderDetail.getOrderStatus() != OrderStatus.결제완료))
            {
                return null;
            }
        }
        byId.get().cancelOrder();
        return byId.get();


    }



}