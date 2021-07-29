import React, {Component} from 'react';
import {connect} from 'react-redux';
import './css/style.css';
import KeyboardArrowLeftRoundedIcon from '@material-ui/icons/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import {useSwipeable} from 'react-swipeable';
import Comments from "../CommetnsSection/Comments";
import LoadingOverlay from 'react-loading-overlay';
import {ClimbingBoxLoader} from "react-spinners";
import * as requests from "../../ApiRequests/ApiRequests";
import * as ls from "../../stores/localStorage/localStorage"
import * as actions from "../../stores/reduxStore/actions";
import * as RandomColor from '../../functions/RandomColor';

export const Swipeable = ({children, style, ...props}) => {
    const handlers = useSwipeable(props);
    return (<div style={style} {...handlers}>{children}</div>);
}


class FoodListPage extends Component {

    state = {
        foodList: ls.getLSResFoods(),
        catsFullInfo: ls.getLSResFullInfoCategories(),
        foodDetails: <div/>,
        allowToShow: false,
        firstPointerPosition: {
            x: 0,
            y: 0
        },
        foodDetailsAnimateClass: 'animate__fadeIn',
    }

    constructor(props) {
        super(props);
        this.foodDetailsBlur = React.createRef();
        this.foodDetailsMain = React.createRef();
    }

    componentDidMount() {
        if (!(this.state.catsFullInfo.hasOwnProperty('parts') && this.state.catsFullInfo.parts.length > 0)) {
            this.getData()
            this.props.history.push("/main");
        }
    }

    dataArrive = (response) => {
        if (response.hasOwnProperty('statusCode') && response.statusCode === 200) {
            ls.setLSResFoods(response.data)
        }
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
    pressAnimation = (id) => {
        let element = document.getElementById(id);
        if (element) {
            element.style.transform = 'scale(0.9)';
        }
    }
    releaseAnimation = (id) => {
        let element = document.getElementById(id);
        if (element) {
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 200)
        }
    }


    getData = () => {
        requests.getRestaurantFoods(this.dataArrive);
    }

    checkForMove = (e) => {
        let threshold = 8;
        if (e.pageX > this.state.firstPointerPosition.x + threshold || e.pageX < this.state.firstPointerPosition.x - threshold || e.pageY > this.state.firstPointerPosition.y + threshold || e.pageY < this.state.firstPointerPosition.y - threshold) {
            this.setState({allowToShow: false})
        }
    }

    orderScripts = (id, foodsList = ls.getLSResFoods()) => {
        if (this.props.isResOpen) {
            if (this.props.orderList.filter(food => food.id === id).length) {
                this.props.increaseFoodNumber(id);
            } else {
                //  else add it to order list
                let food = {...foodsList[id]};
                food["number"] = 1;
                food["totalPrice"] = (food.price - 0) * (1 - food.discount / 100)
                this.props.addFoodToOrders(food)
            }
        }
    }

    hideFoodDetails = () => {
        if (this.foodDetailsMain.current.classList.contains('animate__fadeIn')) {
            this.foodDetailsMain.current.classList.remove('animate__fadeIn')
            this.foodDetailsMain.current.classList.add('animate__fadeOut')
        }

        if (this.foodDetailsBlur.current.classList.contains('animate__fadeIn')) {
            this.foodDetailsBlur.current.classList.remove('animate__fadeIn')
            this.foodDetailsBlur.current.classList.add('animate__fadeOut')
        }
        setTimeout(
            () => {
                this.setState({
                    foodDetails: <div/>
                })
            }
            , 200)
    }


