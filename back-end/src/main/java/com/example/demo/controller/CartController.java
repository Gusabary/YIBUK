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

        //judge whether storage is enough
        if (!bookService.isStorageEnough(books))
            return new ResponseEntity<JSONObject>(
                    CartUtil.constructJsonOfMessage("Storage is not enough!"), HttpStatus.EXPECTATION_FAILED
            );

        //update cart and booklist
        for (Object bookInCart : books) {
            int bookId = ((JSONObject) bookInCart).getInteger("bookId");
            int consume = ((JSONObject) bookInCart).getInteger("quantity");

            cartService.update(userId, bookId, consume);
            bookService.purchase(bookId, consume);
        }

        //generate order
        orderService.add(userId, books);

        return new ResponseEntity<JSONObject>(
                CartUtil.constructJsonOfMessage("Purchase successfully!"), HttpStatus.OK
        );
    }

    @RequestMapping(value = "/manage/empty", method = RequestMethod.PUT)
    @ResponseBody
    public ResponseEntity<JSONObject> empty(@RequestBody JSONObject request) {
        int userId = request.getInteger("userId");
        JSONArray books = cartService.show(userId).getJSONArray("cart");

        //judge whether storage is enough
        if (!bookService.isStorageEnough(books))
            return new ResponseEntity<JSONObject>(
                    CartUtil.constructJsonOfMessage("Storage is not enough!"), HttpStatus.EXPECTATION_FAILED
            );

        //update cart and booklist
        for (Object bookInCart : books) {
            int bookId = ((JSONObject) bookInCart).getInteger("bookId");
            int consume = ((JSONObject) bookInCart).getInteger("quantity");

            cartService.delete(userId, bookId);
            bookService.purchase(bookId, consume);
        }

        //generate order
        orderService.add(userId, books);

        return new ResponseEntity<JSONObject>(
                CartUtil.constructJsonOfMessage("Empty cart successfully!"), HttpStatus.OK
        );
    }

    @RequestMapping(value = "/manage", method = RequestMethod.DELETE)
    @ResponseBody
    public ResponseEntity<JSONObject> delete(@RequestBody JSONObject request) {
        int userId = request.getInteger("userId");
        JSONArray books = request.getJSONArray("books");

        books.forEach(bookInCart -> {
            cartService.delete(userId, Integer.parseInt(bookInCart.toString()));
        });

        return new ResponseEntity<JSONObject>(
                CartUtil.constructJsonOfMessage("Delete successfully!"), HttpStatus.OK
        );
    }
}
