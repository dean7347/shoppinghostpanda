package com.indiduck.panda.controller;

import com.indiduck.panda.config.JwtUserDetailsService;
import com.indiduck.panda.domain.JwtResponse;
import com.indiduck.panda.domain.Response;
import com.indiduck.panda.domain.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final JwtUserDetailsService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody UserDto infoDto) { // 회원 추가
        System.out.println("infoDto = " + infoDto.getEmail());



        try {
            userService.save(infoDto);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("회원가입 실패");
        }
        return ResponseEntity.ok("회원가입 성공");
    }

}