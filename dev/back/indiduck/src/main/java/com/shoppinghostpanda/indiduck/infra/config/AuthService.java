//package com.shoppinghostpanda.indiduck.infra.config;
//
//import com.shoppinghostpanda.indiduck.StateCodePackage.DefaultRes;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//
//@Service
//public class AuthService {
//
//
//    private final UserMapper userMapper;
//    private final JwtService jwtService;
//    private final PasswordEncoder passwordEncoder;
//
//    // 의존성 주입
//    public AuthService(UserMapper userMapper, JwtService jwtService, PasswordEncoder passwordEncoder) {
//        this.userMapper = userMapper;
//        this.jwtService = jwtService;
//        this.passwordEncoder = passwordEncoder;
//    }
//
//    // 로그인
//    public DefaultRes<JwtService.TokenRes> signIn(final SignInModel signInModel) {
//        final User user = userMapper.findById(signInModel.getId());
//
//        // 회원 정보가 존재하지 않거나, 아이디가 틀렸음
//        if (user == null) {
//            return DefaultRes.res(StatusCode.BAD_REQUEST, ResponseMessage.LOGIN_FAIL);
//        }
//
//        // 로그인 성공
//        if (passwordEncoder.matches(signInModel.getPassword(), user.getPassword())) {
//            // 토큰 생성
//            final JwtService.TokenRes tokenDto = new JwtService.TokenRes(jwtService.create(user.getUserIdx()));
//            return DefaultRes.res(StatusCode.OK, ResponseMessage.LOGIN_SUCCESS, tokenDto);
//        }
//
//        // 비밀번호가 틀렸을 때
//        return DefaultRes.res(StatusCode.BAD_REQUEST, ResponseMessage.LOGIN_FAIL);
//    }
//}