package com.example.demo;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.repository.UserRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.CoreMatchers.is;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class UserControllerTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private UserRepository userRepository;

    @Test
    public void signup_success() {
        JSONObject user = new JSONObject();
        String username = "test546516153168489";
        user.put("username", username);
        user.put("password", "test");
        user.put("email", "test@qq.com");

        ResponseEntity<JSONObject> response =
                restTemplate.postForEntity("/api/users/signup", user, JSONObject.class);
        userRepository.deleteByUsername(username);

        assertThat(response.getStatusCode(), is(HttpStatus.OK));
    }

}
