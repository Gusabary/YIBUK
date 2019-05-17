package com.example.demo.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.Book;

public interface BookService {

    JSONObject show();

    JSONObject create(Book book);

    JSONObject update(Book book);

    JSONObject delete(JSONArray bookIds);

    void purchase(int bookId, int quantity);

    boolean isStorageEnough(JSONArray books);

}