package com.indiduck.panda.controller;


import com.indiduck.panda.domain.Product;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequiredArgsConstructor
public class ProductOptionController {

    @RequestMapping(value = "/api/editoption", method = RequestMethod.POST)
    public ResponseEntity<?> viewSearch(@CurrentSecurityContext(expression = "authentication")
                                                Authentication authentication, @RequestBody OptionDao optiondao) throws Exception {

        System.out.println("optiondao = " + optiondao);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("view 조회 실패");
    }
    @Data
    private static class OptionDao {
        long optionId;
    }
}
