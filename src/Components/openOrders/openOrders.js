import React, {Component} from 'react';
import {connect} from 'react-redux';
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import './css/style.css'

class OpenOrders extends Component {
    render() {
        return (
            <React.Fragment>
                <div
                    className='categoryPageHeader pl-2 pr-2 pt-2 d-flex flex-row justify-content-between align-items-center'>
                    <ArrowBackRoundedIcon/>
                    <div className='text-center d-flex justify-content-around flex-row'>
                        <div className='IranSans'>سفارش های باز</div>
                    </div>
                    <ArrowBackRoundedIcon className='invisible'/>
                </div>
                <div className='openOrdersContainer'>
                    <div className='eachDongContainer position-relative w-100' >

                        <div className='eachDongContainerHolders' >
                            <span className='eachDongFoodName font-weight-bold'>پیتزا پپرونی بدون اسپشیال برگر</span>
                            <span className='IranSans DongiPayText  '> 16:22</span>
                            <span className='IranSans '>28/3</span>
                            <span className='IranSans paidItemsText  '>65T</span>
                            <span className='IranSans'>150T</span>
                        </div>

                    </div>
                </div>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {


    };
}

function mapDispatchToProps(dispatch) {
    return {


    };
}


export default connect(mapStateToProps,mapDispatchToProps)(OpenOrders);