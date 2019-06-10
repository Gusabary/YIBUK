package com.example.demo.dao;

import com.example.demo.entity.Comment;

import java.util.List;

public interface SCommentDao {

    List<Comment> findByBookId(int bookId);

}
