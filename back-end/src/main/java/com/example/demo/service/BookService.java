package com.example.demo.service;

import com.example.demo.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.entity.Book;

@Service
public class BookService {

    @Autowired
    private BookRepository personRepository;

    public Iterable<Book> showBook() {
        return personRepository.findAll();
    }
}