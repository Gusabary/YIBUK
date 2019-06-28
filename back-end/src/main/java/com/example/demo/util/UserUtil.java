package com.example.demo.util;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.IOException;

public class UserUtil {

    public static JSONObject constructJsonOfSignIn(int userId, String username, int identity, int validity) {
        JSONObject json = new JSONObject();
        json.put("userId", userId);
        json.put("username", username);
        json.put("identity", identity);
        json.put("validity", validity);
        return json;
    }

    public static JSONObject constructJsonOfUser(int userId, String username, String email, int validity) {
        JSONObject json = new JSONObject();
        json.put("userId", userId);
        json.put("username", username);
        json.put("email", email);
        json.put("validity", validity);
        return json;
    }

    public static JSONObject parseRequestOfSignUp(HttpServletRequest request) throws IOException {
        BufferedReader br = request.getReader();
        String str, wholeStr = "";
        while((str = br.readLine()) != null){
            wholeStr += str;
        }
        return JSONObject.parseObject(wholeStr);
    }

    public static JSONObject constructJsonOfMessage(String message) {
        JSONObject json = new JSONObject();
        json.put("message", message);
        return json;
    }

    public static JSONObject constructJsonOfError(String error) {
        JSONObject json = new JSONObject();
        json.put("error", error);
        return json;
    }

    public static JSONObject constructJsonOfShow(JSONArray users) {
        JSONObject json = new JSONObject();
        json.put("users", users);
        return json;
    }

}
