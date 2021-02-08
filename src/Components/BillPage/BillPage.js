import React from "react";
import './css/style.css'
import KeyboardArrowLeftRoundedIcon from '@material-ui/icons/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import {connect} from "react-redux";
import * as actions from "../../stores/reduxStore/actions";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

const ReactSwal = withReactContent(Swal)


class BillPage extends React.Component {

    componentDidMount() {
        if(this.props.orderList.length <= 0){
            ReactSwal.fire({
                title: '): هیچی رو سفارش ندادی ها',
                icon: 'info',
                confirmButtonText: "راس میگی، حله",
                timer: 2000,
            })
            setTimeout(()=>{this.props.history.goBack()}, 2500)
        }
    }


    sumTotalOrderPrice = () => {
        let sum = 0;
        this.props.orderList.map(eachFood => {
            sum += eachFood.totalPrice
        })
        return sum;
    }

    checkFoodNumber = (foodId, number) => {
        if (number <= 0) {
            this.props.deleteFoodFromOrders(foodId)
            return true
        } else {
            return number
        }
    }
    handleSubmit = () => {
        if (this.props.token.length > 20){
            if(this.props.orderList.length > 0)
                this.props.history.push('/payway');
        } else {
            this.props.history.push('/login')
        }
    }

    handleIncreaseFoodNumber =(foodId) =>{
        if(this.props.trackingId < 1000)
            this.props.increaseFoodNumber(foodId)
    }
    handleDecreaseFoodNumber = (foodId) =>{
        if(this.props.trackingId < 1000)
            this.props.decreaseFoodNumber(foodId)
    }


    createOrderList = () =>{
        return this.props.orderList.map(eachFood => (
                <SwipeableListItem key={eachFood["foods_id"]}
                                   swipeLeft={{
                                       content: <div/>,
                                       action: () => this.handleDecreaseFoodNumber(eachFood["foods_id"])
                                   }}
                                   swipeRight={{
                                       content: <div/>,
                                       action: () => this.handleIncreaseFoodNumber(eachFood["foods_id"])
                                   }}>
                    <div
                        className='mt-5 w-100 BillRow rtl IranSans'>
                        <span className='billEachOrderName'>{eachFood.name}</span>
                        <span className='eachFoodPriceBill'>{(eachFood.price * eachFood.number)/1000} T</span>
                        <div className='d-flex justify-content-between umberInDe'>
                            <AddRoundedIcon onClick={()=>(this.handleIncreaseFoodNumber(eachFood["foods_id"]))}/>
                            <span className='NumberOfFoodsBill'>{this.checkFoodNumber(eachFood["foods_id"], eachFood.number)}</span>
                            <RemoveRoundedIcon onClick={()=>(this.handleDecreaseFoodNumber(eachFood["foods_id"]))}/>
                        </div>
                    </div>
                </SwipeableListItem>
            )
        )
    }


    render() {
        return (
            <React.Fragment>
                <div
                    className='categoryPageHeader pl-2 pr-2 pt-2 d-flex flex-row justify-content-between align-items-center'>
                    <ArrowBackRoundedIcon className='invisible'/>
                    <div className='categoryPageSelector text-center d-flex justify-content-around flex-row'>
                        <KeyboardArrowLeftRoundedIcon/>
                        <div className='categoryPageSelectorText IranSans'>فاکتور</div>
                        <KeyboardArrowRightRoundedIcon/>
                    </div>
                    <ArrowBackRoundedIcon className='invisible'/>
                </div>
                <div className='BillPageContainer'>
                    <div className='w-100 billItemsContainer '>
                        <SwipeableList>
                            {this.createOrderList()}
                        </SwipeableList>
                    </div>
                    <div className='totalPriceAndTextHolder  d-flex w-100 justify-content-between'>
                        <span>{this.sumTotalOrderPrice()}T</span>
                        <span>جمع نهایی فاکتور</span>
                    </div>
                    <div className='BillSubmitButton' onClick={this.handleSubmit}>
                        <span>پرداخت</span>
                    </div>
                </div>

            </React.Fragment>
        )

    }
}

const mapStateToProps = (store) => {
    return {
        orderList: store.rTempData.orderList,
        trackingId: store.rTempData.trackingId,
        token: store.rUserInfo.token,
    }
}

const mapDispatchToProps = () => {
    return {
        increaseFoodNumber: actions.increaseFoodNumber,
        decreaseFoodNumber: actions.decreaseFoodNumber,
        deleteFoodFromOrders: actions.deleteFoodFromOrders,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BillPage);
