package com.talks.demo;

import com.talks.demo.article.controller.ArticleController;
import jakarta.annotation.PostConstruct;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.transaction.annotation.EnableTransactionManagement;


@SpringBootApplication
@EnableTransactionManagement
@MapperScan("com.talks.demo.articleDao.dao")
public class DemoApplication {

	@Autowired
	private RedisTemplate<String, String> redisTemplate;

	public void testRedisConnection() {
		// 設置一個鍵
		redisTemplate.opsForValue().set("testKey", "Hello Redis!");

		// 讀取該鍵的值
		String value = redisTemplate.opsForValue().get("testKey");

		System.out.println("從 Redis 讀取的值: " + value);
	}

	public static void main(String[] args) {
		// 啟動 Spring 應用
		ConfigurableApplicationContext context = SpringApplication.run(DemoApplication.class, args);

		// 從 Spring 容器中獲取 DemoApplication 實例
		DemoApplication app = context.getBean(DemoApplication.class);
		// 測試 Redis 連接
		app.testRedisConnection();
	}
}
//@SpringBootApplication
//@EnableTransactionManagement
//@MapperScan("com.talks.demo.articleDao.dao")
//public class DemoApplication {
//
//	public static void main(String[] args) {
//
//		SpringApplication.run(DemoApplication.class, args);
//	}
//
//}
