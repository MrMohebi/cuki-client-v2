import React from "react";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import './css/style.css'
class PayWay extends React.Component{
    state = {
        outResClass:'',
        inResClass:'',
        onlineClass:'',
        offlineClass:'',
        inOrOut: 'out',
        onlineOrCash:'cash'
    }
    componentDidMount() {
        if (this.state.inOrOut === 'in'){
           this.enableInRes()
        }else{
            this.enableOutRes()
        }
        if (this.state.onlineOrCash === 'online'){
            this.enableOnline()

        }else{
            this.enableCash()

        }
    }

    enableInRes = ()=>{ this.setState({
        inResClass:'payWayActive',
        outResClass:'payWayNormal',
        inOrOut:'in'
    })}
    enableOutRes = ()=>{this.setState({
        inResClass:'payWayNormal',
        outResClass:'payWayActive',
        inOrOut:'out'

    })}
    enableOnline = ()=>{this.setState({
        onlineClass:'payWayActive',
        offlineClass:'payWayNormal',
        onlineOrCash:'online'
    })}
    enableCash = ()=>{this.setState({
        onlineClass:'payWayNormal',
        offlineClass:'payWayActive',
        onlineOrCash:'cash'
    })}
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
                            <div className={this.state.onlineClass} onClick={this.enableOnline}
                            >آنلاین</div>
                            <div className={this.state.offlineClass} onClick={this.enableCash}>نقدی</div>

                        </div>
                    </div>

                    <div className='payWayOptionsContainer d-flex flex-row-reverse justify-content-between'>
                        <span className='IranSans payWayText ' >تحویل سفارش چطور؟</span>
                        <div className='payWayButtonsContainer d-flex flex-column justify-content-between'>
                            <div className={this.state.inResClass} onClick={this.enableInRes}>درون رستوران</div>
                            <div className={this.state.outResClass} onClick={this.enableOutRes}>بیرون بر</div>

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