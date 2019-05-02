package com.example.demo.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.Order;
import com.example.demo.repository.OrderRepository;
import com.example.demo.util.OrderUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Date;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public void add(String now, int userId, int bookId, int quantity) {
        String orderId = OrderUtil.constructID(now, userId);
        Order order = new Order(orderId, userId, bookId, quantity, new Timestamp(new Date().getTime()));
        orderRepository.save(order);
    }

    public JSONObject show(Integer userId) {
        JSONArray orders = new JSONArray();

        if (userId == null)
            orderRepository.findAll().forEach(order -> orders.add(order));
        else
            orderRepository.findByUserId(userId).forEach(order -> orders.add(order));

        return OrderUtil.constructJsonOfShow(orders);
    }


}
