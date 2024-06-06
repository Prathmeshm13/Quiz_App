import React from 'react';
import './footer.css';

function Footer() {
    return ( 
        <div className='foocontainer'>
            <div className='firstcont'>
                {/* <div className='logo'>
                    <h1>Quizzo.com</h1>
                </div> */}
                <div className='sociallogos'>
                    <img src='C:\Users\User\Desktop\Quiz_App\Frontend\vite-project\src\assets\pngfind.com-instagram-png-2378905.png' alt='Instagram' />
                    <img src='path-to-twitter-icon.png' alt='Twitter' />
                    <img src='path-to-facebook-icon.png' alt='Facebook' />
                    <img src='path-to-linkedin-icon.png' alt='LinkedIn' />
                </div>
            </div>
            <div className='secondcont'>
                <div className='first'>
                    <div className='fhead'>Topic</div>
                    <ul>
                        <li>Page</li>
                        <li>Page</li>
                        <li>Page</li>
                    </ul>
                </div>
                <div className='first'>
                    <div className='fhead'>Topic</div>
                    <ul>
                        <li>Page</li>
                        <li>Page</li>
                        <li>Page</li>
                    </ul>
                </div>
                <div className='first'>
                    <div className='fhead'>Topic</div>
                    <ul>
                        <li>Page</li>
                        <li>Page</li>
                        <li>Page</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Footer;
