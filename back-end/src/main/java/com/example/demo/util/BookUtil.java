package com.example.demo.util;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.Book;
import com.example.demo.entity.Comment;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

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

    public static JSONObject constructJsonOfMessage(String message) {
        JSONObject json = new JSONObject();
        json.put("message", message);
        return json;
    }

    public static JSONObject attachCommentsTo(List<Comment> comments, Book book) {
        JSONObject json = new JSONObject();
        json.put("bookId", book.getBookId());
        json.put("bookName", book.getBookName());
        json.put("author", book.getAuthor());
        json.put("coverPath", book.getCoverPath());
        json.put("isbn", book.getIsbn());
        json.put("storage", book.getStorage());
        json.put("price", book.getPrice());
        json.put("introduction", book.getIntroduction());
        json.put("comments", comments);
        return json;
    }

    public static List<Comment> addComment(List<Comment> old, List<Integer> indexes, Comment toAdd) {
        System.out.println("old: " + old);
        System.out.println("indexes: " + indexes);
        if (indexes.isEmpty()) {
            if (old == null)  // the first comment or followup
                old = new ArrayList<Comment>();
            old.add(toAdd);
            return old;
        }
        int index = indexes.get(0);
        indexes.remove(0);
        old.get(index).setFollowup(addComment(old.get(index).getFollowup(), indexes, toAdd));
        return old;
    }

    public static JSONObject constructJsonOfTitleInfo(int bookId, String title, String author, double price) {
        JSONObject json = new JSONObject();
        json.put("bookId", bookId);
        json.put("bookName", title);
        json.put("author", author);
        json.put("price", price);
        return json;
    }

}
