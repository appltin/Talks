package com.talks.demo.article.login;

import com.talks.demo.articleDao.dao.UserMapper;
import com.talks.demo.articleDao.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class Login {
    @Autowired
    private UserMapper userMapper;

    @PostMapping("/register")
    public String addUser(@RequestBody User user) {
        System.out.println(user);
        try {
            userMapper.register(user);;
            return "register success!";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error occurred while register";
        }
    }
}
