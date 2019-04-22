package com.example.demo.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.service.BookService;
import com.example.demo.entity.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "/api/books")
public class BookController {

    @Autowired
    private BookService bookService;

    @RequestMapping(value = "/show", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<JSONObject> show(){
        JSONObject resp = bookService.show();
        return new ResponseEntity<JSONObject>(resp, HttpStatus.OK);
    }
}