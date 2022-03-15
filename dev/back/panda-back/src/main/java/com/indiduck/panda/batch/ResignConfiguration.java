//package com.indiduck.panda.batch;
//
//import com.indiduck.panda.Service.ShopService;
//import com.indiduck.panda.domain.PaymentStatus;
//import com.indiduck.panda.domain.SettleShop;
//import com.indiduck.panda.domain.Shop;
//import com.indiduck.panda.domain.User;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.batch.core.Job;
//import org.springframework.batch.core.Step;
//import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
//import org.springframework.batch.core.configuration.annotation.JobScope;
//import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
//import org.springframework.batch.core.configuration.annotation.StepScope;
//import org.springframework.batch.item.ItemProcessor;
//import org.springframework.batch.item.database.JpaItemWriter;
//import org.springframework.batch.item.database.JpaPagingItemReader;
//import org.springframework.batch.item.database.builder.JpaItemWriterBuilder;
//import org.springframework.batch.item.database.builder.JpaPagingItemReaderBuilder;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//import javax.persistence.EntityManagerFactory;
//import java.util.HashMap;
//import java.util.Map;
//
//@Slf4j
//@Configuration
//@RequiredArgsConstructor
//public class ResignConfiguration {
//    @Autowired
//    public JobBuilderFactory jobBuilderFactory;
//    @Autowired public StepBuilderFactory stepBuilderFactory;
//    @Autowired public EntityManagerFactory entityManagerFactory;
//    @Autowired
//    private final ShopService shopService;
//
//
//    @Bean
//    public Job DepositJob() throws Exception {
//        log.info("회원탈퇴 스케쥴링 시작");
//        Job Resign = jobBuilderFactory.get("ResignJob")
//                .start(ResignStep())
//
//                .build();
//
//        return Resign;
//    }
//
//    @Bean
//    @JobScope
//    public Step ResignStep() throws Exception {
//
//        return stepBuilderFactory.get("ResignStep")
//                .<Shop,Shop>chunk(10)
//                .reader(Resignreader())
//                .processor(Resignprocessor())
//                .writer(Resignwriter())
//                .build();
//    }
//
//    @Bean
//    @StepScope
//    public JpaPagingItemReader<User> Resignreader() throws Exception {
//
//        Map<String,Object> parameterValues = new HashMap<>();
//        parameterValues.put("Estatus", false);
////        parameterValues.put("od", OrderStatus.구매확정);
//        parameterValues.put("ps", PaymentStatus.지급대기);
//        return new JpaPagingItemReaderBuilder<User>()
//                .pageSize(10)
//                .parameterValues(parameterValues)
//                //샵 userorder.
//                .queryString("SELECT u FROM User u where u.leaveAt <: beforeDay")
////                .queryString("SELECT uo FROM UserOrder uo where uo.enrollSettle =: Estatus And uo.orderStatus =: od And uo.paymentStatus =: ps ORDER BY id ASC")
//                .entityManagerFactory(entityManagerFactory)
//                .name("JpaPagingItemReader")
//                .build();
//    }
//
//    @Bean
//    @StepScope
//    public ItemProcessor<User, User> Resignprocessor() throws Exception {
//
//        System.out.println(" =프로세서입장 " );
//
//        return new ItemProcessor<User, User>() {
//            @Override
//            public User process(User user) throws Exception {
//                System.out.println("탈퇴할 유저는? " + user.getEmail());
//
//
//                return user;
//            }
//
//        };
//    }
//
//    @Bean
//    @StepScope
//    public JpaItemWriter<Shop> Resignwriter(){
//        System.out.println("라이터실행");
//        return new JpaItemWriterBuilder<Shop>()
//                .entityManagerFactory(entityManagerFactory)
//                .build();
//    }
//}
