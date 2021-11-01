package com.indiduck.panda.controller;


import com.indiduck.panda.Repository.OrderDetailRepository;
import com.indiduck.panda.Repository.UserRepository;
import com.indiduck.panda.Service.OrderDetailService;
import com.indiduck.panda.domain.File;
import com.indiduck.panda.domain.OrderDetail;
import com.indiduck.panda.domain.OrderStatus;
import com.indiduck.panda.domain.User;
import com.indiduck.panda.domain.dto.ResultDto;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
public class OrderDetailController {
    @Autowired
    OrderDetailService orderDetailService;
    @Autowired
    UserRepository userRepository;
    @Autowired
    OrderDetailRepository orderDetailRepository;

    //상품 주문
    @RequestMapping(value = "/api/addcart", method = RequestMethod.POST)
    public ResponseEntity<?> createShop(@CurrentSecurityContext(expression = "authentication")
                                                Authentication authentication, @RequestBody CreateOrderDetailDAO createProductDAO) throws Exception {

        System.out.println("CreateOrderDetailDAO = " + createProductDAO);
        List<detailOptionDAO> cart = createProductDAO.cart;
        for (detailOptionDAO detailOptionDAO : cart) {
            try {
                if(createProductDAO.selectpanda==null)
                {
                    orderDetailService.newOrderDetail(authentication.getName(), createProductDAO.productid
                            , detailOptionDAO.optionId, detailOptionDAO.optionCount);
                }else
                {
                    orderDetailService.newOrderDetail(authentication.getName(), createProductDAO.productid
                            , detailOptionDAO.optionId, detailOptionDAO.optionCount, createProductDAO.selectpanda);
                }

            }catch (Exception e)

            {
                return ResponseEntity.ok(new ResultDto(false,"상품을 담는중 오류가 발생했습니다" +
                        "계속 발생할시 1:1 문의바랍니다"));
            }
        }


        return ResponseEntity.ok(new ResultDto(true,"상품담기 성공"));
    }

    //상품카트
    @RequestMapping(value = "/api/mycart", method = RequestMethod.GET)
    public ResponseEntity<?> viewMyCart(@CurrentSecurityContext(expression = "authentication")
                                             Authentication authentication) throws Exception {
        Optional<User> byEmail = userRepository.findByEmail(authentication.getName());
        Optional<List<OrderDetail>> byUserAndOrderStatus = orderDetailRepository.findByUserAndOrderStatus(byEmail.get(), OrderStatus.결제대기);
        List<OrderDetail> orderDetails = byUserAndOrderStatus.get();


        DetailedCart myCart = new DetailedCart(orderDetails);
        System.out.println("myCart = " + myCart);






        return ResponseEntity.ok(new thisResultDto(true,myCart));
    }

    //옵션삭제
    @RequestMapping(value = "/api/cart/removeoption", method = RequestMethod.POST)
    public ResponseEntity<?> removeoption(@CurrentSecurityContext(expression = "authentication")
                                                Authentication authentication, @RequestBody removeDetailDAO removeDetailDAO) throws Exception {

        try {
            orderDetailRepository.deleteById(removeDetailDAO.orderDetailId);
            return ResponseEntity.ok(new ResultDto(true,"성공적으로 삭제했습니다"));

        }catch (Exception e)
        {
            return ResponseEntity.ok(new ResultDto(false,"삭제실패"));
        }
        
    }


    ///////////
    @Data
    static class DetailedCart{

        HashSet<DetailedShop> ds = new HashSet<>();

        public DetailedCart(List<OrderDetail> orderDetails){

            for (OrderDetail orderDetail : orderDetails) {
                if (ds.contains(new DetailedShop(orderDetail)))
                {
                    for (DetailedShop d : ds) {
                        if(d.shopId==orderDetail.getShop().getId())
                        {
                            if(d.dp.contains(new DetailedProduct(orderDetail)))
                            {
                                for (DetailedProduct detailedProduct : d.dp) {
                                    if(detailedProduct.productId==orderDetail.getProducts().getId())
                                    {
                                        detailedProduct.dO.add(new DetailedOption(orderDetail));
                                    }
                                }
                            }
                            else
                            {
                                d.dp.add(new DetailedProduct(orderDetail));

                            }
                        }
                    }
                }
                else
                {
                    ds.add(new DetailedShop(orderDetail));
                }




            }
        }
    }

    @Data
    static class DetailedShop {
        Long shopId;
        String shopName;
        int freePrice;
        int shipPrice;
        HashSet<DetailedProduct> dp = new HashSet<>();



        public DetailedShop(OrderDetail od) {
            shopId = od.getShop().getId();
            shopName = od.getShop().getShopName();
            freePrice=od.getShop().getFreePrice();
            shipPrice=od.getShop().getShipPrice();
            dp.add(new DetailedProduct(od));
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            DetailedShop that = (DetailedShop) o;
            return Objects.equals(shopId, that.shopId);
        }

        @Override
        public int hashCode() {

            return Objects.hash(shopId);
        }
        


    }







    @Data
    static class DetailedProduct{
        Long productId;
        String productName;
        String thumbNail;
        HashSet<DetailedOption> dO = new HashSet<DetailedOption>();

        public DetailedProduct(OrderDetail od){


            productId =od.getProducts().getId();
            productName=od.getProducts().getProductName();
            for (File image : od.getProducts().getImages()) {
                if(image.isIsthumb()==true)
                {
                    thumbNail=image.getFilepath();
                    break;
                }
            }
            dO.add(new DetailedOption(od));
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            DetailedProduct that = (DetailedProduct) o;
            return Objects.equals(productId, that.productId);
        }

        @Override
        public int hashCode() {
            return Objects.hash(productId);
        }
    }

    @Data
    static class DetailedOption{
        Long optionId;
        int optionCount;
        int originPrice;
        String optionName;
        Long detailedId;
        public DetailedOption(OrderDetail detail){
            detailedId=detail.getId();
            optionId=detail.getOptions().getId();
            optionCount=detail.getProductCount();
            originPrice=detail.getOptions().getOptionPrice();
            optionName=detail.getOptions().getOptionName();
        }

    }


    ///




        @Data
        static class CreateOrderDetailDAO {
            private Long productid;
            private List<detailOptionDAO> cart;
            private Long selectpanda;
        }

        @Data
        static class detailOptionDAO {
            private Long optionId;
            private int optionCount;
            private String originPrice;
            private String optionPrice;

        }

        @Data
        static class thisResultDto {
            boolean success;
            DetailedCart dtos;

            public thisResultDto(boolean b, DetailedCart mycart) {
                success = b;
                dtos = mycart;
            }
        }
        @Data
    static class removeDetailDAO {
        private Long orderDetailId;
    }
}
