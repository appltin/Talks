package com.talks.demo;

import com.talks.demo.articleDao.dao.UserMapper;
import com.talks.demo.articleDao.pojo.User;
import com.talks.demo.articleDao.utils.MybatisUtils;
import org.apache.ibatis.session.SqlSession;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class DemoApplicationTests {

	@Autowired
	private UserMapper userMapper;

	@Test
	void contextLoads() {
		User user = userMapper.getAvatarType("admin");
		System.out.println(user);
	}

}
