package com.example.demo.serviceImpl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.Cart;
import com.example.demo.repository.CartRepository;
import com.example.demo.service.CartService;
import com.example.demo.util.CartUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    public JSONObject show(int userId) {
        JSONArray booksInCart = new JSONArray();
        cartRepository.findByUserId(userId).forEach(book -> {
            booksInCart.add(CartUtil.constructJsonOfCartItem(book.getBookId(), book.getQuantity()));
        });
        return CartUtil.constructJsonOfShow(booksInCart);
    }

    public JSONObject add(int userId, int bookId, int quantity) {
        int targetQuantity = quantity;
        if (doesExist(userId, bookId))
            targetQuantity += cartRepository.findByUserIdAndBookId(userId, bookId).getQuantity();

        cartRepository.save(new Cart(userId, bookId, targetQuantity));
        return CartUtil.constructJsonOfAdd();
    }

    public void update(int userId, int bookId, int consume) {
        Cart cart = cartRepository.findByUserIdAndBookId(userId, bookId);
        int quantity = cart.getQuantity();
        cart.setQuantity((quantity - consume <= 0) ? 1 : (quantity - consume));
        cartRepository.save(cart);
    }

    public void delete(int userId, int bookId) {
        cartRepository.deleteByUserIdAndBookId(userId, bookId);
    }

    public boolean doesExist(int userId, int bookId) {
        if (cartRepository.findByUserIdAndBookId(userId, bookId) == null)
            return false;
        return true;
    }

}
