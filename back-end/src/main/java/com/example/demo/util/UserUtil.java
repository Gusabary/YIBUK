package com.example.demo.util;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.*;

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

    public static JSONObject constructJsonOfDisallow() {
        JSONObject json = new JSONObject();
        json.put("error", "Flooding attack detected, signup fail!");
        return json;
    }

    public static JSONObject constructJsonOfBanned() {
        JSONObject json = new JSONObject();
        json.put("error", "You are forbidden!");
        return json;
    }

    public static JSONObject constructJsonOfWrongLoginInfo() {
        JSONObject json = new JSONObject();
        json.put("error", "Wrong username or password!");
        return json;
    }

    public static JSONObject constructJsonOfUsernameExists() {
        JSONObject json = new JSONObject();
        json.put("error", "Username has existed!");
        return json;
    }

    public static JSONObject constructJsonOfSignUp() {
        JSONObject json = new JSONObject();
        json.put("message", "Sign up successfully!");
        return json;
    }

    public static JSONObject constructJsonOfShow(JSONArray users) {
        JSONObject json = new JSONObject();
        json.put("users", users);
        return json;
    }

    public static JSONObject constructJsonOfToggle() {
        JSONObject json = new JSONObject();
        json.put("message", "Update validity successfully!");
        return json;
    }
}
