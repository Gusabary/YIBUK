package com.example.demo.serviceImpl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.Order;
import com.example.demo.repository.OrderRepository;
import com.example.demo.service.OrderService;
import com.example.demo.util.OrderUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.*;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public void add(int userId, JSONArray books) {
        Map<Integer, Integer> orderItem = new HashMap<>();
        books.forEach(book -> {
            int bookId = ((JSONObject)book).getInteger("bookId");
            int quantity = ((JSONObject)book).getInteger("quantity");
            orderItem.put(bookId, quantity);
        });

        String orderId = OrderUtil.constructID(String.valueOf(new Date().getTime()), userId);
        Order order = new Order(orderId, userId, orderItem, new Timestamp(new Date().getTime()));
        orderRepository.save(order);
    }

    @Override
    public JSONObject show(Integer userId) {
        JSONArray orders = new JSONArray();

        if (userId == null)
            orderRepository.findAll().forEach(order -> orders.add(order));
        else
            orderRepository.findByUserId(userId).forEach(order -> orders.add(order));

        return OrderUtil.constructJsonOfShow(orders);
    }

}
