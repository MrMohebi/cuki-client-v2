import React from "react";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import './css/style.css'
class PayWay extends React.Component{
    state = {
        outResClass:'',
        inResClass:'',
        onlineClass:'',
        offlineClass:'',
        inOrOut: ''
    }
    render(){
        return(
            <React.Fragment>
                <div
                    className='categoryPageHeader pl-2 pr-2 pt-2 d-flex flex-row justify-content-between align-items-center'>
                    <ArrowBackRoundedIcon/>
                    <div className='text-center d-flex justify-content-around flex-row'>
                        <div className='IranSans'>نحوه پرداخت</div>
                    </div>
                    <ArrowBackRoundedIcon className='invisible'/>
                </div>
                <div className='payWayContainer'>
                    <div className='payWayOptionsContainer d-flex flex-row-reverse justify-content-between'>
                        <span className='IranSans payWayText ' >نحوه پرداخت چجوری باشه؟</span>
                        <div className='payWayButtonsContainer d-flex flex-column justify-content-between'>
                            <div className=' payWayActive'>آنلاین</div>
                            <div className=' payWayNormal'>آنلاین</div>
                            <div  > </div>
                        </div>
                    </div>

                    <div className='payWayOptionsContainer d-flex flex-row-reverse justify-content-between'>
                        <span className='IranSans payWayText ' >تحویل سفارش چطور؟</span>
                        <div className='payWayButtonsContainer d-flex flex-column justify-content-between'>
                            <div className=' payWayActive'>درون رستوران</div>
                            <div className=' payWayNormal'>بیرون بر</div>

                        </div>
                    </div>
                    <div className='mapContainer'/>
                    <div className='BillSubmitButton mt-2'>
                        <span>پرداخت</span>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default PayWay;