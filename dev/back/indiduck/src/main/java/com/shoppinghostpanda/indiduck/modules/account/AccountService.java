package com.shoppinghostpanda.indiduck.modules.account;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;

    //회원가입
    @Transactional(readOnly = false)
    public Long join(Account account){
        //중복회원 검증
        validateDuplicatieMember(account);
        account.setPassword(passwordEncoder.encode(account.getPassword()));
        accountRepository.save(account);
        return account.getId();
    }

    //중복체크로직
    private void validateDuplicatieMember(Account account){
        List<Account> findMembers = accountRepository.findByName(account.getAccount());
        if(!findMembers.isEmpty()){
            throw new IllegalArgumentException("이미 존재하는 회원입니다");
        }
    }

}
