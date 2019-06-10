package com.example.demo.entity;

import java.util.Date;
import java.util.List;

public class Comment {

    private int userId;

    private Date time;

    private String content;

    private List<Comment> followup;

    public Comment() {}

    public Comment(int userId, Date time, String content, List<Comment> followup) {
        this.userId = userId;
        this.time = time;
        this.content = content;
        this.followup = followup;
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

    public List<Comment> getFollowup() {
        return followup;
    }

    public void setFollowup(List<Comment> followup) {
        this.followup = followup;
    }

}
