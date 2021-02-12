import React, {Component} from 'react';
import {connect} from 'react-redux';
import './css/style.css'
import KeyboardArrowLeftRoundedIcon from '@material-ui/icons/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import * as RandomColor from '../../functions/RandomColor'
import {useSwipeable} from 'react-swipeable';
import * as actions from "../../stores/reduxStore/actions";
import moreOrderedFoods from "../../functions/moreOrderedFoods";
import {Badge} from "@material-ui/core";

export const Swipeable = ({children, style, ...props}) => {
    const handlers = useSwipeable(props);
    return (<div style={style} {...handlers}>{children}</div>);
}

function convertFoodIdToFoodInfo (foodsIdList, foodsList){
    let result = [];
    foodsList.map(eFood=>{
        foodsIdList.map(eFoodId=>{
            if(eFoodId === eFood.foods_id)
                result.push(eFood)
        })
    })
    return result
}


class LikedFoods extends Component {
    state = {
        foodsList:convertFoodIdToFoodInfo(moreOrderedFoods(this.props.orderHistoryRestaurant, this.props.foods), this.props.foods),
    }

    giveMyNumber = (fId)=>{
        return this.props.orderList.filter(food=> food.foods_id === fId)[0]? this.props.orderList.filter(food=> food.foods_id === fId)[0].number:0
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


    createFoodList = () => {
        return this.state.foodsList.map(eachFood => {
            let colors = RandomColor.RandomColor()
            return (
                <div  key={eachFood['foods_id']}
                     className='foodListEachFoodContainer animate__animated animate__fadeInDown'
                     onClick={() => {
                         if (eachFood.status === 'in stock') {
                             this.orderScripts(eachFood.foods_id);
                         }
                     }}>
                    <div className='foodListEachFood' style={{backgroundColor: colors.background}}>
                        <div className='priceAndImage'>
                            <span className='eachFoodPrice'>
                                {eachFood.price / 1000} T
                            </span>
                            <Badge color={"primary"} badgeContent={this.giveMyNumber(eachFood.foods_id)}>

                            <div className='eachFoodImage'
                                 style={{
                                     background: `url(${eachFood.thumbnail})`,
                                     backgroundSize: 'cover',
                                     backgroundPosition: 'center'
                                 }}/>
                            </Badge>
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
    }


    swipeRight = () => {

    }

    swipeLeft = () => {

    }

    handleBack = () => {
        this.props.history.goBack();
    }


    render() {
        return (
            <Swipeable style={{height: "100%"}} onSwipedRight={this.swipeRight} onSwipedLeft={this.swipeLeft} children={
                <React.Fragment>
                    <div
                        className='foodListPageHeader pl-2 pr-2 pt-2 d-flex flex-row justify-content-between align-items-center'>
                        <ArrowBackRoundedIcon onClick={this.handleBack}/>
                        <div className='headerPageSelector text-center d-flex justify-content-around flex-row'>
                            <KeyboardArrowLeftRoundedIcon/>
                            <div
                                className='categoryPageSelectorText IranSans'>دوس داشتنی ترین ها</div>
                            <KeyboardArrowRightRoundedIcon/>
                        </div>
                        <ArrowBackRoundedIcon className='invisible'/>
                    </div>

                    <div className='foodListPageContainer'>
                        <div className='heightFitContent'>
                            {this.createFoodList()}
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
        orderList: store.rTempData.orderList,
        trackingId: store.rTempData.trackingId,
        orderHistoryRestaurant: store.rUserInfo.orderHistoryRestaurant
    }
}

const mapDispatchToProps = () => {
    return {
        increaseFoodNumber: actions.increaseFoodNumber,
        addFoodToOrders: actions.addFoodToOrders,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LikedFoods);