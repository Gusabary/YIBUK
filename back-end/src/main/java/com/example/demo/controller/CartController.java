package com.example.demo.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "/api/carts")
public class CartController {

    @Autowired
    private CartService cartService;

    @RequestMapping(value = "/show", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<JSONObject> show(@RequestParam int userId){
        JSONObject resp = cartService.show(userId);
        return new ResponseEntity<JSONObject>(resp, HttpStatus.OK);
    }
}
