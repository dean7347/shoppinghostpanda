package com.indiduck.panda;

import com.indiduck.panda.batch.aCmaQuartzScheduler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan({"com.indiduck.panda.*"})
public class PandaApplication extends SpringBootServletInitializer {
    @Override protected SpringApplicationBuilder configure(SpringApplicationBuilder builder)
    { return builder.sources(PandaApplication.class); }

    @Autowired
    private aCmaQuartzScheduler scheduler;


    public static void main(String[] args) {
        SpringApplication.run(PandaApplication.class, args);
    }

}
