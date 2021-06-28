import React, {Component} from 'react';
import {connect} from 'react-redux';
import './css/style.css'
import KeyboardArrowLeftRoundedIcon from '@material-ui/icons/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import {useSwipeable} from 'react-swipeable';
import * as RandomColor from '../../functions/RandomColor'
import * as actions from "../../stores/reduxStore/actions";
import * as ls from "../../stores/localStorage/localStorage"
import * as requests from "../../ApiRequests/ApiRequests";
import moreOrderedFoods from "../../functions/moreOrderedFoods";
import LoadingOverlay from 'react-loading-overlay';
import {ClimbingBoxLoader} from "react-spinners";

export const Swipeable = ({children, style, ...props}) => {
    const handlers = useSwipeable(props);
    return (<div style={style} {...handlers}>{children}</div>);
}


class LikedFoods extends Component {
    state = {
        likedFoodsListIds:moreOrderedFoods(this.props.orderHistoryRestaurant, ls.getLSResFoods()),
        foodList:ls.getLSResFoods(),
        firstPointerPosition: {
            x: 0,
            y: 0
        },
    }

    componentDidMount() {
        if (this.state.likedFoodsListIds.length < 1) {
            this.getData()
        }
    }
    getData = () => {
        requests.getRestaurantFoods(this.dataArrive);
    }
    dataArrive = (response) => {
        if (response.hasOwnProperty('statusCode') && response.statusCode === 200) {
            ls.setLSResFoods(response.data)
        }
    }

    giveMyNumber = (fId)=>{
        return this.props.orderList.filter(food=> food.id === fId)[0]? this.props.orderList.filter(food=> food.id === fId)[0].number:0
    }

    orderScripts = (id, foodsList = ls.getLSResFoods()) => {
        if (this.props.isResOpen) {
            if (this.props.orderList.filter(food => food.id === id).length) {
                this.props.increaseFoodNumber(id);
            } else {
                //  else add it to order list
                let food = {...foodsList[id]};
                food["number"] = 1;
                food["totalPrice"] = (food.price-0) * (1 - food.discount  / 100)
                this.props.addFoodToOrders(food)
            }
        }
    }


    swipeRight = () => {
        this.props.history.push("/main")
    }

    swipeLeft = () => {
        this.props.history.push("/login")
    }

    handleBack = () => {
        this.props.history.goBack();
    }

    clickAnimation = (id) => {
        let element = document.getElementById(id);
        if (element) {
            element.style.transform = 'scale(0.9)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 300)
        }

    }
    checkForMove = (e) => {
        let threshold = 8;
        if (e.pageX > this.state.firstPointerPosition.x + threshold || e.pageX < this.state.firstPointerPosition.x - threshold || e.pageY > this.state.firstPointerPosition.y + threshold || e.pageY < this.state.firstPointerPosition.y - threshold) {
            this.setState({allowToShow:false})
        }
    }
    pressAnimation = (id) => {
        let element = document.getElementById(id);
        if (element) {
            element.style.transform = 'scale(0.9)';
        }
    }
    releaseAnimation = (id) => {
        let element = document.getElementById(id);
        if (element) {
            setTimeout(()=>{
                element.style.transform = 'scale(1)';

            },200)
        }
    }
    handleDecreaseFoodNumber = (foodId) => {
        this.props.decreaseFoodNumber(foodId)
    }


