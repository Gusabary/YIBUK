package com.example.demo.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.Order;
import com.example.demo.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Date;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private BookService bookService;

    public JSONObject add(String now, int userId, int bookId, int quantity) {
        JSONObject resp = new JSONObject();

        String orderId = constructID(now, userId);
        Order order = new Order(orderId, userId, bookId, quantity, new Timestamp(new Date().getTime()));
        orderRepository.save(order);

        bookService.purchase(bookId, quantity);

        resp.put("message", "Purchase successfully!");
        return resp;
    }

    public JSONObject show(Integer userId) {
        JSONObject resp = new JSONObject();
        JSONArray orders = new JSONArray();

        if (userId == null)
            orderRepository.findAll().forEach(order -> orders.add(order));
        else
            orderRepository.findByUserId(userId).forEach(order -> orders.add(order));

        resp.put("orders", orders);
        return resp;
    }

    private String constructID(String now, int userId) {
        String userId_s = String.valueOf(userId);
        String padding = "";
        for (int i = 1; i <= 5 - userId_s.length(); i++)
            padding += '0';
        return now + padding + userId_s;
    }
}
