package com.indiduck.panda.controller;


import com.indiduck.panda.Repository.BoardRepository;
import com.indiduck.panda.Repository.ProductRepository;
import com.indiduck.panda.Repository.UserRepository;
import com.indiduck.panda.Service.BoardService;
import com.indiduck.panda.domain.*;
import com.indiduck.panda.domain.dao.TFMessageDto;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RequiredArgsConstructor
@RestController
public class BoardController {

    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final BoardService boardService;
    @Autowired
    private final BoardRepository boardRepository;
    @Autowired
    private final ProductRepository productRepository;

    @RequestMapping(value = "/api/createqna", method = RequestMethod.POST)
    public ResponseEntity<?> createqna(@CurrentSecurityContext(expression = "authentication")
                                                Authentication authentication,@RequestBody Qnaboard qnaboard) throws Exception {
        Optional<User> byEmail = userRepository.findByEmail(authentication.getName());
        String username = byEmail.get().getUsername();
//        username=username.replaceAll("(?<=.{5}).","*");

        Board board = boardService.qnaNewBoard(username, qnaboard.title, qnaboard.contents, 00, qnaboard.productId);
        if(board != null)
        {
            return ResponseEntity.ok(new TFMessageDto(true,"success"));

        }


        return ResponseEntity.ok(new TFMessageDto(false,"게시글 작성에 실패했습니다"));
    }

    @RequestMapping(value = "/api/getqna", method = RequestMethod.GET)
    public ResponseEntity<?> getqna(@CurrentSecurityContext(expression = "authentication")
                                                Authentication authentication,Pageable pageable,@RequestParam("pid") long pid) throws Exception {
        Optional<User> byEmail = userRepository.findByEmail(authentication.getName());
        String username = byEmail.get().getUsername();
        Optional<Product> byId = productRepository.findById(pid);
        Page<Board> byProduct = boardRepository.findByProduct(pageable, byId.get());
        System.out.println("byProduct = " + byProduct);
        System.out.println("byProduct = " + pageable);

//        return ResponseEntity.ok(byProduct);

        return ResponseEntity.ok(new qnaBoardDto(true,byProduct));
    }

    @Data
    private static class getQnaProduct{
        Long productId;

    }

    @Data
    private static class Qnaboard{
        Long productId;
        String title;
        String contents;
    }
    @Data
    static class qnaBoardDto{
        boolean success;
        int totalE;
        int totalPage;
        List<BoardList> boardLists = new ArrayList<>();

        public qnaBoardDto(boolean tf, Page<Board> byProduct) {
            success=tf;
            this.totalE = (int) byProduct.getTotalElements();
            this.totalPage = byProduct.getTotalPages();
            for (Board  co: byProduct.getContent()) {
                boardLists.add(new BoardList(co.getId(),co.getTitle(),co.getContent()));
            }
        }
    }

    @Data
    private static class BoardList{
        long boardId;
        String title;
        String content;

        public BoardList(long boardId, String title, String content) {
            this.boardId = boardId;
            this.title = title;
            this.content = content;
        }
    }




}
