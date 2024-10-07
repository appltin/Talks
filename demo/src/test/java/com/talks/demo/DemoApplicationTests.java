package com.talks.demo;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.test.context.TestPropertySource;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
//@TestPropertySource(properties = {
//        "spring.redis.url=redis://redis:6379"
//})
public class DemoApplicationTests {
//    @Autowired
//    private RedisTemplate<String, Object> redisTemplate;
//
//    @Test
//    void testAddDataToRedis() {
//        ValueOperations<String, Object> valueOperations = redisTemplate.opsForValue();
//        String key = "user:1001";
//        String value = "TestUser";
//        valueOperations.set(key, value);
//
//        Object storedValue = valueOperations.get(key);
//        assertThat(storedValue).isEqualTo(value);
//    }
}
