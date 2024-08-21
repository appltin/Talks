package com.talks.demo.articleDao.dao;


import com.talks.demo.articleDao.pojo.Article;
import com.talks.demo.articleDao.pojo.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface UserMapper {
    @Select("select * from user")
    List<User> getUser();

    //把帳號加入數據庫
    void register(User user);

    //查詢頭像類型
    User getAvatarType(String username);

    // 搜尋關鍵字
    List<Article> searchKeyWord(String keyword);

    //新增文章
    void addArticle(Article article);

    //讀取熱門文章
    @Select("SELECT * FROM article ORDER BY love DESC LIMIT 40")
    List<Article> getHotArticle();

    //讀取最新文章
    @Select("SELECT * FROM article ORDER BY time DESC LIMIT 40")
    List<Article> getNewArticle();

    //更新文章
    @Update("UPDATE article SET title = #{title}, content = #{content} WHERE article_id = #{articleId}")
    void updateArticle(Article article);

    //刪除文章
    @Delete("delete from article where article_id = #{articleId}")
    void deleteArticle(int articleId);
}
