package com.example.demo.service;

import com.alibaba.fastjson.JSONArray;
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
        JSONObject resp = new JSONObject();
        User user = userRepository.findByUsernameAndPassword(username, password);

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

    public JSONObject signup(String username, String password, String email) {
        JSONObject resp = new JSONObject();

        if (userRepository.findByUsername(username) != null) {
            resp.put("error", "Username has existed!");
            return resp;
        }
        userRepository.save(new User(username, password, email, 0, 1));
        resp.put("message", "Sign up successfully!");
        return resp;
    }

    public JSONObject show() {
        JSONObject resp = new JSONObject();
        JSONArray users = new JSONArray();

        userRepository.findAll().forEach(user -> {
            JSONObject tmp = new JSONObject();
            tmp.put("userId", user.getUserId());
            tmp.put("username", user.getUsername());
            tmp.put("email", user.getEmail());
            tmp.put("validity", user.getValidity());
            users.add(tmp);
        });
        resp.put("users", users);
        return resp;
    }

}
