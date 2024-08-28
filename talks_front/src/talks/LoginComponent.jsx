import React, { useState } from 'react';
import './css/Login.css';
import './css/Common.css'
import { useAuth } from './security/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const authContext = useAuth();
    const navigate = useNavigate();
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault(); // 阻止表單提交的默認行為

        if (await authContext.login(username, password)) {
            navigate(`/mainPage`);
        } else {
            console.log('failure login');
            setShowErrorMessage(true);
        }
    }

    return (
        <div className="container-fluid bg_light_purple d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
            <div className="container container_padding flex-column align-items-center justify-content-center">
                <form className='row w-100 bg-light special_padding mb-3 top_b color-p fw-bolder pixel_font h2' onSubmit={handleSubmit}>
                    <div className='col-5 mb-2'>
                        <label htmlFor="InputUsername" className="form-label mb-3">Username</label>
                        <input
                            type="text"
                            value={username} // 使用狀態變數
                            className="h-50 form-control mini_border bg_grey no_border"
                            id="username"
                            aria-describedby="emailHelp"
                            onChange={(e) => setUsername(e.target.value)} // 更新狀態
                        />
                    </div>
                    <div className='col-5 mb-2'>
                        <label htmlFor="InputPassword" className="form-label mb-3">Password</label>
                        <input
                            type="password"
                            value={password} // 使用狀態變數
                            className="h-50 form-control mini_border no_border bg_grey"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)} // 更新狀態
                        />
                    </div>
                    <div className='col-2 mb-2 align-self-end justify-content-start'>
                        <label htmlFor="InputUsername" className="form-label mb-3 invisible">Username</label>
                        <button type="submit" onClick={handleSubmit} className="btn btn-w p-0 button_w mini_border color-p fw-bolder t_size bg-y">Login</button>
                    </div>
                </form>
                
                <div className='row w-100 justify-content-center mt-4 mb-0 pb-0'>
                    <p className='col-auto fw-bolder t_white h5 mb-0'>Do not have an account password yet?</p>
                </div>
                <div className='row w-100 justify-content-center my-0 py-0'>
                    <Link className="col-auto color-y fw-bolder h5" to="/register">Register an account</Link>
                </div>
                {showErrorMessage && <div className="row d-flex w-100 alert alert-danger text-center mt-5" role="alert"><h5 className="mb-0">Login failed</h5></div>}
            </div>
        </div>
    );
}

export default Login;