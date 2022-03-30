package com.indiduck.panda.batch;

import com.indiduck.panda.Service.ShopService;
import com.indiduck.panda.domain.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.JobScope;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.database.JpaItemWriter;
import org.springframework.batch.item.database.JpaPagingItemReader;
import org.springframework.batch.item.database.builder.JpaItemWriterBuilder;
import org.springframework.batch.item.database.builder.JpaPagingItemReaderBuilder;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.persistence.EntityManagerFactory;
import java.lang.reflect.Field;
import java.time.LocalDateTime;
import java.util.*;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class DepositConfiguration {
    @Autowired
    public JobBuilderFactory jobBuilderFactory;
    @Autowired public StepBuilderFactory stepBuilderFactory;
    @Autowired public EntityManagerFactory entityManagerFactory;
    @Autowired
    private final ShopService shopService;


    @Bean
    public Job DepositJob() throws Exception {
        log.info("정산 스케쥴링 시작");
        Job Deposit = jobBuilderFactory.get("DepositJob")
                .start(DepositStep())

                .build();

        return Deposit;
    }

    @Bean
    @JobScope
    public Step DepositStep() throws Exception {

        return stepBuilderFactory.get("DepositStep")
                .<Shop,Shop>chunk(10)
                .reader(Depositreader())
                .processor(Depositprocessor())
                .writer(Depositwriter())
                .build();
    }

    @Bean
    @StepScope
    public JpaPagingItemReader<Shop> Depositreader() throws Exception {

        Map<String,Object> parameterValues = new HashMap<>();
        parameterValues.put("Estatus", false);
//        parameterValues.put("od", OrderStatus.구매확정);
        parameterValues.put("ps", PaymentStatus.지급대기);
        return new JpaPagingItemReaderBuilder<Shop>()
                .pageSize(10)
                .parameterValues(parameterValues)
                //샵 userorder.
                .queryString("Select s FROM Shop s where exists (Select uo from s.userOrders uo where uo.enrollSettleShop =: Estatus And uo.paymentStatus =: ps) ORDER BY id ASC")
//                .queryString("SELECT uo FROM UserOrder uo where uo.enrollSettle =: Estatus And uo.orderStatus =: od And uo.paymentStatus =: ps ORDER BY id ASC")
                .entityManagerFactory(entityManagerFactory)
                .name("JpaPagingItemReader")
                .build();
    }

    @Bean
    @StepScope
    public ItemProcessor<Shop, Shop> Depositprocessor() throws Exception {

//        System.out.println(" =프로세서입장 " );

        return new ItemProcessor<Shop, Shop>() {
            @Override
            public Shop process(Shop shop) throws Exception {
                System.out.println("청구서결제의us = " + shop.getShopName());
                SettleShop settleShop = shopService.SettleLogic(shop);


                return shop;
            }

        };
    }

    @Bean
    @StepScope
    public JpaItemWriter<Shop> Depositwriter(){
        System.out.println("라이터실행");
        return new JpaItemWriterBuilder<Shop>()
                .entityManagerFactory(entityManagerFactory)
                .build();
    }
}
