package com.example.demo.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.service.BookService;
import com.example.demo.entity.Book;
import org.apache.tomcat.util.http.fileupload.FileItem;
import org.apache.tomcat.util.http.fileupload.RequestContext;
import org.apache.tomcat.util.http.fileupload.disk.DiskFileItemFactory;
import org.apache.tomcat.util.http.fileupload.servlet.ServletFileUpload;
import org.springframework.beans.factory.annotation.Autowired;
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
        JSONObject resp = bookService.show();
        return new ResponseEntity<JSONObject>(resp, HttpStatus.OK);
    }

    @RequestMapping(value = "/manage", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<JSONObject> create(MultipartHttpServletRequest request) {
        String bookName = request.getParameter("bookName");
        String author = request.getParameter("author");
        String ISBN = request.getParameter("ISBN");
        int storage = Integer.parseInt(request.getParameter("storage"));
        float price = Float.parseFloat(request.getParameter("price"));
        String introduction = request.getParameter("introduction");

        MultipartFile image = request.getFile("image");
        String coverPath = image.getOriginalFilename();
        try {
            image.transferTo(new File("F:\\github\\YIBUK\\front-end\\public\\images\\" + coverPath));
        }
        catch (Exception ex) {
            System.out.println(ex.getMessage());
        }

        Book book = new Book(bookName, author, coverPath, ISBN, storage, price, introduction);
        JSONObject resp = bookService.create(book);
        return new ResponseEntity<JSONObject>(resp, HttpStatus.OK);
    }
}