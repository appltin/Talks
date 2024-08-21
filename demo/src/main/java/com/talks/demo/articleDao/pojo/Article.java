package com.talks.demo.articleDao.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.ibatis.type.Alias;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Article {
    private int articleId;
    private String title;
    private String border;
    private int userId;
    private String username;
    private String content;
    private int love;
    private LocalDateTime time;
}
