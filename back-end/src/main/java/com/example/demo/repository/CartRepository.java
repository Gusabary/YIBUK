package com.example.demo.repository;

import com.example.demo.entity.Cart;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.util.Pair;

import java.util.List;

public interface CartRepository extends CrudRepository<Cart, Pair<Integer, Integer>> {

    //@Query("SELECT bookId, quantity from Cart where userId = :userId")
    Iterable<Cart> findByUserId(int userId);

    Cart findByUserIdAndBookId(int userId, int bookId);

    Cart findByBookId(int bookId);
}
