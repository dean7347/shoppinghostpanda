package com.indiduck.panda.jwt;

import com.amazonaws.services.dynamodbv2.document.ScanOutcome;
import com.indiduck.panda.domain.dto.UserResponseDto;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.Key;
import java.util.concurrent.TimeUnit;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends GenericFilterBean  {

    private static final String AUTHORIZATION_HEADER = "Authorization";
    private static final String BEARER_TYPE = "Bearer";

    private final JwtTokenProvider jwtTokenProvider;
    private final RedisTemplate redisTemplate;
    @Value("${spring.jwt.secret}")
    private String SECRET_KEY;
    private  Key key;


    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {

        // 1. Request Header 에서 JWT 토큰 추출
//        String token = resolveToken((HttpServletRequest) request);


        HttpServletRequest request1 = (HttpServletRequest) request;
        Cookie[] cookies = request1.getCookies();
        String token="";
        for(Cookie c : cookies) {
            if(c.getName().equals("accessToken"))
            {
                token=c.getValue();
            }
        }


            // 2. validateToken 으로 토큰 유효성 검사
        try{
            Long expiration = jwtTokenProvider.getExpiration(token);

        }catch (Exception e)
        {
            log.info("Expired JWT Token 재발급 로직 실행", e);

            //토큰이 만료됐음
            Authentication authentication = jwtTokenProvider.getAuthentication(token);
            String refreshToken = (String)redisTemplate.opsForValue().get("RT:" + authentication.getName());
            //리프레시 토큰이 없는경우
            if(ObjectUtils.isEmpty(refreshToken)) {
                //로그아웃시킴
                log.info("로그아웃 요청", e);

            }
            //토큰정보가 일치하지 않는경우
            if(!refreshToken.equals(refreshToken)) {
                //로그아웃시킴
                log.info("로그아웃 요청", e);

            }
            UserResponseDto.TokenInfo tokenInfo = jwtTokenProvider.generateToken(authentication);
            redisTemplate.opsForValue()
                    .set("RT:" + authentication.getName(), tokenInfo.getRefreshToken(), tokenInfo.getRefreshTokenExpirationTime(), TimeUnit.MILLISECONDS);
            Cookie accessToken = new Cookie("accessToken",tokenInfo.getAccessToken());
            accessToken.setHttpOnly(true);
            HttpServletResponse httpServletResponse= (HttpServletResponse) response;
            httpServletResponse.addCookie(accessToken);

            chain.doFilter(request, httpServletResponse);
            return;


        }
        if (token != null && jwtTokenProvider.validateToken(token)) {
                // (추가) Redis 에 해당 accessToken logout 여부 확인
                String isLogout = (String)redisTemplate.opsForValue().get(token);
                if (ObjectUtils.isEmpty(isLogout)) {
                    // 토큰이 유효할 경우 토큰에서 Authentication 객체를 가지고 와서 SecurityContext 에 저장
                    Authentication authentication = jwtTokenProvider.getAuthentication(token);
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }



        chain.doFilter(request, response);
    }

    // Request Header 에서 토큰 정보 추출
    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER_TYPE)) {
            return bearerToken.substring(7);
        }
        return null;
    }
}