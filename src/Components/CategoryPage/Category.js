import React from "react";
import './css/style.css'
import KeyboardArrowLeftRoundedIcon from '@material-ui/icons/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';


class CategoryPage extends React.Component {
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

                <div className='categoryPageContainer'>
                    <div className="categoryPageEachCategory">
                        <img className="categoryPageEachCategoryImage" />
                        <span className="categoryPageEachCategoryName">برگر</span>
                    </div>
                </div>
            </React.Fragment>
        )

    }
}

export default CategoryPage;
