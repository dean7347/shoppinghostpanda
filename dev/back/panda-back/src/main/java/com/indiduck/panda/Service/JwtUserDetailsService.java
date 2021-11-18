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
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Optional;

import com.indiduck.panda.Repository.UserRepository;
import com.indiduck.panda.config.JwtTokenUtil;
import com.indiduck.panda.domain.User;
import com.indiduck.panda.domain.dto.UserDto;
import com.indiduck.panda.domain.UserType;
import lombok.RequiredArgsConstructor;
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
    public Long save(UserDto infoDto) {
        if(userRepository.findByEmail(infoDto.getEmail()).isEmpty())
        {
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            infoDto.setPassword(encoder.encode(infoDto.getPassword()));


            return userRepository.save(User.builder()
                    .email(infoDto.getEmail())
                    .auth(infoDto.getAuth())
                    .adult(infoDto.isAdult())
                    .apprterm(infoDto.isApprterm())
                    .userRName(infoDto.getName())
                    .priagree(infoDto.isPriagree())
                    .userPhoneNumber(infoDto.getPhone())
                    .regAt(LocalDateTime.now())
                    .password(infoDto.getPassword())
                    .roles(Collections.singletonList(UserType.ROLE_USER.toString())).build()).getId();

        }
        return null;

    }


}