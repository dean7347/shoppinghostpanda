package com.indiduck.panda.controller;


import com.indiduck.panda.config.Wrapper;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
public class HelloController {

    @RequestMapping(value = "/test", method = RequestMethod.POST)
    public void createShop(@RequestParam("data")String data, @RequestBody String test) throws Exception{
//        @RequestParam(value = "file",defaultValue = nu) MultipartFile files,
//        System.out.println("files = " + files);
        System.out.println("data = " + data);
        System.out.println("test = " + test);

    }

    @RequestMapping(value = "/test2", method = RequestMethod.POST)
    public void createShop(@RequestBody TestDAO testDAO) throws Exception {

        System.out.println("testDAO = " + testDAO);
//        testDAO.toString()
//        System.out.println("array = " + array);
//        @RequestBody String test
//        System.out.println("test = " + test);


    }

    @Data
    static class TestDAO {
        private List<Long> array;
        private String test;


    }



}
