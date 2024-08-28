import React from 'react';
import { FaStar } from 'react-icons/fa'; // 使用 react-icons 作為星星圖示

function Sidebar({ sidebarList, starredItems, handleStarClick }) {
    return (
        <div className='col-3 sidebar fw-bold fs-5 pe-4'>
            <div className='d-flex w-100 text-white p-2 align-items-center'>
                <i className="bi bi-clipboard2-minus-fill fs-1 me-3"></i>
                <button className='fw-bold m-0 fs-5 text-white mainPage_listButton'>All Board</button>
            </div>

            <div className='recommended_text ps-2 pt-3 pb-4'>
                Recommended
            </div>

            {sidebarList.map((img) => (
                <button
                    className='d-flex w-100 sidebar_button border-0 p-2 align-items-center'
                    key={img.barName}
                    onClick={() => handleStarClick(img.boardId)}
                >
                    <img src={img.src} alt={img.barName} className='mainPage_img rounded-circle me-3' />
                    <p className='text-white fw-bold fs-5 m-0'>{img.barName}</p>
                    <FaStar
                        className="ms-auto" // 只放入需要的 Bootstrap 類別
                        style={{
                            cursor: 'pointer',
                            color: starredItems[img.boardId] ? 'rgb(132, 78, 240)' : 'rgb(41, 13, 97)' // 直接使用內聯樣式設置顏色
                        }}
                    />
                </button>
            ))}
        </div>
    );
}

export default Sidebar;