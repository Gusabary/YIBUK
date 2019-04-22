package com.example.demo.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.entity.Book;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public JSONObject show() {
        JSONObject resp = new JSONObject();
        JSONArray books = new JSONArray();

        bookRepository.findAll().forEach(book -> books.add(book));
        resp.put("books", books);
        return resp;
    }
}