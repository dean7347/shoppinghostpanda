package com.indiduck.panda.controller;


import com.indiduck.panda.Repository.PandaToProductRepository;
import com.indiduck.panda.Repository.UserRepository;
import com.indiduck.panda.Service.PandaToProductService;
import com.indiduck.panda.domain.Panda;
import com.indiduck.panda.domain.PandaToProduct;
import com.indiduck.panda.domain.User;
import com.indiduck.panda.domain.dao.TFMessageDto;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RequiredArgsConstructor
@RestController
public class PandaToProductController {

    @Autowired
    PandaToProductService pandaToProductService;
    @Autowired
    PandaToProductRepository pandaToProductRepository;
    @Autowired
    UserRepository userRepository;

    @RequestMapping(value = "/api/addpropanda", method = RequestMethod.POST)
    public ResponseEntity<?> addPandaToProduct(@CurrentSecurityContext(expression = "authentication")
                                              Authentication authentication, @RequestBody AddPandaProDAO addPandaProDAO ) throws Exception {


        PandaToProduct pandaToProduct = pandaToProductService.newPtP(authentication.getName(), addPandaProDAO.productId, addPandaProDAO.link);
        
        if(pandaToProduct ==null)
        {
            return ResponseEntity.ok(new ResultDto(false,"판다신청에 실패했습니다"));
        }

        return ResponseEntity.ok(new ResultDto(true,"성공적으로 등록되었습니다"));

    }

    @RequestMapping(value = "/api/getpandas_by_id", method = RequestMethod.GET)
    public ResponseEntity<?> viewDetail(@CurrentSecurityContext(expression = "authentication")
                                                Authentication authentication,
                                        @RequestParam(name = "id") Long productid) throws Exception {

        List<PandaToProduct> byProduct = pandaToProductRepository.findByProductIdAndIsDel(productid,false);


        if(!byProduct.isEmpty())
        {
            return ResponseEntity.ok(new PandasDto(true,byProduct));
        }
        return ResponseEntity.ok(new PandasDto(false,null));

    }

    @RequestMapping(value = "/api/pandadashboardmovie", method = RequestMethod.GET)
    public ResponseEntity<?> viewDetail(@CurrentSecurityContext(expression = "authentication")
                                                Authentication authentication) throws Exception {

        String name = authentication.getName();
        Optional<User> byEmail = userRepository.findByEmail(name);
        Panda panda = byEmail.get().getPanda();
        Optional<List<PandaToProduct>> byPanda = pandaToProductRepository.findByPandaAndIsDel(panda,false);
        if(!byPanda.isEmpty())
        {
            return ResponseEntity.ok(new PandasDto(true,byPanda.get()));
        }

        return ResponseEntity.ok(new PandasDto(false,null));

    }

    @RequestMapping(value = "/api/pandamoviedel", method = RequestMethod.POST)
    public ResponseEntity<?> pandaMovieDel(@CurrentSecurityContext(expression = "authentication")
                                                Authentication authentication,@RequestBody PandaMovieID pandaMovieID) throws Exception {

        System.out.println("pandaMovieID = " + pandaMovieID);
        pandaToProductService.delURL(pandaMovieID.id);


        return ResponseEntity.ok(new TFMessageDto(true,"변경성공"));

    }

    @RequestMapping(value = "/api/pandamovieedit", method = RequestMethod.POST)
    public ResponseEntity<?> pandaMovieEdit(@CurrentSecurityContext(expression = "authentication")
                                                    Authentication authentication,@RequestBody PandaMovieID pandaMovieID) throws Exception {

        System.out.println("pandaMovieID = " + pandaMovieID);
        PandaToProduct pandaToProduct = pandaToProductService.editURL(pandaMovieID.id, pandaMovieID.editUrl);



        return ResponseEntity.ok(new TFMessageDto(true,"변경성공"));

    }

    @Data
    static class PandasDto {
        boolean success;
        List<PandasDetail> details =new ArrayList<>();

        public PandasDto(boolean t,List<PandaToProduct> ptp)
        {
            success=t;
            for (PandaToProduct pandaToProduct : ptp) {
               details.add(new PandasDetail(pandaToProduct.getLink(),pandaToProduct.getPanda().getPandaName(),
                       pandaToProduct.getPanda().getId(),pandaToProduct.getId())) ;
            }

        }

    }
    @Data
    static class AddPandaProDAO {
        String link;
        Long productId;
    }
    @Data
   static class PandasDetail {
        String link;
        String panda;
        Long pandaId;
        long pandaToProductId;
        public PandasDetail(String getLink,String getPanda,Long getPandaId,Long pdid)
        {
            link=getLink;
            panda=getPanda;
            pandaId=getPandaId;
            pandaToProductId=pdid;
        }
    }

    @Data
    private class ResultDto {
        boolean success;
        String message;
        public ResultDto(boolean b, String message) {
            success=b;
            message=message;
        }
    }

    @Data
    private static class PandaMovieID {
        long id;
        String editUrl;
    }
}
