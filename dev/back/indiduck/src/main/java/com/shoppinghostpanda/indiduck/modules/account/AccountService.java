package com.shoppinghostpanda.indiduck.modules.account;

import com.shoppinghostpanda.indiduck.StateCodePackage.DefaultRes;
import com.shoppinghostpanda.indiduck.StateCodePackage.ResponseMessage;
import com.shoppinghostpanda.indiduck.StateCodePackage.StatusCode;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity join(Account account){
        //중복회원 검증
        ResponseEntity responseEntity = validateDuplicatieMember(account);

        return responseEntity;
    }

    //회원가입 로직
    private ResponseEntity validateDuplicatieMember(Account account){
        List<Account> findMembers = accountRepository.findByName(account.getAccount());
        //이미 존재할경우
        if(!findMembers.isEmpty()){
//            throw new IllegalArgumentException("이미 존재하는 회원입니다");
        return new ResponseEntity(
                DefaultRes.res(
                        StatusCode.DUPLICATEERROR,
                        ResponseMessage.LOGIN_FAIL,
                        account),
                HttpStatus.CONFLICT);
        }

        //회원가입 성공
        account.setPassword(passwordEncoder.encode(account.getPassword()));
        accountRepository.save(account);
        return new ResponseEntity(DefaultRes.res(StatusCode.OK,
                ResponseMessage.LOGIN_SUCCESS, account), HttpStatus.OK);
    }

}
