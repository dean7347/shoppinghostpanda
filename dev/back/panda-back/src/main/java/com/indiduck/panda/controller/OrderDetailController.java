//package com.indiduck.panda.controller;
//
//
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.annotation.CurrentSecurityContext;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMethod;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//public class OrderDetailController {
//
//    //상품 주문
//    @RequestMapping(value = "/createProductfor", method = RequestMethod.POST)
//    public ResponseEntity<?> createShop(@CurrentSecurityContext(expression = "authentication")
//                                                Authentication authentication, @RequestBody CreateOrderDetailDAO createProductDAO) throws Exception {
//
//    }
//
//    static class CreateOrderDetailDAO {
//        private Long ProductId;
//        private Long ProductOPtionId;
//        private Long count;
//    }
//    }
