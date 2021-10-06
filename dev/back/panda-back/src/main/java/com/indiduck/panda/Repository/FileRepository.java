package com.indiduck.panda.Repository;

import com.indiduck.panda.domain.File;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<File, Long> {
}
