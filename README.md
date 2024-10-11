## 專案 Demo
點擊這裡查看專案 Demo
[http://elasticbeanstalk-us-east-1-460820365574.s3-website-us-east-1.amazonaws.com](http://elasticbeanstalk-us-east-1-460820365574.s3-website-us-east-1.amazonaws.com/) 


本專為參考Dcard的社群論壇與交友平台，主功能如下：

1. 帳號系統：個人帳號之新增與刪除 , 並可追蹤喜愛的看板
2. 文章系統：使用者可以發佈文章並在文章下留言、按讚 , 並可以篩選最新、熱門文章還有追蹤看板的文章



## 使用技術

### 前端

- **React**
- **Bootstrap**： 用於快速設計網頁版面，提升 UI 一致性與視覺美感
- **AWS S3** ： 儲存使用者大頭貼並託管網站前端

### 後端

- **Spring Boot**
- **RESTful API**
- **MVC 架構** ： 負責處理應用的邏輯與展示層分離
- **JWT + Spring Security** ： 處理身份驗證與權限控制
- **MyBatis** ： 用於數據庫查詢
- **MySQL** ： 負責資料存儲，並使用索引提升查詢效率
- **Redis** ： 快取熱門與最新文章, 提升請求速度
- **Docker-Compose** ： 管理服務
- **AWS EC2** ： 運行容器

## 系統架構圖
![S3 (1)](https://github.com/user-attachments/assets/ec2cd918-5d73-4890-b9aa-89cd824f2070)


## **MySQL資料庫架構**



![Screenshot from 2024-10-10 16-55-08](https://github.com/user-attachments/assets/6ffdbaf0-1430-4bac-bcab-485de07d3120)


## **功能介紹**



註冊帳號
![Screenshot from 2024-10-11 13-24-14](https://github.com/user-attachments/assets/e008a2fc-e31d-4a96-9c71-b58186cf4ee6)

![Screenshot from 2024-10-10 17-06-19](https://github.com/user-attachments/assets/c3516d06-b67f-43f5-85c6-610877143c83)



篩選最新文章  or 熱門文章

![Screenshot from 2024-10-10 16-58-20](https://github.com/user-attachments/assets/ab6c1f35-bdfb-4f73-a847-b3af232a03f0)


查看追蹤看板的文章

![Screenshot from 2024-10-10 17-01-58](https://github.com/user-attachments/assets/194fb5d1-80e1-44b7-b85a-d97088505dbb)


閱讀文章與留言

![Screenshot from 2024-10-10 17-03-23](https://github.com/user-attachments/assets/e753ff0f-f759-4698-945b-734fa0a576ed)

![Screenshot from 2024-10-10 17-10-12](https://github.com/user-attachments/assets/a21f3f3e-8545-4891-990c-136635e04ced)



查看所有的看板

![Screenshot from 2024-10-10 17-07-20](https://github.com/user-attachments/assets/d0db628c-85c2-422b-965e-9e3af4d2ea19)


上傳文章

![Screenshot from 2024-10-10 17-32-14](https://github.com/user-attachments/assets/9777bebd-6ad9-468b-a9ec-ce76ee58eac6)


編輯舊文
![Screenshot from 2024-10-10 17-33-40](https://github.com/user-attachments/assets/5db53c9c-c0c5-4aec-8721-c646320f4791)
![Screenshot from 2024-10-10 17-34-03](https://github.com/user-attachments/assets/2f11f911-9218-4784-9dd7-2caf1306aa43)


