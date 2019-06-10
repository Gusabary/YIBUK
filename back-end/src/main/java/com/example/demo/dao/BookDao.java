package com.example.demo.dao;

import com.example.demo.entity.Book;

import java.util.List;

public interface BookDao {

    Iterable<Book> findAll();

    void save(Book book);

    void deleteById(int bookId);

    Book findById(int bookId);

}
