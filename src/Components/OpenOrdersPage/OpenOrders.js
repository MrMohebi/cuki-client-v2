import React, {Component} from 'react';
import {connect} from 'react-redux';
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import * as requests from "../../ApiRequests/ApiRequests"
import * as actions from "../../stores/reduxStore/actions"
import moment from "jalali-moment"
import './css/style.css'

class OpenOrders extends Component {
    timer;

    componentDidMount() {
        this.getOpenOrders()
        this.timer = setInterval(()=>{this.getOpenOrders()}, 5000)
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    state = {
        openOrdersList: [],
        openOrdersListDiv: <div/>,
    }

    getOpenOrders=()=>{
        requests.getOpenOrders(this.callbackOpenOrders);
    }

    callbackOpenOrders = (res) =>{
        console.log(res);
        if(res.hasOwnProperty("statusCode") && res.statusCode === 200){
            this.setState({
                openOrdersList : res.data,
                openOrdersListDiv: this.createOpenOrderList(res.data)
            })
        }
    }

    handleSelectOrder = (orderInfo) =>{
        this.props.setTempOpenOrderInfo(orderInfo);
        this.props.history.push("/eachOpenOrderDetails")
    }

    createOpenOrderList = (openOrders) =>{
        return openOrders.map(eOrder=>{
            let orderList = JSON.parse(eOrder['order_list'])
            let orderTime = moment.unix(parseInt(eOrder['ordered_date'])).format("HH:mm")
            return(
                <div key={eOrder["orders_id"]} onClick={()=>(this.handleSelectOrder(eOrder))} className='eachOpenOrderContainer position-relative w-100'>
                    <div className='w-100 d-flex justify-content-between mt-1'>
                        <span className='IranSans paidItemsText'>{eOrder["paid_amount"] ? (parseInt(eOrder["paid_amount"]) / 1000) : 0}T </span>
                        <span className='IranSans openOrdersNames'>{orderList.map(eFood=>(eFood.name)).join(" / ")}</span>
                    </div>
                    <div className='w-100 d-flex justify-content-between mt-1'>
                        <span className='IranSans'>{parseInt(eOrder["total_price"]) / 1000}T</span>
                        <span className='IranSans'>{orderTime}</span>
                    </div>
                </div>
            )
        })
    }

    handleBack = () => {
        this.props.history.goBack()
    }

    render() {
        return (
            <React.Fragment>
                <div
                    className='categoryPageHeader pl-2 pr-2 pt-2 d-flex flex-row justify-content-between align-items-center'>
                    <ArrowBackRoundedIcon onClick={this.handleBack}/>
                    <div className='text-center d-flex justify-content-around flex-row'>
                        <div className='IranSans'>سفارش های باز</div>
                    </div>
                    <ArrowBackRoundedIcon className='invisible'/>
                </div>
                <div className='openOrdersContainer'>
                    {this.state.openOrdersListDiv}
                </div>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps() {
    return {
        setTempOpenOrderInfo: actions.setTempOpenOrderInfo
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(OpenOrders);