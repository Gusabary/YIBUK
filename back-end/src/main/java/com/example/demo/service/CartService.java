package com.example.demo.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.Cart;
import com.example.demo.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    public JSONObject show(int userId) {
        JSONObject resp = new JSONObject();
        JSONArray booksInCart = new JSONArray();

        cartRepository.findByUserId(userId).forEach(book -> {
            JSONObject tmp = new JSONObject();
            tmp.put("bookId", book.getBookId());
            tmp.put("quantity", book.getQuantity());
            booksInCart.add(tmp);
        });
        resp.put("cart", booksInCart);
        return resp;
    }

    public JSONObject add(int userId, int bookId, int quantity) {
        int targetQuantity = quantity;
        if (doesExist(userId, bookId))
            targetQuantity += cartRepository.findByUserIdAndBookId(userId, bookId).getQuantity();

        cartRepository.save(new Cart(userId, bookId, targetQuantity));
        return new JSONObject();
    }

    public boolean doesExist(int userId, int bookId) {
        if (cartRepository.findByUserIdAndBookId(userId, bookId) == null)
            return false;
        return true;
    }


}
