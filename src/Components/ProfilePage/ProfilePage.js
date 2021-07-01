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
import gsap from "gsap";
import moment from 'jalali-moment';


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
        offCodeTabClass: 'profileNavigate profileNavigate IranSans  text-nowrap ',
        offCodeElementClass: 'w-100 profileOffCodesContainer mt-3 animate__animated animate__fadeOut d-none',
        datePickerValue: {day: 9, month: 3, year: 1381},
        inputsDisabled: true,
        birthday: 1022716800,
        name: '',
        job: 'pilot',
        birthdayInputValue: '',
        offCodes: []
    }

    constructor(props) {
        super(props);
        this.birthdayRef = React.createRef()
    }

    getOffCodes = () => {
        requests.getOffCodes((res) => {
            let offCodes = res.data.map(eachOffCode => {
                return <div className={'eachOffCodeContainer'} onClick={(e)=>{
                    document.getElementById(eachOffCode['code']).select();
                    document.execCommand('copy');
                    gsap.to("#"+eachOffCode['code']+'sCopied',{
                        opacity:1
                    });
                    gsap.to("#"+eachOffCode['code']+'gift',{
                        backgroundSize:'0px',
                        ease:'power4.out',
                        duration:0.1
                    })

                    gsap.to("#"+eachOffCode['code']+'sCopied',{
                        opacity:0,
                        delay:1
                    });
                    gsap.to("#"+eachOffCode['code']+'gift',{
                        backgroundSize:'90%',
                        delay:1
                    })
                }
                }>
                    <div id={eachOffCode['code']+'gift'} className={'w-25 IranSans giftOffCode'}>
                        <span id={eachOffCode['code']+'sCopied'} style={{fontSize:'0.8rem',color:'#438D48',opacity:'0'}}>!کپی شد</span>
                    </div>
                    <div className={'w-75 d-flex flex-column justify-content-around '}>
                        <div
                            className={'w-100 d-flex flex-column IranSans justify-content-center pt-1 overflow-auto'}>
                            <span
                                className={'offCodePercent ml-2'}>{eachOffCode['discountAmount'] ?'مبلغ: '+ eachOffCode['discountAmount'] +' تومان ': eachOffCode['discountPercentage'] + '%'}</span>
                            <span className={'offCodeDetail'}>{eachOffCode['name']}</span>
                        </div>
                        <div
                            className={'w-100 d-flex flex-row-reverse IranSans justify-content-center pt-1 overflow-auto'}>
                            <input id={eachOffCode['code']} disabled={false} className={'offCodeCode ml-2'} value={eachOffCode['code']}/>
                            <span className={'offCodeDetail'}>اعتبار: {Math.floor((eachOffCode['to']-eachOffCode['from'])/86400)} روز</span>
                        </div>
                    </div>
                </div>
            })
            this.setState({
                offCodes:offCodes
            })
        })

    }

    componentDidMount() {
        this.getOffCodes()

        this.props.match.params['part'] === 'club' ? this.userTabClickHandler() : this.historyTabClickHandler()
        this.getUserInfo()
        if (this.state.inputsDisabled) {
            this.disableDatePicker()
        }
        this.setState({
            birthdayInputValue: moment.unix(this.props.birthday).format('jYYYY/jM/jD')
        })
    }

    userTabClickHandler = () => {
        this.setState({
            HistoryTabClass: this.state.navNormalClass,
            UserTabClass: this.state.navActiveClass,
            offCodeTabClass: this.state.navNormalClass,
            activeProfile: 'club',
            clubElementClass: 'w-100 animate__animated animate__fadeIn',
            offCodeElementClass: 'animate__animated animate__fadeOut d-none',
            historyElementClass: 'w-100 profileHistoryContainer mt-3 animate__animated animate__fadeOut d-none',
        });
    }

    historyTabClickHandler = () => {
        this.setState({
            HistoryTabClass: this.state.navActiveClass,
            UserTabClass: this.state.navNormalClass,
            offCodeTabClass: this.state.navNormalClass,
            activeProfile: 'his',
            clubElementClass: 'animate__animated animate__fadeOut d-none',
            offCodeElementClass: 'animate__animated animate__fadeOut d-none',
            historyElementClass: 'w-100 profileHistoryContainer mt-3 animate__animated animate__fadeIn',
        })
    }
    offCodesTabClickHandler = () => {
        this.setState({
            HistoryTabClass: this.state.navNormalClass,
            UserTabClass: this.state.navNormalClass,
            offCodeTabClass: this.state.navActiveClass,
            activeProfile: 'offCode',
            clubElementClass: 'animate__animated animate__fadeOut d-none',
            offCodeElementClass: 'w-100 profileOffCodesContainer mt-3 animate__animated animate__fadeIn',
            historyElementClass: 'animate__animated animate__fadeOut d-none',
        })
    }

    getUserInfo = () => {
        requests.getUserInfo(this.callbackGetUserInfo)
        requests.getCustomerInfo(this.callbackGetCustomerInfo)
    }

    callbackGetUserInfo = (res) => {

        if (res.hasOwnProperty("statusCode") && res.statusCode === 200) {
            let fixedData = res.data
            fixedData.birthday = parseInt(fixedData.birthday)
            this.props.setUserData(fixedData);
        }
    }

    callbackGetCustomerInfo = (res) => {
        if (res.hasOwnProperty("statusCode") && res.statusCode === 200) {
            this.props.setCustomerData(res.data);
        }
    }

    swipeRight = () => {
        if (this.state.activeProfile === 'club')
            this.props.history.push("/likedFoods")
        else
            this.userTabClickHandler()
    }

    swipeLeft = () => {
        if (this.state.activeProfile === 'his') {
            if (this.props.openOrdersList.length === 0) {
                this.props.history.push("/likedFoods")
            } else {
                this.props.history.push("/openOrders")
            }
        } else {
            this.historyTabClickHandler()
        }
    }

    enableDatePicker = () => {
        document.getElementsByClassName('DatePicker')[0].style.pointerEvents = 'all'
    }

    disableDatePicker = () => {
        document.getElementsByClassName('DatePicker')[0].style.pointerEvents = 'none'
    }

    handleBack = () => {
        this.props.history.goBack()
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
            this.editUserData()
        }
    }
    editUserData = () => {
        requests.changeUserInfo(() => {
        }, this.props.token, this.state.name, this.state.birthday, this.state.job)
    }

    datePickerChange = (date) => {
        this.setState({
            datePickerValue: date,
            birthday: moment(date.year + '/' + date.month + '/' + date.day, 'jYYYY/jM/jD').unix(),
            birthdayInputValue: date.year + '/' + date.month + '/' + date.day,
        })
    }

    handleSelectEachOrderHistory = (orderInfo) => {
        this.props.setTempHistoryOrderInfo(orderInfo)
        this.props.history.push("/eachOrderHistoryDetails")
    }

    render() {
        return (
            <Swipeable style={{height: "100%"}} onSwipedRight={this.swipeRight} onSwipedLeft={this.swipeLeft} children={
                <React.Fragment>
                    <div
                        className='categoryPageHeader pl-2 pr-2 pt-2 d-flex flex-row justify-content-between align-items-center'>
                        <ArrowBackRoundedIcon onClick={this.handleBack}/>
                        <div className='text-center d-flex justify-content-around flex-row'>
                            <div className='IranSans'>پروفایل</div>
                        </div>
                        <ArrowBackRoundedIcon className='invisible'/>
                    </div>
                    <div className='profilePageContainer'>
                        <div className='w-100 d-flex justify-content-around pt-3'>
                            <span className={this.state.UserTabClass}
                                  onClick={this.userTabClickHandler}>کوکی کلاب</span>
                            <span className={this.state.offCodeTabClass}
                                  onClick={this.offCodesTabClickHandler}>تخفیف ها</span>
                            <span className={this.state.HistoryTabClass} onClick={this.historyTabClickHandler}> سفارش های من</span>
                        </div>

                        <div className={this.state.historyElementClass}>
                            {
                                this.props.orderHistoryRestaurant.map(eOrder => {
                                    let orderList = JSON.parse(eOrder['order_list']);
                                    return (
                                        <div key={eOrder['id']}
                                             onClick={() => (this.handleSelectEachOrderHistory(eOrder))}
                                             className='w-100 d-flex justify-content-between align-items-center pt-4'>
                                            <span className='historyOrderDate'>{eOrder['total_price'] / 1000}T</span>
                                            <span
                                                className='historyOrderName'>{orderList.map(eFood => (eFood.persianName)).join("، ")}</span>
                                            <span
                                                className='historyOrderDate'>{moment.utc(parseInt(eOrder['created_at'])).format("jM/jD")}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <div className={this.state.offCodeElementClass}>
                            {this.state.offCodes}
                        </div>

                        <div className={this.state.clubElementClass}>
                            <div className='w-100 profileUserProfileContainer mt-3 d-flex flex-column '>
                                <TextField disabled={this.state.inputsDisabled} defaultValue={this.props.name}
                                           onChange={e => this.setState({name: e.target.value})}
                                           className='rtl mt-2 profileInputs'
                                           id="standard-basic1" label="اسم و فامیل"/>
                                <TextField ref={this.birthdayRef} disabled={this.state.inputsDisabled}
                                           value={this.state.birthdayInputValue}
                                           className='rtl mt-2 profileInputs'
                                           id="standard-basic2" label="تاریخ تولد"/>
                                <DatePicker
                                    disabled
                                    value={this.state.datePickerValue}
                                    onChange={this.datePickerChange}
                                    shouldHighlightWeekends
                                    locale="fa"
                                />

                                <TextField disabled={this.state.inputsDisabled} defaultValue={this.props.job}
                                           onChange={e => this.setState({job: e.target.value})}
                                           className='rtl mt-2 profileInputs'
                                           id="standard-basic3" label="شغل"/>
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
        openOrdersList: store.rTempData.openOrdersList,
        token: store.rUserInfo.token,
        name: store.rUserInfo.name,
        birthday: store.rUserInfo.birthday,
        job: store.rUserInfo.job,
        totalBoughtAll: store.rUserInfo.totalBoughtAll,
        totalBoughtRestaurant: store.rUserInfo.totalBoughtRestaurant,
        orderTimesRestaurant: store.rUserInfo.orderTimesRestaurant,
        scoreRestaurant: store.rUserInfo.scoreRestaurant,
        lastOrderRestaurant: store.rUserInfo.lastOrderRestaurant,
        orderHistoryRestaurant: store.rUserInfo.orderHistoryRestaurant,
    }
}

const mapDispatchToProps = () => {
    return {
        setUserData: actions.userSetData,
        setCustomerData: actions.userSetCustomerInfo,
        setTempHistoryOrderInfo: actions.setTempHistoryOrderInfo,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);

