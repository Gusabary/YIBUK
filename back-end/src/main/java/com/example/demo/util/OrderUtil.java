package com.example.demo.util;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

public class OrderUtil {

    public static String constructID(String now, int userId) {
        String userId_s = String.valueOf(userId);
        String padding = "";
        for (int i = 1; i <= 5 - userId_s.length(); i++)
            padding += '0';
        return now + padding + userId_s;
    }

    public static JSONObject constructJsonOfAdd() {
        JSONObject json = new JSONObject();
        json.put("message", "Purchase successfully!");
        return json;
    }

    public static JSONObject constructJsonOfShow(JSONArray orders) {
        JSONObject json = new JSONObject();
        json.put("orders", orders);
        return json;
    }
}
