package com.example.demo.entity;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;

public class CartPK implements Serializable {

    @Id
    @Column(name = "userId")
    private int userId;

    @Id
    @Column(name = "bookId")
    private int bookId;

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

}
