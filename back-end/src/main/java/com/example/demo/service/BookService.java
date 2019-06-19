package com.example.demo.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.Book;
import com.example.demo.entity.Comment;

import java.util.List;

public interface BookService {

    JSONObject show(int bookId);

    JSONObject showAll();

    JSONObject create(Book book);

    JSONObject update(Book book);

    JSONObject delete(JSONArray bookIds);

    void purchase(int bookId, int quantity);

    boolean isStorageEnough(JSONArray books);

    void addComment(int bookId, List<Integer> indexes, Comment comment);

}