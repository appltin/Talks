package com.talks.demo.article.security;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.jdbc.JdbcDaoImpl;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import javax.sql.DataSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final DataSource dataSource;

    public SecurityConfig(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeRequests(authz -> authz
                        .requestMatchers("/login", "/register").permitAll() // 允許匿名訪問 /login 和 /register
                        .anyRequest().authenticated() // 所有請求都要驗證
                )
                .formLogin(form -> form
                        .loginProcessingUrl("/login")
                        //  登入成功回傳 { status : success }
                        .successHandler((request, response, authentication) -> {
                            response.setContentType("application/json;charset=UTF-8");
                            response.getWriter().write("{\"status\":\"success\"}");
                        })
                        // 登入失敗回傳 { status : failure }
                        .failureHandler((request, response, exception) -> {
                            response.setContentType("application/json;charset=UTF-8");
                            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                            response.getWriter().write("{\"status\":\"failure\"}");
                        })
                        .permitAll()
                )
                // http 驗證用默認設置
                .httpBasic()
                .and()
                .cors(); // 啟用CORS配置
        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        JdbcDaoImpl jdbcDao = new JdbcDaoImpl();
        jdbcDao.setDataSource(dataSource);
        jdbcDao.setUsersByUsernameQuery("SELECT username, password, enabled FROM user WHERE username = ?");
        jdbcDao.setAuthoritiesByUsernameQuery("SELECT username, role FROM user WHERE username = ?");
        return jdbcDao;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance();
        // return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:3000"); // 明確允許 http://localhost:3000 來源
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}