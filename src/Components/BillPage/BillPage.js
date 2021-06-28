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
        giftSVGHolder: svg.gift,
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
                        <span className='billEachOrderName'>{eachFood.persianName}</span>
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

    giftCodeSuccess = () => {
        this.setState({
            giftSVGHolder: svg.gift
        })
        gsap.to('.gift-button', {
            backgroundColor: 'green'
        })
    }

    openGiftCode = () => {
        let timeline = gsap.timeline();
        if (!this.state.isOffCodeOpen) {
            this.setState({
                isOffCodeOpen:true,
                giftSVGHolder: svg.check,
                giftDialogOpened: true
            }, () => {
                timeline.to('.gift-button', {
                    height: "40px",
                    width: '92%',
                    y: '-280%',
                    right: '4%',
                    borderRadius: '10px',
                    duration: 0.2,

                }).to('.BillSubmitButton', {
                    y: '120px',
                }, 0).to('.gift-code-input', {
                    display: 'flex',
                }, 0)

            })

        } else {

            this.setState({
                isOffCodeOpen:true
            })

            timeline.to('.gift-code-input', {
                display: 'none',
                duration: '0'
            }, 0).to('.BillSubmitButton', {
                y: '0px',
                duration: 0.2,
                onComplete: () => {
                    this.setState({
                        giftSVGHolder: svg.gift
                    })
                }
            }).to('.gift-button', {
                position: 'absolute',
                height: "35px",
                width: '35px',
                y: '0',
                boxShadow: ' none',
                right: '20px',
                borderRadius: '50%',
                overflow: 'hidden',
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
                            onClick={this.handleSubmit}

                        >
                            <div className={'gift-button d-flex justify-content-center align-items-center'}
                            >
                                <div
                                    className={'gift-inner w-100 h-100 d-flex justify-content-center align-items-center'}>
                                    <div>
                                        <input type="text" className={'gift-code-input'} placeholder="c-1498"/>
                                    </div>
                                    <div className={'gift-button-svg d-flex justify-content-center align-items-center'}
                                         onClick={() => {
                                             this.openGiftCode()
                                         }}>
                                        {this.state.giftSVGHolder}

                                    </div>

                                </div>


                            </div>

                            <span style={{position: 'absolute'}} onClick={
                                this.handleSubmit
                            }>پرداخت</span>
                            <div className={'h-100 w-75 d-flex flex-row-reverse align-content-start'} onClick={
                                this.handleSubmit
                            }>
                                {/*  here is the pay button Collision  */}
                            </div>


                            <div className={' h-100 w-25 d-flex flex-row-reverse'}>
                                {/*  here is the gift button Collision  */}

                            </div>
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
