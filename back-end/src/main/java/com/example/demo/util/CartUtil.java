package com.example.demo.util;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.springframework.stereotype.Service;

public class CartUtil {
    public static JSONObject constructJsonOfCartItem(int bookId, int quantity) {
        JSONObject json = new JSONObject();
        json.put("bookId", bookId);
        json.put("quantity", quantity);
        return json;
    }

    public static JSONObject constructJsonOfShow(JSONArray booksInCart) {
        JSONObject json = new JSONObject();
        json.put("cart", booksInCart);
        return json;
    }

    public static JSONObject constructJsonOfAdd() {
        JSONObject json = new JSONObject();
        json.put("message", "Add to cart successfully!");
        return json;
    }

    public static JSONObject constructJsonOfPurchase() {
        JSONObject json = new JSONObject();
        json.put("message", "Purchase successfully!");
        return json;
    }

    public static JSONObject constructJsonOfEmpty() {
        JSONObject json = new JSONObject();
        json.put("message", "Empty cart successfully!");
        return json;
    }

    public static JSONObject constructJsonOfDelete() {
        JSONObject json = new JSONObject();
        json.put("message", "Delete successfully!");
        return json;
    }
}