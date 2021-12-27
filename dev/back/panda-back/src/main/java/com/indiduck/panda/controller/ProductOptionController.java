package com.indiduck.panda.controller;


import com.indiduck.panda.Service.ProductOptionService;
import com.indiduck.panda.domain.Product;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    private final ProductOptionService productOptionService;

    @RequestMapping(value = "/api/editoption", method = RequestMethod.POST)
    public ResponseEntity<?> viewSearch(@CurrentSecurityContext(expression = "authentication")
                                                Authentication authentication, @RequestBody OptionDao optiondao) throws Exception {
        try {
            System.out.println("optiondao = " + optiondao);
            productOptionService.delOption(optiondao.optionId);
        }catch (Exception e)
        {
            return ResponseEntity.ok(new OptionSuccessDto(false));


        }
        return ResponseEntity.ok(new OptionSuccessDto(true));

    }
    @Data
    private static class OptionDao {
        long optionId;
    }

    @Data
    private class OptionSuccessDto {
        boolean success;
        public OptionSuccessDto(boolean b) {
            success=b;
        }
    }
}
