package com.indiduck.panda.Service;

import com.indiduck.panda.Repository.PandaRespository;
import com.indiduck.panda.Repository.UserRepository;
import com.indiduck.panda.domain.Panda;
import com.indiduck.panda.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class PandaService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    PandaRespository pandaRespository;

    public Panda newPanda(String user, String pandaName,String mainCh,
                         String intCategory, boolean terms,boolean info){

        Optional<User> byEmail = userRepository.findByEmail(user);

        if(!byEmail.isEmpty())
        {
            if(byEmail.get().getPanda() ==null)
            {
                Panda panda =Panda.newPanda(pandaName,mainCh,intCategory,terms,info);
                panda.setUser(byEmail.get());
                pandaRespository.save(panda);
                return panda;

            }
        }

        return null;

    }
}
