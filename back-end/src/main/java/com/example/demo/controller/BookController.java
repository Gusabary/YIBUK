package com.example.demo.controller;

import com.example.demo.service.BookService;
import com.example.demo.entity.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class BookController {

    @Autowired
    private BookService bookService;

    @RequestMapping(value = "book", method = RequestMethod.GET)
    @ResponseBody
    public Iterable<Book> showBook(){
        return bookService.showBook();
    }
}