## talks
---

## 網頁連結

[http://elasticbeanstalk-us-east-1-460820365574.s3-website-us-east-1.amazonaws.com](http://elasticbeanstalk-us-east-1-460820365574.s3-website-us-east-1.amazonaws.com/) 

本專為參考Dcard的社群論壇與交友平台，主功能如下：

1. 帳號系統：個人帳號之新增與刪除 , 並可追蹤喜愛的看板
2. 文章系統：使用者可以發佈文章並在文章下留言、按讚 , 並可以篩選最新、熱門文章還有追蹤看板的文章

---

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

---

![S3.jpg](https://prod-files-secure.s3.us-west-2.amazonaws.com/32fb1fb1-a50c-42cb-9597-5faaf836bde8/314c1e6e-a839-42b3-b9ac-c7f09670266e/S3.jpg)

## **MySQL資料庫架構**

---

![Screenshot from 2024-10-10 16-55-08.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/32fb1fb1-a50c-42cb-9597-5faaf836bde8/c8954461-127e-4d1e-a7ce-b78c7a8d2e96/addc9681-f565-4c8d-a30c-14aa34382230.png)

## **功能介紹**

---

註冊帳號

![Screenshot from 2024-10-10 17-06-19.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/32fb1fb1-a50c-42cb-9597-5faaf836bde8/9bc0ff75-2f3c-48e3-aa66-11554042bf21/Screenshot_from_2024-10-10_17-06-19.png)

篩選最新文章  or 熱門文章

![Screenshot from 2024-10-10 16-58-20.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/32fb1fb1-a50c-42cb-9597-5faaf836bde8/6d34247c-7f58-4e6d-afa5-af1a5acc8bf6/e2b7c6c0-cf95-4d7f-8655-6b6802dfe379.png)

查看追蹤看板的文章

![Screenshot from 2024-10-10 17-01-58.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/32fb1fb1-a50c-42cb-9597-5faaf836bde8/52acdd18-c998-46b7-af47-2e33e5e30f2c/Screenshot_from_2024-10-10_17-01-58.png)

閱讀文章與留言

![Screenshot from 2024-10-10 17-03-23.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/32fb1fb1-a50c-42cb-9597-5faaf836bde8/782d99ec-234f-4a3d-81f1-a30c065f3a59/Screenshot_from_2024-10-10_17-03-23.png)

![Screenshot from 2024-10-10 17-10-12.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/32fb1fb1-a50c-42cb-9597-5faaf836bde8/623acdc3-80b4-46da-9f96-cac17d32a1d5/Screenshot_from_2024-10-10_17-10-12.png)

查看所有的看板

![Screenshot from 2024-10-10 17-07-20.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/32fb1fb1-a50c-42cb-9597-5faaf836bde8/8c8f5585-b334-4a8a-9cf9-aac98acb700a/Screenshot_from_2024-10-10_17-07-20.png)

上傳文章

![Screenshot from 2024-10-10 17-32-14.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/32fb1fb1-a50c-42cb-9597-5faaf836bde8/8ab36223-f784-4021-8a55-88ca0003544d/Screenshot_from_2024-10-10_17-32-14.png)

編輯舊文

![Screenshot from 2024-10-10 17-33-40.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/32fb1fb1-a50c-42cb-9597-5faaf836bde8/a90ee63a-bb12-4e3d-8c39-8280ff85b77a/Screenshot_from_2024-10-10_17-33-40.png)

![Screenshot from 2024-10-10 17-34-03.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/32fb1fb1-a50c-42cb-9597-5faaf836bde8/67b12914-13c5-4244-9246-0130776a24c0/Screenshot_from_2024-10-10_17-34-03.png)
