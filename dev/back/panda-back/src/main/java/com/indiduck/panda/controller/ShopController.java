package com.indiduck.panda.controller;


import com.indiduck.panda.Service.ShopService;
import com.indiduck.panda.domain.Shop;
import com.indiduck.panda.domain.User;
import com.indiduck.panda.domain.dao.JwtRequest;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RequiredArgsConstructor
@RestController
public class ShopController {

    @Autowired
    private ShopService shopService;

    //샵 생성메소드
    @RequestMapping(value = "/createShop", method = RequestMethod.POST)
    public ResponseEntity<?> createShop(@CurrentSecurityContext(expression = "authentication")
                                                Authentication authentication, @RequestBody CreateShopDAO createShopDAO) throws Exception{



        Shop newShop = shopService.createNewShop(
                createShopDAO.shopName,
                createShopDAO.crn,
                createShopDAO.freePrice,
                createShopDAO.address,
                createShopDAO.number,
                authentication.getName());
        if (newShop!=null){
            return ResponseEntity.ok("샵 생성 완료"+newShop.getId());
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("이미 상점이 존재합니다");

    }

    //TODO:샵 수정 메소드
    //TODO:샵 삭제 메소드
    //TODO:샵 조회 메소드




    //==DAO DTO ==//
        @Data
        static class CreateShopDAO {
        private String shopName;
        private String crn;
        private int freePrice;
        private String address;
        private String number;
    }
}
