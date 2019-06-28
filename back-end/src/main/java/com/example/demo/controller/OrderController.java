package com.example.demo.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.service.BookService;
import com.example.demo.service.OrderService;
import com.example.demo.util.BookUtil;
import com.example.demo.util.CartUtil;
import com.example.demo.util.OrderUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(value = "/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private BookService bookService;

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<JSONObject> add(@RequestBody JSONObject request) {
        int userId = request.getInteger("userId");
        int bookId = request.getInteger("bookId");
        int quantity = request.getInteger("quantity");

        JSONArray books = BookUtil.constructJsonOfBuy(bookId, quantity);

        if (!bookService.isStorageEnough(books))
            return new ResponseEntity<JSONObject>(
                    CartUtil.constructJsonOfMessage("Empty cart successfully!"), HttpStatus.EXPECTATION_FAILED
            );

        bookService.purchase(bookId, quantity);
        orderService.add(userId, books);

        return new ResponseEntity<JSONObject>(
                OrderUtil.constructJsonOfMessage("Purchase successfully!"), HttpStatus.OK
        );
    }

    @RequestMapping(value = "/show", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<JSONObject> show(@RequestParam(name = "userId") int userId) {
        return new ResponseEntity<JSONObject>(orderService.show(userId), HttpStatus.OK);
    }

    @RequestMapping(value = "/show/all", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<JSONObject> showAll() {
        return new ResponseEntity<JSONObject>(orderService.showAll(), HttpStatus.OK);
    }

}
