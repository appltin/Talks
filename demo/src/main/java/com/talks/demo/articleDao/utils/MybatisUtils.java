package com.talks.demo.articleDao.utils;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.IOException;
import java.io.InputStream;

public class MybatisUtils {

    private static SqlSessionFactory sqlSessionFactory;

    //從 XML 建置 SqlSessionFactory
    static {
        try {
            String resource = "mybatis-config.xml";
            InputStream inputStream = Resources.getResourceAsStream(resource);
            sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    //從 SqlSessionFactory 取得 SqlSession
    public static  SqlSession getSqlSession(){
        return sqlSessionFactory.openSession(true);
    }

}
