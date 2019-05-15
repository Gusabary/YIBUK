package com.example.demo.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.service.BookService;
import com.example.demo.service.CartService;
import com.example.demo.service.OrderService;
import com.example.demo.util.CartUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@Controller
@RequestMapping(value = "/api/carts")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private BookService bookService;

    @RequestMapping(value = "/show", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<JSONObject> show(@RequestParam int userId) {
        return new ResponseEntity<JSONObject>(cartService.show(userId), HttpStatus.OK);
    }

    @RequestMapping(value = "/manage", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<JSONObject> add(@RequestBody JSONObject request) {
        int userId = request.getInteger("userId");
        int bookId = request.getInteger("bookId");
        int quantity = request.getInteger("quantity");

        return new ResponseEntity<JSONObject>(cartService.add(userId, bookId, quantity), HttpStatus.OK);
    }

    @RequestMapping(value = "/manage/buy", method = RequestMethod.PUT)
    @ResponseBody
    public ResponseEntity<JSONObject> purchase(@RequestBody JSONObject request) {
        int userId = request.getInteger("userId");
        JSONArray books = request.getJSONArray("books");

        String now = String.valueOf(new Date().getTime());
        books.forEach(bookInCart -> {
            int bookId = ((JSONObject)bookInCart).getInteger("bookId");
            int consume = ((JSONObject)bookInCart).getInteger("quantity");

            cartService.update(userId, bookId, consume);
            orderService.add(now, userId, bookId, consume);
            bookService.purchase(bookId, consume);
        });

        return new ResponseEntity<JSONObject>(CartUtil.constructJsonOfPurchase(), HttpStatus.OK);
    }

    @RequestMapping(value = "/manage/empty", method = RequestMethod.PUT)
    @ResponseBody
    public ResponseEntity<JSONObject> empty(@RequestBody JSONObject request) {
        int userId = request.getInteger("userId");
        JSONArray books = cartService.show(userId).getJSONArray("cart");

        String now = String.valueOf(new Date().getTime());
        books.forEach(bookInCart -> {
            int bookId = ((JSONObject)bookInCart).getInteger("bookId");
            int consume = ((JSONObject)bookInCart).getInteger("quantity");

            cartService.delete(userId, bookId);
            orderService.add(now, userId, bookId, consume);
            bookService.purchase(bookId, consume);
        });

        return new ResponseEntity<JSONObject>(CartUtil.constructJsonOfEmpty(), HttpStatus.OK);
    }

    @RequestMapping(value = "/manage", method = RequestMethod.DELETE)
    @ResponseBody
    public ResponseEntity<JSONObject> delete(@RequestBody JSONObject request) {
        int userId = request.getInteger("userId");
        JSONArray books = request.getJSONArray("books");

        books.forEach(bookInCart -> {
            cartService.delete(userId, Integer.parseInt(bookInCart.toString()));
        });

        return new ResponseEntity<JSONObject>(CartUtil.constructJsonOfDelete(), HttpStatus.OK);
    }
}
