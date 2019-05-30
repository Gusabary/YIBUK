package com.example.demo;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import static org.hamcrest.CoreMatchers.*;
import static org.hamcrest.Matchers.greaterThan;
import static org.hamcrest.MatcherAssert.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class UserControllerTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private UserRepository userRepository;

    private final String username = "test5648259647852359";
    private final String password = "test";
    private final String email = "test@126.com";
    private final String signinUrl = "/api/users/signin";
    private final String signupUrl = "/api/users/signup";
    private final String showUrl = "/api/users/show";
    private final String banUrl = "/api/users/manage";

    private JSONObject createUserForSignIn() {
        JSONObject user = new JSONObject();
        user.put("username", username);
        user.put("password", password);
        return user;
    }

    private JSONObject createUserForSignUp() {
        JSONObject user = createUserForSignIn();
        user.put("email", email);
        return user;
    }

    private JSONObject createUserForBan() {
        JSONObject user = new JSONObject();
        user.put("userId", userRepository.findByUsername(username).getUserId());
        user.put("targetValidity", 0);
        return user;
    }

    @Test
    public void signin_success() {
        userRepository.save(new User(username, password, email, 0, 1));
        ResponseEntity<JSONObject> response =
                restTemplate.postForEntity(signinUrl, createUserForSignIn(), JSONObject.class);
        userRepository.deleteByUsername(username);

        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody().getString("username"), equalTo(username));
        assertThat(response.getBody().getInteger("identity"), is(0));
        assertThat(response.getBody().getInteger("validity"), is(1));
    }

    @Test
    public void signin_forbidden() {
        userRepository.save(new User(username, password, email, 0, 0));
        ResponseEntity<JSONObject> response =
                restTemplate.postForEntity(signinUrl, createUserForSignIn(), JSONObject.class);
        userRepository.deleteByUsername(username);

        assertThat(response.getStatusCode(), is(HttpStatus.FORBIDDEN));
        assertThat(response.getBody().getString("error"), equalTo("You are forbidden!"));
    }

    @Test
    public void signin_wrongUsername() {
        ResponseEntity<JSONObject> response =
                restTemplate.postForEntity(signinUrl, createUserForSignIn(), JSONObject.class);

        assertThat(response.getStatusCode(), is(HttpStatus.EXPECTATION_FAILED));
        assertThat(response.getBody().getString("error"), equalTo("Wrong username or password!"));
    }

    @Test
    public void signin_wrongPassword() {
        userRepository.save(new User(username, password, email, 0, 1));
        JSONObject user = createUserForSignIn();
        user.put("password", "wrongPassword");
        ResponseEntity<JSONObject> response =
                restTemplate.postForEntity(signinUrl, user, JSONObject.class);
        userRepository.deleteByUsername(username);

        assertThat(response.getStatusCode(), is(HttpStatus.EXPECTATION_FAILED));
        assertThat(response.getBody().getString("error"), equalTo("Wrong username or password!"));
    }

    @Test
    public void signup_success() {
        ResponseEntity<JSONObject> response =
                restTemplate.postForEntity(signupUrl, createUserForSignUp(), JSONObject.class);
        userRepository.deleteByUsername(username);

        assertThat(response.getStatusCode(), is(HttpStatus.OK));
    }

    @Test
    public void signup_fail() {
        userRepository.save(new User(username, password, email, 0, 1));
        ResponseEntity<JSONObject> response =
                restTemplate.postForEntity(signupUrl, createUserForSignUp(), JSONObject.class);
        userRepository.deleteByUsername(username);

        assertThat(response.getStatusCode(), is(HttpStatus.EXPECTATION_FAILED));
        assertThat(response.getBody().getString("error"), equalTo("Username has existed!"));
    }

    /*@Test
    public void show() {
        ResponseEntity<JSONObject> response =
                restTemplate.getForEntity(showUrl, JSONObject.class);

        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody().getString("users").length(), greaterThan(2));
    }

    @Test
    public void ban() {
        userRepository.save(new User(username, password, email, 0, 1));
        HttpEntity<JSONObject> req = new HttpEntity(createUserForBan());
        ResponseEntity<JSONObject> response =
                restTemplate.exchange(banUrl, HttpMethod.PUT, req, JSONObject.class);
        userRepository.deleteByUsername(username);

        assertThat(response.getStatusCode(), is(HttpStatus.OK));
    }*/
}
