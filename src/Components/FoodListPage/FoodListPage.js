import React, {Component} from 'react';
import {connect} from 'react-redux';
import './css/style.css'
import KeyboardArrowLeftRoundedIcon from '@material-ui/icons/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';


class FoodListPage extends Component {

    state={
        foodList:<div></div>,
    }
    componentDidMount() {
        let foodList= this.props.foodListConverted[this.props.match.params.part.toString()][this.props.match.params.category].foodList.map(eachFood=>{
            return(
                <div className='foodListEachFoodContainer'>
                    <div className='foodListEachFood'>
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
                        <div className='foodName'>{eachFood.name}</div>
                        <div className='w-100 d-flex justify-content-center'>
                            <div className='foodDetails'>{eachFood.details}</div>
                        </div>
                    </div>
                </div>
            )
        })
        this.setState({
            foodList:foodList
        })
    }

    render() {
        return (
            <React.Fragment>
                <div
                    className='foodListPageHeader pl-2 pr-2 pt-2 d-flex flex-row justify-content-between align-items-center'>
                    <ArrowBackRoundedIcon/>
                    <div className='headerPageSelector text-center d-flex justify-content-around flex-row'>
                        <KeyboardArrowLeftRoundedIcon/>
                        <div className='categoryPageSelectorText IranSans'>رستوران</div>
                        <KeyboardArrowRightRoundedIcon/>
                    </div>
                    <ArrowBackRoundedIcon className='invisible'/>
                </div>

                <div className='foodListPageContainer'>
                    <div className='heightFitContent'>
                        {this.state.foodList}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        foodListConverted: store.rRestaurantInfo.foodListConverted
    }
}

const mapDispatchToProps = () => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(FoodListPage);