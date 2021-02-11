import React, {Component} from 'react';
import {connect} from 'react-redux';
import './css/style.css'
import KeyboardArrowLeftRoundedIcon from '@material-ui/icons/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import * as RandomColor from '../../functions/RandomColor'
import {useSwipeable} from 'react-swipeable';
import * as actions from "../../stores/reduxStore/actions";
import tf from "./img/testFood.png";
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

export const Swipeable = ({children, style, ...props}) => {
    const handlers = useSwipeable(props);
    return (<div style={style} {...handlers}>{children}</div>);
}


class FoodListPage extends Component {
    state = {
        foodList: <div/>,
        foodDetails: <div/>,
        allowToShow: false,
        allowToFillComments: true,
        commentsFilled: false,
        commentInputClass: ' d-none',
        canUserComment: false
    }

    componentDidMount() {
        if (!(this.props.foodListConverted.hasOwnProperty('parts') && this.props.foodListConverted.parts.length > 0)) {
            this.props.history.push("/");
            return;
        }
        this.createFoodList()
    }

    orderScripts = (foods_id, foodsList = this.props.foods) => {
        if (this.props.trackingId < 1000) {
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
    sendComment = (e) => {
        e.value = ''
    }
    enableComment = () => {
        document.getElementsByClassName('newCommentInput')[0].classList.remove('d-none')
        document.getElementsByClassName('sendCommentButton')[0].classList.remove('d-none')
    }
    disableComment = () => {
        document.getElementsByClassName('newCommentInput')[0].classList.add('d-none')
        document.getElementsByClassName('sendCommentButton')[0].classList.add('d-none')
    }

    commentsFullPage = () => {
        if (this.state.canUserComment)
            this.enableComment()

        document.getElementsByClassName('foodDetailsComments')[0].style.height = '100%'
        this.state.commentsFilled = true
    }
    commentsMiniPage = () => {
        this.disableComment()
        document.getElementsByClassName('foodDetailsComments')[0].style.height = '45%'
        this.state.commentsFilled = false
    }

    foodDetails = (active) => {
        if (active) {
            this.setState({
                foodDetails: <div onContextMenu={(e) => {
                    e.preventDefault()
                }} onClick={(e) => {
                    if (e.target.classList.contains('detailsMainActive') || e.target.classList.contains('foodDetailsMain')) {
                        this.setState({
                            foodDetails: <div/>
                        })
                    }

                }} className='detailsMainActive animate__animated animate__fadeIn'>
                    <div onClick={(e) => {
                        e.preventDefault()
                    }} className={' foodDetailsMain animate__animated animate__fadeIn'}>
                        <div className='imageAndFoodNameContainer'>
                            <div style={{
                                background: `url(${tf})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat'
                            }} className='foodDetailsImg'/>
                            <div className='foodDetailsPrice'>32 T</div>
                        </div>
                        <div className='foodDetailsDetails'>خمیر مخصوص ایتالیایی/فلفل دلمه ای/قارچ/پنیرموزارلا خمیر
                            مخصوص ایتالیایی/فلفل
                            دلمه ای/قارچ/پنیرموزارلا
                        </div>
                        <div className='foodDetailsTimesAndOrderTimeContainer'>
                            <div className='timesOrderedContainer'>
                                <span className='timesAndOrderTimeText'> تعداد دفعات سفارش غذا</span>
                                <span>X 25</span>
                            </div>
                            <div className='timesOrderedContainer'>
                                <span className='timesAndOrderTimeText mt-2'>زمان تقریبی آماده شدن</span>
                                <span className='rtl mt-2'><span>25</span> دقیقه </span>
                            </div>
                        </div>

                        <div className='foodDetailsComments'>
                            {this.state.canUserComment ?
                                <div onClick={() => {
                                    this.commentsFullPage()
                                }}
                                     className='newCommentContainer'>
                                    <span className='newCommentTextContainer'>نوشتن نظر</span>
                                    <div className='newCommentPenContainer'>
                                        <CreateOutlinedIcon fontSize={"small"}/>
                                    </div>
                                </div>

                                :
                                <div className='cannotComment'>
                                    <span className='newCommentTextContainer'>هنوز نمیتونی نظری بنویسی</span>
                                    <div className='newCommentPenContainer'>
                                        <HelpOutlineIcon fontSize={"small"}/>
                                    </div>
                                </div>

                            }

                            <Swipeable onSwipedUp={() => {
                                this.commentsFullPage()
                            }}
                                       onSwipedDown={() => {
                                           this.commentsMiniPage()

                                       }}

                                       children={
                                           <div onClick={() => {
                                               this.state.commentsFilled ? this.commentsMiniPage() : this.commentsFullPage()
                                           }
                                           } className='w-100 littlePinHolder'>
                                               <div className='littleCommentPin'/>
                                           </div>
                                       }/>
                            <div onScroll={(e) => {
                            }} className='mainCommentContainer'>
                                <textarea className={'newCommentInput ' + this.state.commentInputClass}/>
                                <span className={'sendCommentButton ' + this.state.commentInputClass} onClick={(e) => {
                                    this.sendComment(e.target)
                                }}>ارسال</span>
                                <div className='eachComment'>
                                    <span className='eachCommentName'> محمد کریمدادی</span>
                                    <span className='eachCommentTime'>10/5</span>
                                    <span
                                        className='eachCommentContent'>غدا خوشمزه بود ولی احساس میشد کمی نپخته است</span>
                                </div>

                                <div className='eachComment'>
                                    <span className='eachCommentName'>فاطمه سجادیان</span>
                                    <span className='eachCommentTime'>10/6</span>
                                    <span
                                        className='eachCommentContent'>خیلی خوب بود مخصوصا اون پیاز داغای روی غدا</span>
                                </div>

                                <div className='eachComment'>
                                    <span className='eachCommentName'>محمد مهدی محبی</span>
                                    <span className='eachCommentTime'>10/6</span>
                                    <span className='eachCommentContent'>غدا بد نبود میتونست بهتر باشه اگه یکم بیشتر بهش زرد جوبه اضافه میکردن</span>
                                </div>
                                <div className='eachComment'>
                                    <span className='eachCommentName'> محمد کریمدادی</span>
                                    <span className='eachCommentTime'>10/5</span>
                                    <span
                                        className='eachCommentContent'>غدا خوشمزه بود ولی احساس میشد کمی نپخته است</span>
                                </div>

                                <div className='eachComment'>
                                    <span className='eachCommentName'>فاطمه سجادیان</span>
                                    <span className='eachCommentTime'>10/6</span>
                                    <span
                                        className='eachCommentContent'>خیلی خوب بود مخصوصا اون پیاز داغای روی غدا</span>
                                </div>

                                <div className='eachComment'>
                                    <span className='eachCommentName'>محمد مهدی محبی</span>
                                    <span className='eachCommentTime'>10/6</span>
                                    <span className='eachCommentContent'>غدا بد نبود میتونست بهتر باشه اگه یکم بیشتر بهش زرد جوبه اضافه میکردن</span>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            })
        }
    }

    createFoodList = () => {
        let foodList = this.props.foodListConverted[this.props.match.params["part"]][this.props.match.params.category].foodList.map(eachFood => {
            let colors = RandomColor.RandomColor()
            return (
                <div onContextMenu={(e) => {
                    e.preventDefault()
                }} key={eachFood['foods_id']}
                     className='foodListEachFoodContainer animate__animated animate__fadeInDown'
                     onClick={() => {
                         if (eachFood.status === 'in stock') {
                             this.orderScripts(eachFood.foods_id);
                         }
                     }}
                     onTouchStart={() => {
                         this.state.allowToShow = true
                         setTimeout(() => {
                             if (this.state.allowToShow) {
                                 this.foodDetails(true)
                             }
                         }, 1000)

                     }}
                     onTouchEnd={() => {
                         this.state.allowToShow = false
                     }}
                >
                    <div className='foodListEachFood' style={{backgroundColor: colors.background}}>
                        <div className='priceAndImage'>
                            <span className='eachFoodPrice'>
                                {eachFood.price / 1000} T
                            </span>
                            <div className='eachFoodImage'
                                 style={{
                                     background: `url(${eachFood.thumbnail})`,
                                     backgroundSize: 'cover',
                                     backgroundPosition: 'center'
                                 }}/>
                        </div>

                        <div className='w-100 justify-content-center d-flex'>
                            <div className='foodName' style={{color: colors.foreground}}>{eachFood.name}</div>
                        </div>
                        <div className='w-100 d-flex justify-content-center'>
                            <div className='foodDetails'>{eachFood.details.join(' ')}</div>
                        </div>
                    </div>
                </div>
            )
        })
        this.setState({
            foodList: foodList
        })
    }

    previousPage = () => {
        let catIndex = this.props.foodListConverted.partsCategories[this.props.match.params["part"]].indexOf(this.props.match.params.category)
        if (catIndex !== 0)
            this.props.history.push("/category/" + this.props.match.params["part"] + "/" + this.props.foodListConverted.partsCategories[this.props.match.params["part"]][catIndex - 1]);
        else
            this.props.history.push("/category/" + this.props.match.params["part"] + "/" + this.props.foodListConverted.partsCategories[this.props.match.params["part"]][this.props.foodListConverted.partsCategories[this.props.match.params["part"]].length - 1]);

        this.createFoodList()
    }

    nextPage = () => {
        let catIndex = this.props.foodListConverted.partsCategories[this.props.match.params["part"]].indexOf(this.props.match.params.category)
        if (catIndex >= this.props.foodListConverted.partsCategories[this.props.match.params["part"]].length - 1)
            this.props.history.push("/category/" + this.props.match.params["part"] + "/" + this.props.foodListConverted.partsCategories[this.props.match.params["part"]][0]);
        else
            this.props.history.push("/category/" + this.props.match.params["part"] + "/" + this.props.foodListConverted.partsCategories[this.props.match.params["part"]][catIndex + 1]);

        this.createFoodList()
    }

    swipeRight = () => {
        this.previousPage()
        this.state.allowToShow = false
    }

    swipeLeft = () => {
        this.nextPage()
        this.state.allowToShow = false
    }

    handleBack = () => {
        this.props.history.push("/category/" + this.props.match.params["part"])
    }


    render() {
        return (
            <Swipeable style={{height: "100%"}} onSwipedRight={this.swipeRight} onSwipedLeft={this.swipeLeft} children={
                <React.Fragment>
                    {this.state.foodDetails}
                    <div
                        className='foodListPageHeader pl-2 pr-2 pt-2 d-flex flex-row justify-content-between align-items-center'>
                        <ArrowBackRoundedIcon onClick={this.handleBack}/>
                        <div className='headerPageSelector text-center d-flex justify-content-around flex-row'>
                            <KeyboardArrowLeftRoundedIcon onClick={this.previousPage}/>
                            <div
                                className='categoryPageSelectorText IranSans'>{this.props.foodListConverted[this.props.match.params["part"]][this.props.match.params.category].persianName}</div>
                            <KeyboardArrowRightRoundedIcon onClick={this.nextPage}/>
                        </div>
                        <ArrowBackRoundedIcon className='invisible'/>
                    </div>

                    <div onScroll={
                        () => {
                            this.state.allowToShow = false
                        }
                    }
                         className='foodListPageContainer'>
                        <div className='heightFitContent'>
                            {this.state.foodList}
                        </div>

                    </div>

                </React.Fragment>
            }/>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        foods: store.rRestaurantInfo.foods,
        foodListConverted: store.rRestaurantInfo.foodListConverted,
        orderList: store.rTempData.orderList,
        trackingId: store.rTempData.trackingId,
    }
}

const mapDispatchToProps = () => {
    return {
        increaseFoodNumber: actions.increaseFoodNumber,
        addFoodToOrders: actions.addFoodToOrders,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FoodListPage);