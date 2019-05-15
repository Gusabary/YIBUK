package com.example.demo.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.service.BookService;
import com.example.demo.service.UserService;
import com.example.demo.serviceImpl.UserServiceImpl;
import com.example.demo.util.UserUtil;
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
        if (userService.isBanned(username))
            return new ResponseEntity<JSONObject>(UserUtil.constructJsonOfBanned(), HttpStatus.FORBIDDEN);

        String password = request.getString("password");
        if (!userService.isLoginInfoCorrect(username, password))
            return new ResponseEntity<JSONObject>(UserUtil.constructJsonOfWrongLoginInfo(), HttpStatus.EXPECTATION_FAILED);

        return new ResponseEntity<JSONObject>(userService.signin(username), HttpStatus.OK);
    }

    @RequestMapping(value = "/signup", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<JSONObject> signup(@RequestBody JSONObject request) {
        String username = request.getString("username");
        if (userService.doesUsernameExist(username))
            return new ResponseEntity<JSONObject>(UserUtil.constructJsonOfUsernameExists(), HttpStatus.EXPECTATION_FAILED);

        String password = request.getString("password");
        String email = request.getString("email");

        return new ResponseEntity<JSONObject>(userService.signup(username, password, email), HttpStatus.OK);
    }

    @RequestMapping(value = "/show", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<JSONObject> show() {
        return new ResponseEntity<JSONObject>(userService.show(), HttpStatus.OK);
    }

    @RequestMapping(value = "/manage", method = RequestMethod.PUT)
    @ResponseBody
    public ResponseEntity<JSONObject> toggle(@RequestBody JSONObject request) {
        int userId = request.getInteger("userId");
        int targetValidity = request.getInteger("targetValidity");

        return new ResponseEntity<JSONObject>(userService.toggle(userId, targetValidity), HttpStatus.OK);
    }
}
