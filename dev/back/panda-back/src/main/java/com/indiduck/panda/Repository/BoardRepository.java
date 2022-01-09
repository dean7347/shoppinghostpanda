package com.indiduck.panda.Repository;

import com.indiduck.panda.domain.Board;
import com.indiduck.panda.domain.DeliverAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)
@Repository
public interface BoardRepository extends JpaRepository<Board,Long> {
}
