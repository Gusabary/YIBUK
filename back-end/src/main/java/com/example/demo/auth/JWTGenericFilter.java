package com.example.demo.auth;

import com.alibaba.fastjson.JSONObject;
import org.springframework.web.filter.GenericFilterBean;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.FilterChain;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


class JWTGenericFilter extends GenericFilterBean {

    @Override
    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain)
            throws IOException, ServletException {
        //verify token
        Authentication authentication = TokenService.verifyToken((HttpServletRequest)req);
        //pass on auth info
        SecurityContextHolder.getContext().setAuthentication(authentication);

        chain.doFilter(req, resp);
    }
}