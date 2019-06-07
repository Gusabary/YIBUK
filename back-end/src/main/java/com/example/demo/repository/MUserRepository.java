package com.example.demo.repository;

import com.example.demo.entity.MUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MUserRepository extends MongoRepository<MUser, Long> {

}
