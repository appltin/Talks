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
    const navigate = useNavigate();
    const [board, setBoard] = useState([])
    const [starredItems, setStarredItems] = useState({}); // 狀態管理每個按鈕的點亮狀態
    const [sidebarKey, setSidebarKey] = useState(0); // 通知 sidebar 的刷新
    const [sidebarData, setSidebarData] = useState(null); // 接收 Sidebar 的刷新通知

    const trackBoardClick = (boardId) => {
        // 模擬追蹤邏輯
        console.log(`Tracking board with ID: ${boardId}`);
        
        // 點擊按鈕後觸發狀態變化，刷新 Sidebar
        setSidebarKey(prevKey => prevKey + 1);
    };

    useEffect(() => {
        setSidebarData({ someKey: 'someValue' });
        fetchBoards()
      }, []); 
    
    // 取得所有看板
    const fetchBoards = async () => {
    try {
        const boards = await getAllBoardsInformation();
        if (!Array.isArray(boards)) {
            console.error('Received data is not an array:', boards);
            return;
        }
        setBoard(boards);
    } catch (error) {
        console.error('fail to filter article', error);
    }
    };

    useEffect(() => {
        try{
            initStar()
        }catch(error){
            console.error('fail to initStar')
        }

    }, [userId])


    //初始化星星狀態
    const initStar = async () => {
        const newStarItems = {}

        const favoriteBoardId = await getFavoriteBoardId(userId)  // 取得目前已追蹤看板

        if(Array.isArray(favoriteBoardId)){
            favoriteBoardId.forEach(boardId => {
                newStarItems[boardId] = true; // 將有追蹤的看板設為 true
            });
        }

        setStarredItems(newStarItems) //更新狀態
    }

    // 收藏最愛看板  ＋ 移除最愛看板
    const handleStarClick = async (boardId) => {
        const isCurrentlyStarred = starredItems[boardId] || false;
        const newState = {
            ...starredItems,
            [boardId]: !isCurrentlyStarred, // 切換特定項目的點亮狀態
        };

    
        // 先更新按鈕狀態
        setStarredItems(newState);
    
        try {
            // 判斷是加入還是取消收藏，並呼叫相應的 API
            if (newState[boardId]) {
                await addFavoriteBoard(userId, boardId); // 新增最愛看板
                alert("已加入追蹤名單");  // 成功提示  
            } else {
                await removeFavoriteBoard(userId, boardId); // 呼叫取消收藏的 API 方法，並等待完成
                alert.info("已從追蹤名單移除"); // 成功提示
            }

            trackBoardClick(boardId) // 同步刷新sidebar的星星

            
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

    // 當sidebar改變時, allBoard組件刷新
    useEffect(() => {
        setStarredItems(sidebarData);  // 更新按鈕狀態
    }, [sidebarData]);
    
    return(
        <div className='container-fluid mainPage_container justify-content-center'>
            <div className='row h-100 mainPage_row mx-auto'>

                {/* 看板區 */}
                <div className='col-2 pe-4'>
                    <Sidebar key={sidebarKey}  setSidebarData={setSidebarData}/>
                </div>

                {/* 文章展示區 */}
                <div className='col-8 bg-white white_area py-4 px-5 no-scrollbar' style={{ overflowY: 'scroll' }}>
                    <h3 className='py-4 px-4 border-bottom'>Board Overview</h3>

                    <div className='updatePage_imgContainer w-100'>
                        {board.map((board) => (
                            <div className='d-flex my-4 align-items-center' key={board.id}>
                                <img 
                                    src={board.imgUrl} 
                                    alt='' 
                                    className='updatePage_img rounded-circle'
                                />
                                <p className='ms-4 mb-0 fs-4 fw-bold'>{board.boardName}</p>
                                <p className='ms-5 mx-1 mb-0'>-</p>
                                <p className='mb-0'>{board.slogan}</p>

                                <button 
                                    type="button" 
                                    className={`btn ${starredItems[board.id] ? 'boardPage_attracted' : 'updatePage_greyButton' } ms-auto`} 
                                    onClick={ () => { handleStarClick(board.id) } }
                                    disabled={board.isTracked} // 假設已追蹤後不能再按
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