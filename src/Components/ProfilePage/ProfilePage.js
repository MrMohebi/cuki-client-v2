import React from "react";
import './css/style.css'

import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';


class ProfilePage extends React.Component {

    state={
        History:true,
        UserTabClass:'profileNavigate IranSans text-nowrap',
        HistoryTabClass:''

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
                        <span className='profileNavigate IranSans text-nowrap'>کوکی کلاب</span>
                        <span className='profileNavigate profileNavigateActive IranSans  text-nowrap invisible'> سفارش های من</span>
                        <span className='profileNavigate IranSans  text-nowrap '> سفارش های من</span>
                    </div>

                    <div className='w-100 profileUserProfileContainer mt-5'>
                        <div className='w-100 d-flex justify-content-between align-items-center pt-4'>
                            <span className='historyOrderDate'>250T</span>
                            <span className='historyOrderName'>اسپشیال فلان و فلان وفلان</span>
                            <span className='historyOrderDate'>8/23</span>
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
