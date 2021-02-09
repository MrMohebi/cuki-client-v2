import React from 'react';
import {connect} from 'react-redux';
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import './css/style.css'
import * as randomColors from '../../functions/RandomColor'



class OpenOrdersHistory extends React.Component {
    state = {
        foods:<div/>,
    }

    componentDidMount() {
        this.createFoods()
    }

    createFoods = ()=>{
        let testFoods = [
            {name:'',price:123},
        ]
        let allFoods = testFoods.map(eFood =>{
                let color = randomColors.RandomColor()
                console.log(color)
                return(
                    <div className='eachOrderDetailsEachFoodContainer'>
                        <div className='eachOrderDetailsEachFood' style={{color:color.foreground,backgroundColor:color.background}}>
                            <div className='priceAndImage'>
                                    <span className='EachOrderDetailsEachFoodPrice'>
                                        25 T
                                    </span>
                                <div className='EachOrderDetailsEachFoodImage'
                                     style={{
                                         background: `url(https://dl.cuki.ir/sampleAssets/sampleThumbnail_96x96.png)`,
                                         backgroundSize: 'cover',
                                         backgroundPosition: 'center'
                                     }}/>
                            </div>
                            <span className='eachOrderDetailsFoodNumber text-left pl-3'>x2</span>
                            <div className='w-100 justify-content-center d-flex'>
                                <div className='EachOrderDetailsEachFoodName'>اسپشیالینو</div>
                            </div>
                            <div className='w-100 d-flex justify-content-center'>
                                <div className='EachOrderDetailsFoodDetails'>چوب درخت ماکارونی</div>
                            </div>
                        </div>
                    </div>
                )
            }
        )
        this.setState({
            foods:allFoods
        })
    }
    render() {
        return (
            <React.Fragment>
                <div
                    className='categoryPageHeader pl-2 pr-2 pt-2 d-flex flex-row justify-content-between align-items-center'>
                    <ArrowBackRoundedIcon/>
                    <div className='text-center d-flex justify-content-around flex-row'>
                        <div className='IranSans'>پروفایل</div>
                    </div>
                    <ArrowBackRoundedIcon className='invisible'/>
                </div>

                <div className='eachOrderDetailsPageContainer'>
                    <div className='eachOrderDetailsFoodsContainer'>
                        <div className='d-flex flex-row w-100 justify-content-around profileHistoryTextHeader'>
                            <span className='IranSans '>8/21</span>
                            <span className='IranSans '>22:43</span>
                        </div>
                        <div className='d-flex flex-wrap justify-content-between'>
                            {this.state.foods}
                        </div>





                    </div>
                    <div className='mt-3 IranSans d-flex w-100 justify-content-between pr-4 pl-4'>
                        <span className=''>230 T</span>
                        <span className='eachOrderDetailsTotalHolder'>جمع نهایی</span>
                    </div>

                    <div className='mt-2 IranSans d-flex w-100 justify-content-between pr-4 pl-4'>
                        <span className=''>74 T</span>
                        <span className='eachOrderDetailsTotalHolder'>پرداختی شما</span>
                    </div>
                    <div className='mt-2 IranSans d-flex w-100 justify-content-between pr-4 pl-4'>
                        <span className=''>105</span>
                        <span className='eachOrderDetailsTotalHolder'>شماره میز</span>
                    </div>
                    <div className='mt-2 IranSans d-flex w-100 justify-content-between pr-4 pl-4'>
                        <span className=''>85421037</span>
                        <span className='eachOrderDetailsTotalHolder'>شماره سفارش</span>
                    </div>
                    <div className='openOrderHistorySubmit mt-2' onClick={this.handleSubmit}>
                        <span>پرداخت</span>
                    </div>


                </div>
            </React.Fragment>

        );
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

export default connect(mapStateToProps, mapDispatchToProps)(OpenOrdersHistory);