import React from "react";
import './css/style.css'
import gsap from "gsap";
import KeyboardArrowLeftRoundedIcon from '@material-ui/icons/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import {SwipeableList, SwipeableListItem} from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import {connect} from "react-redux";
import * as actions from "../../stores/reduxStore/actions";
import * as requests from "../../ApiRequests/ApiRequests";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import {useSwipeable} from 'react-swipeable';
import fixBodyClass from "../../functions/fixSwalBody";
import * as svg from './svg'

export const Swipeable = ({children, style, ...props}) => {
    const handlers = useSwipeable(props);
    return (<div style={style} {...handlers}>{children}</div>);
}

const ReactSwal = withReactContent(Swal)


class BillPage extends React.Component {

    state = {
        isOffCodeOpen: false,
        giftSVGHolder:svg.gift,
    }

    componentDidMount() {
        if (this.props.orderList.length <= 0) {
            ReactSwal.fire({
                text: '): هیچی رو سفارش ندادی ها',
                icon: 'info',
                confirmButtonText: "راس میگی، حله",
            }).then(() => {
                this.props.history.push('/main')
            })
            fixBodyClass()
        }
    }


    sumTotalOrderPrice = () => {
        let sum = 0;
        this.props.orderList.map(eachFood => void (sum += eachFood['totalPrice']))
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
        if (this.props.orderList.length > 0) {
            if (this.props.token.length > 20) {
                this.props.history.push('/payway');
            } else {
                requests.getIP(this.callbackGetIP);
            }
        }
    }
    callbackGetIP = (res) => {
        if (res.hasOwnProperty("ip"))
            requests.getTempToken(this.callbackGetTempToken, res.ip, navigator.userAgent, "", res.city)
    }
    callbackGetTempToken = (res) => {
        if (res.hasOwnProperty("statusCode") && res.statusCode === 200) {
            this.props.setToken(res.data.token)
            this.props.history.push('/payway');
        }
    }


    handleIncreaseFoodNumber = (foodId) => {
        this.props.increaseFoodNumber(foodId)
    }
    handleDecreaseFoodNumber = (foodId) => {
        this.props.decreaseFoodNumber(foodId)
    }


    createOrderList = () => {
        console.log(this.props.orderList)
        return this.props.orderList.map(eachFood => (
                <SwipeableListItem key={eachFood["id"]}
                                   swipeLeft={{
                                       content: <div/>,
                                       action: () => this.handleDecreaseFoodNumber(eachFood["id"]),
                                   }}
                                   swipeRight={{
                                       content: <div/>,
                                       action: () => this.handleIncreaseFoodNumber(eachFood["id"]),
                                   }}>
                    <div
                        className='mt-5 w-100 BillRow rtl IranSans'>
                        <span className='billEachOrderName'>{eachFood.name}</span>
                        <span
                            className='eachFoodPriceBill'>{((eachFood.price * (1 - eachFood.discount / 100)) * eachFood.number) / 1000} T</span>
                        <div className='d-flex justify-content-between umberInDe'>
                            <AddRoundedIcon onClick={() => (this.handleIncreaseFoodNumber(eachFood["id"]))}/>
                            <span
                                className='NumberOfFoodsBill'>{this.checkFoodNumber(eachFood["id"], eachFood.number)}</span>
                            <RemoveRoundedIcon onClick={() => (this.handleDecreaseFoodNumber(eachFood["id"]))}/>
                        </div>
                    </div>
                </SwipeableListItem>
            )
        )
    }

    swipeRight = () => {
        // if(this.props.openOrdersList.length !== 0){
        //     this.props.history.push("/openOrders")
        //
        // } else{
        //     this.props.history.push("/login")
        // }
    }

    swipeLeft = () => {
        // this.props.history.push("/main")
    }

    giftCodeSuccess = ()=>{
        this.setState({
            giftSVGHolder:svg.gift
        })
       gsap.to('.gift-button', {
            backgroundColor:'green'
        })
    }

