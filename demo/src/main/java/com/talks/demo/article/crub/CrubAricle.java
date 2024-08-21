package com.talks.demo.article.crub;

import com.talks.demo.articleDao.dao.UserMapper;
import com.talks.demo.articleDao.pojo.Article;
import com.talks.demo.articleDao.pojo.User;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RequestMapping("/article")
@RestController
public class CrubAricle {

    // 初始化 Log記錄器
    private static final Logger logger = LoggerFactory.getLogger(CrubAricle.class);

    @Autowired
    private UserMapper userMapper;

    @GetMapping("/getAvatarAndUerId")
    public ResponseEntity<?> getAvatar(@RequestParam String username) {
        logger.info("進入getUserById-----");

        try {
            User user =  userMapper.getAvatarType(username);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error occurred while fetching avatar and id");
        }
    }

    @GetMapping("/keyWord")
    public List<Article> searchKeyWord(@RequestParam String keyWord) {

        try {
            List<Article> results= userMapper.searchKeyWord(keyWord);
            return results;
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("search keyWord fail");
            return Collections.emptyList();  // 返回空列表
        }
    }

    @PostMapping("/add")
    public String addArticle(@RequestBody Article article){
        try {
            userMapper.addArticle(article);
            return "add article success";
        } catch (Exception e) {
            e.printStackTrace();
            return "add article fail";
        }
    }

    @GetMapping("/popular")
    public List<Article> getHotArticle(){
        try {
            List<Article> result = userMapper.getHotArticle();
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();  // 返回空列表
        }
    }
    @GetMapping("/newest")
    public List<Article> getNewArticle(){
        try {
            List<Article> result = userMapper.getNewArticle();
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();  // 返回空列表
        }
    }

    @PostMapping("/edit")
    public String editArticle(@RequestBody Article article){
        try {
            userMapper.updateArticle(article);
            return "edit article success";
        } catch (Exception e) {
            e.printStackTrace();
            return "edit article fail";
        }
    }

    @DeleteMapping("/delete")
    public String deleteArticle(@RequestParam int articleId){
        try {
            userMapper.deleteArticle(articleId);
            return "delete article success";
        } catch (Exception e) {
            e.printStackTrace();
            return "delete article fail";
        }
    }
}


