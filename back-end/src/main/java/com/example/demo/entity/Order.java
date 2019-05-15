package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Entity
@Table(name = "order")
public class Order {

    @Id
    @Column(name = "orderId")
    private String orderId;

    @Column(name = "userId")
    private int userId;

    @Column(name = "time")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
    private Timestamp time;

    @ElementCollection
    @CollectionTable(name = "orderitem",
            joinColumns = @JoinColumn(name = "orderId"))
    @MapKeyColumn(name = "bookId")
    @Column(name = "quantity")
    private Map<Integer, Integer> orderItem = new HashMap<>();

    public Order() {}

    public Order(String orderId, int userId, Map<Integer, Integer> orderItem, Timestamp time) {
        this.orderId = orderId;
        this.userId = userId;
        this.time = time;
        this.orderItem = orderItem;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public Timestamp getTime() {
        return time;
    }

    public void setTime(Timestamp time) {
        this.time = time;
    }

    public Map<Integer, Integer> getOrderItem() {
        return orderItem;
    }

    public void setOrderItem(Map<Integer, Integer> orderItem) {
        this.orderItem = orderItem;
    }

}