    openGiftCode = () => {
        let timeline = gsap.timeline();
        if (!this.state.isOffCodeOpen) {
            this.state.isOffCodeOpen = true;
                this.setState({
                    giftSVGHolder:svg.check,
                    giftDialogOpened:true
                },()=>{
                    timeline.to('.gift-button', {
                        height: "40px",
                        width: '92%',
                        y: '-280%',
                        right: '4%',
                        borderRadius: '10px',
                        duration: 0.2,

                    }).to('.BillSubmitButton', {
                        y: '120px',
                    }, 0).to('.gift-code-input',{
                        display:'flex',
                    },0)

                })

        } else {

            this.state.isOffCodeOpen = false;

                timeline.to('.gift-code-input', {
                    display:'none',
                    duration:'0'
                },0).to('.BillSubmitButton', {
                    y: '0px',
                    duration: 0.2,
                    onComplete:()=>{
                        this.setState({
                            giftSVGHolder:svg.gift
                        })
                    }
                }).to('.gift-button', {
                    position:'absolute',
                    height: "35px",
                    width: '35px',
                    y: '0',
                    boxShadow:' none',
                    right: '20px',
                    borderRadius: '50%',
                    overflow:'hidden',
                    duration: 0.2,

                })



        }
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
                        <div className='categoryPageSelector text-center d-flex justify-content-around flex-row'>
                            <KeyboardArrowLeftRoundedIcon/>
                            <div className='categoryPageSelectorText IranSans'>فاکتور</div>
                            <KeyboardArrowRightRoundedIcon/>
                        </div>
                        <ArrowBackRoundedIcon className='invisible'/>
                    </div>
                    <div className='BillPageContainer'>
                        <div className='w-100 billItemsContainer '>
                            <SwipeableList threshold={0.25}>
                                {this.createOrderList()}
                            </SwipeableList>
                        </div>

                        <table style={{direction: 'rtl'}} align={'center'} className={'w-100 bill-texts-table'}>
                            <tr>
                                <td className={'bill-td'}><span className={'bill-texts'}>جمع نهایی</span></td>
                                <td className={'bill-td'}><span className={'bill-texts'}>جمع تخفیف</span></td>
                                <td className={'bill-td'}><span className={'bill-texts'}>جمع نهایی فاکتور</span></td>

                            </tr>
                            <tr>
                                <td className={'bill-td'}><span className={'bill-texts'}> 250T2</span></td>
                                <td className={'bill-td'}><span className={'bill-texts'}> 2522</span></td>
                                <td className={'bill-td'}><span
                                    className={'bill-texts'}> {this.sumTotalOrderPrice() / 1000}T</span></td>

                            </tr>
                        </table>

                        {/*<div className='totalPriceAndTextHolder  d-flex w-100 justify-content-between'>*/}
                        {/*    <span>{this.sumTotalOrderPrice() / 1000}T</span>*/}
                        {/*    <span>جمع نهایی فاکتور</span>*/}
                        {/*</div>*/}
                        <div className='BillSubmitButton'
                            // onClick={this.handleSubmit}

                        >
                            <div className={'gift-button d-flex justify-content-center align-items-center'}
                                 >
                                <div
                                    className={'gift-inner w-100 h-100 d-flex justify-content-center align-items-center'}>
                                    <div>
                                        <input type="text" className={'gift-code-input'} placeholder="c-1498"/>
                                    </div>
                                    <div className={'gift-button-svg d-flex justify-content-center align-items-center'} onClick={() => {
                                        this.openGiftCode()
                                    }}>
                                        {this.state.giftSVGHolder}

                                    </div>

                                </div>



                            </div>
                            <span style={{position: 'absolute'}}>پرداخت</span>
                            <div className={'h-100 w-75 d-flex flex-row-reverse align-content-start'}>
                                {/*  here is the pay button Collision  */}
                            </div>
                            <div className={' h-100 w-25 d-flex flex-row-reverse'}>
                                {/*  here is the gift button Collision  */}

                            </div>


                            {/*<div style={{width:"40px",height:'40px'}}/>*/}
                            {/*<span>پرداخت</span>*/}
                            {/*<div className={'gift-button d-flex justify-content-center align-items-center'}*/}
                            {/* onClick={()=>{*/}
                            {/*     console.log('Gift Clicked')*/}
                            {/* }}*/}

                            {/*>*/}
                            {/*    <svg version="1.1" id="Capa_1" width={'20'} height={'20'}*/}
                            {/*         xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"*/}
                            {/*         viewBox="0 0 490 490">*/}
                            {/*        <g>*/}
                            {/*            <path d="M469.2,117.44h-97.5c32.2-37.2,18.1-79.2-4.4-97.8c-13.5-11.1-74.6-45.7-123.4,16.8c-30.3-49.4-97.1-41-122.2-15.8*/}
                            {/*                c-27.6,27.6-33.4,63.8-5.4,96.8H20.8c-11.4,0-20.8,9.4-20.8,20.8v97.8c0,11.4,9.4,20.8,20.8,20.8h13.5v212.3*/}
                            {/*                c0,11.4,9.4,20.8,20.8,20.8h378.7c11.4,0,19.8-9.4,20.8-20.8v-212.2h14.6c11.4,0,20.8-9.4,20.8-20.8v-97.8*/}
                            {/*                C490,126.84,480.6,117.44,469.2,117.44z M286.1,50.84c39.6-29.9,63.5,7.2,63.5,20.8c0,40.6-84.3,57.7-84.3,23.9*/}
                            {/*                C265.3,81.04,273.8,60.14,286.1,50.84z M148.8,50.84c41.5-39.5,92.5,24.1,71.8,55.2c-2.5,3.7-9.4,4.1-16.6,4.2*/}
                            {/*                C172.2,110.34,114.8,83.14,148.8,50.84z M223.7,449.44H75.9v-192.5h147.7v192.5H223.7z M413,449.44H265.3v-192.5H413V449.44z*/}
                            {/*                 M448.4,216.34H40.6v-57.2h407.8V216.34z"/>*/}
                            {/*        </g>*/}
                            {/*    </svg>*/}

                            {/*</div>*/}
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
