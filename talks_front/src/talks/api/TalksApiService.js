import axios from "axios";
import { jsonApiClient } from "./jsonApiClient";
import { parsePath } from "react-router-dom";

export const register = async (user) => {
    try {
        const response = await jsonApiClient.post(`/register`, user);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

export const getSignedUrl = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await axios.post('http://localhost:8080/cloud/uploadImg', formData, {
            headers: {
                'Content-Type': 'multipart/form-data' // 這裡會自動處理
            },
        });
        return response.data; // 返回圖片的 URL
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};

export async function deleteImage(imageUrl) {
    try {
        const response = await axios.delete('http://localhost:8080/cloud/deleteImg', {
            params: {
                imageUrl: imageUrl
            }
        });
        return response.data; // 返回 API 回應的數據

    } catch (error) {
        console.error('Failed to delete image:', error);
        throw error; // 重新拋出錯誤，方便調用方處理
    }
}

export async function getAvatarAndUerId(username){
    try{
        const response = await axios.get('http://localhost:8080/article/getAvatarAndUerId',{
            params:{
                username : username
            }
        });
        return response.data;

    }catch(error){
        console.log('Failed to getAvatarAndUerId:', error)
        throw error;
    }
}

export async function addArticle(article){
    try{
        const response = await axios.post('http://localhost:8080/article/add', article)
        return response.data;

    }catch(error){
        console.log('Failed to addArticle:', error)
        throw error;
    }
}

// 加入收藏
export async function addFavoriteBoard(userId, boardId){
    try{
        const response = await axios.post('http://localhost:8080/user/addFavoriteBoard', { 
            userId : userId,  
            boardId : boardId
        })
        return response.data
    }catch(error){
        console.log('Failed to addToFavorites:', error)
        throw error;
    }
};

// 取消收藏
export async function removeFavoriteBoard(userId, boardId){
    try{
        const response = await axios.delete(`http://localhost:8080/user/removeFavoriteBoard`, {
            params: {
                userId: userId,
                boardId: boardId
            }
        })
        
        return response.data
    }catch(error){
        console.log('Failed to removeFromFavorites:', error)
        throw error
    }
};

export async function getPopularArticle(){
    try{
        const response = await axios.get('http://localhost:8080/article/popular')
        return response.data
    }catch(error){
        console.log('Failed to getPopularArticle:', error)
        throw error
    }
}

export async function getLatestArticle(){
    try{
        const response = await axios.get('http://localhost:8080/article/latest')
        return response.data
    }catch(error){
        console.log('Failed to getPopularArticle:', error)
        throw error
    }
}

export async function getFavoriteBoardId(userId){
    try{
        const response = await axios.get('http://localhost:8080/user/getFavoriteBoardId', {
          params : {
            userId : userId
        }})
        
        return response.data
    }catch(error){
        console.log('Failed to getFavoriteBoardId:', error)
        throw error
    }
}

export async function getFavBoardArticles(boardIds) {
    try {
        const response = await axios.get('http://localhost:8080/article/getFavBoardArticles', {
            params: { 
                boardIds: boardIds
            },
            paramsSerializer: params => {
                return `boardIds=${params.boardIds.join(',')}`;
            }
        });
        
        return response.data;
    } catch (error) {
        console.error('Failed to getFavBoardArticles:', error);
        throw error;
    }
}

// 獲取指定版的文章
export async function getSpecifyBoardArticle(boardName) {
    try {
        const response = await axios.get(`http://localhost:8080/article/getSpecifyBoard/${boardName}`);
        return response.data;
    } catch (error) {
        console.error('Failed to getSpecifyBoardArticles:', error);
        throw error;
    }
}

// ------ 未測試

// 獲取指定文章
export async function getArticleById(articleId) {
    try {
        const response = await axios.get(`http://localhost:8080/getArticleById/${articleId}`);
        return response.data;
    } catch (error) {
        console.error('Failed to getArticleById:', error);
        throw error;
    }
}

// 增加文章的 love
export async function incrementArticleLove(articleId) {
    try {
        const response = await axios.post(`http://localhost:8080/incrementLove/${articleId}`);
        return response.data;
    } catch (error) {
        console.error('Failed to incrementArticleLove:', error);
        throw error;
    }
}

// 新增留言
export async function addMessage(articleId, userId, username, content) {
    try {
        const response = await axios.post('http://localhost:8080/addMessage', {
            articleId: articleId,
            userId: userId,
            username: username,
            content: content
        });
        return response.data;
    } catch (error) {
        console.error('Failed to addMessage:', error);
        throw error;
    }
}

// 新增愛心
export async function incrementMessageLove(messageId) {
    try {
        const response = await axios.post(`http://localhost:8080/incrementMessageLove/${messageId}`);
        return response.data;
    } catch (error) {
        console.error('Failed to incrementMessageLove:', error);
        throw error;
    }
}

// 根據文章 ID 獲取留言
export async function getMessagesByArticleId(articleId) {
    try {
        const response = await axios.get(`http://localhost:8080/getMessagesByArticleId/${articleId}`);
        return response.data;
    } catch (error) {
        console.error('Failed to getMessagesByArticleId:', error);
        throw error;
    }
}
