package com.example.demo.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.service.CartService;
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

    @RequestMapping(value = "/show", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<JSONObject> show(@RequestParam int userId) {
        JSONObject resp = cartService.show(userId);
        return new ResponseEntity<JSONObject>(resp, HttpStatus.OK);
    }

    @RequestMapping(value = "/manage", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<JSONObject> add(@RequestBody String requestBody) {
        JSONObject req = JSONObject.parseObject(requestBody);
        int userId = req.getInteger("userId");
        int bookId = req.getInteger("bookId");
        int quantity = req.getInteger("quantity");

        JSONObject resp = cartService.add(userId, bookId, quantity);
        return new ResponseEntity<JSONObject>(resp, HttpStatus.OK);
    }

    @RequestMapping(value = "/manage", method = RequestMethod.PUT)
    @ResponseBody
    public ResponseEntity<JSONObject> purchase(@RequestBody String requestBody) {
        JSONObject req = JSONObject.parseObject(requestBody);
        int userId = req.getInteger("userId");
        JSONArray books = req.getJSONArray("books");

        JSONObject resp = cartService.purchase(userId, books);
        return new ResponseEntity<JSONObject>(resp, HttpStatus.OK);
    }

    @RequestMapping(value = "/manage", method = RequestMethod.DELETE)
    @ResponseBody
    public ResponseEntity<JSONObject> delete(@RequestBody String requestBody) {
        JSONObject req = JSONObject.parseObject(requestBody);
        int userId = req.getInteger("userId");
        JSONArray books = req.getJSONArray("books");

        JSONObject resp = cartService.delete(userId, books);
        return new ResponseEntity<JSONObject>(resp, HttpStatus.OK);
    }
}
