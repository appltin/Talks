package com.talks.demo.articleDao.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.ibatis.type.Alias;

//@Alias("user")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private int userId;
    private String username;
    private String password;
    private String role;
    private boolean enabled;
    private String avatar;
}


