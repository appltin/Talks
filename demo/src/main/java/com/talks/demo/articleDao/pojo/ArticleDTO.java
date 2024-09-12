package com.talks.demo.articleDao.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ArticleDTO {

    // 比Article多FirstImgUrl字段
    private int articleId;
    private String title;
    private String board;
    private int boardId;
    private int userId;
    private String username;
    private String avatar;
    private String content;
    private String firstImgUrl;
    private int love;
    private LocalDateTime time;
}
