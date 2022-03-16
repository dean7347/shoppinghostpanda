package com.indiduck.panda.controller;


import com.indiduck.panda.Repository.OrderDetailRepository;
import com.indiduck.panda.Repository.ShopRepository;
import com.indiduck.panda.Repository.UserOrderRepository;
import com.indiduck.panda.Repository.UserRepository;
import com.indiduck.panda.Service.RefundRequestService;
import com.indiduck.panda.Service.UserOrderService;
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
import java.util.HashSet;
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
    @Autowired
    private final ShopRepository shopRepository;
    @Autowired
    private final RefundRequestService refundRequestService;
    @Autowired
    private final OrderDetailRepository orderDetailRepository;


    //유저가 최초로 환불 신청을 한다
    @RequestMapping(value = "/api/refundactionforuser", method = RequestMethod.POST)
    public ResponseEntity<?> refundactionforuser(@CurrentSecurityContext(expression = "authentication")
                                                Authentication authentication, @RequestBody RefundReq refundReq) throws Exception {
        String name = authentication.getName();
        Optional<User> byEmail = userRepository.findByEmail(name);
        System.out.println("refundReq = " + refundReq);
        Optional<UserOrder> byId = userOrderRepository.findById(refundReq.userOrderId);
        byId.get().refundOrder(refundReq.refundMessage);
        List<RefundList> refundList = refundReq.refundList;
        List<OrderDetail> orderDetails=new ArrayList<>();
        for (RefundList list : refundList) {
            long optionId = list.optionId;
            Optional<OrderDetail> byId1 = orderDetailRepository.findById(optionId);
            OrderDetail orderDetail = byId1.get();
            orderDetail.reqRefund(list.optionCount);

            orderDetails.add(orderDetail);
            System.out.println("orderDetail추가완료 = " + orderDetail);

        }
        refundRequestService.newRefundRequest(byId.get(),orderDetails,refundReq.refundMessage,byEmail.get());

        return ResponseEntity.ok(new TFMessageDto(true,"상태변경 완료"));


    }

    @RequestMapping(value = "/api/editstatus", method = RequestMethod.POST)
    public ResponseEntity<?> editStatus(@CurrentSecurityContext(expression = "authentication")
                                                Authentication authentication, @RequestBody ChangeAction changeAction) throws Exception {


        UserOrder userOrder = userOrderService.ChangeOrder(changeAction.userOrderId, changeAction.state, changeAction.courier, changeAction.waybill);
        if(userOrder !=null)
        {
            return ResponseEntity.ok(new TFMessageDto(true,"상태변경 완료"));

        }

        return ResponseEntity.ok(new TFMessageDto(false,"상태변경에 실패했습니다"));

    }

    @RequestMapping(value = "/api/extendconfirm", method = RequestMethod.POST)
    public ResponseEntity<?> extendConfirm(@CurrentSecurityContext(expression = "authentication")
                                                Authentication authentication, @RequestBody ShopDashBoardForUserOrderId sdbf) throws Exception {


        boolean b = userOrderService.extendConfirm(sdbf.orderId);
        if(b)
        {
            return ResponseEntity.ok(new TFMessageDto(true,"구매기간 연장 성공"));
            
        }

        return ResponseEntity.ok(new TFMessageDto(false,"3번이상 연장을 했거나 연장할 수 있는 상태가 아닙니다"));

    }

    @RequestMapping(value = "/api/selecteditstatus", method = RequestMethod.POST)
    public ResponseEntity<?> selectedEditStatus(@CurrentSecurityContext(expression = "authentication")
                                                Authentication authentication, @RequestBody ChangeActions changeAction) throws Exception {

        System.out.println("changeAction = " + changeAction.userOrderId);
        long num=0;
        for (long l : changeAction.userOrderId) {
            UserOrder userOrder = userOrderService.ChangeOrder(l, changeAction.state, changeAction.courier, changeAction.waybill);
            if(userOrder==null)
            {
                num=l;

                return ResponseEntity.ok(new TFMessageDto(false,num+"번 주문이 이미 취소되었거나 확인에 실패했습니다"));


            }


        }
        return ResponseEntity.ok(new TFMessageDto(true,"상태변경 완료"));


    }




    @RequestMapping(value = "/api/shop/shoporderlist", method = RequestMethod.GET)
    public ResponseEntity<?> editStatus(@CurrentSecurityContext(expression = "authentication")
                                                Authentication authentication, Pageable pageable, @RequestParam("type")String type) throws Exception {
        String name = authentication.getName();
        Optional<User> byEmail = userRepository.findByEmail(name);
        List<UserOrder> byUserId = new ArrayList<>();
        Page<UserOrder> byShopAndOrderStatus = null;

        switch (type)
        {
            //신규주문
            case "recent":byShopAndOrderStatus=userOrderRepository.findByShopAndOrderStatus(pageable,byEmail.get().getShop(),OrderStatus.결제완료);
                System.out.println("최근주문조회");
            break;
            //준비중인주문
            case "ready" :byShopAndOrderStatus=userOrderRepository.findByShopAndOrderStatus(pageable,byEmail.get().getShop(),OrderStatus.준비중);
                break;

            //배송중인주문
            case "shipping" :byShopAndOrderStatus=userOrderRepository.findByShopAndOrderStatus(pageable,byEmail.get().getShop(),OrderStatus.발송중);
                break;

            //교환/반품요청
            case "change" :byShopAndOrderStatus=userOrderRepository.findByShopAndOrderStatus(pageable,byEmail.get().getShop(),OrderStatus.상점확인중);
                break;

            //완료된 주문
            case "finish" :byShopAndOrderStatus=userOrderRepository.findByShopAndOrderStatus(pageable,byEmail.get().getShop(),OrderStatus.구매확정);
                break;

            //교환/반품확인
            case "check" :byShopAndOrderStatus=userOrderRepository.findByShopAndOrderStatus(pageable,byEmail.get().getShop(),OrderStatus.환불대기);
                break;
            default:
                System.out.println("없는 주문요청입니다");
                break;

        }
        List<ShopDashBoardDTO> dashs= new ArrayList<>();
        if(!byShopAndOrderStatus.isEmpty())
        {
            for (UserOrder shopAndOrderStatus : byShopAndOrderStatus) {
                List<OrderDetail> detail = shopAndOrderStatus.getDetail();
                HashSet<String> productName=new HashSet<>();
                for (OrderDetail orderDetail : detail) {
                    productName.add(orderDetail.getProducts().getProductName());
                }
                int redundancy =0;
                if(shopAndOrderStatus.getPureAmount()<shopAndOrderStatus.getFreeprice())
                {
                    redundancy+=shopAndOrderStatus.getShipPrice();
                }

                dashs.add(new ShopDashBoardDTO(shopAndOrderStatus.getId(),productName.toString(),shopAndOrderStatus.getPureAmount()+redundancy
                        ,shopAndOrderStatus.getCreatedAt(),shopAndOrderStatus.getPaymentStatus(),
                        shopAndOrderStatus.getCourierCom(),shopAndOrderStatus.getWaybillNumber()));
            }
        }

        System.out.println("dashs = " + byShopAndOrderStatus);
        System.out.println("dashs = " + type);


        System.out.println("dashs = " + dashs);


        return ResponseEntity.ok(new pageDto(true,byShopAndOrderStatus.getTotalPages(),byShopAndOrderStatus.getTotalElements(),dashs));

    }

    @RequestMapping(value = "/api/shopdashboard", method = RequestMethod.POST)
    public ResponseEntity<?> shopDashBoard(@CurrentSecurityContext(expression = "authentication")
                                                Authentication authentication, @RequestBody ShopDashBoard shopDashBoard) throws Exception {

        System.out.println("shopDashBoard = " + shopDashBoard);
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
            if(shopDashBoard.searchDateMode.equals("정산일자"))
            {
                Optional<List<UserOrder>> data = userOrderRepository.findByShopAndDepositCompletedNotNullAndDepositCompletedBetween(shop, startDay, endDay);
                uoList.addAll(data.get());
            }else if(shopDashBoard.searchDateMode.equals("정산예정일")){
                Optional<List<UserOrder>> data = userOrderRepository.findByShopAndExpectCalculateNotNullAndExpectCalculateBetween(shop, startDay, endDay);
                uoList.addAll(data.get());

            }else if(shopDashBoard.searchDateMode.equals("판매일자"))
            {
                Optional<List<UserOrder>> data = userOrderRepository.findByShopAndCreatedAtNotNullAndCreatedAtBetween(shop, startDay, endDay);
                uoList.addAll(data.get());

            }else if(shopDashBoard.searchDateMode.equals("구매확정일자"))
            {
                Optional<List<UserOrder>> data = userOrderRepository.findByShopAndFinishAtNotNullAndFinishAtBetween(shop, startDay, endDay);
                uoList.addAll(data.get());

            }else
            {
                return ResponseEntity.ok(new DashboardDto(true,null,0,0));

            }

            for (UserOrder userOrder : uoList) {
                if(userOrder.getPaymentStatus()==PaymentStatus.지급대기 || userOrder.getPaymentStatus()==PaymentStatus.지급예정 )
                {
                    yet+=userOrder.getShopMoney();
                }else if(userOrder.getPaymentStatus()==PaymentStatus.지급완료)
                {
                    finish+=userOrder.getShopMoney();
                }

                shopDashboardDtoTypeList.add(new ShopDashboardDtoType(userOrder));
            }
            System.out.println(" 나가는데이터= " + shopDashboardDtoTypeList);
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

            return ResponseEntity.ok(new DashboardDto(false,null,0,0));


        }


    }


    @Data
    private class pageDto{
        boolean success;
        int totalpage;
        Long totalElement;
        List<ShopDashBoardDTO> pageList=new ArrayList<>();
        public pageDto(boolean su, int totalP, Long totalE, List<ShopDashBoardDTO> pl)
        {
            success=su;
            totalpage=totalP;
            totalElement=totalE;
            pageList=pl;
        }
    }

    @Data
    private static class ShopDashBoardDTO{
        long id;
        String name;
        int price;
        LocalDateTime orderAt;
        String paymentStatus;
        String comp;
        String number;

        public ShopDashBoardDTO(long id, String name, int price, LocalDateTime orderAt, PaymentStatus paymentStatus, String comp, String number) {
            this.id = id;
            this.name = name;
            this.price = price;
            this.orderAt = orderAt;
            if(paymentStatus==null)
            {
                this.paymentStatus = null;

            }else
            {
                this.paymentStatus = paymentStatus.toString();

            }
            this.comp = comp;
            this.number = number;
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
        //정가

        //온전한 입금가격(정가)
        int beforeSalePrice;

        //실제 판매가
        int realPrice;


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
            this.realPrice=uo.getFullprice();
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
    static class ChangeActions {
        //필수항목
        long[] userOrderId;
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
        String searchDateMode;
    }
    @Data
    private static class ShopDashBoardForUserOrderId
    {
        long orderId;
    }

    private class PaymentStatusType {
        String type;
    }

    @Data
    private static class RefundReq {
        long userOrderId;
        String refundMessage;
        List<RefundList> refundList;
    }

    @Data
    private static class RefundList {
        boolean ispanda;
        long key;
        int max;
        int optionCount;
        long optionId;
        String optionName;
        String optionPrice;
        int originPrice;

    }

}
