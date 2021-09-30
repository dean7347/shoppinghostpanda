package com.indiduck.panda.controller;


//- MVC 패턴을 알고 있다면 web 부분과 연결되는 것이 Controller라는 사실을 알고 있을 것입니다.
//
//이제 컨트롤러를 작성해보겠습니다.
//
//- JwtRequest를 Json 형식으로 받았다면, 인증을 통해 토큰을 발급해주는 기능을 작성하였습니다.
import com.indiduck.panda.Repository.UserRepository;
import com.indiduck.panda.config.JwtTokenUtil;
import com.indiduck.panda.config.JwtUserDetailsService;
import com.indiduck.panda.domain.JwtRequest;
import com.indiduck.panda.domain.JwtResponse;
import com.indiduck.panda.domain.User;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequiredArgsConstructor
public class JwtAuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtUserDetailsService userDetailsService;

    private final UserRepository userRepository;

    //로그인
    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {
//        System.out.println("authenticationRequest = " + authenticationRequest.getUsername());
        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(authenticationRequest.getUsername());

        final String token = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new JwtResponse(token));
    }

    @RequestMapping(path = "/auth/logout", method = RequestMethod.GET)
    private void removeCookies(HttpServletRequest request, HttpServletResponse response) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if(authentication !=null)
        {
            new SecurityContextLogoutHandler().logout(request,response,authentication);
        }
        System.out.println(" 로그아웃 ");

    }

    @GetMapping("/auth/check")
    public SimpleCheckDto hello(@CurrentSecurityContext(expression="authentication.name")
                                String username) {
        return new SimpleCheckDto(username);
    }

    /*
    펑션
     */


    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }
    ////////////////dto///////////
    @Data
    static class SimpleCheckDto {

        private String username;
        public SimpleCheckDto(String user){

            this.username=user;

        }
    }
}