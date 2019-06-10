package com.example.demo.repository;

import com.example.demo.entity.Cart;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface CartRepository extends CrudRepository<Cart, Pair<Integer, Integer>> {

    Iterable<Cart> findByUserId(int userId);

    Cart findByUserIdAndBookId(int userId, int bookId);

    @Transactional
    void deleteByUserIdAndBookId(int userId, int bookId);

}
