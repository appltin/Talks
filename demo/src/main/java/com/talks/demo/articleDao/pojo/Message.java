package com.talks.demo.articleDao.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Message {
    private int messageId;
    private int articleId;
    private int userId;
    private String username;
    private String avatar;
    private String content;
    private LocalDateTime time;
    private int love;
}
