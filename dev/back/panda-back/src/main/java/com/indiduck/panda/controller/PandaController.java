package com.indiduck.panda.controller;

import com.indiduck.panda.Repository.OrderDetailRepository;
import com.indiduck.panda.Repository.PandaRespository;
import com.indiduck.panda.Repository.UserRepository;
import com.indiduck.panda.Service.PandaService;
import com.indiduck.panda.config.JwtTokenUtil;
import com.indiduck.panda.domain.*;
import com.indiduck.panda.domain.dto.ResultDto;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.web.bind.annotation.*;

import java.text.spi.DateFormatProvider;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RequiredArgsConstructor
@RestController
public class PandaController {

    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    PandaRespository pandaRespository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    private final OrderDetailRepository orderDetailRepository;

    @Autowired
    PandaService pandaService;


    @GetMapping("/api/ispanda")
    @ResponseBody
    public ResponseEntity<?> ispanda(@CookieValue(name = "accessToken") String usernameCookie)
    {

        String usernameFromToken = jwtTokenUtil.getUsername(usernameCookie);
        System.out.println("usernameFromToken = " + usernameFromToken);
        if(usernameFromToken !=null)
        {
            Optional<User> byEmail = userRepository.findByEmail(usernameFromToken);

            if(!byEmail.isEmpty())
            {
                Optional<Panda> byUser = pandaRespository.findByUser(byEmail.get());

                if(byUser.isEmpty())
                {
                    return ResponseEntity.status(HttpStatus.OK).body(new isPandaDto(false,false));
                }else
                {
                    if(byUser.get().isRecognize())
                    {
                        return ResponseEntity.status(HttpStatus.OK).body(new isPandaDto(true,true));

                    }
                }
                return ResponseEntity.status(HttpStatus.OK).body(new isPandaDto(true,false));

            }
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("올바르지 못한 요청입니다 ");

    }



    @RequestMapping(value = "/api/regpanda", method = RequestMethod.POST)
    public ResponseEntity<?> regPanda(@CurrentSecurityContext(expression = "authentication")
                                                Authentication authentication, @RequestBody RegPandaDAO regPandaDAO) throws Exception {


        Panda panda = pandaService.newPanda(authentication.getName(),
                regPandaDAO.pandaname,
                regPandaDAO.mainchname,
                regPandaDAO.intcategory,
                regPandaDAO.termsagree,
                regPandaDAO.infoagree);

        if(panda==null){
            return ResponseEntity.ok(new ResultDto(false,"판다신청에 실패했습니다"));
        }
        return ResponseEntity.ok(new ResultDto(true,"판다신청에 성공했습니다"));
    }

    //자신이 판다인지 조회하고 시작날짜 끝날자, 스테이터스로 조회한다다
    @RequestMapping(value = "/api/pandadashboard", method = RequestMethod.POST)
    public ResponseEntity<?> pandaDashBoard(@CurrentSecurityContext(expression = "authentication")
                                              Authentication authentication, @RequestBody PandaDashBoardDto pandaDashBoardDto) throws Exception {

//        try{
            String name = authentication.getName();
            Optional<User> byEmail = userRepository.findByEmail(name);
            Panda panda = byEmail.get().getPanda();
            Optional<List<OrderDetail>> orderDetailsByPandaAndPaymentStatusAndFinishedAtBetween;
            List<PandaDashboardDtoType> pandaDashboardDtoList=new ArrayList<>();
            if(pandaDashBoardDto.status=="지급완료")
            {
                orderDetailsByPandaAndPaymentStatusAndFinishedAtBetween =
                        orderDetailRepository.findByPandaAndPaymentStatusOrPaymentStatusAndFinishedAtBetween(panda, PaymentStatus.지급완료,PaymentStatus.지급완료
                                , pandaDashBoardDto.startDay, pandaDashBoardDto.endDay);

            }else
            {
                orderDetailsByPandaAndPaymentStatusAndFinishedAtBetween =
                        orderDetailRepository.findByPandaAndPaymentStatusOrPaymentStatusAndFinishedAtBetween(panda, PaymentStatus.지급예정,PaymentStatus.지급대기
                                , pandaDashBoardDto.startDay, pandaDashBoardDto.endDay);

            }
            if(orderDetailsByPandaAndPaymentStatusAndFinishedAtBetween.isEmpty())
            {
                return ResponseEntity.ok(new DashboardDto(true,pandaDashboardDtoList));

            }
            for (OrderDetail orderDetail : orderDetailsByPandaAndPaymentStatusAndFinishedAtBetween.get()) {
//                System.out.println("orderDetail = " + orderDetail.getOrderStatus().toString());
//                System.out.println("orderDetail = " + orderDetail.getPandaMoney());
//                System.out.println("orderDetail = " + orderDetail.getFinishedAt());

                pandaDashboardDtoList.add(new PandaDashboardDtoType(orderDetail.getOrderStatus().toString(),orderDetail.getPandaMoney(),orderDetail.getFinishedAt()) );
            }

            return ResponseEntity.ok(new DashboardDto(true,pandaDashboardDtoList));
//        }catch (Exception E)
//        {
//            System.out.println("E = " + E);
//            return ResponseEntity.ok(new DashboardDto(false,null));
//
//        }

    }
    @Data
    private static class DashboardDto
    {
        boolean success;
        List<PandaDashboardDtoType> pandaDashboardDtoList=null;


        public DashboardDto(boolean success, List<PandaDashboardDtoType> pandaDashboardDtoList) {
            this.success = success;
            this.pandaDashboardDtoList = pandaDashboardDtoList;
        }
    }

    @Data
    private static class PandaDashboardDtoType
    {
        String status;
        int money;
        LocalDateTime localDateTime;

        public PandaDashboardDtoType(String status, int money, LocalDateTime localDateTime) {
            this.status = status;
            this.money = money;
            this.localDateTime = localDateTime;
        }
    }
    @Data
    private static class PandaDashBoardDto {
        LocalDateTime startDay;
        LocalDateTime endDay;
        String status;


    }

   @Data
    static class isPandaDto {
        boolean ispanda;
        boolean approve;
        public isPandaDto(boolean b,boolean a) {
            ispanda=b;
            approve=a;
        }
    }
    @Data
    static class RegPandaDAO {
        String pandaname;
        String mainchname;
        String intcategory;
        boolean termsagree;
        boolean infoagree;
    }



}
