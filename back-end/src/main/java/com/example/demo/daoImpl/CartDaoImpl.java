package com.example.demo.daoImpl;

import com.example.demo.dao.CartDao;
import com.example.demo.entity.Cart;
import com.example.demo.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class CartDaoImpl implements CartDao {

    @Autowired
    CartRepository cartRepository;

    @Override
    public Iterable<Cart> findByUserId(int userId) {
        return cartRepository.findByUserId(userId);
    }

    @Override
    public Cart findByUserIdAndBookId(int userId, int bookId) {
        return cartRepository.findByUserIdAndBookId(userId, bookId);
    }

    @Override
    public void deleteByUserIdAndBookId(int userId, int bookId) {
        cartRepository.deleteByUserIdAndBookId(userId, bookId);
    }

    @Override
    public void save(Cart cart) {
        cartRepository.save(cart);
    }

}
