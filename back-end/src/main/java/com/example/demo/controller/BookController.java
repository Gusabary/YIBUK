package com.example.demo.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.Comment;
import com.example.demo.service.BookService;
import com.example.demo.entity.Book;
import com.example.demo.util.BookUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.util.Date;
import java.util.List;

@Controller
@RequestMapping(value = "/api/books")
public class BookController {

    @Autowired
    private BookService bookService;

    @RequestMapping(value = "/show", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<JSONObject> show(@RequestParam(name = "bookId") int bookId) {
        return new ResponseEntity<JSONObject>(bookService.show(bookId), HttpStatus.OK);
    }

    @RequestMapping(value = "/show/all", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<JSONObject> showAll(){
        return new ResponseEntity<JSONObject>(bookService.showAll(), HttpStatus.OK);
    }

    @RequestMapping(value = "/manage", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<JSONObject> create(MultipartHttpServletRequest request) {
        BookUtil.saveImage(request.getFile("image"));
        Book book = BookUtil.parseFormData(request);
        return new ResponseEntity<JSONObject>(bookService.create(book), HttpStatus.OK);
    }

    @RequestMapping(value = "/manage", method = RequestMethod.PUT)
    @ResponseBody
    public ResponseEntity<JSONObject> update(MultipartHttpServletRequest request) {
        BookUtil.saveImage(request.getFile("image"));
        Book book = BookUtil.parseFormData(request);
        book.setBookId(Integer.parseInt(request.getParameter("bookId")));
        return new ResponseEntity<JSONObject>(bookService.update(book), HttpStatus.OK);
    }

    @RequestMapping(value = "/manage", method = RequestMethod.DELETE)
    @ResponseBody
    public ResponseEntity<JSONObject> delete(@RequestBody JSONObject request) {
        JSONArray bookIds = request.getJSONArray("books");
        return new ResponseEntity<JSONObject>(bookService.delete(bookIds), HttpStatus.OK);
    }

    @RequestMapping(value = "/comments/add", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<JSONObject> addComment(@RequestBody JSONObject request) {
        Comment comment = new Comment(
                request.getInteger("userId"), new Date(),
                request.getString("content"), null);
        // convert JSONArray to List
        List<Integer> indexes = JSONObject.parseArray(
                JSONObject.toJSONString(request.getJSONArray("indexes")), Integer.class);
        bookService.addComment(request.getInteger("bookId"), indexes, comment);
        return new ResponseEntity<JSONObject>(
                BookUtil.constructJsonOfMessage("Post comment successfully!"), HttpStatus.OK
        );
    }

}