import { useEffect } from 'react';
import { getSignedUrl, getPopularArticle, getLatestArticle, getFavBoardArticles, getFavoriteBoardId} from './api/TalksApiService';
import './css/MainPage.css'
import React, { useState } from 'react';
import { useAuth } from './security/AuthContext';
import { Dropdown } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGratipay } from '@fortawesome/free-brands-svg-icons';
import Sidebar from './SidebarComponent';
import adImage from '../images/ads.png';
import adImage2 from '../images/ads2.jpg';

export default function MainPageCompetent() {

    const authContext = useAuth();
    const userId = authContext.userId

    const [condition, setCondition] = useState('popular')
    const [articles, setArticles] = useState([])
    const [attractArticle, setAttractArticle] = useState([])

    useEffect(() => {

        // 取得熱門or最新文章
        const fetchArticles = async() => {
            try{
                let data
                if(condition === 'popular'){
                    data = await getPopularArticle()
                }else if(condition === 'latest'){
                    data = await getLatestArticle()
                }
    
                setArticles(data)
    
            }catch(error){
                console.error('fail to filter article')
                throw error
            }
        }
        fetchArticles();

    }, [condition])


    useEffect(() => {
        fetchFavBoardArticles()
    }, [])

    //取得追蹤看板的文章
    const fetchFavBoardArticles = async() => {
        try{
            const favoriteBoardId = await getFavoriteBoardId(userId) 
            let data = await getFavBoardArticles(favoriteBoardId)
            setAttractArticle(data)
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
                        <Sidebar fetchFavBoardArticles={fetchFavBoardArticles}/>
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
                                            
                                            <div key={article.articleId} className='d-flex border-bottom' style={{ height: 'auto' }}>
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

                            {/* 選項二 追蹤的看板 */}
                            <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                            {/* 單篇文章 */}
                            {attractArticle.map((article) => (
                                            
                                            <div key={article.articleId} className='d-flex border-bottom' style={{ height: 'auto' }}>
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
                        <img src={adImage} alt="廣告圖" className='w-100'/>
                        <img src={adImage2} alt="廣告圖" className='w-100 mt-5'/>
                    </div>

                </div>
            </div>
    )
}