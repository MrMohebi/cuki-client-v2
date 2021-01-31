import React from "react";
import './css/style.css'
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import KeyboardArrowLeftRoundedIcon from "@material-ui/icons/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@material-ui/icons/KeyboardArrowRightRounded";

class LoginVCode extends React.Component {
    render() {
        return(
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
                            <span className='IranSans LoginPhoneTextHolder'>شماره موبایلت رو وارد کن </span>
                            <span className='IranSansLight LoginPhoneDetailHolder'>تا با ارسال کد ورود صفحه شخصیت امنیت داشته باشه</span>

                        </div>
                    </div>

                </div>
            </React.Fragment>
        )
    }
}
export default LoginVCode;