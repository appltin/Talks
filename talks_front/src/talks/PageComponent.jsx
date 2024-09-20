import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa'; // 使用 react-icons 作為星星圖示
import { useAuth } from './security/AuthContext';
import {useParams, useNavigate} from 'react-router-dom'
import { getSpecifyBoardArticle, getPopularArticle, getLatestArticle, getFavBoardArticles, getFavoriteBoardId} from './api/TalksApiService';
import './css/MainPage.css'
import { Dropdown } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGratipay } from '@fortawesome/free-brands-svg-icons';
import Sidebar from './SidebarComponent';
import adImage from '../images/ads.png';
import adImage2 from '../images/ads2.jpg';
import AdvertiseComponent from './AdvertiseComponent'


export default function PageCompotent() {
    const {boardName} = useParams()

    const authContext = useAuth();
    const userId = authContext.userId
    const [specifyBoardArticle, setSpecifyBoardArticle] = useState([])

    useEffect(() => {
        SpecifyBoardArticle()
    }, [boardName])

    //獲取文章
    const SpecifyBoardArticle = async() => {
        try{
            let data = await getSpecifyBoardArticle(boardName)
            setSpecifyBoardArticle(data)
        }catch(error){
            console.error('fail to fetch favBoardArticles')
            throw error
        }
    }
    

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
                                {specifyBoardArticle && specifyBoardArticle.map((article) => (
                                    <div key={article.articleId} 
                                        className='d-flex border-bottom' 
                                        style={{ height: 'auto' 
                                    }}>
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