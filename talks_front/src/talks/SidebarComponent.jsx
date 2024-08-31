import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa'; // 使用 react-icons 作為星星圖示
import { addFavoriteBoard, removeFavoriteBoard, getFavoriteBoardId} from './api/TalksApiService';
import { useAuth } from './security/AuthContext';
import { useNavigate } from 'react-router-dom';
import './css/Sidebar.css'

export default function Sidebar( {fetchFavBoardArticles} ) {

    const authContext = useAuth();
    const userId = authContext.userId
    const navigate = useNavigate();

    const sidebarList = [
        { boardId : 1, barName:"tech", src:"https://elasticbeanstalk-ap-northeast-3-460820365574.s3.ap-northeast-3.amazonaws.com/scifi-4916165_640.jpg.png" },
        { boardId : 2, barName:'mackup', src:'https://elasticbeanstalk-ap-northeast-3-460820365574.s3.ap-northeast-3.amazonaws.com/makeup-739672_640.jpg.png' },
        { boardId : 3, barName:"novel", src:"https://elasticbeanstalk-ap-northeast-3-460820365574.s3.ap-northeast-3.amazonaws.com/book-3773783_640.jpg.png" },
        { boardId : 4, barName:"pet", src:"https://elasticbeanstalk-ap-northeast-3-460820365574.s3.ap-northeast-3.amazonaws.com/cat-8612685_640.jpg.png" },
        { boardId : 5, barName:"engineer", src:"https://elasticbeanstalk-ap-northeast-3-460820365574.s3.ap-northeast-3.amazonaws.com/coding-1853305_640.jpg.png" },
    ];

    const [starredItems, setStarredItems] = useState({}); // 狀態管理每個按鈕的點亮狀態

    useEffect(() => {
        try{

            //初始化星星狀態
            const initStar = async () => {
                const newStarItems = {}

                const favoriteBoardId = await getFavoriteBoardId(userId)  // 取得目前已追蹤看板
                favoriteBoardId.forEach( boardId => {                     // 將有追蹤的看板設為true
                    newStarItems[boardId] = true 
                }
                )
                setStarredItems(newStarItems) //更新狀態
            }

            initStar()
        }catch(error){
            console.error('fail to initStar')
        }

    }, [userId])


    // 收藏最愛看板  ＋ 移除最愛看板
    const handleStarClick = async (boardId) => {
        const isCurrentlyStarred = starredItems[boardId] || false;
        const newState = {
            ...starredItems,
            [boardId]: !isCurrentlyStarred, // 切換特定項目的點亮狀態
        };
    
        // 先更新星星狀態
        setStarredItems(newState);
    
        try {
            // 判斷是加入還是取消收藏，並呼叫相應的 API
            if (newState[boardId]) {
                await addFavoriteBoard(userId, boardId); // 新增最愛看板
                alert(`已加入追蹤名單`);     
            } else {
                await removeFavoriteBoard(userId, boardId); // 呼叫取消收藏的 API 方法，並等待完成
                alert(`已從追蹤名單移除`);
            }

            if(fetchFavBoardArticles){
                await fetchFavBoardArticles() // 更新追蹤看板的文章
            }
            
        } catch (error) {
            console.error('操作失敗:', error);

            // 如果操作失敗，恢復到之前的狀態
            setStarredItems(prevState => ({
                ...prevState,
                [boardId]: isCurrentlyStarred,
            }));
            alert(`${boardId} 操作失敗，請稍後再試`);
        }
    };

    return (
        <div className='sidebar fw-bold fs-5'>
            <div className='d-flex w-100 text-white p-2 align-items-center'>
                <i className="bi bi-clipboard2-minus-fill fs-1 me-3"></i>
                <button className='fw-bold m-0 fs-5 text-white mainPage_listButton'>All Board</button>
            </div>

            <div className='recommended_text ps-2 pt-3 pb-4'>
                Recommended
            </div>

            {sidebarList.map((img) => (
                <button
                className='row sidebar_button border-0 p-2 align-items-center'
                key = {img.barName}
                >
                    <div className='col-10 d-flex'   onClick = { () => navigate(`/page/${img.barName}`) }>
                        <img src={img.src} alt={img.barName} className='mainPage_img rounded-circle me-3' />
                        <p className='text-white fw-bold fs-5 m-0'>{img.barName}</p>
                    </div>
                    <FaStar
                        className = "col-2" 
                        style={{
                            cursor: 'pointer',
                            color: starredItems[img.boardId] ? 'rgb(132, 78, 240)' : 'rgb(41, 13, 97)'
                        }} 
                        onClick={() => handleStarClick(img.boardId)}
                    />
                </button> 
            ))}
        </div>
    );
}
