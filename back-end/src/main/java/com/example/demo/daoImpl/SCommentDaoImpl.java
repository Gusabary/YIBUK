package com.example.demo.daoImpl;

import com.example.demo.dao.SCommentDao;
import com.example.demo.entity.Comment;
import com.example.demo.repository.SCommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SCommentDaoImpl implements SCommentDao {

    @Autowired
    SCommentRepository sCommentRepository;

    @Override
    public List<Comment> findByBookId(int bookId) {
        if (!sCommentRepository.existsByBookId(bookId))
            return null;
        return sCommentRepository.findByBookId(bookId).getComments();
    }

}
