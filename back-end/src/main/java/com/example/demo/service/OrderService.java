package com.example.demo.service;

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

    public void add(String now, int userId, int bookId, int quantity) {
        String orderId = constructID(now, userId);
        Order order = new Order(orderId, userId, bookId, quantity, new Timestamp(new Date().getTime()));
        orderRepository.save(order);
    }

    private String constructID(String now, int userId) {
        String userId_s = String.valueOf(userId);
        String padding = "";
        for (int i = 1; i <= 5 - userId_s.length(); i++)
            padding += '0';
        return now + padding + userId_s;
    }
}