    maxFontSize = 1.8;
    baseFontSize = 20;
    foodDetails = (foodInfo) => {
        this.setState({
            foodDetails: <div onContextMenu={(e) => {
                e.preventDefault()
            }} onClick={(e) => {
                if (e.target.classList.contains('detailsMainActive') || e.target.classList.contains('foodDetailsPrice') || e.target.classList.contains('timesOrderedContainer') || e.target.classList.contains('timesAndOrderTimeText') || e.target.classList.contains('foodDetailsTimesAndOrderTimeContainer') || e.target.classList.contains('foodDetailsDetails') || e.target.classList.contains('foodDetailsMain') || e.target.classList.contains('imageAndFoodNameContainer') || e.target.classList.contains('imageAndFoodNameContainer') || e.target.classList.contains('imageAndFoodNameContainer') || e.target.classList.contains('imageAndFoodNameContainer')) {
                    this.hideFoodDetails()
                    this.setState({
                        allowToShow: false
                    })
                }
            }} ref={this.foodDetailsBlur}
                              className={'detailsMainActive animate__animated animateFast ' + this.state.foodDetailsAnimateClass}>

                <div onClick={(e) => {
                    e.preventDefault()
                }} ref={this.foodDetailsMain}
                     className={' foodDetailsMain animate__animated  animateFast ' + this.state.foodDetailsAnimateClass}>
                    <div onClick={() => {
                        this.hideFoodDetails()
                        this.setState({
                            allowToShow: false
                        })
                    }} className=' foodDetailsCloseButton'>x
                    </div>
                    <div className='imageAndFoodNameContainer'>
                        <div className={'d-flex flex-row-reverse align-items-center'}>
                            <div style={{
                                background: `url(` + foodInfo.thumbnail + `)`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat'
                            }} className='foodDetailsImg'/>
                            <div id={'food-name-span'} className={'IranSans mr-3'}
                                 style={{fontSize: (((this.baseFontSize / foodInfo['persianName'].length) > this.maxFontSize ? this.maxFontSize : (this.baseFontSize / foodInfo['persianName'].length)) + 'rem')}}>{(foodInfo['persianName'])}</div>
                        </div>
                        {
                            foodInfo.status === 'inStock' ?
                                foodInfo.discount === 0 ?
                                    <span className='foodDetailsPrice pl-4'>
                                        {foodInfo.price / 1000} T
                                    </span>
                                    :
                                    <div

                                        className={'d-flex flex-column justify-content-center pl-4'}>
                                        <span style={{
                                            textDecoration: 'line-through',
                                            fontSize: '0.6rem',
                                            lineHeight: '1.5rem',
                                            color: '#787878'
                                        }} className='foodDetailsPrice'>
                                            {foodInfo.price / 1000} T
                                        </span>
                                        <span style={{fontWeight: 'bolder'}}
                                              className='eachFoodPriceDiscount'>
                                            {foodInfo.price * (1 - foodInfo.discount / 100) / 1000} T
                                        </span>
                                    </div>

                                :
                                <span className='foodDetailsPrice IranSans pl-4'>
                                    ناموجود
                                </span>
                        }

                    </div>
                    <div className='foodDetailsDetails'>{foodInfo.details ? foodInfo.details.join(" / ") : ''}</div>
                    <div className='foodDetailsTimesAndOrderTimeContainer'>
                        <div className='timesOrderedContainer'>
                            <span className='timesAndOrderTimeText'> تعداد دفعات سفارش غذا</span>
                            <span>X {foodInfo.orderTimes}</span>
                        </div>
                        <div className='timesOrderedContainer'>
                            <span className='timesAndOrderTimeText mt-2'>زمان تقریبی آماده شدن</span>
                            <span className='rtl mt-2'>{foodInfo.deliveryTime > 0 ?
                                <div><span>{foodInfo.deliveryTime}</span> <span>دقیقه</span>
                                </div> : " والا به منم نگفتن :("}</span>
                        </div>
                    </div>
                    {ls.getLSResInfo().hasOwnProperty("permissions") && ls.getLSResInfo()["permissions"].indexOf("comment") !== -1 ?
                        <Comments foodId={foodInfo.id}/>
                        :
                        null}


                </div>
            </div>,
            allowToShow: false
        })


    }


