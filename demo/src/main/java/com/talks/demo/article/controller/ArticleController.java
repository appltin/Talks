package com.talks.demo.article.controller;

import com.talks.demo.articleDao.dao.UserMapper;
import com.talks.demo.articleDao.pojo.Article;
import com.talks.demo.articleDao.pojo.ArticleDTO;
import com.talks.demo.articleDao.pojo.Board;
import com.talks.demo.articleDao.pojo.User;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Collections;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

@RequestMapping("/article")
@RestController
public class ArticleController {

    // 初始化 Log記錄器
    private static final Logger logger = LoggerFactory.getLogger(ArticleController.class);

    @Autowired
    private UserMapper userMapper;

    // 修改常量名稱以更具描述性
    private static final String POPULAR_ARTICLES_KEY = "popular_articles";
    private static final String LATEST_ARTICLES_KEY = "latest_articles";
    private static final String SPECIFIC_ARTICLE_KEY = "specific_articles";
    private static final String ALL_BOARDS_KEY = "all_boards";

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private ObjectMapper objectMapper;  // 注入 ObjectMapper

    //取得頭像和userId
    @GetMapping("/getUerInformation")
    public ResponseEntity<?> getAvatar(@RequestParam String username) {

        try {
            User user =  userMapper.getUerInformation(username);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error occurred while fetching avatar and id");
        }
    }

    // 取得keyWord
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

    //新增文章
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

    //獲取熱門文
    @GetMapping("/popular")
    public List<ArticleDTO> getHotArticle(){
        try {
            // 先從 Redis 查詢熱門文章緩存
            List<ArticleDTO> hotArticle =  (List<ArticleDTO>) redisTemplate.opsForValue().get(POPULAR_ARTICLES_KEY);

            if(hotArticle == null){
                List<ArticleDTO> articles = userMapper.getHotArticle();

                articles.forEach(article -> {
                    // 對每一篇文章進行處理
                    // 使用 Jsoup 解析文章內容的 HTML
                    Document doc = Jsoup.parse(article.getContent());

                    // 提取前20個字作為摘要
                    String text = doc.body().text();
                    String excerpt = text.length() > 45 ? text.substring(0, 45) : text; // 取得前20個字
                    article.setContent(excerpt);

                    // 提取第一張圖片的 URL
                    Element img = doc.select("img").first(); // 選擇第一個 <img> 標籤
                    String imageUrl = img != null ? img.attr("src") : "";
                    article.setFirstImgUrl(imageUrl);
                });

                // 將結果存入 Redis 並設置過期時間
                redisTemplate.opsForValue().set(POPULAR_ARTICLES_KEY, articles, 20, TimeUnit.MINUTES);
            }
            return hotArticle;

        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();  // 返回空列表
        }
    }

    //獲取最新文
    @GetMapping("/latest")
    public List<ArticleDTO> getNewArticle(){
        try {
            // 先從 Redis 查詢熱門文章緩存
            List<ArticleDTO> latestArticle =  (List<ArticleDTO>) redisTemplate.opsForValue().get(LATEST_ARTICLES_KEY);

            if(latestArticle == null){
                List<ArticleDTO> articles = userMapper.getNewArticle();

                articles.forEach(article -> {
                    // 對每一篇文章進行處理
                    // 使用 Jsoup 解析文章內容的 HTML
                    Document doc = Jsoup.parse(article.getContent());

                    // 提取前20個字作為摘要
                    String text = doc.body().text();
                    String excerpt = text.length() > 30 ? text.substring(0, 30) : text; // 取得前20個字
                    article.setContent(excerpt);

                    // 提取第一張圖片的 URL
                    Element img = doc.select("img").first(); // 選擇第一個 <img> 標籤
                    String imageUrl = img != null ? img.attr("src") : "";
                    article.setFirstImgUrl(imageUrl);
                });

                //存入緩存
                redisTemplate.opsForValue().set(LATEST_ARTICLES_KEY, articles, 20, TimeUnit.MINUTES);
            }

            return latestArticle;
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();  // 返回空列表
        }
    }

    //編輯文章
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

    //刪除文章
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

    //獲取最愛看板的文章
    @GetMapping("/getFavBoardArticles")
    public ResponseEntity<?> getFavBoardArticles(@RequestParam List<Integer> boardIds){
        try{
            // 檢查 boardIds 是否為空
            if (boardIds == null || boardIds.isEmpty()) {
                return ResponseEntity.ok(Collections.emptyList()); // 返回空列表
            }

            List<ArticleDTO> FavBoardArticles = userMapper.getFavBoardArticles(boardIds);

            FavBoardArticles.forEach(article -> {
                // 對每一篇文章進行處理
                // 使用 Jsoup 解析文章內容的 HTML
                Document doc = Jsoup.parse(article.getContent());

                // 提取前20個字作為摘要
                String text = doc.body().text();
                String excerpt = text.length() > 30 ? text.substring(0, 30) : text; // 取得前20個字
                article.setContent(excerpt);

                // 提取第一張圖片的 URL
                Element img = doc.select("img").first(); // 選擇第一個 <img> 標籤
                String imageUrl = img != null ? img.attr("src") : "";
                article.setFirstImgUrl(imageUrl);
            });

            return ResponseEntity.ok(FavBoardArticles);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error occurred while get FavBoardArticles");
        }
    }

