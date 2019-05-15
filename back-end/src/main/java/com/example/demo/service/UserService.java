package com.example.demo.service;

import com.alibaba.fastjson.JSONObject;

public interface UserService {

    boolean isBanned(String username);

    boolean isLoginInfoCorrect(String username, String password);

    JSONObject signin(String username);

    boolean doesUsernameExist(String username);

    JSONObject signup(String username, String password, String email);

    JSONObject show();

    JSONObject toggle(int userId, int targetValidity);

}
