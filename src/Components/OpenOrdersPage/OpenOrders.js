import React, {Component} from 'react';
import {connect} from 'react-redux';
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import * as requests from "../../ApiRequests/ApiRequests"
import * as actions from "../../stores/reduxStore/actions"
import moment from "jalali-moment"
import './css/style.css'
import {useSwipeable} from 'react-swipeable';

export const Swipeable = ({children, style, ...props}) => {
    const handlers = useSwipeable(props);
    return (<div style={style} {...handlers}>{children}</div>);
}


class OpenOrders extends Component {
    timer;

    componentDidMount() {
        this.getOpenOrders()
        this.timer = setInterval(()=>{this.getOpenOrders()}, 5000)
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }


    getOpenOrders=()=>{
        requests.getOpenOrders(this.callbackOpenOrders);
    }

    callbackOpenOrders = (res) =>{
        if(res.hasOwnProperty("statusCode") && res.statusCode === 200){
            this.props.setOpenOrders(res.data)

            // if there is just one open order go directly to details
            if(res.data.length === 1){
                this.props.setTempOpenOrderInfo(res.data[0]);
                this.props.history.replace("/eachOpenOrderDetails")
            }
        }
    }

    handleSelectOrder = (orderInfo) =>{
        this.props.setTempOpenOrderInfo(orderInfo);
        this.props.history.push("/eachOpenOrderDetails")
    }

    swipeRight = () => {
        this.props.history.push("/login")
    }

    swipeLeft = () => {
        this.props.history.push("/bill")
    }


    handleBack = () => {
        this.props.history.goBack()
    }

    render() {
        return (
            <Swipeable style={{height: "100%"}} onSwipedRight={this.swipeRight} onSwipedLeft={this.swipeLeft} children={
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
                        {
                            this.props.openOrdersList.map(eOrder=>{
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
                    </div>
                </React.Fragment>
            }/>
        );
    }
}

function mapStateToProps(state) {
    return {
        openOrdersList: state.rTempData.openOrdersList,
    };
}

function mapDispatchToProps() {
    return {
        setTempOpenOrderInfo: actions.setTempOpenOrderInfo,
        setOpenOrders: actions.setOpenOrdersListInfo,
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(OpenOrders);