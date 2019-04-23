package com.example.demo.repository;

import com.example.demo.entity.Order;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.util.Pair;

public interface OrderRepository extends CrudRepository<Order, Pair<String, Integer>> {
}
