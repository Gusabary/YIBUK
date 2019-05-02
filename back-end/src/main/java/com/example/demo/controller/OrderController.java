package com.example.demo.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.service.BookService;
import com.example.demo.service.OrderService;
import com.example.demo.util.OrderUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

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
        String now = String.valueOf(new Date().getTime());

        orderService.add(now, userId, bookId, quantity);
        bookService.purchase(bookId, quantity);

        return new ResponseEntity<JSONObject>(OrderUtil.constructJsonOfAdd(), HttpStatus.OK);
    }

    @RequestMapping(value = "/show", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<JSONObject> show(@RequestParam(name = "userId", required = false) Integer userId) {
        return new ResponseEntity<JSONObject>(orderService.show(userId), HttpStatus.OK);
    }
}
