import React from 'react';
import {connect} from 'react-redux';
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import './css/style.css'
import * as randomColors from '../../functions/RandomColor'
import moment from "jalali-moment"



class EachOpenOrderDetails extends React.Component {
    state = {
        foods:<div/>,
    }

    componentDidMount() {
        this.setState({
            foods:this.createFoods()
        })
    }

    handlePay = (trackingId) =>{
        this.props.history.push("/dongi?trackingId="+trackingId)
    }

    handleBack = () => {
        this.props.history.goBack()
    }

    createFoods = ()=>{
        let orderList = JSON.parse(this.props.tempOpenOrderInfo["order_list"])
        return orderList.map(eFood =>{
                let color = randomColors.RandomColor()
                return(
                    <div key={eFood["id"]} className='eachOrderDetailsEachFoodContainer'>
                        <div className='eachOrderDetailsEachFood' style={{color:color.foreground,backgroundColor:color.background}}>
                            <div className='priceAndImage'>
                                    <span className='EachOrderDetailsEachFoodPrice'>
                                        {eFood['priceAfterDiscount'] / 1000} T
                                    </span>
                                <div className='EachOrderDetailsEachFoodImage'
                                     style={{
                                         background: `url(https://dl.cuki.ir/sampleAssets/sampleThumbnail_96x96.png)`,
                                         backgroundSize: 'cover',
                                         backgroundPosition: 'center'
                                     }}/>
                            </div>
                            <span className='eachOrderDetailsFoodNumber text-left pl-3'>x{eFood.number}</span>
                            <div className='w-100 justify-content-center d-flex'>
                                <div className='EachOrderDetailsEachFoodName mt-3'>{eFood.name}</div>
                            </div>
                        </div>
                    </div>
                )
            }
        )
    }
    render() {
        return (
            <React.Fragment>
                <div
                    className='categoryPageHeader pl-2 pr-2 pt-2 d-flex flex-row justify-content-between align-items-center'>
                    <ArrowBackRoundedIcon onClick={this.handleBack}/>
                    <div className='text-center d-flex justify-content-around flex-row'>
                        <div className='IranSans'>جزییات سفارش</div>
                    </div>
                    <ArrowBackRoundedIcon className='invisible'/>
                </div>

                <div className='eachOrderDetailsPageContainer'>
                    <div className='eachOrderDetailsFoodsContainer'>
                        <div className='d-flex flex-row w-100 justify-content-around profileHistoryTextHeader'>
                            <span className='IranSans '>{moment.unix(parseInt(this.props.tempOpenOrderInfo['ordered_date'])).format("jM/jD")}</span>
                            <span className='IranSans '>{moment.unix(parseInt(this.props.tempOpenOrderInfo['ordered_date'])).format("HH:mm")}</span>
                        </div>
                        <div className='d-flex flex-wrap justify-content-between'>
                            {this.state.foods}
                        </div>

                    </div>
                    <div className='mt-3 IranSans d-flex w-100 justify-content-between pr-4 pl-4'>
                        <span className=''>{this.props.tempOpenOrderInfo['total_price']} T</span>
                        <span className='eachOrderDetailsTotalHolder'>جمع نهایی</span>
                    </div>

                    <div className='mt-2 IranSans d-flex w-100 justify-content-between pr-4 pl-4'>
                        <span className=''>{this.props.tempOpenOrderInfo['paid_amount'] > 0 ? this.props.tempOpenOrderInfo['paid_amount'] : 0} T</span>
                        <span className='eachOrderDetailsTotalHolder'>پرداختی شما</span>
                    </div>
                    <div className='mt-2 IranSans d-flex w-100 justify-content-between pr-4 pl-4'>
                        <span className=''>{this.props.tempOpenOrderInfo['order_table'] > 0 ? this.props.tempOpenOrderInfo['order_table'] : JSON.parse(this.props.tempOpenOrderInfo['address'])['addressText']}</span>
                        <span className='eachOrderDetailsTotalHolder'>شماره میز</span>
                    </div>
                    <div className='mt-2 IranSans d-flex w-100 justify-content-between pr-4 pl-4'>
                        <span className=''>{this.props.tempOpenOrderInfo['tracking_id']}</span>
                        <span className='eachOrderDetailsTotalHolder'>شماره سفارش</span>
                    </div>
                    <div className='openOrderHistorySubmit mt-2' onClick={()=>(this.handlePay(this.props.tempOpenOrderInfo['tracking_id']))}>
                        <span>پرداخت</span>
                    </div>
                </div>
            </React.Fragment>

        );
    }
}

const mapStateToProps = (store) => {
    return {
        tempOpenOrderInfo: store.rTempData.tempOpenOrderInfo
    }
}

const mapDispatchToProps = () => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(EachOpenOrderDetails);
