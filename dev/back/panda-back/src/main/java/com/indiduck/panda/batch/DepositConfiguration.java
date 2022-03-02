package com.indiduck.panda.batch;

import com.indiduck.panda.domain.OrderStatus;
import com.indiduck.panda.domain.UserOrder;
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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.persistence.EntityManagerFactory;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class DepositConfiguration {
    @Autowired
    public JobBuilderFactory jobBuilderFactory;
    @Autowired public StepBuilderFactory stepBuilderFactory;
    @Autowired public EntityManagerFactory entityManagerFactory;

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
                .<UserOrder,UserOrder>chunk(10)
                .reader(Depositreader())
                .processor(Depositprocessor())
                .writer(Depositwriter())
                .build();
    }

    @Bean
    @StepScope
    public JpaPagingItemReader<UserOrder> Depositreader() throws Exception {

        Map<String,Object> parameterValues = new HashMap<>();
        parameterValues.put("Estatus", false);
        parameterValues.put("od", OrderStatus.구매확정);

        log.info("청구서 쿼리 시작");

        return new JpaPagingItemReaderBuilder<UserOrder>()
                .pageSize(10)
                .parameterValues(parameterValues)
                .queryString("SELECT uo FROM UserOrder uo where uo.enrollSettle =: Estatus And uo.orderStatus =: od ORDER BY id ASC")
                .entityManagerFactory(entityManagerFactory)
                .name("JpaPagingItemReader")
                .build();
    }

    @Bean
    @StepScope
    public ItemProcessor<UserOrder, UserOrder> Depositprocessor(){

        return new ItemProcessor<UserOrder, UserOrder>() {
            @Override
            public UserOrder process(UserOrder us) throws Exception {
                System.out.println("청구서결제의us = " + us);

                return us;
            }
        };
    }

    @Bean
    @StepScope
    public JpaItemWriter<UserOrder> Depositwriter(){
        return new JpaItemWriterBuilder<UserOrder>()
                .entityManagerFactory(entityManagerFactory)
                .build();
    }
}
