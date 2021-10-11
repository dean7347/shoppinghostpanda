package com.indiduck.panda.Service;

import com.indiduck.panda.Repository.FileRepository;
import com.indiduck.panda.domain.File;
import com.indiduck.panda.domain.dto.FileDao;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FileService {
    private FileRepository fileRepository;

    public FileService(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    @Transactional
    public Long saveFile(FileDao fileDto) {
        return fileRepository.save(fileDto.toEntity()).getId();
    }

    @Transactional
    public FileDao getFile(Long id) {
        File file = fileRepository.findById(id).get();

        FileDao fileDao = FileDao.builder()
                .id(id)
                .origFilename(file.getOrigFilename())
                .filename(file.getFilename())
                .filePath(file.getFilePath())
                .build();
        return fileDao;
    }
}