package com.talks.demo.article.controller;

import com.talks.demo.articleDao.dao.UserMapper;
import com.talks.demo.articleDao.pojo.Board;
import org.apache.ibatis.annotations.Select;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping("/user")
@RestController
public class UserController {
    // 初始化 Log記錄器
    private static final Logger logger = LoggerFactory.getLogger(ArticleController.class);

    @Autowired
    private UserMapper userMapper;

    @PostMapping("/addFavoriteBoard")
    public ResponseEntity<String> addFavoriteBoard(@RequestBody Map<String, Object> request){
        try{
            int userId = (int)request.get("userId");
            int boardId = (int)request.get("boardId");
            userMapper.insertFavoriteBoard(userId, boardId);
            return ResponseEntity.ok("Board added to favorites successfully.");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add to favorites.");
        }
    }

    @DeleteMapping("/removeFavoriteBoard")
    public ResponseEntity<String> removeFavoriteBoard(@RequestParam int userId, @RequestParam int boardId) {
        try {
            userMapper.deleteFavoriteBoard(userId, boardId);  // 調用MyBatis的刪除方法
            return ResponseEntity.ok("Board removed from favorites successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to remove from favorites.");
        }
    }

    @GetMapping("/getFavoriteBoardId")
    public ResponseEntity<?> getFavoriteBoardName(@RequestParam int userId){
        try{
            List<Integer> favoriteBoards = userMapper.getFavoriteBoardId(userId);
            return ResponseEntity.ok(favoriteBoards);
        }catch (Exception e){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to get favorite boards");
        }
    }

    @GetMapping("/getFavoriteBoardInfo")
    public ResponseEntity<?> getFavoriteBoardInfo(@RequestParam int userId){
        try{
            List<Board> favoriteBoards = userMapper.getFavoriteBoardInfo(userId);
            return ResponseEntity.ok(favoriteBoards);
        }catch (Exception e){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to get favorite boards");
        }
    }

    @PostMapping("/updatePassword")
    public ResponseEntity<String> updatePassword(@RequestBody Map<String, Object> request){
        try{
            String password = (String)request.get("password");
            int userId = (int)request.get("userId");
            userMapper.updatePassword(password, userId);
            return ResponseEntity.ok("update password successfully.");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update password.");
        }
    }

    //刪除帳號
    @DeleteMapping("/deleteAccount")
    public ResponseEntity<String> deleteAccount(@RequestParam int userId){
        try{
            userMapper.deleteArticles(userId);
            userMapper.deleteMessages(userId);
            userMapper.deleteUserFavoriteBoards(userId);
            userMapper.deleteUser(userId);
            return ResponseEntity.ok("delete account successfully.");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete account.");
        }
    }

}
