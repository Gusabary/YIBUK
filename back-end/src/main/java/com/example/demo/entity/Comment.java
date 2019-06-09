package com.example.demo.entity;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "comments")
public class Comment {

    private int bookId;

    private int userId;

    private Date time;

    private String content;

    private Comment followup;

    public Comment() {}

    public Comment(int bookId, int userId, Date time, String content, Comment followup) {
        this.bookId = bookId;
        this.userId = userId;
        this.time = time;
        this.content = content;
        this.followup = followup;
    }

    public int getBookId() {
        return bookId;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Comment getFollowup() {
        return followup;
    }

    public void setFollowup(Comment followup) {
        this.followup = followup;
    }

}
