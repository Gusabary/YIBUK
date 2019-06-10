package com.example.demo.entity;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "comments")
public class SComment {

    private int bookId;

    private List<Comment> comments;

    public SComment(int bookId, List<Comment> comments) {
        this.bookId = bookId;
        this.comments = comments;
    }

    public int getBookId() {
        return bookId;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

}

