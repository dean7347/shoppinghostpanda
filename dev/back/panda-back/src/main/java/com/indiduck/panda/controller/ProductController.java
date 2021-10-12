package com.indiduck.panda.controller;


import com.indiduck.panda.Repository.ProductRepository;
import com.indiduck.panda.Service.FileService;
import com.indiduck.panda.Service.ProductService;

import com.indiduck.panda.domain.Product;
import com.indiduck.panda.domain.ProductOption;
import com.indiduck.panda.domain.dto.FileDao;

import com.indiduck.panda.util.MD5Generator;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@CrossOrigin
@RequiredArgsConstructor
public class ProductController {


    @Autowired
    private final ProductService productService;
    @Autowired
    private final FileService fileService;

    @Autowired
    private final ProductRepository productRepository;

    //상품사진 등록
    @RequestMapping(value = "/createFile", method = RequestMethod.POST)
    public ResponseEntity<?> createShop(@CurrentSecurityContext(expression = "authentication")
                                                Authentication authentication, @RequestParam("file") MultipartFile files) throws Exception{
        try {
            String origFilename = files.getOriginalFilename();
            String etx=origFilename.substring(origFilename.lastIndexOf(".") + 1);
            String filename = new MD5Generator(origFilename).toString()+System.currentTimeMillis();
            /* 실행되는 위치의 'files' 폴더에 파일이 저장됩니다. */
            String savePath = System.getProperty("user.dir") + "\\files"+"\\"+authentication.getName();
            /* 파일이 저장되는 폴더가 없으면 폴더를 생성합니다. */
            if (!new File(savePath).exists()) {
                try{
                    new File(savePath).mkdirs();
                }
                catch(Exception e){
                    e.getStackTrace();
                }
            }

            String filePath = savePath + "\\" + filename;
            files.transferTo(new File(filePath+"."+etx));

            FileDao fileDao = new FileDao();
            fileDao.setOrigFilename(origFilename);
            fileDao.setFilename(filename+"."+etx);
            fileDao.setFilePath(filePath+"."+etx);
            Long fileId = fileService.saveFile(fileDao);

            return  ResponseEntity.ok(new FileDto(true,fileDao.getFilePath(),fileDao.getFilename()));



        } catch(Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("상품사진 업로드 실패");
        }



    }

    @RequestMapping(value = "/regnewproduct", method = RequestMethod.POST)
    public ResponseEntity<?> createShop(@CurrentSecurityContext(expression = "authentication")
                                                Authentication authentication, @RequestBody CreateProductDAO createProductDAO) throws Exception {


        Product product=productService.createNewProduct(
                authentication.getName(),
                createProductDAO.thumb,
                createProductDAO.title,
                createProductDAO.description,
                createProductDAO.images,
                createProductDAO.Options
        );

        if(product==null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("상품생성 실패");
        }
        return ResponseEntity.ok(new ResultDto(true));
    }
     //상품 수정
    //상품 삭제
    //상품 조회
//     @RequestMapping(value = "/api/product/products", method = RequestMethod.GET)
//     public ResponseEntity<?> viewAll(@CurrentSecurityContext(expression = "authentication")
//                                                 Authentication authentication, Pageable pageable) throws Exception {
//
//         Page<Product> freeView = productRepository.findFreeView(pageable);
//         freeView.forEach( e->{
//             System.out.println("e = " + e);
//         });
//
//         return ResponseEntity.ok("ok");
//
//     }


         //== 상품 DAO == //
    @Data
    static class CreateProductDAO {
        private List<String> thumb;
        private String title;
        private String description;
        private List<String> images;
        private List<ProductOption> Options;

    }

    @Data
    static class haveShopDto {

        private String shopName;
        private boolean isShop;
        public haveShopDto(String name,Boolean isShop){

            this.shopName=name;
            this.isShop=isShop;

        }
    }

    @Data
    static class FileDto {

        private boolean success;
        private String filePath;
        private String fileName;
        public FileDto(boolean success,String filePath,String fileName){
            this.success=success;
            this.filePath=filePath;
            this.fileName=fileName;
        }
        public FileDto(boolean success){
            this.success=success;

        }
    }

    @Data
    static class ResultDto {

        private boolean success;

        public ResultDto(boolean success){
            this.success=success;

        }
    }


    }
