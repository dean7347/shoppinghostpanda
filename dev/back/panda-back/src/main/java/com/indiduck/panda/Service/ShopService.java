package com.indiduck.panda.Service;

import com.indiduck.panda.Repository.ShopRepository;
import com.indiduck.panda.Repository.UserRepository;
import com.indiduck.panda.controller.ShopController;
import com.indiduck.panda.domain.Shop;
import com.indiduck.panda.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class ShopService {

    @Autowired
    private ShopRepository shopRepository;
    @Autowired
    private UserRepository userRepository;

    public Shop createNewShop(String ShopName,String CRN, int freePrice,String address,
                              String number,String username){
        System.out.println("ShopName 서비스 = " + ShopName);
        //TODO: 처리할것 도메인에서 쓰로우 런타임으로 우류처리
        Optional<User> byEmail = userRepository.findByEmail(username);
        //유저가 이미 샵을 가지고 있다면

        if(byEmail.get().getShop()==null){
            Shop shop =Shop.createShop(ShopName,CRN,freePrice,address,number,byEmail.get());
            Shop save = shopRepository.save(shop);
            return save;
        }
        return null;
    }
    //샵이 있는지 조회
    public Shop haveShop(String userName)
    {
        Optional<User> byEmail = userRepository.findByEmail(userName);
        Shop shopWithUserByusername = shopRepository.findShopWithShopNameByUser(byEmail.get());
        System.out.println("shopWithUserByusername = " + shopWithUserByusername);
        return shopWithUserByusername;
    }
}
