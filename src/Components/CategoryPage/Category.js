import React from "react";
import './css/style.css'
import KeyboardArrowLeftRoundedIcon from '@material-ui/icons/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";


class CategoryPage extends React.Component {

    state = {
        categoryList: <div></div>,
    }

    componentDidMount() {
        let listOfCategories = this.props.foodListConverted.partsCategories[this.props.match.params.part.toString()].map(eachCategory => {
            let persianName = this.props.foodListConverted[this.props.match.params.part.toString()][eachCategory].persianName
            let logo = this.props.foodListConverted[this.props.match.params.part.toString()][eachCategory].logo.toString()
            return (
                <NavLink to={'/foodList/'+this.props.match.params.part.toString()+'/'+eachCategory.toString()} className='categoryPageEachCategoryContainer'>
                    <div  className="categoryPageEachCategory">
                        <div className="categoryPageEachCategoryImage" style={{
                            background: 'url(/img/categories/'+ `${logo}`+'.png)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}/>
                        <span className="categoryPageEachCategoryName">{persianName}</span>
                    </div>
                </NavLink>
            )
        })
        this.setState({
            categoryList:listOfCategories,
        })

    }

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
                    <div className='heightFitContent'>
                        {this.state.categoryList}
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);


