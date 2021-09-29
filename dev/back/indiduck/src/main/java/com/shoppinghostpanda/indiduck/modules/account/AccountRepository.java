package com.shoppinghostpanda.indiduck.modules.account;


import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class AccountRepository {
    @PersistenceContext
    EntityManager em;

    public void save(Account account) {
        em.persist(account);
    }

    public Account fineOne(Long id){
        return em.find(Account.class, id);
    }

    public List<Account> findAll(){
        return em.createQuery("select a from Account a",Account.class ).getResultList();
    }

    public List<Account> findByName(String account) {
        return em.createQuery("select a from Account a where a.account=:account", Account.class)
                .setParameter("account",account)
                .getResultList();
    }
}
