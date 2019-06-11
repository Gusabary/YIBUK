package com.example.demo.dao;

import com.example.demo.entity.Comment;
import com.example.demo.entity.SComment;

import java.util.List;

public interface SCommentDao {

    SComment findByBookId(int bookId);

    void save(SComment sComment);

}
