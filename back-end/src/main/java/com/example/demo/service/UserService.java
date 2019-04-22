package com.example.demo.service;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    public JSONObject signin(String username, String password) {
        User user = userRepository.findByUsernameAndPassword(username, password);
        JSONObject resp = new JSONObject();

        if (user == null) {
            resp.put("error", "Wrong username or password!");
            return resp;
        }
        if (user.getValidity() == 0) {
            resp.put("error", "You are forbidden!");
            return resp;
        }
        resp.put("userId", user.getUserId());
        resp.put("username", user.getUsername());
        resp.put("identity", user.getIdentity());
        resp.put("validity", user.getValidity());
        return resp;
    }
}
