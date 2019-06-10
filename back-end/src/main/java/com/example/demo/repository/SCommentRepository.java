package com.example.demo.repository;

import com.example.demo.entity.SComment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SCommentRepository extends MongoRepository<SComment, Long> {

    SComment findByBookId(int bookId);

    boolean existsByBookId(int bookId);

}
