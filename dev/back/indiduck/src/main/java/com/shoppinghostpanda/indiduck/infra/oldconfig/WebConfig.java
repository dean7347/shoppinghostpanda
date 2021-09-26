//package com.shoppinghostpanda.indiduck.infra.config;
//import com.shoppinghostpanda.indiduck.modules.notification.NotificationInterceptor;
//import lombok.RequiredArgsConstructor;
//import org.springframework.boot.autoconfigure.security.StaticResourceLocation;
//import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//import java.util.Arrays;
//import java.util.List;
//import java.util.stream.Collectors;
//
//@Configuration
////EnableWebMvc는 스프링 부트가 제공하는 mvc자동설정 사용하지 않겠다임
////그대로 사용하고 추가설점만
//@RequiredArgsConstructor
//public class WebConfig implements WebMvcConfigurer {
//    private final NotificationInterceptor notificationInterceptor;
//
//    @Override
//    public void addInterceptors(InterceptorRegistry registry) {
//        List<String> staticResourcesPath = Arrays.stream(StaticResourceLocation.values())
//                .flatMap(StaticResourceLocation::getPatterns)
//                .collect(Collectors.toList());
//        staticResourcesPath.add("/node_modules/**");
//
//        registry.addInterceptor(notificationInterceptor)
//                //스태틱 리다이렉트 거름
//                .excludePathPatterns(staticResourcesPath);
//    }
//}
