package com.example.demo.entity;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;

public class OrderPK implements Serializable {

    @Id
    @Column(name = "orderId")
    private String orderId;

    @Id
    @Column(name = "bookId")
    private int bookId;

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public int getBookId() {
        return bookId;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }

}
