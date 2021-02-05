import React from "react";
import './css/style.css'
import TextField from '@material-ui/core/TextField';
import * as requests from '../../ApiRequests/ApiRequests.js'
import * as actions from "../../stores/reduxStore/actions";
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import {connect} from "react-redux";
import { useSwipeable } from 'react-swipeable';

export const Swipeable = ({children, style, ...props}) => {
    const handlers = useSwipeable(props);
    return (<div style={style} { ...handlers }>{children}</div>);
}


class ProfilePage extends React.Component {
    componentDidMount() {
        if (this.props.match.params['part'] === 'club'){
            this.userTabClickHandler();
        }else{
            this.historyTabClickHandler();
        }
    }


    state={
        activeProfile:'history',
        History:true,
        navActiveClass:'profileNavigate IranSans text-nowrap profileNavigateActive',
        navNormalClass:'profileNavigate IranSans text-nowrap',
        UserTabClass:'profileNavigate IranSans text-nowrap',
        HistoryTabClass:'profileNavigate IranSans text-nowrap',
    }


    userTabClickHandler = ()=>{
        this.setState({
            HistoryTabClass:this.state.navNormalClass,
            UserTabClass:this.state.navActiveClass,
            activeProfile:'club',
        });
    }

    historyTabClickHandler = ()=>{
        this.setState({
            HistoryTabClass:this.state.navActiveClass,
            UserTabClass:this.state.navNormalClass,
            activeProfile:'his',
        })
    }

    getUserInfo = () =>{
        requests.getUserInfo(this.callbackGetUserInfo)
        requests.getCustomerInfo(this.callbackGetCustomerInfo)
    }

    callbackGetUserInfo = (res)=>{
        if(res.hasOwnProperty("statusCode") && res.statusCode === 200){
            this.props.setUserData(res.data);
        }
    }

    callbackGetCustomerInfo = (res)=>{
        if(res.hasOwnProperty("statusCode") && res.statusCode === 200){
            this.props.setCustomerData(res.data);
        }
    }

    swipeRight = () =>{
        this.setState({
            activeProfile:"club"
        })
    }

    swipeLeft = () =>{
        this.setState({
            activeProfile:"his"
        })
    }

    handleBack = () =>{
        this.props.history.push("/main")
    }

    render() {
        return (
            <Swipeable style={{height:"100%"}} onSwipedRight={this.swipeRight} onSwipedLeft={this.swipeLeft} children={
                <React.Fragment>
                    <div
                        className='categoryPageHeader pl-2 pr-2 pt-2 d-flex flex-row justify-content-between align-items-center'>
                        <ArrowBackRoundedIcon/>
                        <div className='text-center d-flex justify-content-around flex-row'>
                            <div className='IranSans'>پروفایل</div>
                        </div>
                        <ArrowBackRoundedIcon className='invisible'/>
                    </div>
                    <div className='profilePageContainer'>
                        <div className='w-100 d-flex justify-content-around pt-3'>
                            <span className={this.state.UserTabClass}
                                  onClick={this.userTabClickHandler}>کوکی کلاب</span>
                            <span className='profileNavigate profileNavigateActive IranSans  text-nowrap invisible'> سفارش های من</span>
                            <span className={this.state.HistoryTabClass} onClick={this.historyTabClickHandler}> سفارش های من</span>
                        </div>

                        {this.state.activeProfile === 'club' ? this.clubElement : this.historyElement}

                    </div>
                </React.Fragment>
            }/>
        )
    }


    clubElement = <div className='w-100'>
        <div className='w-100 profileUserProfileContainer mt-3 d-flex flex-column '>
            <TextField defaultValue={this.props.name} className='rtl mt-2 profileInputs' id="standard-basic" label="اسم و فامیل" />
            <TextField defaultValue={this.props.birthday} className='rtl mt-2 profileInputs' id="standard-basic" label="تاریخ تولد" />
            <TextField defaultValue={this.props.job} className='rtl mt-2 profileInputs' id="standard-basic" label="شغل" />
            <div className='w-100 d-flex justify-content-center'>
                <div className='profileSubmitButton mt-4 IranSans'> ویرایش</div>
            </div>
        </div>
        <div className='totalBuyAndPrice w-100 d-flex justify-content-between flex-row mt-3 pr-4 pl-4'>
            <span className='IranSans'>{this.props.totalBoughtRestaurant / 1000} T</span>
            <span className='IranSans '>مجموع خرید </span>
        </div>
        <div className='totalBuyAndPrice w-100 d-flex justify-content-between flex-row mt-3 pr-4 pl-4'>
            <span className='IranSans'>{this.props.scoreRestaurant}</span>
            <span className='IranSans'>امتیاز</span>
        </div>
    </div>


    historyElement =   <div className='w-100 profileHistoryContainer mt-3'>
        <div className='w-100 d-flex justify-content-between align-items-center pt-4'>
            <span className='historyOrderDate'>250T</span>
            <span className='historyOrderName'>اسپشیال فلان و فلان وفلان</span>
            <span className='historyOrderDate'>8/23</span>
        </div>
    </div>
}

const mapStateToProps = (store) => {
    return {
        token:store.rUserInfo.token,
        name:store.rUserInfo.name,
        birthday:store.rUserInfo.birthday,
        job:store.rUserInfo.job,
        totalBoughtAll:store.rUserInfo.totalBoughtAll,
        totalBoughtRestaurant:store.rUserInfo.totalBoughtRestaurant,
        orderTimesRestaurant:store.rUserInfo.orderTimesRestaurant,
        scoreRestaurant:store.rUserInfo.scoreRestaurant,
        lastOrderRestaurant:store.rUserInfo.lastOrderRestaurant,
    }
}

const mapDispatchToProps = () => {
    return {
        setUserData: actions.userSetData,
        setCustomerData: actions.userSetCustomerInfo,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);

