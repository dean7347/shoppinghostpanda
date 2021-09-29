package com.shoppinghostpanda.indiduck.infra.oldconfig;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.rememberme.JdbcTokenRepositoryImpl;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;

import javax.sql.DataSource;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    //시큐리티 해싱
    private final UserDetailsService userDetailsService;
    private final DataSource dataSource;


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .mvcMatchers("/", "/login", "/sign-up", "/check-email-token",
                        "/email-login", "/login-by-email").permitAll()
                .antMatchers("/favicon.ico", "/resources/**", "/error").permitAll()
                .mvcMatchers(HttpMethod.GET,"/profile/*").permitAll()
                .anyRequest().authenticated();

        //커스텀 사용가능
        //폼로그인만 있으면 시큐리티가 기본으로 만들어주는 로그인 페이지
//        http.formLogin()
//                .loginPage("/login").permitAll();
//
//        http.logout()
//                .logoutSuccessUrl("/");

        http.rememberMe()
                //키값만 설정하면 해싱기반 안전하지 않음
//                .key("sdlfjslkdfj")
                .userDetailsService(userDetailsService)
                .tokenRepository(tokenRepository());
    }

    @Bean
    public PersistentTokenRepository tokenRepository()
    {
        JdbcTokenRepositoryImpl jdbcTokenRepository = new JdbcTokenRepositoryImpl();
        jdbcTokenRepository.setDataSource(dataSource);
        return jdbcTokenRepository;
    }

    //스태틱리소스는 인증하지말라고

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring()
//                TODO:꼭 api해제해줄것
                .mvcMatchers("/node_modules/**","/css/**", "/js/**", "/img/**", "/lib/**","/api/**")
                .requestMatchers(PathRequest.toStaticResources().atCommonLocations());
    }
}
