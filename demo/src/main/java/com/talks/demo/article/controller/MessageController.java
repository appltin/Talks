package com.talks.demo.article.controller;

import com.talks.demo.articleDao.dao.UserMapper;
import com.talks.demo.articleDao.pojo.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/message")
@RestController
public class MessageController {
    // 初始化 Log記錄器
    private static final Logger logger = LoggerFactory.getLogger(ArticleController.class);

    @Autowired
    private UserMapper userMapper;

    // 新增留言
    @PostMapping("/addMessage")
    public ResponseEntity<?> addMessage(@RequestBody Message message) {
        System.out.println("Received message: " + message); // 檢查後端接收到的數據
        try {
            int result = userMapper.insertMessage(
                    message.getArticleId(),
                    message.getUserId(),
                    message.getContent()
            );
            return ResponseEntity.ok("Message inserted successfully.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while inserting message.");
        }
    }

    //新增愛心
    @PostMapping("/incrementMessageLove/{messageId}")
    public ResponseEntity<?> incrementMessageLove(@PathVariable int messageId) {
        try {
            int result = userMapper.incrementMessageLove(messageId);

            if (result > 0) {
                return ResponseEntity.ok("Message love count incremented successfully.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Message not found.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error occurred while incrementing message love count.");
        }
    }

    // 減少愛心
    @PostMapping("/decrementMessageLove/{messageId}")
    public ResponseEntity<?> decrementMessageLove(@PathVariable int messageId) {
        try {
            int result = userMapper.decrementMessageLove(messageId);

            if (result > 0) {
                return ResponseEntity.ok("Message love count incremented successfully.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Message not found.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error occurred while incrementing message love count.");
        }
    }

    @GetMapping("/getMessagesByArticleId/{articleId}")
    public ResponseEntity<?> getMessagesByArticleId(@PathVariable int articleId) {
        try {
            List<Message> messages = userMapper.selectMessagesByArticleId(articleId);
            return ResponseEntity.ok(messages);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error occurred while retrieving messages.");
        }
    }

}
