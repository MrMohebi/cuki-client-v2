import React from "react";
import {AiOutlineHome, AiOutlineShoppingCart, AiOutlineHeart, AiOutlineUser} from 'react-icons/ai'
import './css/style.css'
import {blue} from "@material-ui/core/colors";
class WelcomePage extends React.Component{
    render() {
        return(
            <div >
                <p className="welcomePageHeader">
                    <span className="textColor">cuki </span>
                    <span>  app</span>
                </p>
                <p className="welcomePageFrames">
                    <span className="welcomePageDescriptionH">      دوست داری چی بخوری؟</span>
                    <br/>
                    <span className="welcomePageDescription">اینجا میتونی غذاهای مورد علاقتو</span>
                    <br/>
                    <span className="welcomePageDescription">با بالاترین کیفیت ببینی و بعد انتخابش کنی</span>
                    <br/>
                    <span className="welcomePageDescription">با بالاترین کیفیت ببینی و بعد انتخابش کنی</span>
                    <div className="chefImage"/>
                </p>

            </div>

        )
    }
}
export default WelcomePage;
