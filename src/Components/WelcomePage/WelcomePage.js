import React from "react";
import './css/style.css';

class WelcomePage extends React.Component {
    state = {
        handClass: "shakeHands",
        allowToShake: true,

    }

    render() {
        return (
            <div className="forLittlePhones">
                <p className="welcomePageHeader">
                    <span className="textColor">Cuki </span>
                    <span>  app</span>
                </p>
                <p className="welcomePageFrames1">
                    <div className='HandAndHeaderText'>
                        <span className="welcomePageDescriptionH"> دوست داری چی بخوری؟</span>
                        <div onClick={(d) => {
                            if(this.state.allowToShake){
                                d.target.classList.add("element")
                                this.setState({
                                    allowToShake:false
                                })
                                setTimeout(()=>{
                                    d.target.classList.remove("element")
                                    this.setState({
                                        allowToShake:true
                                    })
                                },1000)
                            }

                        }} className={this.state.handClass} style={{
                            background: 'url("./img/WelcomPage/shakehands.png")',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}/>
                    </div>

                    <div className="text-right">
                        <span className="welcomePageDescription">اینجا میتونی غذاهای مورد علاقتو</span>
                        <br/>
                        <span className="welcomePageDescription">با بالاترین کیفیت ببینی و بعد انتخابش کنی</span>
                        <br/>
                        <span className="welcomePageDescription">حتی میتونی دونگی پرداخت کنی</span>
                    </div>

                    <div className="chefImage" style={{
                        background: 'url("./img/WelcomPage/cheficon.png")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}/>
                    <br/>
                </p>
                <br/>
                <div className="welcomePageFrames2">
                    <br/>
                    <div className="d-flex justify-content-around">
                        <p className="openIcons" >
                            <div className="donat" style={{
                                background: 'url("./img/WelcomPage/donat.png")',
                                backgroundSize: '95%',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                            }}></div>
                            <span className="burgersAndDonatDescription">کافی شاپ</span>
                                <br/>
                                <br/>
                        </p>
                        <p className="openIcons">
                            <div className="burger" style={{
                                background: 'url("./img/WelcomPage/hamburger.png")',
                                backgroundSize: '95%',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                            }}></div>
                            <span className="burgersAndDonatDescription">رستوران</span>
                            <br/>
                            <br/>
                        </p>
                        <p className="openIcons">
                            tour
                            <br/>
                            <br/>
                            <br/>
                        </p>
                    </div>


                </div>
            </div>

        )
    }
}

export default WelcomePage;
