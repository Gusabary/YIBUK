package com.example.demo.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.Book;
import com.example.demo.entity.Cart;
import com.example.demo.repository.BookRepository;
import com.example.demo.repository.CartRepository;
import com.example.demo.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private OrderService orderService;

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
        JSONObject resp = new JSONObject();
        int targetQuantity = quantity;
        if (doesExist(userId, bookId))
            targetQuantity += cartRepository.findByUserIdAndBookId(userId, bookId).getQuantity();

        cartRepository.save(new Cart(userId, bookId, targetQuantity));
        resp.put("message", "Add to cart successfully!");
        return resp;
    }

    public JSONObject purchase(int userId, JSONArray books) {
        JSONObject resp = new JSONObject();

        String now = String.valueOf(new Date().getTime());
        books.forEach(bookInCart -> {
            int bookId = ((JSONObject)bookInCart).getInteger("bookId");
            int consume = ((JSONObject)bookInCart).getInteger("quantity");

            Cart cart = cartRepository.findByUserIdAndBookId(userId, bookId);
            int quantity = cart.getQuantity();
            cart.setQuantity((quantity - consume <= 0) ? 1 : (quantity - consume));
            cartRepository.save(cart);

            orderService.add(now, userId, bookId, consume);
        });

        resp.put("message", "Purchase successfully!");
        return resp;
    }

    public JSONObject delete(int userId, JSONArray books) {
        JSONObject resp = new JSONObject();

        books.forEach(bookId -> cartRepository.deleteByUserIdAndBookId(userId, Integer.parseInt(bookId.toString())));
        resp.put("message", "Delete successfully!");
        return resp;
    }

    public boolean doesExist(int userId, int bookId) {
        if (cartRepository.findByUserIdAndBookId(userId, bookId) == null)
            return false;
        return true;
    }

}
