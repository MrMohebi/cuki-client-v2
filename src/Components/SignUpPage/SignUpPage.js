import React from 'react';
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import KeyboardArrowLeftRoundedIcon from "@material-ui/icons/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@material-ui/icons/KeyboardArrowRightRounded";
import {TextField} from "@material-ui/core";
import './css/style.css'
import logo from './img/logo.png'
import * as requests from '../../ApiRequests/ApiRequests'

class SignUpPage extends React.Component {
    state = {
        signUpContainerClass: 'animate__animated animate__fadeInUp signUpContainer d-flex justify-content-center flex-column d-none',
        name: '',
        birthday: '',
        job: ''
    }

    componentDidMount() {
        this.setState({
            signUpContainerClass: 'animate__animated animate__fadeInUp signUpContainer d-flex justify-content-center flex-column'
        })
    }

    backFunction = (res) => {
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
                        <div className='categoryPageSelectorText IranSans'>کوکی کلاب</div>
                        <KeyboardArrowRightRoundedIcon/>
                    </div>
                    <ArrowBackRoundedIcon className='invisible'/>
                </div>
                <div className='loginPageContainer'>
                    <div className={this.state.signUpContainerClass}>
                        <div className='w-100 d-flex justify-content-center'>
                            <span className='cukiSignUpText'>

                              (:  کوکی دلش میخواد بیشتر باهات آشناشه
                            </span>
                            <div className='signUpCukiLogo'
                                 style={{marginLeft: '10px', background: `url(${logo})`, backgroundSize: 'cover'}}/>
                        </div>
                        <TextField onChange={(e) => {
                            this.state.name = e.target.value
                        }} id="standard-basic" className='defaultInputUi' label="اسم و فامیل"/>
                        <TextField onChange={(e) => {
                            this.state.name = e.target.value
                        }} id="standard-basic" className='defaultInputUi' label="تاریخ تولد"/>
                        <TextField onChange={(e) => {
                            this.state.name = e.target.value
                        }} id="standard-basic" className='defaultInputUi' label="شغل"/>
                        <div onClick={() => {

                        }} className={'signupSubmitButton IranSansLight'}>تایید
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default SignUpPage;
