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
                    <div className='eachOpenOrderContainer position-relative w-100'>
                        <div className='w-100 d-flex justify-content-between mt-1'>
                            <span className='IranSans paidItemsText'>64T </span>
                            <span className='IranSans openOrdersNames'>شیلان برگر /  بابونه / پیتزا</span>
                        </div>
                        <div className='w-100 d-flex justify-content-between mt-1'>
                            <span className='IranSans'>250 T</span>
                            <span className='IranSans'>16:32</span>
                        </div>

                    </div>
                </div>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {};
}


export default connect(mapStateToProps, mapDispatchToProps)(OpenOrders);