import React from "react";
import './css/style.css';
import {connect} from "react-redux";
import {useSwipeable} from 'react-swipeable';
import tourImage from './img/tour.gif'
import getComName, {getFullName} from "../../functions/getComName";

export const Swipeable = ({children, style, ...props}) => {
    const handlers = useSwipeable(props);
    return (<div style={style}  {...handlers}>{children}</div>);
}

class WelcomePage extends React.Component {
    state = {
        handClass: "shakeHands",
        allowToShake: true,
        partsPersianNames: {coffeeshop: 'کافی شاپ', restaurant: 'رستوران'},
        lastPagerTime: 0,
        canCallPager: false,
        timerAnimationClass: 'animate__fadeIn',
        timerText: ''

    }

    constructor(props) {
        super(props);
        this.Timer = React.createRef()
    }

    componentDidMount() {
        if (!(this.props.foodListConverted.hasOwnProperty('parts') && this.props.foodListConverted.parts.length > 0)) {
            this.props.history.push("/");
        }
        if (localStorage.getLSPager()) {
            this.state.lastPagerTime = parseInt(localStorage.getLSPager())
        } else {
            this.state.lastPagerTime = 0;
        }
        setInterval(this.updateTimer, 1000)

    }


    updateTimer = () => {

        let seconds = this.state.lastPagerTime / 1000 - Date.now() / 1000 + 300
        if (seconds < 1) {
            this.state.canCallPager = true
            this.setState({
                timerAnimationClass: 'animate__fadeOut'

            })
        } else {

        }
        if (seconds < 3600 * 5) {
            this.setState({
                timerText: new Date(seconds * 1000).toISOString().substr(14, 5)
            })
        } else {
            this.state.canCallPager = false
            this.setState({
                timerAnimationClass: 'animate__fadeOut'
            })
        }


    }
    swipeRight = () => {
        this.props.history.push("/bill")
    }
    callPager = () => {
        let now = Date.now()
        localStorage.setLSPager(now)
        this.state.lastPagerTime = now
        this.setState({
            timerAnimationClass: 'animate__fadeIn'

        })
    }
    togglePagerCall = () => {
        if (this.state.canCallPager) {
            this.callPager()
        }
    }

    swipeLeft = () => {
        this.props.history.push("/likedFoods")
    }

    render() {
        return (
            <Swipeable style={{height: "100%"}} onSwipedRight={this.swipeRight} onSwipedLeft={this.swipeLeft} children={
                <div className='welcomePageMainContainerCover w-100 h-100'>
                    <div className="forLittlePhones">
                        <p className="welcomePageHeader">
                            <span className="textColor">{getComName()} </span>
                            <span>  app</span>
                        </p>
                        <div className="welcomePageFrames1">
                            <div className='HandAndHeaderText'>
                                <span className="welcomePageDescriptionH"> دوست داری چی بخوری؟</span>
                                <div onClick={(d) => {
                                    if (this.state.allowToShake) {
                                        d.target['classList'].add("element")
                                        this.setState({
                                            allowToShake: false
                                        })
                                        setTimeout(() => {
                                            d.target['classList'].remove("element")
                                            this.setState({
                                                allowToShake: true
                                            })
                                        }, 1000)
                                    }

                                }} className={this.state.handClass} style={{
                                    background: 'url("/img/WelcomePage/shakeHands.png")',
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
                                background: 'url("/img/WelcomePage/chefIcon.png")',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat'
                            }}
                                 onClick={this.togglePagerCall}
                            />
                            <div id={'pagerTimer'} ref={this.Timer}
                                 className={'text-left IranSans w-100 pagerTimer animate__animated ' + this.state.timerAnimationClass}>{this.state.timerText?this.state.timerText:'00:00'}</div>
                            <br/>
                        </div>
                        <br/>
                        <div className="welcomePageFrames2">
                            <br/>
                            <div className="d-flex justify-content-around">

                                {this.props.foodListConverted.parts ? this.props.foodListConverted.parts.map(eachPart => {
                                    return(
                                        <div onClick={()=>{this.props.history.push("/category/"+eachPart)}} key={eachPart} className="openIcons">
                                            <div className="burger" style={{
                                                background: 'url("/img/resParts/'+eachPart+'.png")',
                                                backgroundSize: '95%',
                                                backgroundPosition: 'center',
                                                backgroundRepeat: 'no-repeat',
                                            }}/>
                                            <span className="burgersAndDonatDescription" >{this.state.partsPersianNames[eachPart]}</span>
                                            <br/>
                                            <br/>
                                        </div>
                                    )
                                }): null
                                }

                                <div className="openIcons overflow-hidden">
                                    <img alt="vrTour" src={tourImage} onClick={()=>(this.props.history.push('/vrTour'))} className='h-100 w-100 tourHolder'/>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            }/>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        foodListConverted: store.rRestaurantInfo.foodListConverted,
    }
}

const mapDispatchToProps = () => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);
