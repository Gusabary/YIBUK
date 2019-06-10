package com.example.demo.dao;

import com.example.demo.entity.User;

public interface UserDao {

    User findByUsernameAndPassword(String username, String password);

    User findByUsername(String username);

    void deleteByUsername(String username);

    void save(User user);

    Iterable<User> findAll();

    User findById(Integer userId);

}
