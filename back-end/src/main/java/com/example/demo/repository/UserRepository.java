package com.example.demo.repository;

import com.example.demo.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {

    User findByUsernameAndPassword(String username, String password);

    User findByUsername(String username);

    @Transactional
    void deleteByUsername(String username);

}
