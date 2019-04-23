package com.example.demo.entity;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "order")
@IdClass(OrderPK.class)
public class Order {

    @Id
    @Column(name = "orderId")
    private String orderId;

    @Column(name = "userId")
    private int userId;

    @Id
    @Column(name = "bookId")
    private int bookId;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "time")
    private Timestamp time;

    public Order() {}

    public Order(String orderId, int userId, int bookId, int quantity, Timestamp time) {
        this.orderId = orderId;
        this.userId = userId;
        this.bookId = bookId;
        this.quantity = quantity;
        this.time = time;
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

    public int getBookId() {
        return bookId;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Timestamp getTime() {
        return time;
    }

    public void setTime(Timestamp time) {
        this.time = time;
    }

}