    render() {
        return (
            <LoadingOverlay
                active={this.state.foodList.length < 1}
                spinner={<ClimbingBoxLoader color={'white'}/>}
                text='وایسا چک کنم ببینم چی چیا داریم'
            >
                <Swipeable style={{height: "100%"}} onSwipedRight={this.swipeRight} onSwipedLeft={this.swipeLeft} children={
                    <React.Fragment>
                        <div
                            className='foodListPageHeader pl-2 pr-2 pt-2 d-flex flex-row justify-content-between align-items-center'>
                            <ArrowBackRoundedIcon onClick={this.handleBack}/>
                            <div
                                className='headerPageSelector text-center d-flex justify-content-around flex-row'>
                                <KeyboardArrowLeftRoundedIcon onClick={this.previousPage}/>
                                <div className='categoryPageSelectorText IranSans'>
                                    دوست داشتنی ها
                                </div>
                                <KeyboardArrowRightRoundedIcon onClick={this.nextPage}/>
                            </div>
                            <ArrowBackRoundedIcon className='invisible'/>
                        </div>

                        <div className='foodListPageContainer'>
                            <div className='heightFitContent'>
                                {
                                    this.state.likedFoodsListIds.map(foodId => {
                                        let eachFood = this.state.foodList[foodId];
                                        let colors = RandomColor.RandomColor(eachFood.id);
                                        let isInOrderList = false;
                                        if ((typeof this.props.orderList.filter(food => food.id === eachFood.id)[0] !== "undefined")) {
                                            isInOrderList = true;
                                        }
                                        return (
                                            <div onContextMenu={(e) => {e.preventDefault()}} key={eachFood['id']} className='foodListEachFoodContainer animate__animated animate__fadeInDown'
                                                 onClick={() => {
                                                     if ((eachFood.status === 'inStock')) {
                                                         this.orderScripts(eachFood.id);
                                                         this.clickAnimation('food' + eachFood['id'])
                                                     }
                                                 }}
                                                 onTouchStart={(e) => {
                                                     if ((eachFood.status === 'inStock') && !e.target.classList.contains('increase') && !e.target.classList.contains('decrease')) {
                                                         this.pressAnimation('food' + eachFood['id'])
                                                     }
                                                 }}
                                                 onPointerMove={(e) => {
                                                     this.checkForMove(e)
                                                 }}
                                                 onTouchEnd={() => {
                                                     this.releaseAnimation('food' + eachFood['id'])
                                                 }}
                                            >
                                                <div className='foodListEachFood'
                                                     id={'food' + eachFood['id']}
                                                     style={{backgroundColor: colors.background}}>
                                                    {
                                                        parseInt(eachFood.discount) > 0 ?
                                                            <span
                                                                className={'discountPercentage'}>{eachFood.discount ? eachFood.discount + "%" : '0'}  </span>
                                                            :
                                                            <div/>
                                                    }
                                                    <div className='priceAndImage'>
                                                        {
                                                            (eachFood.status === 'inStock') ?
                                                                eachFood.discount === 0 ?
                                                                    <span className='eachFoodPrice '>{eachFood.price / 1000} T</span>
                                                                    :
                                                                    <div className={'d-flex flex-column justify-content-center'}>
                                                                        <span style={{textDecoration: 'line-through', fontSize: '0.6rem', lineHeight: '1.5rem', color: '#787878'}} className='eachFoodPrice'>
                                                                            {eachFood.price / 1000} T
                                                                        </span>
                                                                        <span style={{fontWeight: 'bolder'}} className='eachFoodPriceDiscount'>
                                                                            {eachFood.price * (1 - eachFood.discount / 100) / 1000} T
                                                                        </span>
                                                                    </div>
                                                                :
                                                                <span className='outOfStockTextHolder'>
                                                                    ناموجود
                                                                </span>
                                                        }
                                                        <div className='eachFoodImage'
                                                             style={{
                                                                 background: `url(${eachFood.thumbnail})`,
                                                                 backgroundSize: 'cover',
                                                                 backgroundPosition: 'center'
                                                             }}/>
                                                    </div>

                                                    <div className='w-100 justify-content-center d-flex'>
                                                        <div className='foodName'
                                                             style={{color: colors.foreground}}>{eachFood.persianName}</div>
                                                    </div>
                                                    {isInOrderList ?
                                                        <div
                                                            className={'foodNumberIncreaseDecreaseContainer  increase highBrightness d-flex flex-row justify-content-center  mt-3 animate__animated animate__fadeIn animate__faster'}
                                                        >
                                                            <div
                                                                style={{backgroundColor: colors.foreground + '50'}}
                                                                onClick={() => {
                                                                    this.handleDecreaseFoodNumber(eachFood['id'])
                                                                }}
                                                                className={'decreaseFoodNumberButtonContainer decrease d-flex justify-content-center align-items-center'}>
                                                                <div
                                                                    className="foodNumberIncreaseButton decrease d-flex justify-content-center align-items-center">
                                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                                         width="20" height="20"
                                                                         fill="black"
                                                                         className="bi bi-dash decrease"
                                                                         viewBox="0 0 16 16">
                                                                        <path className={'decrease'}
                                                                              d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                            <div
                                                                style={{backgroundColor: colors.foreground + '50'}}
                                                                className={'FoodNumberHolderContainer increase d-flex justify-content-center align-items-center'}>
                                                                               <span
                                                                                   className={'IranSans'}>{(this.props.orderList.filter(food => food.id === eachFood.id)[0] ? this.props.orderList.filter(food => food.id === eachFood.id)[0].number : 0)}</span>
                                                            </div>
                                                            <div
                                                                style={{backgroundColor: colors.foreground + '50'}}
                                                                onClick={() => {
                                                                    this.clickAnimation(eachFood['id'])
                                                                }}
                                                                className={'increaseFoodNumberButtonContainer increase d-flex justify-content-center align-items-center'}>
                                                                <div
                                                                    className="foodNumberIncreaseButton increase d-flex justify-content-center align-items-center">
                                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                                         width="20" height="20"
                                                                         fill="black"
                                                                         className="bi bi-plus increase "
                                                                         viewBox="0 0 16 16">
                                                                        <path className={'increase'}
                                                                              d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        :
                                                        <div className='w-100 d-flex justify-content-center'>
                                                            <div
                                                                className='foodDetails animate__animated animate__fadeInUp animate__faster'>{eachFood.details ? eachFood.details.join(' ') : ''}
                                                            </div>
                                                        </div>
                                                    }

                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </React.Fragment>
                }
                />
            </LoadingOverlay>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        orderList: store.rTempData.orderList,
        orderHistoryRestaurant: store.rUserInfo.orderHistoryRestaurant,
        isResOpen: store.rTempData.isResOpen,
    }
}

const mapDispatchToProps = () => {
    return {
        increaseFoodNumber: actions.increaseFoodNumber,
        decreaseFoodNumber: actions.decreaseFoodNumber,
        addFoodToOrders: actions.addFoodToOrders,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LikedFoods);