    previousPage = () => {
        let catIndex = this.state.catsFullInfo["partsCategories"][this.props.match.params["part"]].indexOf(this.props.match.params.category)
        if (catIndex !== 0)
            this.props.history.push("/category/" + this.props.match.params["part"] + "/" + this.state.catsFullInfo["partsCategories"][this.props.match.params["part"]][catIndex - 1]);
        else
            this.props.history.push("/category/" + this.props.match.params["part"] + "/" + this.state.catsFullInfo["partsCategories"][this.props.match.params["part"]][this.state.catsFullInfo["partsCategories"][this.props.match.params["part"]].length - 1]);
    }

    nextPage = () => {
        let catIndex = this.state.catsFullInfo["partsCategories"][this.props.match.params["part"]].indexOf(this.props.match.params.category)
        if (catIndex >= this.state.catsFullInfo["partsCategories"][this.props.match.params["part"]].length - 1)
            this.props.history.push("/category/" + this.props.match.params["part"] + "/" + this.state.catsFullInfo["partsCategories"][this.props.match.params["part"]][0]);
        else
            this.props.history.push("/category/" + this.props.match.params["part"] + "/" + this.state.catsFullInfo["partsCategories"][this.props.match.params["part"]][catIndex + 1]);
    }

    swipeRight = () => {
        if (!this.state.foodDetails.props.hasOwnProperty("children"))
            this.previousPage()
        this.setState({
            foodDetails: <div/>,
            allowToShow: false
        })
    }

    handleDecreaseFoodNumber = (foodId) => {
        let selectedFood = this.props.orderList.filter(food => food.id === foodId)[0];
        if (selectedFood.hasOwnProperty("number")) {
            if (selectedFood.number < 2) {
                this.props.deleteFoodFromOrders(foodId)
            } else {
                this.props.decreaseFoodNumber(foodId)
            }
        }
    }
    handleIncreaseFoodNumber = (foodId) => {
        this.orderScripts(foodId)
    }

    swipeLeft = () => {
        if (!this.state.foodDetails.props.hasOwnProperty("children"))
            this.nextPage()
        this.setState({
            foodDetails: <div/>,
            allowToShow: false
        })
    }

    handleBack = () => {
        this.props.history.push("/category/" + this.props.match.params["part"])
    }


