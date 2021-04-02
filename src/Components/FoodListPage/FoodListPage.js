import React, {Component} from 'react';
import {connect} from 'react-redux';
import './css/style.css';
import KeyboardArrowLeftRoundedIcon from '@material-ui/icons/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import * as RandomColor from '../../functions/RandomColor';
import {useSwipeable} from 'react-swipeable';
import * as actions from "../../stores/reduxStore/actions";
import tf from "./img/testFood.png";
import Comments from "../CommetnsSection/Comments";
import {Badge} from "@material-ui/core";
import foodsListAdaptor from "../../functions/foodsListAdaptor";
import * as requests from "../../ApiRequests/ApiRequests";
import LoadingOverlay from 'react-loading-overlay';
import {ClimbingBoxLoader} from "react-spinners";
import {divIcon} from "leaflet/dist/leaflet-src.esm";

export const Swipeable = ({children, style, ...props}) => {
    const handlers = useSwipeable(props);
    return (<div style={style} {...handlers}>{children}</div>);
}


class FoodListPage extends Component {

    constructor(props) {
        super(props);
        this.foodDetailsBlur = React.createRef();
        this.foodDetailsMain = React.createRef();
    }

    state = {
        foodList: <div/>,
        foodDetails: <div/>,
        allowToShow: false,
        firstPointerPosition: {
            x: 0,
            y: 0
        },
        foodDetailsAnimateClass: 'animate__fadeIn',
    }

    componentDidMount() {
        if (!(this.props.foodListConverted.hasOwnProperty('parts') && this.props.foodListConverted.parts.length > 0)) {
            this.getData()
        }
        var sum = 100;
        sum = sum * (1 - 0.6);
        let adad = 100;
        let adadvapanjdarsad = adad * (1 + 0.06)
    }

    dataArrive = (response) => {
        if (response.hasOwnProperty('statusCode') && response.statusCode === 200) {
            this.props.setFoodListConverted(foodsListAdaptor(response.data.foods))
        }
    }

    getData = () => {
        requests.getRestaurantInfo(this.dataArrive);
    }

    checkForMove = (e) => {
        let threshold = 8;
        if (e.pageX > this.state.firstPointerPosition.x + threshold || e.pageX < this.state.firstPointerPosition.x - threshold || e.pageY > this.state.firstPointerPosition.y + threshold || e.pageY < this.state.firstPointerPosition.y - threshold) {
            this.state.allowToShow = false;
        }
    }

