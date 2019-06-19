package com.example.demo.serviceImpl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.dao.BookDao;
import com.example.demo.dao.SCommentDao;
import com.example.demo.entity.Comment;
import com.example.demo.entity.SComment;
import com.example.demo.service.BookService;
import com.example.demo.util.BookUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.entity.Book;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookDao bookDao;

    @Autowired
    private SCommentDao sCommentDao;

    @Override
    public JSONObject show(int bookId) {
        SComment sComment = sCommentDao.findByBookId(bookId);
        List<Comment> comments = (sComment == null) ? null : sComment.getComments();
        return BookUtil.attachCommentsTo(comments, bookDao.findById(bookId));
    }

    @Override
    public JSONObject showAll() {
        JSONArray books = new JSONArray();
        bookDao.findAll().forEach(book ->
            books.add(BookUtil.constructJsonOfTitleInfo(book.getBookId(), book.getBookName(), book.getAuthor()))
        );
        return BookUtil.constructJsonOfShow(books);
    }

    @Override
    public JSONObject create(Book book) {
        bookDao.save(book);
        return BookUtil.constructJsonOfCreate();
    }

    @Override
    public JSONObject update(Book book) {
        bookDao.save(book);
        return BookUtil.constructJsonOfUpdate();
    }

    @Override
    public JSONObject delete(JSONArray bookIds) {
        bookIds.forEach(bookId -> bookDao.deleteById(Integer.parseInt(bookId.toString())));
        return BookUtil.constructJsonOfDelete();
    }

    @Override
    public void purchase(int bookId, int quantity) {
        //built-in findById() doesn't return an entity, need .get() to convert
        Book book = bookDao.findById(bookId);
        book.setStorage(book.getStorage() - quantity);
        bookDao.save(book);
    }

    @Override
    public boolean isStorageEnough(JSONArray books) {
        for (Object bookInCart : books) {
            int bookId = ((JSONObject) bookInCart).getInteger("bookId");
            int consume = ((JSONObject) bookInCart).getInteger("quantity");

            if (consume > bookDao.findById(bookId).getStorage())
                return false;
        }
        return true;
    }

    @Override
    public void addComment(int bookId, List<Integer> indexes, Comment comment) {

        SComment sComment = sCommentDao.findByBookId(bookId);
        List<Comment> newComments = BookUtil.addComment(sComment.getComments(), indexes, comment);
        sComment.setComments(newComments);
        sCommentDao.save(sComment);
    }

}