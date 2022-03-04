package com.indiduck.panda.controller;


import com.indiduck.panda.Repository.SettlePandaRepository;
import com.indiduck.panda.Repository.SettleShopRepository;
import com.indiduck.panda.domain.*;
import com.indiduck.panda.domain.dao.TFMessageDto;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RequiredArgsConstructor
@RestController
public class AdminContorller {

    @Autowired
    private final SettlePandaRepository settlePandaRepository;
    @Autowired
    private final SettleShopRepository settleShopRepository;

    //정산해야될 판다 리스트
    @RequestMapping(value = "/api/admin/pandaSettleList", method = RequestMethod.GET)
    public ResponseEntity<?> settlePanda(@CurrentSecurityContext(expression = "authentication")
                                               Authentication authentication , Pageable pageable) throws Exception {
//        System.out.println("pageable = " + pageable);
        Page<SettlePanda> page = settlePandaRepository.findByIsDeposit(false,pageable);
        System.out.println("settlePandaByDepoistIs = " +page);


//        return ResponseEntity.ok(new TFMessageDto(true,"zz"));

        return ResponseEntity.ok(new PandaListDTO(true,page));
    }
    @RequestMapping(value = "/api/admin/completepandaSettleList", method = RequestMethod.GET)
    public ResponseEntity<?> settlePandaCompleteList(@CurrentSecurityContext(expression = "authentication")
                                                             Authentication authentication, Pageable pageable) throws Exception {
        Page<SettlePanda> page = settlePandaRepository.findByIsDeposit(true,pageable);
        System.out.println("settlePandaByDepoistIs = " +page);


        return ResponseEntity.ok(new PandaListDTO(true,page));
    }


    @RequestMapping(value = "/api/admin/shopSettleList", method = RequestMethod.GET)
    public ResponseEntity<?> settleShop(@CurrentSecurityContext(expression = "authentication")
                                               Authentication authentication, Pageable pageable) throws Exception {

        Page<SettleShop> byIsDeposit = settleShopRepository.findByIsDeposit(false,pageable);

        return ResponseEntity.ok(new ShopListDTO(true,byIsDeposit));

    }




    @RequestMapping(value = "/api/admin/completeshopSettleList", method = RequestMethod.GET)
    public ResponseEntity<?> settleShopCompleteList(@CurrentSecurityContext(expression = "authentication")
                                                Authentication authentication, Pageable pageable) throws Exception {


        Page<SettleShop> byIsDeposit = settleShopRepository.findByIsDeposit(true,pageable);

        return ResponseEntity.ok(new ShopListDTO(true,byIsDeposit));

    }

    @Data
    private class PandaListDTO
    {
        boolean success;
        long totalElement;
        int totalPage;
        List<SettlePandaDetail> settlePandaDetails=new ArrayList<>();


        public PandaListDTO(boolean success, Page<SettlePanda> settlePandaPage) {
            this.success = success;
            totalElement=settlePandaPage.getTotalElements();
            totalPage=settlePandaPage.getTotalPages();
            for (SettlePanda settlePanda : settlePandaPage.getContent()) {
                settlePandaDetails.add(new SettlePandaDetail(settlePanda.getId(),settlePanda.getEnrollSettle(),settlePanda.getDepositDate(),
                        settlePanda.getDepoist(),settlePanda.isDeposit(),
                        settlePanda.getPanda().getPandaName(),settlePanda.getOrderDetails()));
            }
        }
    }

    @Data
    private class ShopListDTO
    {
        boolean success;
        long totalElement;
        int totalPage;
        List<SettleShopDetail> settleShopDetails=new ArrayList<>();


        public ShopListDTO(boolean success, Page<SettleShop> settlePandaPage) {
            this.success = success;
            totalElement=settlePandaPage.getTotalElements();
            totalPage=settlePandaPage.getTotalPages();
            for (SettleShop settleShop : settlePandaPage.getContent()) {
                settleShopDetails.add(new SettleShopDetail(settleShop.getId(),settleShop.getEnrollSettle(),settleShop.getDepositDate(),
                        settleShop.getDepoist(),settleShop.isDeposit(),
                        settleShop.getShop().getShopName(),settleShop.getUserOrder()));
            }
        }
    }

    @Data
    private class SettlePandaDetail
    {
        //아이디
        long id;
        //정산등록날짜
        LocalDateTime enrollSettle;
        //정산날짜
        LocalDateTime depoistDate;
        //정산된 금액
        int deposit;
        //입금 여부
        boolean isdeposit;
        //정산될 판다
        String pandaname;
        //정산될 OrderDetailId
        List<Long> detailIds=new ArrayList<>();

        public SettlePandaDetail(long id, LocalDateTime enrollSettle, LocalDateTime depoistDate, int deposit, boolean isdeposit, String pandaname, List<OrderDetail> detailId) {
            this.id = id;
            this.enrollSettle = enrollSettle;
            this.depoistDate = depoistDate;
            this.deposit = deposit;
            this.isdeposit = isdeposit;
            this.pandaname = pandaname;
            for (OrderDetail orderDetail : detailId) {
                this.detailIds.add(orderDetail.getId());
            }
        }


    }

    @Data
    private class SettleShopDetail
    {
        //아이디
        long id;
        //정산등록날짜
        LocalDateTime enrollSettle;
        //정산날짜
        LocalDateTime depoistDate;
        //정산된 금액
        int deposit;
        //입금 여부
        boolean isdeposit;
        //정산될 판다
        String shopName;
        //정산될 OrderDetailId
        List<Long> detailIds=new ArrayList<>();

        public SettleShopDetail(long id, LocalDateTime enrollSettle, LocalDateTime depoistDate, int deposit, boolean isdeposit, String shopName, List<UserOrder> detailId) {
            this.id = id;
            this.enrollSettle = enrollSettle;
            this.depoistDate = depoistDate;
            this.deposit = deposit;
            this.isdeposit = isdeposit;
            this.shopName = shopName;
            for (UserOrder us : detailId) {
                this.detailIds.add(us.getId());
            }
        }


    }


}
