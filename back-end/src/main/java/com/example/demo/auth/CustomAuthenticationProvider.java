package com.example.demo.auth;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

    @Autowired
    private UserService userService;

    //Step 2: authenticate: Authentication -> Authentication
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        // 获取认证的用户名 & 密码
        String username = authentication.getPrincipal().toString();
        String password = authentication.getCredentials().toString();

        System.out.println("step 2");

        // 认证逻辑
        if (!userService.isLoginInfoCorrect(username, password))
            throw new BadCredentialsException("Wrong username or password!");
        if (userService.isBanned(username))
            throw new DisabledException("You are forbidden!");

        JSONObject user = userService.signin(username);
        int identity = user.getInteger("identity");
        List<GrantedAuthority> authorities = new ArrayList<>();

        if (identity == 0) //customer
            authorities.add(new GrantedAuthorityImpl("customer"));
        if (identity == 1) //administrator
            authorities.add(new GrantedAuthorityImpl("admin"));

        // 生成令牌
        Authentication auth = new UsernamePasswordAuthenticationToken(username, password, authorities);
        ((UsernamePasswordAuthenticationToken) auth).setDetails(user);
        return auth;
    }

    // 是否可以提供输入类型的认证服务 (只提供 UsernamePasswordAuthenticationToken 类型的认证服务)
    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }

}