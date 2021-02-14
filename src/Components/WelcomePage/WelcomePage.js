import React from "react";
import './css/style.css';
import {connect} from "react-redux";
import {useSwipeable} from 'react-swipeable';
import tourImage from './img/tour.jpg'
export const Swipeable = ({children, ...props}) => {
    const handlers = useSwipeable(props);
    return (<div {...handlers}>{children}</div>);
}

class WelcomePage extends React.Component {
    state = {
        handClass: "shakeHands",
        allowToShake: true,
    }

    componentDidMount() {
        if (!(this.props.foodListConverted.hasOwnProperty('parts') && this.props.foodListConverted.parts.length > 0)) {
            this.props.history.push("/");
        }
    }

    swipeRight = (eventData) => {
        console.log("swiped right", eventData)
    }
    createRestaurantParts = ()=>{
        this.props.foodListConverted.parts.map(eachPart => {
            return(
                <p className="openIcons">
                    <div className="burger" style={{
                        background: 'url("./img/WelcomPage/restaurant.png")',
                        backgroundSize: '95%',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}/>
                    <span className="burgersAndDonatDescription" onClick={()=>{this.props.history.push("/category/restaurant")}}>رستوران</span>
                    <br/>
                    <br/>
                </p>
            )
        })
    }

    swipeLeft = (eventData) => {
        console.log("swiped left", eventData)
    }

    render() {
        return (
            <Swipeable onSwipedRight={this.swipeRight} onSwipedLeft={this.swipeLeft} children={
                <div className="forLittlePhones">
                    <p className="welcomePageHeader">
                        <span className="textColor">Cuki </span>
                        <span>  app</span>
                    </p>
                    <p className="welcomePageFrames1">
                        <div className='HandAndHeaderText'>
                            <span className="welcomePageDescriptionH"> دوست داری چی بخوری؟</span>
                            <div onClick={(d) => {
                                if (this.state.allowToShake) {
                                    d.target.classList.add("element")
                                    this.setState({
                                        allowToShake: false
                                    })
                                    setTimeout(() => {
                                        d.target.classList.remove("element")
                                        this.setState({
                                            allowToShake: true
                                        })
                                    }, 1000)
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

                            {this.props.foodListConverted.parts.map(eachPart => {
                                console.log(eachPart)
                                return(
                                    <p className="openIcons">
                                        <div className="burger" style={{
                                            background: 'url("./img/resParts/'+eachPart+'.png")',
                                            backgroundSize: '95%',
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat',
                                        }}/>
                                        <span className="burgersAndDonatDescription" onClick={()=>{this.props.history.push("/category/"+eachPart)}}>رستوران</span>
                                        <br/>
                                        <br/>
                                    </p>
                                )
                            })}

                            <p className="openIcons overflow-hidden">
                                <div onClick={()=>(this.props.history.push('/vrTour'))} style={{background:`url(${tourImage})`,backgroundSize:'cover',backgroundPosition:'center'}} className='h-100 w-100 tourHolder'/>
                            </p>
                        </div>
                    </div>
                </div>
            }/>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        foodListConverted: store.rRestaurantInfo.foodListConverted
    }
}

const mapDispatchToProps = () => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);
