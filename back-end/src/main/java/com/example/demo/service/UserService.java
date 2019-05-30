package com.example.demo.service;

import com.alibaba.fastjson.JSONObject;
import org.springframework.stereotype.Service;

@Service
public interface UserService {

    boolean isBanned(String username);

    boolean isLoginInfoCorrect(String username, String password);

    JSONObject signin(String username);

    boolean doesUsernameExist(String username);

    JSONObject signup(String username, String password, String email, String ipAddr);

    JSONObject show();

    JSONObject toggle(int userId, int targetValidity);

}
