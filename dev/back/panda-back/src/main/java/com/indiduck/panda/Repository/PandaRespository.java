package com.indiduck.panda.Repository;

import com.indiduck.panda.domain.Panda;
import com.indiduck.panda.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional(readOnly = true)
@Controller
public interface PandaRespository extends JpaRepository<Panda,Long> {


    Optional<Panda> findByUser(User user);
}
