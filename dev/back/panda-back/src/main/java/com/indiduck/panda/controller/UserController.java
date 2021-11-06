package com.indiduck.panda.controller;

import com.indiduck.panda.Service.JwtUserDetailsService;
import com.indiduck.panda.domain.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
@CrossOrigin
@RestController
@RequiredArgsConstructor
public class UserController {

    private final JwtUserDetailsService userService;



}