    orderScripts = (foods_id, foodsList = this.props.foods) => {
        if(this.props.isResOpen) {
            for (let i = 0; i < foodsList.length; i++) {
                if (foodsList[i].foods_id === foods_id) {
                    // check if food was already in order list, increase its number
                    if (this.props.orderList.filter(food => food.foods_id === foods_id).length) {
                        this.props.increaseFoodNumber(foods_id);
                        return "increased number"
                    } else {
                        //  else add it to order list
                        let food = {...foodsList[i]};
                        food["number"] = 1;
                        food.price = parseInt(food.price)
                        food["totalPrice"] = food.price
                        this.props.addFoodToOrders(food)
                        return "food was added"
                    }
                }
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
    foodDetails = (foodInfo) => {
        this.setState({
            foodDetails: <div onContextMenu={(e) => {
                e.preventDefault()
            }} onClick={(e) => {
                if (e.target.classList.contains('detailsMainActive') || e.target.classList.contains('foodDetailsPrice') || e.target.classList.contains('timesOrderedContainer') || e.target.classList.contains('timesAndOrderTimeText') || e.target.classList.contains('foodDetailsTimesAndOrderTimeContainer') || e.target.classList.contains('foodDetailsDetails') || e.target.classList.contains('foodDetailsMain') || e.target.classList.contains('imageAndFoodNameContainer') || e.target.classList.contains('imageAndFoodNameContainer') || e.target.classList.contains('imageAndFoodNameContainer') || e.target.classList.contains('imageAndFoodNameContainer')) {
                    this.hideFoodDetails()
                    this.setState({
                        // foodDetails: <div/>,
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
                            // foodDetails: <div/>,
                            allowToShow: false
                        })
                    }} className=' foodDetailsCloseButton'>x
                    </div>
                    <div className='imageAndFoodNameContainer'>
                        <div style={{
                            background: `url(${tf})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }} className='foodDetailsImg'/>
                        {
                            foodInfo.status === 'in stock' ?
                                <div className='foodDetailsPrice'>{foodInfo.price / 1000} T</div>
                                :
                                <div className='foodDetailsPrice IranSans'>نا موجود</div>


                        }
                    </div>
                    <div className='foodDetailsDetails'>{foodInfo.details ? foodInfo.details.join(" / ") : ''}</div>
                    <div className='foodDetailsTimesAndOrderTimeContainer'>
                        <div className='timesOrderedContainer'>
                            <span className='timesAndOrderTimeText'> تعداد دفعات سفارش غذا</span>
                            <span>X {foodInfo.order_times}</span>
                        </div>
                        <div className='timesOrderedContainer'>
                            <span className='timesAndOrderTimeText mt-2'>زمان تقریبی آماده شدن</span>
                            <span className='rtl mt-2'>{foodInfo.delivery_time > 0 ?
                                <div><span>{foodInfo.delivery_time}</span> <span>دقیقه</span>
                                </div> : " والا به منم نگفتن :("}</span>
                        </div>
                    </div>

                    <Comments foodId={foodInfo.foods_id}/>

                </div>
            </div>,
            allowToShow: false
        })
    }


    previousPage = () => {
        let catIndex = this.props.foodListConverted.partsCategories[this.props.match.params["part"]].indexOf(this.props.match.params.category)
        if (catIndex !== 0)
            this.props.history.push("/category/" + this.props.match.params["part"] + "/" + this.props.foodListConverted.partsCategories[this.props.match.params["part"]][catIndex - 1]);
        else
            this.props.history.push("/category/" + this.props.match.params["part"] + "/" + this.props.foodListConverted.partsCategories[this.props.match.params["part"]][this.props.foodListConverted.partsCategories[this.props.match.params["part"]].length - 1]);
    }

    nextPage = () => {
        let catIndex = this.props.foodListConverted.partsCategories[this.props.match.params["part"]].indexOf(this.props.match.params.category)
        if (catIndex >= this.props.foodListConverted.partsCategories[this.props.match.params["part"]].length - 1)
            this.props.history.push("/category/" + this.props.match.params["part"] + "/" + this.props.foodListConverted.partsCategories[this.props.match.params["part"]][0]);
        else
            this.props.history.push("/category/" + this.props.match.params["part"] + "/" + this.props.foodListConverted.partsCategories[this.props.match.params["part"]][catIndex + 1]);
    }

    swipeRight = () => {
        if (!this.state.foodDetails.props.hasOwnProperty("children"))
            this.previousPage()
        this.setState({
            foodDetails: <div/>,
            allowToShow: false
        })
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
                active={!this.props.foodListConverted.hasOwnProperty('parts')}
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
                                               className='categoryPageSelectorText IranSans'>{this.props.foodListConverted.hasOwnProperty('parts') ? this.props.foodListConverted[this.props.match.params["part"]][this.props.match.params.category].persianName : ''}</div>
                                           <KeyboardArrowRightRoundedIcon onClick={this.nextPage}/>
                                       </div>
                                       <ArrowBackRoundedIcon className='invisible'/>
                                   </div>

                                   <div onScroll={() => {
                                       this.state.allowToShow = false
                                   }}
                                        className='foodListPageContainer'>
                                       <div className='heightFitContent'>
                                           {
                                               this.props.foodListConverted.hasOwnProperty('parts') ? this.props.foodListConverted[this.props.match.params["part"]][this.props.match.params.category].foodList.filter(eFood => eFood.status !== "deleted").map(eachFood => {
                                                   let colors = RandomColor.RandomColor(eachFood.foods_id);
                                                   let timeout;
                                                   return (
                                                       <div onContextMenu={(e) => {
                                                           e.preventDefault()
                                                       }}
                                                            key={eachFood['foods_id']}
                                                            className='foodListEachFoodContainer animate__animated animate__fadeInDown'
                                                            onClick={() => {
                                                                clearTimeout(timeout)
                                                                if (eachFood.status === 'in stock') {
                                                                    this.orderScripts(eachFood.foods_id);
                                                                }
                                                                this.state.allowToShow = false
                                                            }}
                                                            onTouchStart={(e) => {

                                                                this.state.firstPointerPosition.x = e.targetTouches[0].pageX
                                                                this.state.firstPointerPosition.y = e.targetTouches[0].pageY
                                                                this.state.allowToShow = true
                                                                timeout = setTimeout(() => {
                                                                    if (this.state.allowToShow) {
                                                                        this.foodDetails(eachFood);
                                                                    }
                                                                    this.state.allowToShow = false
                                                                    clearTimeout(timeout)
                                                                }, 400)

                                                            }}
                                                            onPointerMove={(e) => {
                                                                this.checkForMove(e)
                                                            }}
                                                            onTouchEnd={() => {
                                                                this.state.allowToShow = false
                                                            }}
                                                       >
                                                           <div className='foodListEachFood'

                                                                style={{backgroundColor: colors.background}}>
                                                               {
                                                                   // parseInt(eachFood.discount)>0?
                                                                   // <span  className={'discountPercentage'}>60%</span>
                                                                   // :
                                                                   // <div/>
                                                               }
                                                               <div className='priceAndImage'>
                                                                   {
                                                                       eachFood.status === 'in stock' ?
                                                                           eachFood.discount === 0 ?
                                                                               <span className='eachFoodPrice'>
                                                                                {eachFood.price / 1000} T
                                                                            </span>
                                                                               :
                                                                               <div
                                                                                   className={'d-flex flex-column justify-content-center'}>
                                                                                   <span style={{
                                                                                       textDecoration: 'line-through',
                                                                                       fontSize: '0.8rem',
                                                                                       lineHeight: '1.5rem'
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

                                                                   <Badge color={"primary"}
                                                                          badgeContent={(this.props.orderList.filter(food => food.foods_id === eachFood.foods_id)[0] ? this.props.orderList.filter(food => food.foods_id === eachFood.foods_id)[0].number : 0)}>
                                                                       <div className='eachFoodImage'
                                                                            style={{
                                                                                background: `url(${eachFood.thumbnail})`,
                                                                                backgroundSize: 'cover',
                                                                                backgroundPosition: 'center'
                                                                            }}/>
                                                                   </Badge>
                                                               </div>

                                                               <div className='w-100 justify-content-center d-flex'>
                                                                   <div className='foodName'
                                                                        style={{color: colors.foreground}}>{eachFood.name}</div>
                                                               </div>
                                                               <div className='w-100 d-flex justify-content-center'>
                                                                   <div
                                                                       className='foodDetails'>{eachFood.details ? eachFood.details.join(' ') : ''}</div>
                                                               </div>
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
        foods: store.rRestaurantInfo.foods,
        foodListConverted: store.rRestaurantInfo.foodListConverted,
        orderList: store.rTempData.orderList,
        trackingId: store.rTempData.trackingId,
        isResOpen: store.rTempData.isResOpen,
    }
}

const mapDispatchToProps = () => {
    return {
        increaseFoodNumber: actions.increaseFoodNumber,
        addFoodToOrders: actions.addFoodToOrders,
        setFoodListConverted: actions.setFoodListConverted

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FoodListPage);