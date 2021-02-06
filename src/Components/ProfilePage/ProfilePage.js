import React from "react";
import './css/style.css'
import TextField from '@material-ui/core/TextField';
import * as requests from '../../ApiRequests/ApiRequests.js'
import * as actions from "../../stores/reduxStore/actions";
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import {connect} from "react-redux";
import {useSwipeable} from 'react-swipeable';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from 'react-modern-calendar-datepicker';
import moment from 'jalali-moment'
import * as ttj from '../../functions/timeStampToJalaliString'

export const Swipeable = ({children, style, ...props}) => {
    const handlers = useSwipeable(props);
    return (<div style={style} {...handlers}>{children}</div>);
}


class ProfilePage extends React.Component {
    state = {
        activeProfile: 'history',
        History: true,
        navActiveClass: 'profileNavigate IranSans text-nowrap profileNavigateActive',
        navNormalClass: 'profileNavigate IranSans text-nowrap',
        UserTabClass: 'profileNavigate IranSans text-nowrap',
        HistoryTabClass: 'profileNavigate IranSans text-nowrap',
        clubElementClass: 'w-100',
        historyElementClass: 'w-100 profileHistoryContainer mt-3 animate__animated animate__fadeOut d-none',
        datePickerValue: {day: 9, month: 3, year: 1381},
        inputsDisabled: true,
    }

    componentDidMount() {
        if (this.props.match.params['part'] === 'club') {
            this.userTabClickHandler();
        } else {
            this.historyTabClickHandler();
        }
        this.getUserInfo()
        if (this.state.inputsDisabled) {
            this.disableDatePicker()
        }


        console.log(this.JalaliToGregorian(1381, 3, 9));
        let gregorianDate = this.JalaliToGregorian(1381, 3, 9)
        console.log(this.GregorianToTimeStamp(gregorianDate[0], gregorianDate[1], gregorianDate[2]));
    }

    GregorianToTimeStamp = (year, month, day) => {
        let newDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        return (newDate.getTime() / 1000 + 24 * 60 * 60);
    }

    JalaliToGregorian = (year, month, day) => {
        moment.locale('fa')
        let dateToConvertToGregorian = year.toString() + '/' + month.toString() + '/' + day.toString()
        let m = moment(dateToConvertToGregorian, 'YYYY/M/D');
        m.format('YYYY/M/D');
        let gregorianDate = m._i.split('-').slice(0, 3)
        return gregorianDate
    }


    userTabClickHandler = () => {
        this.setState({
            HistoryTabClass: this.state.navNormalClass,
            UserTabClass: this.state.navActiveClass,
            activeProfile: 'club',
            clubElementClass: 'w-100 animate__animated animate__fadeIn',
            historyElementClass: 'w-100 profileHistoryContainer mt-3 animate__animated animate__fadeOut d-none',

        });

    }

    historyTabClickHandler = () => {
        this.setState({
            HistoryTabClass: this.state.navActiveClass,
            UserTabClass: this.state.navNormalClass,
            activeProfile: 'his',
            clubElementClass: 'animate__animated animate__fadeOut d-none',
            historyElementClass: 'w-100 profileHistoryContainer mt-3 animate__animated animate__fadeIn',
        })
    }

    getUserInfo = () => {
        requests.getUserInfo(this.callbackGetUserInfo)
        requests.getCustomerInfo(this.callbackGetCustomerInfo)
    }

    callbackGetUserInfo = (res) => {
        if (res.hasOwnProperty("statusCode") && res.statusCode === 200) {
            this.props.setUserData(res.data);
        }
    }

    callbackGetCustomerInfo = (res) => {
        if (res.hasOwnProperty("statusCode") && res.statusCode === 200) {
            this.props.setCustomerData(res.data);
        }
    }

    swipeRight = () => {
        this.userTabClickHandler()
    }

