import './css/LetStart.css';
import {useNavigate} from 'react-router-dom'
import letStart from '../images/5.png';
import buttonImage from '../images/mouse_button.png';


export default function LetStart(){
    const navigate = useNavigate()

    const handleClick = () => {
      navigate(`/login`)
    };

    return(

        <div className="background_startIt" style={{ backgroundImage: `url(${letStart})` }}>
          <div className='container'>
            <div className='row justify-content-center'>
              <button className="col-auto image-button button_Spacing" onClick={handleClick}>
                  <img src={buttonImage} alt="Button"/>  
              </button>
            </div>
          </div>
        </div>

    )
}