import React, {Component} from 'react';
import {connect} from 'react-redux';
import './css/style.css'
import KeyboardArrowLeftRoundedIcon from '@material-ui/icons/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';


class FoodListPage extends Component {
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


                        <div className='foodListEachFoodContainer'>
                            <div className='foodListEachFood'>
                                <div className='priceAndImage'>
                                    <span className='eachFoodPrice'>
                                        23T
                                    </span>
                                    <div className='eachFoodImage'
                                         style={{
                                             background: 'url(/img/tempImages/foodTest.png)',
                                             backgroundSize: 'cover',
                                             backgroundPosition: 'center'
                                         }}/>
                                </div>
                                <div className='foodName'>
                                    پیتزا پپرونی
                                </div>
                                <div className='w-100 d-flex justify-content-center'>
                                    <div className='foodDetails'>
                                        پپرونی / پنیرپیتزا / پنیرگودا
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='foodListEachFoodContainer'>
                            <div className='foodListEachFood'>
                                <div className='priceAndImage'>
                                    <span className='eachFoodPrice'>
                                        23T
                                    </span>
                                    <div className='eachFoodImage'
                                         style={{
                                             background: 'url(/img/tempImages/foodTest.png)',
                                             backgroundSize: 'cover',
                                             backgroundPosition: 'center'
                                         }}/>
                                </div>
                                <div className='foodName'>
                                    پیتزا پپرونی
                                </div>
                                <div className='w-100 d-flex justify-content-center'>
                                    <div className='foodDetails'>
                                        پپرونی / پنیرپیتزا / پنیرگودا
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className='foodListEachFoodContainer'>
                            <div className='foodListEachFood'>
                                <div className='priceAndImage'>
                                    <span className='eachFoodPrice'>
                                        23T
                                    </span>
                                    <div className='eachFoodImage'
                                         style={{
                                             background: 'url(/img/tempImages/foodTest.png)',
                                             backgroundSize: 'cover',
                                             backgroundPosition: 'center'
                                         }}/>
                                </div>
                                <div className='foodName'>
                                    پیتزا پپرونی
                                </div>
                                <div className='w-100 d-flex justify-content-center'>
                                    <div className='foodDetails'>
                                        پپرونی / پنیرپیتزا / پنیرگودا
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className='foodListEachFoodContainer'>
                            <div className='foodListEachFood'>
                                <div className='priceAndImage'>
                                    <span className='eachFoodPrice'>
                                        23T
                                    </span>
                                    <div className='eachFoodImage'
                                         style={{
                                             background: 'url(/img/tempImages/foodTest.png)',
                                             backgroundSize: 'cover',
                                             backgroundPosition: 'center'
                                         }}/>
                                </div>
                                <div className='foodName'>
                                    پیتزا پپرونی
                                </div>
                                <div className='w-100 d-flex justify-content-center'>
                                    <div className='foodDetails'>
                                        پپرونی / پنیرپیتزا / پنیرگودا
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </React.Fragment>
        )

    }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {};
}


export default connect(mapStateToProps, mapDispatchToProps)(FoodListPage);
