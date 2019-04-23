package com.example.demo.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.repository.BookRepository;
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
        JSONObject resp = new JSONObject();
        JSONArray books = new JSONArray();

        bookRepository.findAll().forEach(book -> books.add(book));
        resp.put("books", books);
        return resp;
    }

    public JSONObject create(Book book) {
        JSONObject resp = new JSONObject();

        bookRepository.save(book);
        resp.put("message", "Add book successfully!");
        resp.put("newBook", bookRepository.findByIsbn(book.getIsbn()));
        return resp;
    }

    public JSONObject update(Book book) {
        JSONObject resp = new JSONObject();

        bookRepository.save(book);
        resp.put("message", "Update book successfully!");
        resp.put("newBook", book);
        return resp;
    }

    public JSONObject delete(JSONArray bookIds) {
        JSONObject resp = new JSONObject();

        bookIds.forEach(bookId -> bookRepository.deleteById(Integer.parseInt(bookId.toString())));
        resp.put("message", "Delete book successfully!");
        return resp;
    }

    public Book parseFormData(MultipartHttpServletRequest request) {
        String bookName = request.getParameter("bookName");
        String author = request.getParameter("author");
        String coverPath = request.getFile("image").getOriginalFilename();
        String ISBN = request.getParameter("ISBN");
        int storage = Integer.parseInt(request.getParameter("storage"));
        float price = Float.parseFloat(request.getParameter("price"));
        String introduction = request.getParameter("introduction");

        return new Book(bookName, author, coverPath, ISBN, storage, price, introduction);
    }

    public void saveImage(MultipartFile image) {
        String coverPath = image.getOriginalFilename();
        try {
            image.transferTo(new File("F:\\github\\YIBUK\\front-end\\public\\images\\" + coverPath));
        }
        catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
    }
}