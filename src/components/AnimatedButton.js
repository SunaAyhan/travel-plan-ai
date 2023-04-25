import React from 'react';
import './AnimatedButton.css';
import { useNavigate } from 'react-router-dom';
const AnimatedButon = () => {
    const navigate = useNavigate();
    function handleClick() {
        navigate('/questions');
    }
    return (
        <div onClick={handleClick} class="container">

            <a href="#" class="button button--piyo">
                <div class="button__wrapper">
                    <span class="button__text">Start </span>
                </div>
                <div class="characterBox">
                    <div class="character wakeup">
                        <div class="character__face"></div>
                    </div>
                    <div class="character wakeup">
                        <div class="character__face"></div>
                    </div>
                    <div class="character">
                        <div class="character__face"></div>
                    </div>
                </div>
            </a>





        </div>
    );
};

export default AnimatedButon;