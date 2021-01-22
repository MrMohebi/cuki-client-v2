import React from "react";
import './css/style.css'
class WelcomePage extends React.Component{
    render() {
        return(
            <div>
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
                    <div className="chefImage" style={{background:'url("./img/WelcomPage/cheficon.png")',backgroundSize:'cover',backgroundPosition:'center',backgroundRepeat:'no-repeat'}}/>
                </p>

            </div>

        )
    }
}
export default WelcomePage;
