import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa'; // 使用 react-icons 作為星星圖示
import { useAuth } from './security/AuthContext';
import {useParams, useNavigate} from 'react-router-dom'
import { getSpecifyBoardArticle, getPopularArticle, getLatestArticle, getFavBoardArticles, getFavoriteBoardId, getArticleById, incrementArticleLove, decrementArticleLove
    ,incrementMessageLove, decrementMessageLove, addMessage, getMessagesByArticleId
} from './api/TalksApiService';
import './css/MainPage.css'
import { Dropdown } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGratipay } from '@fortawesome/free-brands-svg-icons';
import Sidebar from './SidebarComponent';
import adImage from '../images/ads.png';
import adImage2 from '../images/ads2.jpg';
import AdvertiseComponent from './AdvertiseComponent'
import { Modal, Button, Form } from 'react-bootstrap'; // 引入模態視窗必要組件
import ArticleModalComponent from './ArticleModalComponent'; // 引入 ArticleModal 組件


export default function PageCompotent() {
    const {boardName} = useParams()

    const authContext = useAuth();
    const userId = authContext.userId
    // const [specifyBoardArticle, setSpecifyBoardArticle] = useState([])
    const [selectedArticle, setSelectedArticle] = useState(null)
    const [selectedMessage, setSelectedMessage] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [articleLiked, setArticleLikedLiked] = useState({}); // 文章是否已點擊愛心
    const [messageLiked, setMessageLiked] = useState({}); //  留言是否已點擊愛心
    const [comment, setComment] = useState(''); //輸入框的內容
    const [articles, setArticles] = useState([])
    

    useEffect(() => {
        SpecifyBoardArticle()
    }, [boardName])

    //獲取文章
    const SpecifyBoardArticle = async() => {
        try{
            let data = await getSpecifyBoardArticle(boardName)
            setArticles(data)
        }catch(error){
            console.error('fail to fetch favBoardArticles')
            throw error
        }
    }

    // 關閉模態視窗
    const handleClose = () => {
        setShowModal(false);
        setSelectedArticle(null);
    };

    // 文章愛心按鈕
    const handleClick = async (id) => {
        try {
            const updatedArticles = [...articles]; // 最新or熱門文章

            // 尚未點愛心，增加愛心數量 +1
            if(!articleLiked[id]){
                await incrementArticleLove(selectedArticle.articleId) 
                //模態視窗
                selectedArticle.love += 1 
                //主頁兩個列表
                updatedArticles.forEach((article) => { 
                    if(article.articleId === id){
                        article.love += 1
                    }
                })

            // 愛心已點，則增加愛心 -1
            }else{
                await decrementArticleLove(selectedArticle.articleId);      
                selectedArticle.love -= 1      
                updatedArticles.forEach((article) => {
                    if(article.articleId === id){
                        article.love -= 1
                    }
                })             
            }

            // 更新 articles 狀態
            setArticles(updatedArticles);

            //更改愛心狀態
            setArticleLikedLiked(prevLikeArticles => ({
                ...prevLikeArticles,
                [id]:!prevLikeArticles[id]
            }))

        } catch (error) {
            console.error('Error updating article like:', error); // 輸出錯誤信息
        } 
    };

    // 留言愛心按鈕
    const handleMessageLove = async(id, index) => {
        try{
            if(!messageLiked[id]){ // 尚未點愛心，點擊後增加
                await incrementMessageLove(id)
                selectedMessage[index].love += 1

            }else{
                await decrementMessageLove(id)
                selectedMessage[index].love -= 1
            }
            //更改愛心狀態
            setMessageLiked(prevLikeMessages => ({
                ...prevLikeMessages,
                [id]:!prevLikeMessages[id]
            }))

        }catch(error){
            console.log('Error updating message like:', error)
        }
    }

    // 當輸入內容改變時，更新 state
    const handleInputChange = (e) => {
        setComment(e.target.value);
    };

    const handleMessageSubmit = async() => {
        try{     

            //檢查是否為空
            if (comment.trim() === '') {
            alert('請輸入內容');
            return;
            }

            const message = {
                articleId:selectedArticle.articleId, 
                userId:userId, 
                content:comment
            }

            await addMessage(message)
            alert('add message success')

        }catch(error){
            console.log('Error add message:', error)
        }

        setComment(''); // 提交後清空輸入框

        // 重新抓取該文章的留言，刷新留言列表
        const updatedMessages = await getMessagesByArticleId(selectedArticle.articleId);
        setSelectedMessage(updatedMessages);
    };

    // 開啟模態視窗
    const handleShow = async(articleId) => {
        try{
            const article = await getArticleById(articleId)// 用id查詢文章
            const message = await getMessagesByArticleId(articleId) // 查詢該文的留言
            setSelectedArticle(article); //把內容傳給模組
            setSelectedMessage(message)
            setShowModal(true); // 模組設為可見

        }catch(error){
            console.error('fail to filter getArticleById', error)
        }
    };
    

    return (
            <div className='container-fluid mainPage_container justify-content-center'>
                <div className='row h-100 mainPage_row mx-auto'>

                    {/* 看板區 */}
                    <div className='col-3 pe-4'>
                        <Sidebar uploadArticle={SpecifyBoardArticle}/>
                    </div>

                    {/* 文章展示區 */}
                    <div className='col-7 bg-white white_area p-4 no-scrollbar' style={{ overflowY : 'scroll' }}>
                        <div className='py-2 px-4'>
                            
                            {/* 選項二 追蹤的看板 */}
                            <div className="">
                                {/* 單篇文章 */}
                                {articles && articles.map((article) => (
                                    <div key={article.articleId} 
                                        className='d-flex border-bottom' 
                                        style={{ height: 'auto' }}
                                        onClick={() => handleShow(article.articleId)} // 點擊文章時顯示模態視窗
                                    >
                                        <div className='py-3'>

                                            <div className='mb-2 mainPage_gray h5'>
                                                <span>{ article.board }</span>
                                                <span className='mainPage_spaceTab'> · </span>

                                                <span>{ article.username }</span>
                                                <span className='mainPage_spaceTab'> · </span>

                                                <span>{new Date( article.time ).toISOString().slice(0, 10)}</span>
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

                                {/* 模態視窗 */}
                                {selectedArticle &&               
                                    <ArticleModalComponent 
                                    showModal={showModal}
                                    handleClose={handleClose}
                                    selectedArticle={selectedArticle}
                                    selectedMessage={selectedMessage}
                                    articleLiked={articleLiked}
                                    handleClick={handleClick}
                                    handleMessageLove={handleMessageLove}
                                    comment={comment}
                                    handleInputChange={handleInputChange}
                                    handleMessageSubmit={handleMessageSubmit}
                                    messageLiked={messageLiked}
                                />}
                                
                            </div>
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