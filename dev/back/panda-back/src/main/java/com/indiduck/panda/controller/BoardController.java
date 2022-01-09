package com.indiduck.panda.controller;


import com.indiduck.panda.Repository.UserRepository;
import com.indiduck.panda.domain.OrderDetail;
import com.indiduck.panda.domain.OrderStatus;
import com.indiduck.panda.domain.User;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RequiredArgsConstructor
@RestController
public class BoardController {

    @Autowired
    private final UserRepository userRepository;

    @RequestMapping(value = "/api/createqna", method = RequestMethod.GET)
    public ResponseEntity<?> viewMyCart(@CurrentSecurityContext(expression = "authentication")
                                                Authentication authentication) throws Exception {
        Optional<User> byEmail = userRepository.findByEmail(authentication.getName());
        //기존것





        return ResponseEntity.ok(new OrderDetailController.thisResultDto(true,myCart));
    }

    @Data
    private static class qnaboard{
        String title;
        String contents;
    }



}
