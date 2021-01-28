import React from "react";
import './css/style.css'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';


class ProfilePage extends React.Component {

    state={
        History:true,
        navActiveClass:'profileNavigate IranSans text-nowrap profileNavigateActive',
        navNormalClass:'profileNavigate IranSans text-nowrap',
        UserTabClass:'profileNavigate IranSans text-nowrap',
        HistoryTabClass:'profileNavigate IranSans text-nowrap',


    }
    render() {
        return (
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
                        <span className={this.state.UserTabClass} onClick={arg=>{
                            this.setState({
                                HistoryTabClass:this.state.navNormalClass,
                                UserTabClass:this.state.navActiveClass
                            })
                        }}>کوکی کلاب</span>
                        <span className='profileNavigate profileNavigateActive IranSans  text-nowrap invisible'> سفارش های من</span>
                        <span className={this.state.HistoryTabClass} onClick={arg=>{
                            this.setState({
                                HistoryTabClass:this.state.navActiveClass,
                                UserTabClass:this.state.navNormalClass
                            })
                        }}> سفارش های من</span>
                    </div>
                    <div className='w-100'>
                        <div className='w-100 profileUserProfileContainer mt-3 d-flex flex-column '>
                            <TextField className='rtl mt-2' id="standard-basic" label="اسم و فامیل" />
                            <TextField className='rtl mt-2' id="standard-basic" label="تاریخ تولد" />
                            <TextField className='rtl mt-2' id="standard-basic" label="شغل" />
                            <div className='w-100 d-flex justify-content-center'>
                                <div className='profileSubmitButton mt-4 IranSans'> ویرایش</div>
                            </div>
                        </div>
                        <div className='totalBuyAndPrice w-100 d-flex justify-content-between flex-row mt-3 pr-4 pl-4'>
                            <span className='IranSans'>200</span>
                            <span className='IranSans '>مجموع خرید </span>
                        </div>
                        <div className='totalBuyAndPrice w-100 d-flex justify-content-between flex-row mt-3 pr-4 pl-4'>
                            <span className='IranSans'>200</span>
                            <span className='IranSans'>امتیاز</span>
                        </div>
                    </div>

                </div>
            </React.Fragment>
        )

    }

    historyElement = <div className='w-100 profileHistoryContainer'>
        <div className='w-100 d-flex justify-content-between align-items-center pt-4'>
            <span className='historyOrderDate'>250T</span>
            <span className='historyOrderName'>اسپشیال فلان و فلان وفلان</span>
            <span className='historyOrderDate'>8/23</span>
        </div>
    </div>
}

export default ProfilePage;
