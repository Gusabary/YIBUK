package com.example.demo.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

public interface OrderService {

    void add(int userId, JSONArray books);

    JSONObject show(int userId);

    JSONObject showAll();

}
