package com.example.demo.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "user")
public class MUser {

    @Id
    private Long id;
    private String username;
    private String age;
    private String gender;

    public MUser(String username, String age, String gender) {
        this.username = username;
        this.age = age;
        this.gender = gender;
    }

}