    swipeLeft = () => {
        this.historyTabClickHandler()
    }
    enableDatePicker = () => {
        document.getElementsByClassName('DatePicker')[0].style.pointerEvents = 'all'
    }
    disableDatePicker = () => {
        document.getElementsByClassName('DatePicker')[0].style.pointerEvents = 'none'
    }

    handleBack = () => {
        this.props.history.push("/main")
    }
    editAndApplyHandler = (e) => {
        if (this.state.inputsDisabled) {
            this.setState({
                inputsDisabled: false
            })
            this.enableDatePicker()
            e.target.innerHTML = "تایید"
        } else {
            this.setState({
                inputsDisabled: true
            })
            this.disableDatePicker()
            e.target.innerHTML = "ویرایش"
        }
    }
    datePickerChange=(date)=>{
        this.setState({
            datePickerValue:date
        })

    }

    render() {
        return (
            <Swipeable style={{height: "100%"}} onSwipedRight={this.swipeRight} onSwipedLeft={this.swipeLeft} children={
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

                        {/*{this.state.activeProfile === 'club' ? this.clubElement : this.historyElement}*/}
                        <div className={this.state.historyElementClass}>

                            <div className='w-100 d-flex justify-content-between align-items-center pt-4'>
                                <span className='historyOrderDate'>250T</span>
                                <span className='historyOrderName'>اسپشیال فلان و فلان وفلان</span>
                                <span className='historyOrderDate'>8/23</span>
                            </div>
                        </div>


                        <div className={this.state.clubElementClass}>
                            <div className='w-100 profileUserProfileContainer mt-3 d-flex flex-column '>
                                <TextField disabled={this.state.inputsDisabled} defaultValue={this.props.name}
                                           className='rtl mt-2 profileInputs'
                                           id="standard-basic" label="اسم و فامیل"/>
                                <TextField disabled={this.state.inputsDisabled} value={ttj.timeStampToJalali(this.props.birthday)}
                                           className='rtl mt-2 profileInputs'
                                           id="standard-basic" label="تاریخ تولد"/>
                                <DatePicker
                                    disabled
                                    value={this.state.datePickerValue}
                                    onChange={this.datePickerChange}
                                    shouldHighlightWeekends
                                    locale="fa" // add this
                                />

                                <TextField disabled={this.state.inputsDisabled} defaultValue={this.job}
                                           className='rtl mt-2 profileInputs'
                                           id="standard-basic" label="شغل"/>
                                <div className='w-100 d-flex justify-content-center'>
                                    <div className='profileSubmitButton mt-4 IranSans'
                                         onClick={this.editAndApplyHandler}> ویرایش
                                    </div>
                                </div>
                            </div>
                            <div
                                className='totalBuyAndPrice w-100 d-flex justify-content-between flex-row mt-3 pr-4 pl-4'>
                                <span className='IranSans'>{this.props.totalBoughtRestaurant / 1000} T</span>
                                <span className='IranSans '>مجموع خرید </span>
                            </div>
                            <div
                                className='totalBuyAndPrice w-100 d-flex justify-content-between flex-row mt-3 pr-4 pl-4'>
                                <span className='IranSans'>{this.props.scoreRestaurant}</span>
                                <span className='IranSans'>امتیاز</span>
                            </div>
                        </div>


                    </div>
                </React.Fragment>
            }/>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        token: store.rUserInfo.token,
        name: store.rUserInfo.name,
        birthday: store.rUserInfo.birthday,
        job: store.rUserInfo.job,
        totalBoughtAll: store.rUserInfo.totalBoughtAll,
        totalBoughtRestaurant: store.rUserInfo.totalBoughtRestaurant,
        orderTimesRestaurant: store.rUserInfo.orderTimesRestaurant,
        scoreRestaurant: store.rUserInfo.scoreRestaurant,
        lastOrderRestaurant: store.rUserInfo.lastOrderRestaurant,
    }
}

const mapDispatchToProps = () => {
    return {
        setUserData: actions.userSetData,
        setCustomerData: actions.userSetCustomerInfo,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);

