package com.example.demo.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.service.BookService;
import com.example.demo.entity.Book;
import com.example.demo.util.BookUtil;
import org.apache.tomcat.util.http.fileupload.FileItem;
import org.apache.tomcat.util.http.fileupload.RequestContext;
import org.apache.tomcat.util.http.fileupload.disk.DiskFileItemFactory;
import org.apache.tomcat.util.http.fileupload.servlet.ServletFileUpload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "/api/books")
public class BookController {

    @Autowired
    private BookService bookService;

    @RequestMapping(value = "/show", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<JSONObject> show(){
        return new ResponseEntity<JSONObject>(bookService.show(), HttpStatus.OK);
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
}