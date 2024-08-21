package com.talks.demo.article.dao;


import com.talks.demo.articleDao.dao.UserMapper;
import com.talks.demo.articleDao.pojo.User;
import com.talks.demo.articleDao.utils.MybatisUtils;
import org.apache.ibatis.session.SqlSession;
import org.junit.jupiter.api.Test;


public class UserDaoTest {

    @Test
    public void test(){
        //獲取SqlSession對象
        SqlSession sqlSession = MybatisUtils.getSqlSession();

        //方式一：getMapper
        UserMapper userMapper= sqlSession.getMapper(UserMapper.class);
        User user = userMapper.getAvatarType("admin");
        System.out.println(user);

        //關閉SqlSession
        sqlSession.close();
    }

}
