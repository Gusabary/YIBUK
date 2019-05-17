package com.example.demo.util;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.Book;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.File;

public class BookUtil {

    public static Book parseFormData(MultipartHttpServletRequest request) {
        String bookName = request.getParameter("bookName");
        String author = request.getParameter("author");
        String coverPath = request.getFile("image").getOriginalFilename();
        String isbn = request.getParameter("isbn");
        int storage = Integer.parseInt(request.getParameter("storage"));
        float price = Float.parseFloat(request.getParameter("price"));
        String introduction = request.getParameter("introduction");

        return new Book(bookName, author, coverPath, isbn, storage, price, introduction);
    }

    public static void saveImage(MultipartFile image) {
        String coverPath = image.getOriginalFilename();
        try {
            image.transferTo(new File("F:\\github\\YIBUK\\front-end\\public\\images\\" + coverPath));
        }
        catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
    }

    public static JSONObject constructJsonOfShow(JSONArray books) {
        JSONObject json = new JSONObject();
        json.put("books", books);
        return json;
    }

    public static JSONArray constructJsonOfBuy(int bookId, int quantity) {
        JSONObject book = new JSONObject();
        book.put("bookId", bookId);
        book.put("quantity", quantity);
        JSONArray books = new JSONArray();
        books.add(book);
        return books;
    }

    public static JSONObject constructJsonOfCreate() {
        JSONObject json = new JSONObject();
        json.put("message", "Add book successfully!");
        return json;
    }

    public static JSONObject constructJsonOfUpdate() {
        JSONObject json = new JSONObject();
        json.put("message", "Update book successfully!");
        return json;
    }

    public static JSONObject constructJsonOfDelete() {
        JSONObject json = new JSONObject();
        json.put("message", "Delete book successfully!");
        return json;
    }
}
