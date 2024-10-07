package com.talks.demo.article.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

//每次請求時檢查 JWT 是否有效
@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;    // 用來解析和驗證 JWT 的工具類

    @Autowired
    @Lazy
    private UserDetailsService userDetailsService;  // 用來加載用戶詳細資料的服務類

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        logger.info("JwtRequestFilter is invoked for request: " + request.getRequestURI());

        // 從 HTTP 請求中取得 Authorization 標頭
        final String authorizationHeader = request.getHeader("Authorization");

        String username = null;
        String jwt = null;



        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            // 從 Authorization 標頭中取得 JWT token，去掉 "Bearer " 字串
            jwt = authorizationHeader.substring(7);
            // 使用 jwtUtil 來解析 JWT，提取出用戶名
            username = jwtUtil.extractUsername(jwt);
            System.out.println("Extracted username: " + username);
        }

        System.out.println("ya!!!");

        // 如果 JWT 中有用戶名，並且當前的 SecurityContext 沒有設置用戶身份
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // 從 UserDetailsService 中加載用戶詳細資料
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
            System.out.println("User details: " + userDetails.getUsername());
            // 驗證 JWT 是否有效（簽名是否正確、是否過期等）
            if (jwtUtil.validateToken(jwt, userDetails)) {
                // JWT 驗證成功
                logger.info("JWT token validated successfully for user: " + userDetails.getUsername());

                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }else{
                // JWT 驗證失敗
                logger.warn("JWT token validation failed for token: " + jwt);
                System.out.println("is not similar");
            }
        }
        // 繼續進行過濾鏈的處理
        chain.doFilter(request, response);
    }
}