package com.indiduck.panda.controller;


import com.indiduck.panda.Repository.DeliverAddressRespository;
import com.indiduck.panda.Repository.UserRepository;
import com.indiduck.panda.domain.DeliverAddress;
import com.indiduck.panda.domain.Product;
import com.indiduck.panda.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin
@RequiredArgsConstructor
public class DeliveryAddressController {

    @Autowired
    DeliverAddressRespository deliverAddressRespository;
   @Autowired
    UserRepository userRepository;

    @RequestMapping(value = "/api/addmyaddress", method = RequestMethod.POST)
    public ResponseEntity<?> addAddress(@CurrentSecurityContext(expression = "authentication")
                                                Authentication authentication) throws Exception {

        String name = authentication.getName();
        Optional<User> byEmail = userRepository.findByEmail(name);
        Optional<DeliverAddress> allByUser = deliverAddressRespository.findAllByUser(byEmail.get());


        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("view 조회 실패");
    }

    @RequestMapping(value = "/api/myaddress", method = RequestMethod.GET)
    public ResponseEntity<?> viewSearch(@CurrentSecurityContext(expression = "authentication")
                                                Authentication authentication) throws Exception {

        String name = authentication.getName();
        Optional<User> byEmail = userRepository.findByEmail(name);
        Optional<DeliverAddress> allByUser = deliverAddressRespository.findAllByUser(byEmail.get());


        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("view 조회 실패");
    }
}
