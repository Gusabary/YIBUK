package com.example.demo.dao;

import com.example.demo.entity.Cart;

public interface CartDao {

    Iterable<Cart> findByUserId(int userId);

    Cart findByUserIdAndBookId(int userId, int bookId);

    void deleteByUserIdAndBookId(int userId, int bookId);

    void save(Cart cart);

}
