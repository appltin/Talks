import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

// TextModal 元件用來顯示模態視窗，並在其中展示選中的文字
const TextModal = ({ textContent, show, handleClose }) => (
  <Modal show={show} onHide={handleClose} centered>
    <Modal.Body>
      {/* 在模態視窗中顯示完整的文字內容 */}
      <p>{textContent}</p>
    </Modal.Body>
    <Modal.Footer>
      {/* 按下按鈕時關閉模態視窗 */}
      <Button variant="secondary" onClick={handleClose}>
        關閉
      </Button>
    </Modal.Footer>
  </Modal>
);

// ReadArticleComponent 元件為主要的組件，用於展示文章片段和完整內容
const ReadArticleComponent = () => {
  
  // modalShow 狀態控制模態視窗的顯示與否，selectedText 儲存選中的文字內容
  const [modalShow, setModalShow] = useState(false);
  const [selectedText, setSelectedText] = useState('');

  // 當用戶點擊文字片段時，顯示模態視窗並設定選中的文字內容
  const handleTextClick = (textContent) => {
    setSelectedText(textContent);
    setModalShow(true);
  };

  return (
    <div>
      {/* 這裡展示一段文字片段，當點擊時觸發 handleTextClick 來顯示模態視窗 */}
      <p
        onClick={() => handleTextClick('這是一段完整的文章內容，點擊這裡查看。')}
        style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
      >
        點擊這裡閱讀更多...
      </p>
      {/* TextModal 元件負責展示選中的文字內容 */}
      <TextModal
        textContent={selectedText}
        show={modalShow}
        handleClose={() => setModalShow(false)}
      />
    </div>
  );
};

// 將 ReadArticleComponent 組件導出
export default ReadArticleComponent;