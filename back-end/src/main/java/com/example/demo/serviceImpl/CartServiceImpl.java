package com.example.demo.serviceImpl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.dao.CartDao;
import com.example.demo.entity.Cart;
import com.example.demo.service.CartService;
import com.example.demo.util.CartUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartDao cartDao;

    @Override
    public JSONObject show(int userId) {
        JSONArray booksInCart = new JSONArray();
        cartDao.findByUserId(userId).forEach(book -> {
            booksInCart.add(CartUtil.constructJsonOfCartItem(book.getBookId(), book.getQuantity()));
        });
        return CartUtil.constructJsonOfShow(booksInCart);
    }

    @Override
    public JSONObject add(int userId, int bookId, int quantity) {
        int targetQuantity = quantity;
        if (doesExist(userId, bookId))
            targetQuantity += cartDao.findByUserIdAndBookId(userId, bookId).getQuantity();

        cartDao.save(new Cart(userId, bookId, targetQuantity));
        return CartUtil.constructJsonOfAdd();
    }

    @Override
    public void update(int userId, int bookId, int consume) {
        Cart cart = cartDao.findByUserIdAndBookId(userId, bookId);
        int quantity = cart.getQuantity();
        cart.setQuantity((quantity - consume <= 0) ? 1 : (quantity - consume));
        cartDao.save(cart);
    }

    @Override
    public void delete(int userId, int bookId) {
        cartDao.deleteByUserIdAndBookId(userId, bookId);
    }

    @Override
    public boolean doesExist(int userId, int bookId) {
        if (cartDao.findByUserIdAndBookId(userId, bookId) == null)
            return false;
        return true;
    }

}
