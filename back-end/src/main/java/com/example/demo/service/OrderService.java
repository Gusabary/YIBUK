package com.example.demo.service;

import com.alibaba.fastjson.JSONObject;

public interface OrderService {

    void add(String now, int userId, int bookId, int quantity);

    JSONObject show(Integer userId);

}
