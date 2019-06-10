package com.example.demo.dao;

import com.example.demo.entity.Order;

public interface OrderDao {

    Iterable<Order> findByUserId(Integer userId);

    Iterable<Order> findAll();

    void save(Order order);

}
