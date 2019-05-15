package com.example.demo.service;

import com.alibaba.fastjson.JSONObject;

public interface CartService {

    JSONObject show(int userId);

    JSONObject add(int userId, int bookId, int quantity);

    void update(int userId, int bookId, int consume);

    void delete(int userId, int bookId);

    boolean doesExist(int userId, int bookId);

}
