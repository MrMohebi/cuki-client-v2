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
import * as requests from "../../ApiRequests/ApiRequests";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import {useSwipeable} from 'react-swipeable';
import fixBodyClass from "../../functions/fixSwalBody";

export const Swipeable = ({children, style, ...props}) => {
    const handlers = useSwipeable(props);
    return (<div style={style} {...handlers}>{children}</div>);
}

const ReactSwal = withReactContent(Swal)


class BillPage extends React.Component {

    componentDidMount() {
        if(this.props.orderList.length <= 0){
            ReactSwal.fire({
                text: '): هیچی رو سفارش ندادی ها',
                icon: 'info',
                confirmButtonText: "راس میگی، حله",
            }).then(()=>{
                this.props.history.push('/main')
            })
            fixBodyClass()
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
        if(this.props.orderList.length > 0){
            if (this.props.token.length > 20){
                this.props.history.push('/payway');
            } else {
                requests.getIP(this.callbackGetIP);
            }
        }

    }
    callbackGetIP = (res) =>{
        if(res.hasOwnProperty("ip"))
            requests.getTempToken(this.callbackGetTempToken, res.ip, navigator.userAgent, "", res.city)
    }
    callbackGetTempToken = (res) =>{
        if(res.hasOwnProperty("statusCode")&& res.statusCode === 200){
            this.props.setToken(res.data.token)
            this.props.history.push('/payway');
        }
    }


    handleIncreaseFoodNumber =(foodId) =>{
        this.props.increaseFoodNumber(foodId)
    }
    handleDecreaseFoodNumber = (foodId) =>{
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

    swipeRight = () => {
        if(this.props.openOrdersList.length !== 0){
            this.props.history.push("/openOrders")

        } else{
            this.props.history.push("/login")
        }
    }

    swipeLeft = () => {
        this.props.history.push("/main")
    }

    handleBack = () =>{
        this.props.history.goBack()
    }


    render() {
        return (
            <Swipeable style={{height: "100%"}} onSwipedRight={this.swipeRight} onSwipedLeft={this.swipeLeft} children={
                <React.Fragment>
                    <div
                        className='categoryPageHeader pl-2 pr-2 pt-2 d-flex flex-row justify-content-between align-items-center'>
                        <ArrowBackRoundedIcon onClick={this.handleBack}/>
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
                            <span>{this.sumTotalOrderPrice()/1000}T</span>
                            <span>جمع نهایی فاکتور</span>
                        </div>
                        <div className='BillSubmitButton' onClick={this.handleSubmit}>
                            <span>پرداخت</span>
                        </div>
                    </div>

                </React.Fragment>
            }/>
        )

    }
}

const mapStateToProps = (store) => {
    return {
        openOrdersList: store.rTempData.openOrdersList,
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
        setToken: actions.userSetToken,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BillPage);
