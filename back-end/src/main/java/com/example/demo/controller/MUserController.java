package com.example.demo.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.service.MUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MUserController {

    @Autowired
    MUserService mUserService;

    @RequestMapping(value = "/test", method = RequestMethod.GET)
    public int test() {
        mUserService.test();
        return 0;
    }

}
