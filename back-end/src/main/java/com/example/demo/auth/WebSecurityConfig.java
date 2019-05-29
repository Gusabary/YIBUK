package com.example.demo.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private CustomAuthenticationProvider customAuthenticationProvider;

    // 设置 HTTP 验证规则
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // 关闭csrf验证
        http.csrf().disable()
                .cors().and()
                .authorizeRequests()
                    .antMatchers("/api/users/signin").permitAll()
                    .antMatchers("/api/users/signup").permitAll()
                    .antMatchers("/api/books/show").permitAll()
                    .antMatchers("/api/carts/show").hasAuthority("customer")
                    .antMatchers("/api/carts/manage").hasAuthority("customer")
                    .antMatchers("/api/carts/manage/*").hasAuthority("customer")
                    .antMatchers("/api/orders/add").hasAuthority("customer")
                    .antMatchers("/api/orders/show").hasAuthority("customer")
                    .antMatchers("/api/users/show").hasAuthority("admin")
                    .antMatchers("/api/users/manage").hasAuthority("admin")
                    .antMatchers("/api/books/manage").hasAuthority("admin")
                    .antMatchers("/api/orders/show/all").hasAuthority("admin")
                    .anyRequest().authenticated()
                    .and()
                // 添加一个过滤器 所有登录请求交给 JWTLoginFilter 来处理 这个类处理所有的JWT相关内容
                .addFilterBefore(new JWTLoginFilter("/api/users/signin", authenticationManager()),
                        UsernamePasswordAuthenticationFilter.class)
                // 添加一个过滤器验证其他请求的Token是否合法
                .addFilterBefore(new JWTGenericFilter(),
                        UsernamePasswordAuthenticationFilter.class);
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        // 使用自定义身份验证组件
        auth.authenticationProvider(customAuthenticationProvider);
    }

}