package com.example.demo.entity;

import javax.persistence.*;

@Entity
@Table(name = "cart")
@IdClass(CartPK.class)
public class Cart {

    @Id
    @Column(name = "userId")
    private int userId;

    @Id
    @Column(name = "bookId")
    private int bookId;

    @Column(name = "quantity")
    private int quantity;

    public Cart() {}

    public Cart(/*int userId, */int bookId, int quantity) {
        //this.userId = userId;
        this.bookId = bookId;
        this.quantity = quantity;
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

}
