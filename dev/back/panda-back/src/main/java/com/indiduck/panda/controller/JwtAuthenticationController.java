package com.indiduck.panda.controller;


//- MVC 패턴을 알고 있다면 web 부분과 연결되는 것이 Controller라는 사실을 알고 있을 것입니다.
//
//이제 컨트롤러를 작성해보겠습니다.
//
//- JwtRequest를 Json 형식으로 받았다면, 인증을 통해 토큰을 발급해주는 기능을 작성하였습니다.
import com.indiduck.panda.Repository.UserRepository;
import com.indiduck.panda.Service.CookieUtil;
import com.indiduck.panda.Service.RedisUtil;
import com.indiduck.panda.config.JwtTokenUtil;
import com.indiduck.panda.Service.JwtUserDetailsService;
import com.indiduck.panda.domain.User;
import com.indiduck.panda.domain.dao.JwtRequest;
import com.indiduck.panda.domain.dto.Response;
import com.indiduck.panda.domain.dto.ResultDto;
import com.indiduck.panda.domain.dto.UserDto;
import com.indiduck.panda.util.ApiResponseMessage;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.SignatureException;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.logging.Logger;

import static org.springframework.http.ResponseEntity.status;

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


    @Autowired
    private CookieUtil cookieUtil;

    @Autowired
    private RedisUtil redisUtil;

    //로그인
    @RequestMapping(value = "/api/authenticate", method = RequestMethod.POST)
    public  ResponseEntity<ApiResponseMessage> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest, HttpServletRequest req,
                                                                         HttpServletResponse res) throws Exception {

        User user = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        if(user!=null){
            System.out.println("비밀번호 검증");
            User verfiyed = userDetailsService.loginUser(authenticationRequest.getUsername(), authenticationRequest.getPassword());
            if(verfiyed!=null)
            {
                try {

                    final String token = jwtTokenUtil.generateToken(user);
                    final String refreshJwt = jwtTokenUtil.generateRefreshToken(user);
                    Cookie accessToken = cookieUtil.createCookie(jwtTokenUtil.ACCESS_TOKEN_NAME, token);
                    Cookie refreshToken = cookieUtil.createCookie(jwtTokenUtil.REFRESH_TOKEN_NAME, refreshJwt);
                    redisUtil.setDataExpire(refreshJwt, user.getUsername(), jwtTokenUtil.REFRESH_TOKEN_VALIDATION_SECOND);
                    res.addCookie(accessToken);
                    res.addCookie(refreshToken);
                    ApiResponseMessage message = new ApiResponseMessage("Success", "로그인성공", "", "");

                    return new ResponseEntity<ApiResponseMessage>(message,HttpStatus.OK);

                } catch (Exception e) {
//            return new Response("authError", "로그인에 실패했습니다.", e.getMessage());
                    ApiResponseMessage message = new ApiResponseMessage("Authentification Error", "로그인실패", "", "");

                    return new ResponseEntity<ApiResponseMessage>(message,HttpStatus.UNAUTHORIZED);

                }
            }
        }
        ApiResponseMessage message = new ApiResponseMessage("Authentification Error", "로그인실패", "", "");

        return new ResponseEntity<ApiResponseMessage>(message,HttpStatus.UNAUTHORIZED);

        //성공했던것
//        try {
//            final User user = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
//            final String token = jwtTokenUtil.generateToken(user);
//            final String refreshJwt = jwtTokenUtil.generateRefreshToken(user);
//            Cookie accessToken = cookieUtil.createCookie(jwtTokenUtil.ACCESS_TOKEN_NAME, token);
//            Cookie refreshToken = cookieUtil.createCookie(jwtTokenUtil.REFRESH_TOKEN_NAME, refreshJwt);
//            redisUtil.setDataExpire(refreshJwt, user.getUsername(), jwtTokenUtil.REFRESH_TOKEN_VALIDATION_SECOND);
//            res.addCookie(accessToken);
//            res.addCookie(refreshToken);
////            return new Response("success", "로그인에 성공했습니다.", token);
//            return  ResponseEntity.ok(new loginResultDto(true,false));
//
//        } catch (Exception e) {
////            return new Response("authError", "로그인에 실패했습니다.", e.getMessage());
//            System.out.println("로그인 실패");
//            return  ResponseEntity.ok(new loginResultDto(false,true));
//
//        }
    }

    //회원가입
    @PostMapping("/api/signup")
    public ResponseEntity<?> signup(@RequestBody UserDto infoDto) { // 회원 추가
        System.out.println("infoDto = " + infoDto.getEmail());



        try {
            Long save = userDetailsService.save(infoDto);
            if(save==null)
            {
                return ResponseEntity.ok(new signupDto(false,"중복된 아이디가 존재합니다"));

            }

        } catch (Exception e) {
            return ResponseEntity.ok(new signupDto(false,"회원가입에 실패했습니다 같은 오류가 반복될경우 고객센터에 문의남겨주시기 바랍니다"));

        }
        return ResponseEntity.ok(new signupDto(true,"회원가입에성공했습니다"));
    }
    //체크
    @RequestMapping(path = "/api/user/logout", method = RequestMethod.GET)
    private void removeCookies(HttpServletRequest request, HttpServletResponse response) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        SecurityContextHolder 클리어시켜볼까?
        System.out.println(" 로그아웃 ");

        if(authentication !=null)
        {
            new SecurityContextLogoutHandler().logout(request,response,authentication);
        }


    }

    @GetMapping("/api/auth/check")
    @ResponseBody
    public ResponseEntity<?> check(HttpServletRequest request,
                                   @CookieValue(name = "accessToken") String usernameCookie){

        String usernameFromToken = jwtTokenUtil.getUsername(usernameCookie);
        if(usernameFromToken !=null)
        {
            System.out.println("usernameFromToken = " + usernameFromToken);
            return ResponseEntity.status(HttpStatus.OK).body(new SimpleCheckDto(usernameFromToken));
        }
//
//
//
        return ResponseEntity.status(HttpStatus.CONFLICT).body("신뢰할수 없는 정보입니다 ");
    }

    /*
    펑션
     */


    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            System.out.println("user_disabled");
            throw new Exception("USER_DISABLED", e);


        } catch (BadCredentialsException e) {
            System.out.println("invalid_credentials");

            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }

    private ResponseEntity<String> authenticateV2(JwtRequest authenticationRequest) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername()
                    , authenticationRequest.getPassword()));
        } catch (DisabledException e) {
             System.out.println("user_disabled");
            return ResponseEntity.status(HttpStatus.CONFLICT).body("회원가입 실패");
//            return ResponseEntity("no user",HttpStatus.CONFLICT)

        } catch (BadCredentialsException e) {
            System.out.println("invalid_credentials");
            return ResponseEntity.status(HttpStatus.CONFLICT).body("신뢰할수 없는 정보입니다 ");
        }
        return null;
    }
    //////////////dto///////////
    @Data
    static class SimpleCheckDto {

        private String username;
        public SimpleCheckDto(String user){

            this.username=user;

        }
    }
    @Data
    static class signupDto{
        private boolean success;
        private String message;
        public signupDto(boolean su,String me)
        {
            success=su;
            message=me;
        }
    }

    @Data
    static class loginResultDto {

        private boolean auth;
        private boolean authError;

        public loginResultDto(boolean auth,boolean authError){
            this.auth=auth;
            this.authError=authError;

        }
    }
}