    // 獲取各版文章
    @GetMapping("/getSpecifyBoard/{boardName}")
    public ResponseEntity<?> getSpecifyBoard(@PathVariable String boardName) {

        try{
            List<ArticleDTO> SpecifyBoardArticles = userMapper.selectSpecifyBoard(boardName);

            SpecifyBoardArticles.forEach(article -> {
                // 對每一篇文章進行處理
                // 使用 Jsoup 解析文章內容的 HTML
                Document doc = Jsoup.parse(article.getContent());

                // 提取前20個字作為摘要
                String text = doc.body().text();
                String excerpt = text.length() > 30 ? text.substring(0, 30) : text; // 取得前20個字
                article.setContent(excerpt);

                // 提取第一張圖片的 URL
                Element img = doc.select("img").first(); // 選擇第一個 <img> 標籤
                String imageUrl = img != null ? img.attr("src") : "";
                article.setFirstImgUrl(imageUrl);
            });

            return ResponseEntity.ok(SpecifyBoardArticles);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error occurred while get SpecifyBoardArticles");
        }
    }

    @GetMapping("/getArticleById/{articleId}")
    public ResponseEntity<?> getArticleById(@PathVariable int articleId) {
        try {
            // 根據 articleId 動態生成 Redis 鍵
            String redisKey = SPECIFIC_ARTICLE_KEY + "_" + articleId;

            // 從 Redis 查詢熱門文章緩存
            Object cachedArticle = redisTemplate.opsForValue().get(redisKey);
            ArticleDTO specificArticle = null;

            if (cachedArticle != null) {
                // 使用 ObjectMapper 將 LinkedHashMap 轉換為 ArticleDTO
                specificArticle = objectMapper.convertValue(cachedArticle, ArticleDTO.class);
            } else {
                specificArticle = userMapper.selectArticleById(articleId);
                // 將結果存入 Redis 並設置過期時間
                redisTemplate.opsForValue().set(redisKey, specificArticle, 30, TimeUnit.MINUTES);
            }

            return ResponseEntity.ok(specificArticle);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error occurred while getting article by ID");
        }
    }


    @PostMapping("/incrementLove/{articleId}")
    public ResponseEntity<?> incrementArticleLove(@PathVariable int articleId) {
        try {
            int result = userMapper.incrementArticleLove(articleId);

            if (result > 0) {
                return ResponseEntity.ok("Article love count incremented successfully.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Article not found.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while incrementing love count.");
        }
    }

    @PostMapping("/decrementLove/{articleId}")
    public ResponseEntity<?> decrementArticleLove(@PathVariable int articleId) {
        try {
            int result = userMapper.decrementArticleLove(articleId);

            if (result > 0) {
                return ResponseEntity.ok("Article love count decremented successfully.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Article not found.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while decrementing love count.");
        }
    }

    //推薦看板的相關資料
    @GetMapping("/getRecommendBoards")
    public ResponseEntity<?> getRecommendBoards() {
        try {
            List<Board> boards = userMapper.selectRecommendBoards();
            return ResponseEntity.ok(boards);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to get recommend boards");
        }
    }

    //所有看板的相關資料
    @GetMapping("/getAllBoards")
    public ResponseEntity<?> getAllBoards() {

        try {
            // 先從 Redis 查詢熱門文章緩存
            List<Board> allBoards =  (List<Board>) redisTemplate.opsForValue().get(ALL_BOARDS_KEY);

            if(allBoards == null){
                List<Board> boards = userMapper.selectAllBoards();
                //存入緩存
                redisTemplate.opsForValue().set(ALL_BOARDS_KEY, boards, 1, TimeUnit.DAYS);
            }

            return ResponseEntity.ok(allBoards);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to get all boards");
        }
    }

    //取得用戶發的文
    @GetMapping("/getArticlesByUserId")
    public ResponseEntity<?> getArticlesByUserId(@RequestParam int userId) {
        try {
            List<ArticleDTO> articles = userMapper.getArticlesByUserId(userId);

            articles.forEach(article -> {
                // 對每一篇文章進行處理
                // 使用 Jsoup 解析文章內容的 HTML
                Document doc = Jsoup.parse(article.getContent());

                // 提取前20個字作為摘要
                String text = doc.body().text();
                String excerpt = text.length() > 30 ? text.substring(0, 30) : text; // 取得前20個字
                article.setContent(excerpt);

                // 提取第一張圖片的 URL
                Element img = doc.select("img").first(); // 選擇第一個 <img> 標籤
                String imageUrl = img != null ? img.attr("src") : "";
                article.setFirstImgUrl(imageUrl);
            });

            return ResponseEntity.ok(articles);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to get ArticlesByUserId");
        }
    }


}


