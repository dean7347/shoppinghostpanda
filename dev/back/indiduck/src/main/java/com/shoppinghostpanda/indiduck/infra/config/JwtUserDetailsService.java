package com.shoppinghostpanda.indiduck.infra.config;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
//DB에서 UserDetail를 얻어와 AuthenticationManager에게 제공하는 역할
//이번에는 DB 없이 하드코딩된 User List에서 get userDetail

@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if ("user_id".equals(username)) {
            return new User("user_id", "$2a$10$m/enYHaLsCwH2dKMUAtQp.ksGOA6lq7Fd2pnMb4L.yT4GyeAPRPyS",
                    new ArrayList<>());
        } else {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
    }
}