package com.indiduck.panda.controller;


import com.indiduck.panda.Repository.UserRepository;
import com.indiduck.panda.domain.OrderDetail;
import com.indiduck.panda.domain.OrderStatus;
import com.indiduck.panda.domain.User;
import com.indiduck.panda.domain.dao.TFMessageDto;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RequiredArgsConstructor
@RestController
public class BoardController {

    @Autowired
    private final UserRepository userRepository;

    @RequestMapping(value = "/api/createqna", method = RequestMethod.POST)
    public ResponseEntity<?> viewMyCart(@CurrentSecurityContext(expression = "authentication")
                                                Authentication authentication,@RequestBody Qnaboard qnaboard) throws Exception {
        Optional<User> byEmail = userRepository.findByEmail(authentication.getName());
        System.out.println("qnaboard = " + qnaboard);
        //기존것





        return ResponseEntity.ok(new TFMessageDto(true,"success"));
    }

    @Data
    private static class Qnaboard{
        Long productId;
        String title;
        String contents;
    }



}
