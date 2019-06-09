package com.example.demo.serviceImpl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.repository.BookRepository;
import com.example.demo.repository.CommentRepository;
import com.example.demo.service.BookService;
import com.example.demo.util.BookUtil;
import com.example.demo.util.CartUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.example.demo.entity.Book;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Override
    public JSONObject show() {
        JSONArray books = new JSONArray();
        bookRepository.findAll().forEach(book -> books.add(
                BookUtil.attachCommentsTo(commentRepository.findByBookId(book.getBookId()), book)));
        return BookUtil.constructJsonOfShow(books);
    }

    @Override
    public JSONObject create(Book book) {
        bookRepository.save(book);
        return BookUtil.constructJsonOfCreate();
    }

    @Override
    public JSONObject update(Book book) {
        bookRepository.save(book);
        return BookUtil.constructJsonOfUpdate();
    }

    @Override
    public JSONObject delete(JSONArray bookIds) {
        bookIds.forEach(bookId -> bookRepository.deleteById(Integer.parseInt(bookId.toString())));
        return BookUtil.constructJsonOfDelete();
    }

    @Override
    public void purchase(int bookId, int quantity) {
        //built-in findById() doesn't return an entity, need .get() to convert
        Book book = bookRepository.findById(bookId).get();
        book.setStorage(book.getStorage() - quantity);
        bookRepository.save(book);
    }

    @Override
    public boolean isStorageEnough(JSONArray books) {
        for (Object bookInCart : books) {
            int bookId = ((JSONObject) bookInCart).getInteger("bookId");
            int consume = ((JSONObject) bookInCart).getInteger("quantity");

            if (consume > bookRepository.findById(bookId).get().getStorage())
                return false;
        }
        return true;
    }

}