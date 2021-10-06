package com.indiduck.panda.controller;


//- MVC 패턴을 알고 있다면 web 부분과 연결되는 것이 Controller라는 사실을 알고 있을 것입니다.
//
//이제 컨트롤러를 작성해보겠습니다.
//
//- JwtRequest를 Json 형식으로 받았다면, 인증을 통해 토큰을 발급해주는 기능을 작성하였습니다.
import com.indiduck.panda.Repository.UserRepository;
import com.indiduck.panda.config.JwtTokenUtil;
import com.indiduck.panda.Service.JwtUserDetailsService;
import com.indiduck.panda.domain.dao.JwtRequest;
import com.indiduck.panda.domain.dto.UserDto;
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

    private final UserRepository userRepository;


    //로그인
    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {
//          V1
//        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());
//        final UserDetails userDetails = userDetailsService
//                .loadUserByUsername(authenticationRequest.getUsername());
//
//


        System.out.println("컨트롤러 로그인 시도 ");
        ResponseEntity<String> CONFLICT = authenticateV2(authenticationRequest);

        if (CONFLICT != null) return CONFLICT;
        System.out.println("컨트롤러 체크로직 통과");
        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(authenticationRequest.getUsername());

        final String token = jwtTokenUtil.generateToken(userDetails);
//

        HttpHeaders resHeader = new HttpHeaders();
        resHeader.add("Set-Cookie","access_token="+token);
//        new JwtResponse(token)
        return ResponseEntity.ok().headers(resHeader).body("환영합니다");
    }

    //회원가입
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody UserDto infoDto) { // 회원 추가
        System.out.println("infoDto = " + infoDto.getEmail());



        try {
            userDetailsService.save(infoDto);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("회원가입 실패");
        }
        return ResponseEntity.ok("회원가입 성공");
    }
    //체크
    @RequestMapping(path = "/auth/logout", method = RequestMethod.GET)
    private void removeCookies(HttpServletRequest request, HttpServletResponse response) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        SecurityContextHolder 클리어시켜볼까?
        System.out.println(" 로그아웃 ");
        if(authentication !=null)
        {
            new SecurityContextLogoutHandler().logout(request,response,authentication);
        }


    }

    @GetMapping("/auth/check")
    @ResponseBody
    public ResponseEntity<?> check(HttpServletRequest request,
                                   @CookieValue(name = "access_token",defaultValue = "얻지못함") String usernameCookie){//        @CookieValue("Cookie") String usernameCookie

        String usernameFromToken = jwtTokenUtil.getUsernameFromToken(usernameCookie);
        try {


        }catch (ExpiredJwtException e) {
            System.out.println(" Token expired ");
        } catch(Exception e){
            System.out.println(" Some other exception in JWT parsing ");
        }

        if(usernameFromToken !=null)
        {
            System.out.println("usernameFromToken = " + usernameFromToken);
            return ResponseEntity.status(HttpStatus.OK).body(new SimpleCheckDto(usernameFromToken));
        }



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
}