package com.example.demo.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(value = "/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/signin", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<JSONObject> signin(@RequestBody JSONObject request) {
        String username = request.getString("username");
        String password = request.getString("password");

        JSONObject resp = userService.signin(username, password);
        if (resp.getString("error") == "Wrong username or password!")
            return new ResponseEntity<JSONObject>(resp, HttpStatus.EXPECTATION_FAILED);
        if (resp.getString("error") == "You are forbidden!")
            return new ResponseEntity<JSONObject>(resp, HttpStatus.FORBIDDEN);
        return new ResponseEntity<JSONObject>(resp, HttpStatus.OK);
    }

    @RequestMapping(value = "/signup", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<JSONObject> signup(@RequestBody JSONObject request) {
        //JSONObject req = JSONObject.parseObject(requestBody);
        String username = request.getString("username");
        String password = request.getString("password");
        String email = request.getString("email");

        JSONObject resp = userService.signup(username, password, email);
        if (resp.getString("error") == "Username has existed!")
            return new ResponseEntity<JSONObject>(resp, HttpStatus.EXPECTATION_FAILED);
        return new ResponseEntity<JSONObject>(resp, HttpStatus.OK);
    }

    @RequestMapping(value = "/show", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<JSONObject> show() {
        JSONObject resp = userService.show();
        return new ResponseEntity<JSONObject>(resp, HttpStatus.OK);
    }

    @RequestMapping(value = "/manage", method = RequestMethod.PUT)
    @ResponseBody
    public ResponseEntity<JSONObject> toggle(@RequestBody JSONObject request) {
        int userId = request.getInteger("userId");
        int targetValidity = request.getInteger("targetValidity");

        JSONObject resp = userService.toggle(userId, targetValidity);
        return new ResponseEntity<JSONObject>(resp, HttpStatus.OK);
    }
}
