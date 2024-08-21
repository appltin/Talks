import { useEffect } from 'react';
import { getSignedUrl } from './api/TalksApiService';

export default function MainPageCompetent() {

    useEffect(() => {
        const form = document.getElementById('uploadForm');
        if (form) {
            form.addEventListener('submit', function(event) {
                event.preventDefault();  // 阻止表單提交
                const file = document.getElementById('fileInput').files[0];  // 抓取選中的文件
                
                // 在這裡調用上傳文件的函數
                uploadFile(file);
            });
        }

        // 清理函數，防止記憶體洩漏
        return () => {
            if (form) {
                form.removeEventListener('submit', uploadFile);
            }
        };
    }, []);

    async function uploadFile(file) {
        const signedUrl = await getSignedUrl(file.name); //後端返回圖片網址
        console.log(signedUrl)
        alert('圖片上傳成功！');
    }
    
    return (
        <form id="uploadForm">
            <input type="file" id="fileInput" accept="image/*"/>
            <button type="submit">上傳圖片</button>
        </form>
    )
}