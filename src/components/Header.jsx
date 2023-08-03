import { useState } from 'react'
import '../styles/Header.css'

const Header = ({handleBtn, setShow, icon, show}) => {
    return (
        <div className="header">
            <button onClick={() => {
                handleBtn();
                setShow(!show);
            }}>
                <i className={icon}></i>
            </button>
            <h1>Cool Links</h1>
            <div className="currentCollection">Recent</div>
        </div>
    )
}

export default Header