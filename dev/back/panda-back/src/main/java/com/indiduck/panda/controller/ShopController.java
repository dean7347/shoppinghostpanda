package com.indiduck.panda.controller;


import com.indiduck.panda.Service.ShopService;
import com.indiduck.panda.config.JwtTokenUtil;
import com.indiduck.panda.domain.Shop;
import com.indiduck.panda.domain.User;
import com.indiduck.panda.domain.dao.JwtRequest;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@CrossOrigin
@RequiredArgsConstructor
@RestController
public class ShopController {

    @Autowired
    private ShopService shopService;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

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
            return ResponseEntity.ok("샵 생성 완료"+newShop.getId()+" 샵소유주"+newShop.getUser().getUsername());
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("이미 상점이 존재합니다");

    }

    //TODO:샵 수정 메소드
    //TODO:샵 삭제 메소드
    //TODO:샵 조회 메소드
    @GetMapping("/haveshop")
    @ResponseBody
    public ResponseEntity<?> haveShop(@CookieValue(name = "accessToken") String usernameCookie)
    {

        String usernameFromToken = jwtTokenUtil.getUsername(usernameCookie);
        if(usernameFromToken !=null)
        {
            Shop shop = shopService.haveShop(usernameFromToken);
            if(shop ==null)
            {
                return ResponseEntity.status(HttpStatus.OK).body(new haveShopDto("null",false));
            }
            return ResponseEntity.status(HttpStatus.OK).body(new haveShopDto(shop.getShopName(),true));
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("올바르지 못한 요청입니다 ");

    }




    //==DAO DTO ==//
        @Data
        static class CreateShopDAO {
        private String shopName;
        private String crn;
        private int freePrice;
        private String address;
        private String number;
    }

    @Data
    static class haveShopDto {

        private String shopName;
        private boolean isShop;
        public haveShopDto(String name,Boolean isShop){

            this.shopName=name;
            this.isShop=isShop;

        }
    }
}
