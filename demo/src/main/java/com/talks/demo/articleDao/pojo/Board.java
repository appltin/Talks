package com.talks.demo.articleDao.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Board {
    private int id;
    private String boardName;
    private String imgUrl;
    private String slogan;
}
