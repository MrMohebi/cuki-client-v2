import React from "react";
import './css/style.css'
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import KeyboardArrowLeftRoundedIcon from "@material-ui/icons/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@material-ui/icons/KeyboardArrowRightRounded";
import {InputAdornment, TextField} from "@material-ui/core";
import 'animate.css/animate.css'
import VerificationCodeInput from '../VerificationCodeInput/vCodeInput'
import * as requests from '../../ApiRequests/ApiRequests.js'

class LoginVCode extends React.Component {
    state = {
        userPhoneNumber: 0,
        buttonDefaultClass:'loginSubmitButton IranSansLight animate__animated   ',
        buttonAnimationClasses:'',

    }

    onInputChange(stateToChange, value) {
        this.state[stateToChange] = value
        console.log(this.state.userPhoneNumber)
    }

    sendCode = (phone)=>{
        // requests.sendVCode(this.codeWasCorrect(),'09031232531')
        console.log(phone)
    }

    codeWasCorrect(res){
        console.log(res)
    }

    render() {
        return (
            <React.Fragment>
                <div
                    className='categoryPageHeader pl-2 pr-2 pt-2 d-flex flex-row justify-content-between align-items-center'>
                    <ArrowBackRoundedIcon/>
                    <div className='categoryPageSelector text-center d-flex justify-content-around flex-row'>
                        <KeyboardArrowLeftRoundedIcon/>
                        <div className='categoryPageSelectorText IranSans'>رستوران</div>
                        <KeyboardArrowRightRoundedIcon/>
                    </div>
                    <ArrowBackRoundedIcon className='invisible'/>
                </div>
                <div className='loginPageContainer'>
                    <div className='loginCenterContainer d-flex w-100 justify-content-center h-100 align-items-center'>
                        <div className='centerItemsHolder'>
                            {/*{this.phoneNumberSection}*/}
                            <React.Fragment>
                                <span className='IranSans VCodePhoneTextHolder'>کد ارسال شده به شماره زیر رو وارد کن</span>
                                <span className='IranSansLight VCodePhoneHolder text-right'>09031232531</span>
                                <div className='text-right'>
                                    <div className='editPhoneNumberButton'>
                                        ویرایش
                                    </div>
                                </div>
                                <VerificationCodeInput sendCode ={this.codeWasCorrect}/>
                                <div onClick={this.sendCode(this.state.userPhoneNumber)} className={'vCodeSubmitButton IranSansLight'}>تایید</div>

                            </React.Fragment>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    phoneNumberSection = <React.Fragment>
        <span className='IranSans LoginPhoneTextHolder'>شماره موبایلت رو وارد کن </span>
        <span className='IranSansLight LoginPhoneDetailHolder'>تا با ارسال کد ورود صفحه شخصیت امنیت داشته باشه</span>
        {/*<TextField className='LoginInput' label="Size" id="standard-size-small"/>*/}
        <TextField type='number' className='LoginPhoneInput' onChange={(e) => {
            console.log(e.target.value.length)
            if (parseInt(e.target.value).toString() !== "NaN" && e.target.value.length < 10) {
                this.state.userPhoneNumber = '09' + e.target.value.toString()
            } else {
                e.target.value = e.target.value.slice(0,-1)
            }
            if (e.target.value.length === 9) {
                console.log('button Enabled')
                this.setState({
                    buttonAnimationClasses:'animate__fadeInUp'
                })
                this.state.userPhoneNumber = '09' + e.target.value.toString()
            }else if (this.state.buttonAnimationClasses !== ''){
                this.setState({
                    buttonAnimationClasses:'animate__fadeOutDown'
                })
                setTimeout(()=>{
                    if (this.state.buttonAnimationClasses === 'animate__fadeOutDown')
                        this.setState({
                            buttonAnimationClasses:''
                        })
                },1000)
            }
        }}
                   InputProps={{
                       // startAdornment: <InputAdornment position="start">09</InputAdornment>,
                       startAdornment: <span className='phoneInputStarter'>09</span>
                       ,
                   }}
        />
        <div onClick={this.sendCode(this.state.userPhoneNumber)} className={this.state.buttonDefaultClass + this.state.buttonAnimationClasses}>
            ارسال کد
        </div>
    </React.Fragment>
    // vCodeSection =
}

export default LoginVCode;