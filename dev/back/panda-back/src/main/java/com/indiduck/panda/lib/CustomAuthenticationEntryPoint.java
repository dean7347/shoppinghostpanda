package com.indiduck.panda.lib;

import com.indiduck.panda.Service.JwtUserDetailsService;
import com.indiduck.panda.domain.ErrorType;
import com.indiduck.panda.domain.dto.Response;
import com.indiduck.panda.domain.dto.UserResponseDto;
import com.indiduck.panda.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.concurrent.TimeUnit;

@Component
@RequiredArgsConstructor
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private final JwtUserDetailsService jwtUserDetailsService;
    private final Response res;
    private final JwtTokenProvider jwtTokenProvider;
    private final RedisTemplate redisTemplate;
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
        String exception = (String)request.getAttribute("exception");
        ErrorType errorType;
        System.out.println(" =access재생성로직 시작 ");

        /**
         * 토큰이 없는 경우 예외처리
         */
        if(exception == null) {
            errorType = ErrorType.UNAUTHORIZEDException;
            setResponse(response, errorType);
            System.out.println("토큰이 없습니다");

            return;
        }

        /**
         * 토큰이 만료된 경우 예외처리
         */
        if(exception.equals("ExpiredJwtException")) {
            System.out.println("토큰만료 재생성로직 시작");

            errorType = ErrorType.ExpiredJwtException;
            Cookie[] cookies = request.getCookies();
            String atToken="";
            String rT="";
            for(Cookie c : cookies) {
                if(c.getName().equals("accessToken"))
                {
                    atToken=c.getValue();
                }
                if(c.getName().equals("refreshToken"))
                {
                    rT=c.getValue();
                }
            }
            System.out.println(" 지금토큰은 "+atToken);

            // 1. Refresh Token 검증
        if (!jwtTokenProvider.validateToken(rT)) {
            setResponse(response, errorType);

//            response.fail("Refresh Token 정보가 유효하지 않습니다.", HttpStatus.BAD_REQUEST);
            System.out.println("유효하지 않은계정입니다");
            
            return;
        }

            // 2. Access Token 에서 User email 을 가져옵니다.
            Authentication authentication = jwtTokenProvider.getAuthentication(atToken);

            // 3. Redis 에서 User email 을 기반으로 저장된 Refresh Token 값을 가져옵니다.
            String refreshToken = (String)redisTemplate.opsForValue().get("RT:" + authentication.getName());
            // (추가) 로그아웃되어 Redis 에 RefreshToken 이 존재하지 않는 경우 처리
            if(ObjectUtils.isEmpty(refreshToken)) {
                System.out.println("로그아웃된 계정입니다");
//                return res.fail("잘못된 요청입니다.", HttpStatus.BAD_REQUEST);
                return;

            }
//        if(!refreshToken.equals(reissue.getRefreshToken())) {
//            return response.fail("Refresh Token 정보가 일치하지 않습니다.", HttpStatus.BAD_REQUEST);
//        }

            // 4. 새로운 토큰 생성
            UserResponseDto.TokenInfo tokenInfo = jwtTokenProvider.generateToken(authentication);
            Cookie NaccessToken = new Cookie("accessToken",tokenInfo.getAccessToken());
            Cookie NrefreshToken = new Cookie("refreshToken",tokenInfo.getRefreshToken());

            NaccessToken.setHttpOnly(true);
            NrefreshToken.setHttpOnly(true);
            response.addCookie(NaccessToken);
            response.addCookie(NrefreshToken);
            // 5. RefreshToken Redis 업데이트
            redisTemplate.opsForValue()
                    .set("RT:" + authentication.getName(), tokenInfo.getRefreshToken(), tokenInfo.getRefreshTokenExpirationTime(), TimeUnit.MILLISECONDS);



            System.out.println(" 새로운토큰은 "+NaccessToken);

            setResponse(response, errorType);
            return;
        }
    }

    private void setResponse(HttpServletResponse response, ErrorType errorType) throws IOException {
        JSONObject json = new JSONObject();
        response.setContentType("application/json;charset=UTF-8");
        response.setCharacterEncoding("utf-8");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        json.put("code", errorType.getCode());
        json.put("message", errorType.getDescription());
        response.getWriter().print(json);
    }
}