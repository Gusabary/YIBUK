package com.example.demo.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.repository.BookRepository;
import com.example.demo.util.BookUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.entity.Book;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.File;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public JSONObject show() {
        JSONArray books = new JSONArray();
        bookRepository.findAll().forEach(book -> books.add(book));
        return BookUtil.constructJsonOfShow(books);
    }

    public JSONObject create(Book book) {
        bookRepository.save(book);
        return BookUtil.constructJsonOfCreate();
    }

    public JSONObject update(Book book) {
        bookRepository.save(book);
        return BookUtil.constructJsonOfUpdate();
    }

    public JSONObject delete(JSONArray bookIds) {
        bookIds.forEach(bookId -> bookRepository.deleteById(Integer.parseInt(bookId.toString())));
        return BookUtil.constructJsonOfDelete();
    }

    public void purchase(int bookId, int quantity) {
        //built-in findById() doesn't return an entity, need .get() to convert
        Book book = bookRepository.findById(bookId).get();
        book.setStorage(book.getStorage() - quantity);
        bookRepository.save(book);
    }
}