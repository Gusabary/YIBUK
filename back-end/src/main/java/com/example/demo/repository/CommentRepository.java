package com.example.demo.repository;

import com.example.demo.entity.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends MongoRepository<Comment, Long> {

    Comment findByBookId(int bookId);

}
