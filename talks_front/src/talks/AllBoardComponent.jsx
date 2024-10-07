import { useAuth } from './security/AuthContext';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getAllBoardsInformation, getFavoriteBoardId, addFavoriteBoard, removeFavoriteBoard } from './api/TalksApiService';
import Sidebar from './SidebarComponent';
import AdvertiseComponent from './AdvertiseComponent'
import './css/AllBoard.css'


export default function AllBoardComponent() {
    const authContext = useAuth();
    const userId = authContext.userId
    const [board, setBoard] = useState([])
    const starredItems = authContext.starredItems
    const setStarredItems = authContext.setStarredItems
    const navigate = useNavigate();

    useEffect(() => {
        fetchBoards()
      }, []); 
    
    // 取得所有看板
    const fetchBoards = async () => {
    try {
        const boards = await getAllBoardsInformation();
        console.log(boards)
        if (!Array.isArray(boards)) {
            console.error('Received data is not an array:', boards);
            return;
        }
        setBoard(boards);
    } catch (error) {
        console.error('fail to filter article', error);
    }
    };



    // 收藏最愛看板  ＋ 移除最愛看板
    const handleStarClick = async (boardId) => {
        const isCurrentlyStarred = starredItems[boardId] || false;
    
        try {
            // 判斷是加入還是取消收藏，並呼叫相應的 API
            if (!isCurrentlyStarred) {
                await addFavoriteBoard(userId, boardId); // 新增最愛看板
                alert("已加入追蹤名單");  // 成功提示  
            } else {
                await removeFavoriteBoard(userId, boardId); // 呼叫取消收藏的 API 方法，並等待完成
                alert("已從追蹤名單移除"); // 成功提示
            }
    
            // 在 API 完成後再更新按鈕狀態
            setStarredItems(prevState => ({
                ...prevState,
                [boardId]: !isCurrentlyStarred, // 切換特定項目的點亮狀態
            }));
            
        } catch (error) {
            console.error('操作失敗:', error);
            alert(`${boardId} 操作失敗，請稍後再試`);
        }
    };


    
    return(
        <div className='container-fluid mainPage_container justify-content-center'>
            <div className='row h-100 mainPage_row mx-auto'>

                {/* 看板區 */}
                <div className='col-2 pe-4'>

                </div>

                {/* 文章展示區 */}
                <div className='col-8 bg-white white_area py-4 px-5 no-scrollbar' style={{ overflowY: 'scroll' }}>
                    <h3 className='py-4 px-4 border-bottom'>Board Overview</h3>

                    <div className='updatePage_imgContainer w-100'>
                        {board && board.map((board) => (
                            <div className='d-flex my-4 align-items-center' key={board.id}>
                                <img 
                                    src={board.imgUrl} 
                                    alt='' 
                                    className='updatePage_img rounded-circle'
                                />
                                <p className='ms-4 mb-0 fs-4 fw-bold' onClick={() => navigate(`/page/${board.boardName}`)}>{board.boardName}</p>
                                <p className='ms-5 mx-1 mb-0'>-</p>
                                <p className='mb-0'>{board.slogan}</p>

                                <button 
                                    type="button" 
                                    className={`btn ${starredItems[board.id] ? 'boardPage_attracted' : 'boardPage_greyButton' } ms-auto`} 
                                    onClick={ () => { handleStarClick(board.id) } }
                                >
                                    {starredItems[board.id] ? 'Tracked' : 'Track'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 廣告區 */}
                <div className='col-2 ps-4'> 
                    <AdvertiseComponent/>
                </div>
            </div>


        </div>
        

    )
}