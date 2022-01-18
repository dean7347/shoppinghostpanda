package com.indiduck.panda.controller;


import com.indiduck.panda.Repository.UserOrderRepository;
import com.indiduck.panda.Repository.UserRepository;
import com.indiduck.panda.Service.UserOrderService;
import com.indiduck.panda.domain.*;
import com.indiduck.panda.domain.dao.TFMessageDto;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequiredArgsConstructor

public class UserOrderController {
    @Autowired
    private final UserOrderService userOrderService;
    @Autowired
    private final UserOrderRepository userOrderRepository;
    @Autowired
    private final UserRepository userRepository;



    @RequestMapping(value = "/api/editstatus", method = RequestMethod.POST)
    public ResponseEntity<?> editStatus(@CurrentSecurityContext(expression = "authentication")
                                                Authentication authentication, @RequestBody ChangeAction changeAction) throws Exception {


        UserOrder userOrder = userOrderService.ChangeOrder(changeAction.userOrderId, changeAction.state, changeAction.courier, changeAction.waybill);
        if(userOrder.getOrderStatus().toString().equals(changeAction.state))
        {
            return ResponseEntity.ok(new TFMessageDto(true,"성공적으로 변경했습니다"));
            
        }
        return ResponseEntity.ok(new TFMessageDto(false,"취소할 수 없는주문입니다"));

    }

    @RequestMapping(value = "/api/shopdashboard", method = RequestMethod.POST)
    public ResponseEntity<?> shopDashBoard(@CurrentSecurityContext(expression = "authentication")
                                                Authentication authentication, @RequestBody ShopDashBoard shopDashBoard) throws Exception {


        try{
            LocalDateTime startDay= LocalDateTime.of(shopDashBoard.startYear,shopDashBoard.startMonth+1,shopDashBoard.startDay
                    ,0,0,0,0);
            LocalDateTime endDay= LocalDateTime.of(shopDashBoard.endYear,shopDashBoard.endMonth+1,shopDashBoard.endDay
                    ,23,59,59,999999999);
            String name = authentication.getName();
            Optional<User> byEmail = userRepository.findByEmail(name);
            Shop shop = byEmail.get().getShop();
            List<ShopDashboardDtoType> shopDashboardDtoTypeList = new ArrayList<>();
            List<UserOrder> uoList =new ArrayList<>();
            int finish=0;
            int yet =0;
           //상태정의
            if(shopDashBoard.status.equals("정산일자"))
            {
                Optional<List<UserOrder>> data = userOrderRepository.findByShopAndDepositCompletedNotNullAndDepositCompletedBetween(shop, startDay, endDay);
                uoList.addAll(data.get());
            }else if(shopDashBoard.status.equals("정산예정일")){
                Optional<List<UserOrder>> data = userOrderRepository.findByShopAndExpectCalculateNotNullAndExpectCalculateBetween(shop, startDay, endDay);
                uoList.addAll(data.get());

            }else if(shopDashBoard.status.equals("판매일자"))
            {
                Optional<List<UserOrder>> data = userOrderRepository.findByShopAndCreatedAtNotNullAndCreatedAtBetween(shop, startDay, endDay);
                uoList.addAll(data.get());

            }else if(shopDashBoard.status.equals("구매확정일자"))
            {
                Optional<List<UserOrder>> data = userOrderRepository.findByShopAndFinishAtNotNullAndFinishAtBetween(shop, startDay, endDay);
                uoList.addAll(data.get());

            }else
            {
                return ResponseEntity.ok(new DashboardDto(true,null,0,0));

            }

            for (UserOrder userOrder : uoList) {
                if(userOrder.getPaymentStatus()==PaymentStatus.지급대기 || userOrder.getPaymentStatus()==PaymentStatus.지급예정)
                {
                    yet+=userOrder.getShopMoney();
                }else if(userOrder.getPaymentStatus()==PaymentStatus.지급완료)
                {
                    finish+=userOrder.getShopMoney();
                }

                shopDashboardDtoTypeList.add(new ShopDashboardDtoType(userOrder));
            }
            return ResponseEntity.ok(new DashboardDto(true,shopDashboardDtoTypeList,finish,yet));

        } catch (Exception e)
        {
            System.out.println("E = " + e);

            return ResponseEntity.ok(new DashboardDto(true,null,0,0));


        }


    }

