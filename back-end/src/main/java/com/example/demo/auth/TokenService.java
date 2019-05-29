package com.example.demo.auth;

import com.alibaba.fastjson.JSONObject;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

class TokenService {
    static final long EXPIRATIONTIME = 5000000;     // 50秒
    static final String SECRET = "my-jwt-secret-here";            // JWT密码
    static final String TOKEN_PREFIX = "Bearer";        // Token前缀
    static final String HEADER_STRING = "Authorization";// 存放Token的Header Key

    //Step 4: addAuthentication: Authentication -> token
    static String createToken(Authentication auth) throws IOException {
        System.out.println("step 4");
        String username = auth.getPrincipal().toString();
        String authorities = new ArrayList<GrantedAuthority>(auth.getAuthorities()).get(0).getAuthority();

        // 生成JWT
        String JWT = Jwts.builder()
                // 保存权限（角色）
                .claim("authorities", authorities)
                // 用户名写入标题
                .setSubject(username)
                // 有效期设置
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATIONTIME))
                // 签名设置
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact();

        return JWT;
    }

    //getAuthentication: req (actually token) -> Authentication
    static Authentication verifyToken(HttpServletRequest req) {
        // 从Header中拿到token
        String token = req.getHeader(HEADER_STRING);

        if (token != null) {
            // 解析 Token
            Claims claims = Jwts.parser()
                    // 验签
                    .setSigningKey(SECRET)
                    // 去掉 Bearer
                    .parseClaimsJws(token.replace(TOKEN_PREFIX, ""))
                    .getBody();

            // 拿用户名
            String username = claims.getSubject();

            // 得到 权限（角色）
            List<GrantedAuthority> authorities =
                    AuthorityUtils.commaSeparatedStringToAuthorityList((String)claims.get("authorities"));

            // 返回验证令牌
            return username != null ?
                    new UsernamePasswordAuthenticationToken(username, null, authorities) : null;
        }
        return null;
    }
}