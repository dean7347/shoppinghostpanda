package com.indiduck.panda.Service;


//- UserDetailsService를 implements 해주었다는 것이 중요합니다.
//
//- DB에서 UserDetail를 얻어와 AuthenticationManager에게 제공하는 역할을 수행합니다.
//
//- 이번에는 DB 없이 하드코딩된 User List에서 get userDetail합니다.
//
//- password 부분이 해싱되어있는데, Spring Security 5.0에서는 Password를 BryptEncoder를 통해 Brypt화하여 저장하고 있습니다. 따라서 하드코딩해서 넣어줍니다.
//
//- https://www.javainuse.com/onlineBcrypt 에서 user_pw를 Bcrypt화할 수 있습니다.
//
//- id : user_id, pw: user_pw로 고정해 사용자 확인하고, 사용자 확인 실패시 throw Exception을 제공합니다.
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.Optional;

import com.indiduck.panda.Repository.UserRepository;
import com.indiduck.panda.config.ApiKey;
import com.indiduck.panda.config.JwtTokenUtil;
import com.indiduck.panda.domain.User;
import com.indiduck.panda.domain.dto.UserDto;
import com.indiduck.panda.domain.UserType;
import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.response.Certification;
import com.siot.IamportRestClient.response.IamportResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
public class JwtUserDetailsService implements UserDetailsService {

    //	@Override
//	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//		if ("user_id".equals(username)) {
//			return new User("user_id", "$2a$10$jCvWm3NXDRFs/EfuI4h4.u0ZxNocv.ZkgEy6qbjVXrfQ5.KzLfhAe",
//					new ArrayList<>());
//		} else {
//			throw new UsernameNotFoundException("User not found with username: " + username);
//		}
//	}
    private final UserRepository userRepository;
    private final JwtTokenUtil jwtTokenUtil;
    @Autowired
    private ApiKey apiKey;

    /**
     * Spring Security 필수 메소드 구현
     *
     * @param email 이메일
     * @return UserDetails
     * @throws UsernameNotFoundException 유저가 없을 때 예외 발생
     */
    @Override // 기본적인 반환 타입은 UserDetails, UserDetails를 상속받은 UserInfo로 반환 타입 지정 (자동으로 다운 캐스팅됨)
    public User loadUserByUsername(String email) throws UsernameNotFoundException { // 시큐리티에서 지정한 서비스이기 때문에 이 메소드를 필수로 구현
        System.out.println("email = " + email);
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException((email)));
    }
    /**
     * 비밀번호 검증
     */
    public User loginUser(String id,String password) throws Exception{
        Optional<User> byEmail = userRepository.findByEmail(id);
        User user =byEmail.get();
        if(user == null) throw new Exception("멤버가 없습니다");
        String passwordEncode = user.getPassword();
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        boolean matches = encoder.matches(password, passwordEncode);

        if(matches)
        {
            return user;
        }
        return null;
    }


    /**
     * 회원정보 저장
     *
     * @param infoDto 회원정보가 들어있는 DTO
     * @return 저장되는 회원의 PK
     */
    @Transactional
    public String save(UserDto infoDto) {

        IamportClient client;
        String test_api_key = apiKey.getRESTAPIKEY();
        String test_api_secret = apiKey.getRESTAPISECRET();
        //결제내역에서
        String test_imp_uid = infoDto.getPhone();
        client = new IamportClient(test_api_key, test_api_secret);

        try {
            IamportResponse<Certification> certification_response = client.certificationByImpUid(test_imp_uid);
//            System.out.println("certification_response = " + certification_response.getResponse().getName());
//            System.out.println("certification_response = " + certification_response.getResponse().getPhone());
//            System.out.println("certification_response = " + certification_response.getResponse().getBirth());
//            System.out.println("certification_response = " + certification_response.getResponse().getBirth().getYear());
//            System.out.println("certification_response = " + certification_response.getResponse().isCertified());
//            System.out.println("certification_response = " + certification_response.getResponse().getUniqueKey());
            SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
            LocalDate now = LocalDate.now();
            Date birth = certification_response.getResponse().getBirth();

            String format1 = format.format(birth);
            LocalDate parsedBirthDate = LocalDate.parse(format1, DateTimeFormatter.ofPattern("yyyyMMdd"));

            int americanAge = now.minusYears(parsedBirthDate.getYear()).getYear(); // (1)
            if (parsedBirthDate.plusYears(americanAge).isAfter(now)) {
                americanAge = americanAge -1;
            }
            //19세이하 가입불가
            if(americanAge <19 )
            {
                return "만 19세 이하는 가입할 수 없습니다";
            }
            //인증실패
            if(!certification_response.getResponse().isCertified() )
            {
                return "인증실패";
            }

            if(userRepository.findByEmail(infoDto.getEmail()).isEmpty())
            {
                BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
                infoDto.setPassword(encoder.encode(infoDto.getPassword()));
                //만나이 계산

                userRepository.save(User.builder()
                        .email(infoDto.getEmail())
                        .auth(infoDto.getAuth())
                        .adult(infoDto.isAdult())
                        .apprterm(infoDto.isApprterm())
                        .userRName(certification_response.getResponse().getName())
                        .priagree(infoDto.isPriagree())
                        .userPhoneNumber(certification_response.getResponse().getPhone())
                        .ci(certification_response.getResponse().getUniqueKey())
                        .regAt(LocalDateTime.now())
                        .password(infoDto.getPassword())
                        .roles(Collections.singletonList(UserType.ROLE_USER.toString())).build()).getId();
                return "회원가입성공";

            }
            return "중복된 아이디가 존재합니다";

        } catch (IamportResponseException e) {
            System.out.println(e.getMessage());

            switch(e.getHttpStatusCode()) {
                case 401 :
                    //TODO
                    return "ERR 401이 발생했습니다 해당 사항이 계속된다면 쇼핑호스트 판다로 문의부탁드립니다";


                case 500 :
                    return "ERR 500이 발생했습니다 해당 사항이 계속된다면 쇼핑호스트 판다로 문의부탁드립니다";

            }
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();

            return "ERR E이 발생했습니다 해당 사항이 계속된다면 쇼핑호스트 판다로 문의부탁드립니다";

        }

    return  null;

    }

    public User findId(String code) throws IamportResponseException, IOException {
        IamportClient client;
        String test_api_key = apiKey.getRESTAPIKEY();
        String test_api_secret = apiKey.getRESTAPISECRET();
        //결제내역에서
        String test_imp_uid = code;
        client = new IamportClient(test_api_key, test_api_secret);
        IamportResponse<Certification> certification_response = client.certificationByImpUid(test_imp_uid);
        String uniqueKey = certification_response.getResponse().getUniqueKey();
        Optional<User> byCi = userRepository.findByCi(uniqueKey);
        return  byCi.get();

    }


}