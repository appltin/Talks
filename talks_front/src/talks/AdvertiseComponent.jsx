import adImage from '../images/ads.png';
import adImage2 from '../images/ads2.jpg';
import React from 'react';

export default function MainPageCompetent() {
    return(
        <div> 
            <img src={adImage} alt="廣告圖1" className='w-100'/>
            <img src={adImage2} alt="廣告圖2" className='w-100 mt-3'/>
        </div>
    )
}