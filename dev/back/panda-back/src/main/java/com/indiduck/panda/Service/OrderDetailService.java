package com.indiduck.panda.Service;

import com.indiduck.panda.Repository.*;
import com.indiduck.panda.controller.OrderDetailController;
import com.indiduck.panda.domain.*;
import com.siot.IamportRestClient.response.Payment;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderDetailService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    ProductRepository productRepository;
    @Autowired
    ProductOptionRepository productOptionRepository;
    @Autowired
    PandaRespository pandaRespository;
    @Autowired
    OrderDetailRepository orderDetailRepository;
    @Autowired
    ShopRepository shopRepository;
    @Autowired
    UserOrderRepository userOrderRepository;



    public OrderDetail newOrderDetail(String user,Long productid,Long optionId,int optionCount
                                           ,Long selectpanda)
    {


        Optional<User> getUser = userRepository.findByEmail(user);
        Optional<Product> getProduct = productRepository.findById(productid);
        Optional<ProductOption> getPO = productOptionRepository.findById(optionId);
        Optional<Panda> getPanda = pandaRespository.findById(selectpanda);

        //기존에 결제대기로 찾지않으면
        // 옵션을 리턴할때 유저랑 옵션으로 찾음
        // 결제대기랑 결제완료가 같이 찾아짐
        Optional<OrderDetail> byUserAAndOptions = orderDetailRepository.findByUserAndOptionsAndOrderStatus(getUser.get(), getPO.get(),OrderStatus.결제대기);


        if(!byUserAAndOptions.isEmpty()&& (byUserAAndOptions.get().getOrderStatus()==OrderStatus.결제대기))
        {


            byUserAAndOptions.get().plusCount(optionCount);
            byUserAAndOptions.get().setPanda(getPanda.get());
            return (byUserAAndOptions.get());
        }else {


            OrderDetail od = OrderDetail.newOrderDetail(getUser.get(), getProduct.get(), getPO.get(), optionCount, getPanda.get());
            orderDetailRepository.save(od);

        return od;
        }

    }
//    public  OrderDetail cancelOrderchangeOrderStatus(OrderStatus od,long odid)
//    {
//        Optional<UserOrder> byId = userOrderRepository.findById(odid);
////        Optional<OrderDetail> byId = orderDetailRepository.findById(odid);
//        if(byId.get().getOrderStatus()==OrderStatus.결제완료)
//        {
//
//            byId.get().
//            return byId.get();
//        }
//        return null;
//    }

    public OrderDetail newOrderDetail(String user, Long productid, Long optionId, int optionCount) {
        Optional<User> getUser = userRepository.findByEmail(user);
        Optional<Product> getProduct = productRepository.findById(productid);
        Optional<ProductOption> getPO = productOptionRepository.findById(optionId);


        Optional<OrderDetail> byUserAAndOptions = orderDetailRepository.findByUserAndOptionsAndOrderStatus(getUser.get(), getPO.get(),OrderStatus.결제대기);
        if(!byUserAAndOptions.isEmpty() && (byUserAAndOptions.get().getOrderStatus()==OrderStatus.결제대기)) {


            byUserAAndOptions.get().plusCount(optionCount);
            return (byUserAAndOptions.get());
        }else {

            OrderDetail od = OrderDetail.newOrderDetail(getUser.get(), getProduct.get(), getPO.get(), optionCount);
            orderDetailRepository.save(od);
            return od;
        }
    }


    public OrderDetail updateOrderDetail(OrderDetail order, int optionCount) {
            order.update(optionCount);
            return order;
    }

    public OrderDetail updateOrderDetail(OrderDetail order, int optionCount,Long panda) {
        Optional<Panda> getPanda = pandaRespository.findById(panda);

        order.update(optionCount);
        order.setPanda(getPanda.get());
        return order;
    }

    public void paymentOrderDetail(Payment info)
    {

        System.out.println(info.getAmount());
        System.out.println(info.getCustomData());
        System.out.println(info.getBuyerAddr());
        System.out.println(info.getBuyerPostcode());
        System.out.println(info.getPayMethod());
        System.out.println(info.getPaidAt());


        String customData = info.getCustomData();
        JSONObject jsonObject=new JSONObject(customData);
        //디테일배열
        JSONArray detail =jsonObject.getJSONArray("detaildId");

        //샵

        for (Object o : detail) {
            Optional<OrderDetail> byId = orderDetailRepository.findById(Long.parseLong(o.toString()));

//            byId.get().setOrderStatus(OrderStatus.결제완료);
        }

    }

    public boolean delete(Long odId)
    {
        try {
            Optional<OrderDetail> byId = orderDetailRepository.findById(odId);
            Panda panda = byId.get().getPanda();
            if(panda != null)
            {
                byId.get().deletePanda(panda);
            }
            orderDetailRepository.deleteById(odId);
            return true;
        }catch (Exception e)
        {
            return false;

        }
    }

    public boolean newUserOrder(User user,OrderDetailController.DetailedCart myCart,String mid,
                                String name,String phoneNumber,String zipCode,String Address) {

        System.out.println("오더서비스 겟네임"+name);
        for (OrderDetailController.DetailedShop d : myCart.getDs()) {
            Optional<Shop> byId = shopRepository.findById(d.getShopId());
            UserOrder uo= UserOrder.newUserOrder(user,byId.get(),mid,name,phoneNumber,zipCode,Address);
            for (OrderDetailController.DetailedProduct detailedProduct : d.getDp()) {
                for (OrderDetailController.DetailedOption detailedOption : detailedProduct.getDO()) {
                    Optional<OrderDetail> byId1 = orderDetailRepository.findById(detailedOption.getDetailedId());
                    uo.setDetail(byId1.get());
                }
            }
            uo.Calculate();
            userOrderRepository.save(uo);
        }

        return true;

    }

    @Data
    class temList{
        //상점이름
        //프로덕트
    }
}
