package com.example.demo.util;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

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

    public static JSONObject constructJsonOfMessage(String message) {
        JSONObject json = new JSONObject();
        json.put("message", message);
        return json;
    }

}
