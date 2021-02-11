import React from "react";
import './css/style.css'
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import KeyboardArrowLeftRoundedIcon from "@material-ui/icons/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@material-ui/icons/KeyboardArrowRightRounded";
import {TextField} from "@material-ui/core";
import 'animate.css/animate.css'
import VerificationCodeInput from '../VerificationCodeInput/vCodeInput'
import * as requests from '../../ApiRequests/ApiRequests.js'
import * as actions from "../../stores/reduxStore/actions";
import {connect} from "react-redux";


class LoginVCode extends React.Component {
    state = {
        userPhoneNumber: 0,
        buttonDefaultClass: 'loginSubmitButton IranSansLight animate__animated ',
        buttonAnimationClasses: '',
        phoneNumberContainerClass: 'd-none',
        VCodeContainerClass: 'd-none ',
    }

    componentDidMount() {
        if(this.isUserLoggedIn()){
            this.props.history.replace("/profile/club")
        }

        this.setState({
            phoneNumberContainerClass: 'animate__animated animate__fadeInUp'
        })

        if (this.props.VCodeSent){
            this.setState({
                phoneNumberContainerClass: 'd-none',
                VCodeContainerClass: 'animate__animated animate__fadeInUp flex-column d-flex'
            })
        }
    }


    // later add cache check here
    isUserLoggedIn = () =>{
        if(this.props.token.length > 20){
            return true;
        }else {
            return false
        }
    }

    onInputChange(stateToChange, value) {
        this.state[stateToChange] = value
    }

    sendCode = (phone) => {
        requests.sendVCode(this.codeWasCorrect, phone)
    }

    checkCallbackData = (data) => {
        if (data.statusCode === 200){
            this.props.setToken(data.data.token)
            if (data.data.isUserInfoSaved){
                this.getOpenOrders(data.data.token)
                this.props.history.replace('/profile/club')
            }else{
                this.props.history.replace('/signup')
            }
        }
    }

    getOpenOrders=(token)=>{
        requests.getOpenOrders(this.callbackOpenOrders, token);
    }

    callbackOpenOrders = (res) =>{
        if(res.hasOwnProperty("statusCode") && res.statusCode === 200){
            this.props.setOpenOrders(res.data)
        }
    }

    codeWasCorrect = (vCode) => {
        requests.checkCode(this.checkCallbackData, this.state.userPhoneNumber, vCode)
        this.props.setSentVCode(true);
    }

    handleBack = () =>{
        this.props.history.goBack()
    }

    render() {
        return (
            <React.Fragment>
                <div
                    className='categoryPageHeader  pl-2 pr-2 pt-2 d-flex flex-row justify-content-between align-items-center'>
                    <ArrowBackRoundedIcon onClick={this.handleBack}/>
                    <div className='categoryPageSelector text-center d-flex justify-content-around flex-row'>
                        <div className='categoryPageSelectorText IranSans'>ورود</div>
                    </div>
                    <ArrowBackRoundedIcon className='invisible'/>
                </div>
                <div className='loginPageContainer'>
                    <div className='loginCenterContainer d-flex w-100 justify-content-center h-100 align-items-center'>
                        <div className='centerItemsHolder'>
                            <React.Fragment>
                                <div className={this.state.phoneNumberContainerClass}>
                                    <span className=' IranSans LoginPhoneTextHolder'>شماره موبایلت رو وارد کن </span>
                                    <span className='IranSansLight LoginPhoneDetailHolder'>تا با ارسال کد ورود صفحه شخصیت امنیت داشته باشه</span>
                                    <TextField type='number' className='LoginPhoneInput' onChange={(e) => {
                                        if (parseInt(e.target.value).toString() !== "NaN" && e.target.value.length < 10) {
                                            this.state.userPhoneNumber = '09' + e.target.value.toString()
                                        } else {
                                            e.target.value = e.target.value.slice(0, -1)
                                        }
                                        if (e.target.value.length === 9) {
                                            this.setState({
                                                buttonAnimationClasses: 'animate__fadeInUp'
                                            })
                                            this.state.userPhoneNumber = '09' + e.target.value.toString()
                                        } else if (this.state.buttonAnimationClasses !== '') {
                                            this.setState({
                                                buttonAnimationClasses: 'animate__fadeOutDown'
                                            })
                                            setTimeout(() => {
                                                if (this.state.buttonAnimationClasses === 'animate__fadeOutDown')
                                                    this.setState({
                                                        buttonAnimationClasses: ''
                                                    })
                                            }, 1000)
                                        }
                                    }}
                                               InputProps={{
                                                   // startAdornment: <InputAdornment position="start">09</InputAdornment>,
                                                   startAdornment: <span className='phoneInputStarter'>09</span>
                                                   ,
                                               }}
                                    />
                                    <div onClick={() => {
                                        if (this.state.userPhoneNumber.length > 7){
                                            this.sendCode(this.state.userPhoneNumber);
                                            this.setState({
                                                phoneNumberContainerClass: ' animate__animated animate__fadeOutLeftBig'
                                            })
                                            setTimeout(() => {
                                                this.setState({
                                                    phoneNumberContainerClass: 'd-none',
                                                    VCodeContainerClass: 'animate__animated animate__fadeInUp flex-column d-flex'
                                                })
                                            }, 200)
                                        }

                                    }}
                                         className={this.state.buttonDefaultClass + this.state.buttonAnimationClasses}>
                                        ارسال کد
                                    </div>
                                </div>
                            </React.Fragment>
                            <React.Fragment>
                                <div className={this.state.VCodeContainerClass}>
                                    <span
                                        className='IranSans VCodePhoneTextHolder'>کد ارسال شده به شماره زیر رو وارد کن</span>
                                    <span className='IranSansLight VCodePhoneHolder text-right'>{this.state.userPhoneNumber}</span>
                                    <div className='text-right'>
                                        <div onClick={()=>{
                                            this.setState({
                                                VCodeContainerClass: 'animate__animated animate__fadeOutLeftBig flex-column d-flex'
                                            })
                                            setTimeout(()=>{
                                                this.setState({
                                                    VCodeContainerClass:'d-none',
                                                    phoneNumberContainerClass: 'animate__animated animate__fadeInUp'                                                })
                                            },500)
                                        }} className='editPhoneNumberButton'>
                                            ویرایش
                                        </div>
                                    </div>
                                    <VerificationCodeInput sendCode={this.codeWasCorrect} />
                                    <div className={'vCodeSubmitButton IranSansLight '}>تایید
                                    </div>
                                </div>
                            </React.Fragment>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}


const mapStateToProps = (store) => {
    return {
        VCodeSent:store.rFrontStates.VCodeSent,
        token:store.rUserInfo.token,
    }
}

const mapDispatchToProps = () => {
    return {
        setSentVCode:actions.setSentVCode,
        setToken:actions.userSetToken,
        setOpenOrders: actions.setOpenOrdersListInfo,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginVCode);