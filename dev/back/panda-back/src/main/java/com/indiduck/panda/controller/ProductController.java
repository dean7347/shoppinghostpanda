package com.indiduck.panda.controller;


import com.indiduck.panda.Repository.ProductRepository;
import com.indiduck.panda.Service.FileService;
import com.indiduck.panda.Service.ProductService;

import com.indiduck.panda.domain.File;
import com.indiduck.panda.domain.Product;
import com.indiduck.panda.domain.ProductOption;
import com.indiduck.panda.domain.dto.FileDao;

import com.indiduck.panda.util.MD5Generator;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
            if (!new java.io.File(savePath).exists()) {
                try{
                    new java.io.File(savePath).mkdirs();
                }
                catch(Exception e){
                    e.getStackTrace();
                }
            }

            String filePath = savePath + "\\" + filename;
            files.transferTo(new java.io.File(filePath+"."+etx));

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
     @RequestMapping(value = "/api/preview", method = RequestMethod.GET)
     public ResponseEntity<?> viewAll(@CurrentSecurityContext(expression = "authentication")
                                                             Authentication authentication,Pageable pageable) throws Exception {


//         System.out.println("limit+offset = " + limit + offset);
         Page<Product> result = productRepository.findAll(pageable);
         Page<ProductDto> tomap = result.map(e -> new ProductDto(e));


         if(!tomap.isEmpty()){
             return  ResponseEntity.ok(tomap);
         }
          return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("view 조회 실패");
     }


    @RequestMapping(value = "/api/searchpreview", method = RequestMethod.GET)
    public ResponseEntity<?> viewSearch(@CurrentSecurityContext(expression = "authentication")
                                             Authentication authentication,Pageable pageable,
                                        @RequestParam(name = "productname") String productName) throws Exception {

        Page<Product> result = productRepository.findByProductNameContaining(pageable, productName);

        Page<ProductDto> tomap = result.map(e -> new ProductDto(e));


        if(!tomap.isEmpty()){
            return  ResponseEntity.ok(tomap);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("view 조회 실패");
    }

    //detail
    @RequestMapping(value = "/api/product/products_by_id", method = RequestMethod.GET)
    public ResponseEntity<?> viewDetail(@CurrentSecurityContext(expression = "authentication")
                                                Authentication authentication,
                                        @RequestParam(name = "id") Long productid) throws Exception {

        Optional<Product> byId = productRepository.findById(productid);
        System.out.println("byId = " + byId.get());
        ProductDetailDto productDetailDto = new ProductDetailDto(true,byId.get());


        if(!byId.isEmpty())
        {
            return ResponseEntity.ok(productDetailDto);
        }


        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("view 조회 실패");
    }
    @Data
    static class ProductDetailDto {
        boolean success;
        String productName;
        String productDesc;
        List<DetailOptionDto> Poptions=new ArrayList<>();
        List<FileDtopro> detailImages=new ArrayList<>();
        List<FileDtopro> thumbs=new ArrayList<>();
        public ProductDetailDto(boolean t,Product detail) {
            success=t;

            productName=detail.getProductName();
            productDesc=detail.getProductDesc();
            List<File> getImages = detail.getImages();
            for (File getImage : getImages) {
                if(getImage.isIsthumb()){
                    thumbs.add(new FileDtopro(getImage));
                }else{
                    detailImages.add(new FileDtopro(getImage));
                }
            }
            List <ProductOption> options =detail.getProductOptions();
            for (ProductOption option : options) {
                Poptions.add(new DetailOptionDto(option));
            }

        }
    }
    @Data
    static class DetailOptionDto {
        String optionName;
        Long optionId;
        int optionStock;
        int optionPrice;
        public DetailOptionDto(ProductOption o){
            optionId=o.getId();
            optionName=o.getOptionName();
            optionStock=o.getOptionStock();
            optionPrice=o.getOptionPrice();

        }

    }

    @Data
    static class ProductDto {
        Long proId;
        String proname;
        String shopname;
        List<FileDtopro> images=new ArrayList<>();

        public ProductDto(Product pro) {
            proId = pro.getId();
            proname=pro.getProductName();
            shopname=pro.getShop().getShopName();


            List<File> getImages = pro.getImages();
            for (File getImage : getImages) {
                if(getImage.isIsthumb()){
                    images.add(new FileDtopro(getImage));
                }
            }
        }
    }
    @Data
    static class FileDtopro {
        String filepath;
        public FileDtopro(File file){
            filepath= file.getFilepath();
        }
    }



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
