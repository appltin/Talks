import axios from "axios";
import { jsonApiClient } from "./jsonApiClient";

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