    render() {
        return (
            <LoadingOverlay
                active={!this.state.catsFullInfo.hasOwnProperty('parts')}
                spinner={<ClimbingBoxLoader color={'white'}/>}
                text='وایسا چک کنم ببینم چی چیا داریم'
            >
                <Swipeable style={{height: "100%"}} onSwipedRight={this.swipeRight} onSwipedLeft={this.swipeLeft}
                           delta={60}
                           children={
                               <React.Fragment>
                                   {this.state.foodDetails}
                                   <div
                                       className='foodListPageHeader pl-2 pr-2 pt-2 d-flex flex-row justify-content-between align-items-center'>
                                       <ArrowBackRoundedIcon onClick={this.handleBack}/>
                                       <div
                                           className='headerPageSelector text-center d-flex justify-content-around flex-row'>
                                           <KeyboardArrowLeftRoundedIcon onClick={this.previousPage}/>
                                           <div
                                               className='categoryPageSelectorText IranSans'>{this.state.catsFullInfo.hasOwnProperty('parts') ? this.state.catsFullInfo[this.props.match.params["part"]][this.props.match.params.category].persianName : ''}</div>
                                           <KeyboardArrowRightRoundedIcon onClick={this.nextPage}/>
                                       </div>
                                       <ArrowBackRoundedIcon className='invisible'/>
                                   </div>

                                   <div onScroll={() => {
                                       this.setState({allowToShow: false})
                                   }}
                                        className='foodListPageContainer'>
                                       <div className='heightFitContent'>
                                           {
                                               this.state.catsFullInfo.hasOwnProperty('parts') && this.state.catsFullInfo.parts.length > 0 ? this.state.catsFullInfo[this.props.match.params["part"]][this.props.match.params.category].foodList.map(foodId => {
                                                   let eachFood = this.state.foodList[foodId];
                                                   let colors = RandomColor.RandomColor(eachFood.id);
                                                   let timeout;
                                                   let isInOrderList = false;
                                                   if ((typeof this.props.orderList.filter(food => food.id === eachFood.id)[0] !== "undefined")) {
                                                       isInOrderList = true;
                                                   }
                                                   return (
                                                       <div onContextMenu={(e) => {
                                                           e.preventDefault()
                                                       }}
                                                            key={eachFood['id']}
                                                            className='foodListEachFoodContainer animate__animated animate__fadeInDown'
                                                            onClick={(e) => {
                                                                clearTimeout(timeout)
                                                                if (eachFood.status === 'inStock') {
                                                                    // if (!isInOrderList) {
                                                                    //     this.orderScripts(eachFood.id);
                                                                    // }
                                                                }
                                                                this.setState({allowToShow: false})
                                                                if (!e.target.classList.contains('decrease') && (eachFood.status === 'inStock')) {
                                                                    this.orderScripts(eachFood.id);
                                                                    if ((eachFood.status === 'in stock' || eachFood.status === 'inStock') && !e.target.classList.contains('increase') && !e.target.classList.contains('decrease')) {
                                                                        this.clickAnimation('food' + eachFood['id'])
                                                                    }
                                                                }


                                                            }}

                                                            onTouchStart={(e) => {
                                                                if ((eachFood.status === 'in stock' || eachFood.status === 'inStock') && !e.target.classList.contains('increase') && !e.target.classList.contains('decrease')) {
                                                                    this.pressAnimation('food' + eachFood['id'])
                                                                }
                                                                this.setState({
                                                                    firstPointerPosition: {
                                                                        x: e.targetTouches[0].pageX,
                                                                        y: e.targetTouches[0].pageY
                                                                    }
                                                                })
                                                                this.setState({allowToShow: true})
                                                                timeout = setTimeout(() => {
                                                                    if (this.state.allowToShow) {
                                                                        this.foodDetails(eachFood);
                                                                    }
                                                                    this.setState({allowToShow: false})
                                                                    clearTimeout(timeout)
                                                                }, 400)

                                                            }}

                                                            onPointerMove={(e) => {
                                                                this.checkForMove(e)
                                                            }}
                                                            onTouchEnd={() => {
                                                                this.setState({allowToShow: false})
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
                                                                       (eachFood.status === 'in stock' || eachFood.status === 'inStock') ?
                                                                           eachFood.discount === 0 ?
                                                                               <span className='eachFoodPrice '>
                                                                                {eachFood.price / 1000} T
                                                                            </span>
                                                                               :
                                                                               <div

                                                                                   className={'d-flex flex-column justify-content-center'}>
                                                                                   <span style={{
                                                                                       textDecoration: 'line-through',
                                                                                       fontSize: '0.6rem',
                                                                                       lineHeight: '1.5rem',
                                                                                       color: '#787878'
                                                                                   }} className='eachFoodPrice'>
                                                                                {eachFood.price / 1000} T
                                                                            </span>
                                                                                   <span style={{fontWeight: 'bolder'}}
                                                                                         className='eachFoodPriceDiscount'>
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
                                                                       className={'foodNumberIncreaseDecreaseContainer  increase highBrightness d-flex flex-row justify-content-center  mt-3 animate__animated animate__fadeIn animate__faster'}>
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
                                               }) : ''
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
        trackingId: store.rTempData.trackingId,
        isResOpen: store.rTempData.isResOpen,
    }
}

const mapDispatchToProps = () => {
    return {
        increaseFoodNumber: actions.increaseFoodNumber,
        decreaseFoodNumber: actions.decreaseFoodNumber,
        addFoodToOrders: actions.addFoodToOrders,
        deleteFoodFromOrders: actions.deleteFoodFromOrders,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FoodListPage);