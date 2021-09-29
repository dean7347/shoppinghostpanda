package com.shoppinghostpanda.indiduck.modules.api;


import com.shoppinghostpanda.indiduck.modules.account.Account;
import com.shoppinghostpanda.indiduck.modules.account.AccountService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class AccountApiController {
    private final AccountService accountService;

    //회원가입 API
    @PostMapping("/api/register")
    public CreateAccountResponse regMember(@RequestBody @Valid CreateAccountRequest request){

        Account account = new Account();
        account.setAccount(request.getAccount());
        account.setPassword(request.getPassword());

        Long id = accountService.join(account);
        return new CreateAccountResponse(id);
    }
    //회원가입 API res req
    @Data
    static class CreateAccountRequest{
        private String account;
        private String password;
    }
    @Data
    static class CreateAccountResponse{
        private Long id;
        public CreateAccountResponse(Long id) {this.id = id;}
    }


}
