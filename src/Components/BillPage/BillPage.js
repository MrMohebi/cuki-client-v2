import React from "react";
import './css/style.css'
import KeyboardArrowLeftRoundedIcon from '@material-ui/icons/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

class BillPage extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div
                    className='categoryPageHeader pl-2 pr-2 pt-2 d-flex flex-row justify-content-between align-items-center'>
                    <ArrowBackRoundedIcon/>
                    <div className='categoryPageSelector text-center d-flex justify-content-around flex-row'>
                        <KeyboardArrowLeftRoundedIcon/>
                        <div className='categoryPageSelectorText IranSans'>رستوران</div>
                        <KeyboardArrowRightRoundedIcon/>
                    </div>
                    <ArrowBackRoundedIcon className='invisible'/>
                </div>
                <div className='BillPageContainer'>
                    <div className='w-100 billItemsContainer pt-4'>
                        <SwipeableList>
                            <SwipeableListItem
                                swipeLeft={{
                                    content: <div></div>,
                                    action: () => console.info('swipe action triggered')
                                }}
                                swipeRight={{
                                    content: <div></div>,
                                    action: () => console.info('swipe action triggered')
                                }}>
                                <div
                                    className='w-100 d-flex justify-content-between align-items-center flex-row-reverse IranSans'>
                                    <span>پیتزا قارچ و خامه</span>
                                    <span className='eachFoodPriceBill'>39 T</span>
                                    <div className='d-flex justify-content-between umberInDe'>
                                        <AddRoundedIcon/>
                                        <span className='NumberOfFoodsBill'>2</span>
                                        <RemoveRoundedIcon/>
                                    </div>
                                </div>
                            </SwipeableListItem>

                        </SwipeableList>

                    </div>
                    <div className='totalPriceAndTextHolder  d-flex w-100 justify-content-between'>
                        <span>20T</span>
                        <span>جمع نهایی فاکتور</span>
                    </div>
                    <div className='BillSubmitButton'>
                        <span>پرداخت</span>
                    </div>
                </div>

            </React.Fragment>
        )

    }
}

export default BillPage;
