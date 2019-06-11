package com.example.demo.daoImpl;

import com.example.demo.dao.SCommentDao;
import com.example.demo.entity.Comment;
import com.example.demo.entity.SComment;
import com.example.demo.repository.SCommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SCommentDaoImpl implements SCommentDao {

    @Autowired
    SCommentRepository sCommentRepository;

    @Override
    public SComment findByBookId(int bookId) {
        return sCommentRepository.findByBookId(bookId);
    }

    @Override
    public void save(SComment sComment) {
        sCommentRepository.save(sComment);
    }

}
