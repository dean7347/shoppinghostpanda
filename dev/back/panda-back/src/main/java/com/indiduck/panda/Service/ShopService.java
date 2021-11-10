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

    public Shop createNewShop(String username,String shopName, String representative,String crn,
                              String telnum, int freepee, int nofree,
                              String priPhone, String csPhone, String csTime,
                              String toPanda, String reship,
                              int returnpee, int tradepee, String returnaddress, String candate,
                              String noreturn, boolean Termsagree, boolean Infoagree,String comAddress)
    {

        //TODO: 처리할것 도메인에서 쓰로우 런타임으로 우류처리
        Optional<User> byEmail = userRepository.findByEmail(username);
        //유저가 이미 샵을 가지고 있다면

        if(byEmail.get().getShop()==null){
            Shop shop =Shop.createShop(byEmail.get(), shopName, representative,
                    crn, telnum, freepee, nofree,
                    priPhone, csPhone, csTime, toPanda, reship,
                    returnpee, tradepee, returnaddress, candate,
                    noreturn, Termsagree, Infoagree,comAddress);
            Shop save = shopRepository.save(shop);
            return save;
        }
        return null;
    }
//    //샵이 있는지 조회
//    public Shop haveShop(String userName)
//    {
//        Optional<User> byEmail = userRepository.findByEmail(userName);
//        System.out.println("byEmail = " + byEmail.get().getEmail());
//        Optional<Shop> byUserUsername = shopRepository.findShopByUser(byEmail.get());
//        System.out.println("shopWithUserByusername = " + byUserUsername);
//        return byUserUsername.get();
//    }
}
