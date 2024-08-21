import { bottom } from '@popperjs/core'
import './css/Common.css'
import './css/Header.css'
import {Link} from 'react-router-dom'

export default function HeaderComponent(){
    return(
        <nav className="navbar navbar-expand-lg bg-purple">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css"></link>
            <div className="container-fluid">
                    <a className="navbar-brand pixel_font text-light talks_t me-4 padding_l" href="#">Talks</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse padding_r" id="navbarSupportedContent">

                        <form className="d-flex me-5 ms-3 align-self-start col-7">
                            <input className="form-control search_bg border-0" type="search" placeholder="Search" aria-label="Search"/>
                            <button className="btn search_btn search_icon border-1" type="submit">
                                <i className="bi bi-search"/>
                            </button>
                        </form>

                        <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
                            <li className="nav-item ms-5 me-0">
                                <Link className="nav-link each_icon" to="/edit">
                                    <i className="bi bi-pencil-fill" style={{ fontSize: '32px' }}></i>
                                </Link>
                            </li>
                            <li className="nav-item ms-5 me-0">
                                <Link className="nav-link each_icon" to="/edit">
                                    <i className="bi bi-envelope-open-fill" style={{ fontSize: '32px' }}></i>
                                </Link>
                            </li>

                            <li className="nav-item ms-5">
                                <Link className="nav-link each_icon" to="/edit">
                                    <i className="bi bi-person-fill" style={{ fontSize: '40px' }}></i>
                                </Link>
                            </li>

                            <div className="dropdown mt-2">
                                <button className="btn drop_bg dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenu2">
                                    <li><button className="dropdown-item" type="button">community rules</button></li>
                                    <li><button className="dropdown-item" type="button">log out</button></li>
                                </ul>
                            </div>
                        </ul>
                    </div>
            </div>
        </nav>
    )
}