package com.indiduck.panda;

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



    public static void main(String[] args) {
        SpringApplication.run(PandaApplication.class, args);
    }

}