    @RequestMapping(value = "/api/shopdashboardforordernumber", method = RequestMethod.POST)
    public ResponseEntity<?> shopDashBoardForOrderNumber(@CurrentSecurityContext(expression = "authentication")
                                                   Authentication authentication, @RequestBody ShopDashBoardForUserOrderId shopDashBoardForUserOrderId) throws Exception {


        try{
            String name = authentication.getName();
            Optional<User> byEmail = userRepository.findByEmail(name);
            Shop shop = byEmail.get().getShop();
            Optional<UserOrder> byId = userOrderRepository.findByShopAndId(shop,shopDashBoardForUserOrderId.orderId);
            List<ShopDashboardDtoType> shopDashboardDtoTypeList = new ArrayList<>();

            shopDashboardDtoTypeList.add(new ShopDashboardDtoType(byId.get()));


            return ResponseEntity.ok(new DashboardDto(true,shopDashboardDtoTypeList,0,0));

        } catch (Exception e)
        {
            System.out.println("E = " + e);

            return ResponseEntity.ok(new DashboardDto(true,null,0,0));


        }


    }

    @Data
    private static class DashboardDto
    {
        boolean success;
        List<ShopDashboardDtoType> shopDashboardDtoTypeList=null;
        int finMoney;
        int expectMoney;


        public DashboardDto(boolean success, List<ShopDashboardDtoType> spdl, int f, int e) {
            this.success = success;
            this.shopDashboardDtoTypeList = spdl;
            this.finMoney=f;
            this.expectMoney=e;
        }
    }
    @Data
    private static class ShopDashboardDtoType
    {
        //주문번호
        Long id;
        //온전한 입금가격
        int beforeSalePrice;


        //정산금액
        int settlePrice;
        //수수료
        int fees;
        //판매일자
        LocalDateTime salesDate;
        //구매확정일자
        LocalDateTime confirmDate;
        //정산예정일
        LocalDateTime expectDate;
        //정산일자
        LocalDateTime depositCompleted;
        //정산상태
        PaymentStatus paymentStatus;


        public ShopDashboardDtoType(UserOrder uo) {
            this.id = uo.getId();
            //무료배송이 아닐경우
            if(uo.getFreeprice()>uo.getPureAmount())
            {
                this.beforeSalePrice = uo.getPureAmount()+uo.getShipPrice();
            }else
            {
                this.beforeSalePrice =uo.getPureAmount();
            }
            this.settlePrice = uo.getShopMoney();
            this.fees = uo.getPandaMoney()+uo.getHostMoney()+uo.getBalance();
            this.salesDate = uo.getCreatedAt();
            this.confirmDate = uo.getFinishAt();
            //정산예정일
            this.expectDate = uo.getExpectCalculate();
            //정산일
            this.depositCompleted = uo.getDepositCompleted();
            this.paymentStatus = uo.getPaymentStatus();
        }
    }


    @Data
    static class ChangeAction {
        //필수항목
        long userOrderId;
        String state;
        //발송중 항목에는 해당 항목을 넣어서 보낸다 없다면 ""을 담아서 보낸다
        String courier;
        String waybill;
    }

    @Data
    private static class ShopDashBoard {
        int startYear;
        int startMonth;
        int startDay;

        int endYear;
        int endMonth;
        int endDay;

        String status;
    }
    @Data
    private static class ShopDashBoardForUserOrderId
    {
        long orderId;
    }
}
