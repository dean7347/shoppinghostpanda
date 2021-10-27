package com.indiduck.panda.controller;

import com.indiduck.panda.Repository.PandaRespository;
import com.indiduck.panda.Repository.UserRepository;
import com.indiduck.panda.Service.PandaService;
import com.indiduck.panda.config.JwtTokenUtil;
import com.indiduck.panda.domain.Panda;
import com.indiduck.panda.domain.Product;
import com.indiduck.panda.domain.Shop;
import com.indiduck.panda.domain.User;
import com.indiduck.panda.domain.dto.ResultDto;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin
@RequiredArgsConstructor
@RestController
public class PandaController {

    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    PandaRespository pandaRespository;
    @Autowired
    UserRepository userRepository;

    @Autowired
    PandaService pandaService;


    @GetMapping("/api/ispanda")
    @ResponseBody
    public ResponseEntity<?> ispanda(@CookieValue(name = "accessToken") String usernameCookie)
    {

        String usernameFromToken = jwtTokenUtil.getUsername(usernameCookie);
        System.out.println("usernameFromToken = " + usernameFromToken);
        if(usernameFromToken !=null)
        {
            Optional<User> byEmail = userRepository.findByEmail(usernameFromToken);

            if(!byEmail.isEmpty())
            {
                Optional<Panda> byUser = pandaRespository.findByUser(byEmail.get());

                if(byUser.isEmpty())
                {
                    return ResponseEntity.status(HttpStatus.OK).body(new isPandaDto(false));
                }
                return ResponseEntity.status(HttpStatus.OK).body(new isPandaDto(true));

            }
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("올바르지 못한 요청입니다 ");

    }



    @RequestMapping(value = "/api/regpanda", method = RequestMethod.POST)
    public ResponseEntity<?> regPanda(@CurrentSecurityContext(expression = "authentication")
                                                Authentication authentication, @RequestBody RegPandaDAO regPandaDAO) throws Exception {


        Panda panda = pandaService.newPanda(authentication.getName(),
                regPandaDAO.pandaname,
                regPandaDAO.mainchname,
                regPandaDAO.intcategory,
                regPandaDAO.termsagree,
                regPandaDAO.infoagree);

        if(panda==null){
            return ResponseEntity.ok(new ResultDto(false,"판다신청에 실패했습니다"));
        }
        return ResponseEntity.ok(new ResultDto(true,"판다신청에 성공했습니다"));
    }

    @Data
    static class isPandaDto {
        boolean ispanda;
        public isPandaDto(boolean b) {
            ispanda=b;
        }
    }
    @Data
    static class RegPandaDAO {
        String pandaname;
        String mainchname;
        String intcategory;
        boolean termsagree;
        boolean infoagree;
    }


}
