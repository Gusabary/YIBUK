package com.example.demo.auth;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.User;
import com.example.demo.util.UserUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

class JWTLoginFilter extends AbstractAuthenticationProcessingFilter {

    public JWTLoginFilter(String url, AuthenticationManager authManager) {
        super(new AntPathRequestMatcher(url));
        setAuthenticationManager(authManager);
    }

    //Step 1: attemptAuthentication: (req, resp) -> Authentication
    @Override
    public Authentication attemptAuthentication(HttpServletRequest req, HttpServletResponse resp)
            throws AuthenticationException, IOException {

        // JSON反序列化成 AccountCredentials
        User user = new ObjectMapper().readValue(req.getInputStream(), User.class);

        // 返回一个验证令牌
        System.out.println("step 1");
        return getAuthenticationManager().authenticate(
                new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
        );
    }

    //Step 3: successfulAuthentication: (req, resp, chain, Authentication) -> write into resp
    @Override
    protected void successfulAuthentication(HttpServletRequest req, HttpServletResponse resp,
                                            FilterChain chain, Authentication auth)
            throws IOException, ServletException {
        System.out.println("step 3");
        String token = TokenService.createToken(auth);
        JSONObject user = (JSONObject) auth.getDetails();

        resp.setContentType("application/json");
        resp.setStatus(HttpServletResponse.SC_OK);

        // 将 JWT 写入 body
        user.put("token", token);
        resp.getOutputStream().println(user.toJSONString());
    }


    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest req, HttpServletResponse resp,
                                              AuthenticationException failed)
            throws IOException, ServletException {
        resp.setContentType("application/json");
        if (failed.getMessage().equals("Wrong username or password!")) {
            resp.setStatus(HttpServletResponse.SC_EXPECTATION_FAILED);
            resp.getOutputStream().println(
                    UserUtil.constructJsonOfError("Wrong username or password!").toJSONString()
            );
        }
        if (failed.getMessage().equals("You are forbidden!")) {
            resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
            resp.getOutputStream().println(
                    UserUtil.constructJsonOfError("You are forbidden!").toJSONString()
            );
        }
    }
}