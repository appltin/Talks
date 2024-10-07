import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGratipay } from '@fortawesome/free-brands-svg-icons';
import { FaHeart } from 'react-icons/fa';

const ArticleModal = ({ showModal, handleClose, selectedArticle, selectedMessage, articleLiked, handleClick, handleMessageLove, comment, handleInputChange, handleMessageSubmit, messageLiked }) => {
    return (
        <Modal show={showModal} onHide={handleClose} size="lg">
            <Modal.Header closeButton style={{ paddingRight: '55px', borderBottom: 'none' }}>
                <Modal.Title className='h5 mx-4'>{selectedArticle?.board}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: '800px', overflowY: 'auto', padding: '0px 45px' }}>
                <div className='h3 pt-4 border-top'>{selectedArticle?.title}</div>

                <div className='d-flex mt-2 mb-3 align-items-center'>
                    <div className='avatar_container'>
                        <img src={selectedArticle?.avatar} alt='' className='mainPage_avatarImg'/>
                    </div>
                    <div className='ms-3 fw-bold'>{selectedArticle?.username}</div>
                    <div className='ms-3 mainPage_gray'>{selectedArticle?.time}</div>
                </div>

                <div dangerouslySetInnerHTML={{ __html: selectedArticle?.content }} />

                <div className='d-flex align-items-center mt-3'> 
                    <FontAwesomeIcon icon={faGratipay} color="#fa3b2ae5" className='mainPage_iconSize'/>
                    <h5 className="ms-1 mainPage_gray m-0" style={{ lineHeight: '25px' }}>{selectedArticle?.love}</h5>
                    <button 
                        onClick={() => handleClick(selectedArticle?.articleId)} 
                        className={`btn ${articleLiked[selectedArticle?.articleId] ? 'liked' : 'not-liked'} ms-auto`}
                    >
                        <FaHeart className="heart-icon"/>
                    </button>
                </div>

                <div className='mainPage_gray mt-5 pb-2 border-bottom'>{`共${selectedMessage.length}則留言`}</div>

                {selectedMessage.map((message, index) => (
                    <div className='d-flex pt-2 pb-3 border-bottom' key={message.messageId}>
                        <div className='avatar_container mt-2'>
                            <img src={message.avatar} alt='' className='mainPage_avatarImg'/>
                        </div>
                        <div className='ms-3 w-100'>
                            <div className='d-flex align-items-center justify-content-between'>
                                <h5 className='m-0'>{message.username}</h5>
                                <div className='d-flex align-items-center'>
                                    <div onClick={() => handleMessageLove(message.messageId, index)} className={`btn ${messageLiked[message.messageId] ? 'liked' : 'not-liked'}`}>
                                        <FaHeart className="heart-icon" />
                                    </div>
                                    <h6 className='me-3 m-0 mainPage_loveText'>{message.love}</h6>
                                </div>
                            </div>
                            <div>{message.content}</div>
                            <div style={{fontSize:'13px'}} className='mt-2'>
                                B1
                                <span className='mainPage_spaceTab'>·</span>
                                <span>{message.time}</span>
                                <span className='ms-2'>Reply</span>
                            </div>
                        </div>
                    </div>
                ))}
            </Modal.Body>
            <Modal.Footer>
                <div className="w-100">
                    <div className="input-group px-3">
                        <textarea 
                            type="text" 
                            className="form-control scroll mainPage_messageInput" 
                            value={comment}
                            placeholder="Enter message..." 
                            aria-label="Recipient's username" 
                            aria-describedby="button-addon2" 
                            style={{ resize: 'vertical' }}
                            onChange={handleInputChange}
                        />
                        <button 
                            className="btn btn-outline-secondary" 
                            type="button" 
                            id="button-addon2" 
                            onClick={handleMessageSubmit}
                        >
                            submit
                        </button>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default ArticleModal;