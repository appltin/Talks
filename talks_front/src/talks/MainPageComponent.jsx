import { useEffect } from 'react';
import { getSignedUrl, addFavoriteBoard, removeFavoriteBoard, getPopularArticle, getLatestArticle} from './api/TalksApiService';
import './css/MainPage.css'
import { FaStar } from 'react-icons/fa'; // 使用 react-icons 作為星星圖示
import React, { useState } from 'react';
import { useAuth } from './security/AuthContext';
import { Dropdown } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGratipay } from '@fortawesome/free-brands-svg-icons';

export default function MainPageCompetent() {

    const authContext = useAuth();
    const userId = authContext.userId

    const sidebarList = [
        { boardId : 1, barName:"tech", src:"https://elasticbeanstalk-ap-northeast-3-460820365574.s3.ap-northeast-3.amazonaws.com/scifi-4916165_640.jpg.png" },
        { boardId : 2, barName:'mackup', src:'https://elasticbeanstalk-ap-northeast-3-460820365574.s3.ap-northeast-3.amazonaws.com/makeup-739672_640.jpg.png' },
        { boardId : 3, barName:"novel", src:"https://elasticbeanstalk-ap-northeast-3-460820365574.s3.ap-northeast-3.amazonaws.com/book-3773783_640.jpg.png" },
        { boardId : 4, barName:"pet", src:"https://elasticbeanstalk-ap-northeast-3-460820365574.s3.ap-northeast-3.amazonaws.com/cat-8612685_640.jpg.png" },
        { boardId : 5, barName:"engineer", src:"https://elasticbeanstalk-ap-northeast-3-460820365574.s3.ap-northeast-3.amazonaws.com/coding-1853305_640.jpg.png" },
    ];

    const [starredItems, setStarredItems] = useState({}); // 狀態管理每個按鈕的點亮狀態
    const [condition, setCondition] = useState('popular')
    const [articles, setArticles] = useState([])

    useEffect(() => {
        // 篩選文章
        const fetchArticles = async() => {
            try{
                let data
                if(condition === 'popular'){
                    data = await getPopularArticle()
                }else if(condition === 'latest'){
                    data = await getLatestArticle()
                    console.log(data)
                }

                setArticles(data)

            }catch(error){
                console.error('fail to filter article')
            }

        }
        fetchArticles();

    }, [condition])

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
                await addFavoriteBoard(userId, boardId); // 呼叫加入收藏的 API 方法，並等待完成
                alert(`已加入追蹤名單`);
            } else {
                await removeFavoriteBoard(userId, boardId); // 呼叫取消收藏的 API 方法，並等待完成
                alert(`已從追蹤名單移除`);
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
        <div className='container-fluid mainPage_container justify-content-center'>
            <div className='row h-100 mainPage_row mx-auto'>
                {/* 看板區 */}
                <div className='col-3 sidebar fw-bold fs-5 pe-4'>
                    <div className='d-flex w-100 text-white p-2 align-items-center'>
                        <i class="bi bi-clipboard2-minus-fill fs-1 me-3"></i>
                        <button className='fw-bold m-0 fs-5 text-white mainPage_listButton'>All Board</button>
                    </div>

                    <div className='recommended_text ps-2 pt-3 pb-4'>
                        Recommended
                    </div>

                    {sidebarList.map((img) => {

                        return (
                            <button className='d-flex w-100 sidebar_button border-0 p-2 align-items-center' 
                                    key={img.barName}  
                                    onClick={() => handleStarClick(img.boardId)}
                            >
                                <img src={img.src} alt={img.barName} className='mainPage_img rounded-circle me-3'/>
                                <p className='text-white fw-bold fs-5 m-0'>{img.barName}</p>
                                <FaStar 
                                    className="ms-auto" // 只放入需要的 Bootstrap 類別
                                    style={{ 
                                        cursor: 'pointer', 
                                        color: starredItems[img.boardId] ? 'rgb(132, 78, 240)' : 'rgb(41, 13, 97)' // 直接使用內聯樣式設置顏色
                                    }} 
                                />
                            </button>
                        );
                    })}
                </div>

                {/* 文章展示區 */}
                <div className='col-7 bg-white white_area p-4 no-scrollbar' style={{ overflowY : 'scroll' }}>
                    <div className='py-2 px-4'>

                        {/* 選項單 */}
                        <nav>
                            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                <button className="nav-link active edit_title" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Popular</button>
                                <button className="nav-link edit_title" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Attract</button>
                            </div>
                        </nav>

                        {/* 選項一 : 文章 */}
                        <div className="tab-content" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                <div className="mt-4">

                                    {/* 下拉選單 */}
                                    <Dropdown className='mb-2'>
                                        <Dropdown.Toggle variant="secondary" id="dropdown-basic" className='mainPage_dropArea border-0 fs-5'>
                                            {condition}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-1" onClick={() => {setCondition('popular')}}>popular</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2" onClick={() => {setCondition('latest')}}>latest</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>

                                    {/* 單篇文章 */}
                                    {articles.map((article) => (
                                        <div className='d-flex border-bottom' style={{ height: 'auto' }}>
                                        <div className='py-3'>

                                            <div className='mb-2 mainPage_gray h5'>
                                                <span>{article.border}</span>
                                                <span className='mainPage_spaceTab'>·</span>

                                                <span>{article.username}</span>
                                                <span className='mainPage_spaceTab'>·</span>

                                                <span>{new Date(article.time).toISOString().slice(0, 10)}</span>
                                            </div>

                                            <div className='mt-3 mb-3 fw-bold h2 mainPage_deepGray fs-3'>{article.title}</div>

                                            <h5 className='mb-3 mainPage_deepGray'>
                                                {article.firstImgUrl.trim() !== ''
                                                    ? `${article.content.substring(0, 38)}...`
                                                    : `${article.content}...`}
                                            </h5>

                                            <div className="d-flex align-items-center">
                                                <FontAwesomeIcon icon={faGratipay} color="#fa3b2ae5" style={{ fontSize: '25px' }} />
                                                <h5 className="ms-1 mainPage_gray m-0" style={{ lineHeight: '25px' }}>{article.love}</h5>
                                                <i className="ms-4 bi bi-chat-heart-fill mainPage_Blue" style={{ fontSize: '25px' }}></i>
                                                <h5 className="ms-1 mainPage_gray m-0" style={{ lineHeight: '25px' }}>10</h5>
                                            </div>
                                        </div>

                                        { article.firstImgUrl.trim() !== '' && 
                                          <div className='d-flex align-items-start ms-auto pb-3 pt-5' style={{ height: 'auto' }}>
                                            <img src={article.firstImgUrl}
                                                alt={article.firstImgUrl}
                                                className='mainPage_ArticleImg'
                                            />
                                          </div>}
                                    </div>
                                    ))}
                                    
                                </div>
                            </div>
                        </div>
                </div>
                </div>
            </div>
        </div>
    )
}