import React from "react";
import './css/style.css'
import KeyboardArrowLeftRoundedIcon from '@material-ui/icons/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import { useSwipeable } from 'react-swipeable';

export const Swipeable = ({children, style, ...props}) => {
    const handlers = useSwipeable(props);
    return (<div style={style} { ...handlers }>{children}</div>);
}

class CategoryPage extends React.Component {
    componentDidMount() {
        if(!(this.props.foodListConverted.hasOwnProperty('parts') &&  this.props.foodListConverted.parts.length > 0)){
            this.props.history.push("/");
            return ;
        }
        this.createCatList()
    }

    state = {
        categoryList: <div/>,
    }

    createCatList = () =>{
        let listOfCategories = this.props.foodListConverted.partsCategories[this.props.match.params["part"]].map(eachCategory => {
            let persianName = this.props.foodListConverted[this.props.match.params["part"]][eachCategory].persianName
            let logo = this.props.foodListConverted[this.props.match.params["part"]][eachCategory].logo
            let color = this.props.foodListConverted[this.props.match.params["part"]][eachCategory].averageColor.toString()
            return (
                <NavLink key={persianName} to={'/category/'+this.props.match.params["part"]+'/'+eachCategory} className='categoryPageEachCategoryContainer'>
                    <div  className="categoryPageEachCategory">
                        <div className="categoryPageEachCategoryImage" style={{
                            background: 'url(/img/categories/'+ `${logo}`+'.png)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}/>
                        <span className="categoryPageEachCategoryName" style={{color:color}}>{persianName}</span>
                    </div>
                </NavLink>
            )
        })
        this.setState({
            categoryList:listOfCategories,
        })
    }

    nextPage = () =>{
        let catIndex = this.props.foodListConverted.parts.indexOf(this.props.match.params["part"])
        if(catIndex >= this.props.foodListConverted.parts.length-1)
            this.props.history.push("/category/"+this.props.foodListConverted.parts[0]);
        else
            this.props.history.push("/category/"+this.props.foodListConverted.parts[catIndex+1]);

        this.createCatList()
    }

    previousPage = () =>{
        let catIndex = this.props.foodListConverted.parts.indexOf(this.props.match.params["part"])
        if(catIndex !== 0)
            this.props.history.push("/category/"+this.props.foodListConverted.parts[catIndex-1]);
        else
            this.props.history.push("/category/"+this.props.foodListConverted.parts[this.props.foodListConverted.parts.length-1]);

        this.createCatList()
    }

    swipeRight = () =>{
        this.previousPage()
    }

    swipeLeft = () =>{
        this.nextPage()
    }

    handleBack = () =>{
        this.props.history.push("/main")
    }

    partEnglish2Persian = (englishName) =>{
        let names = {restaurant:"رستوران", coffeeshop:"کافی شاپ"}
        return names[englishName]
    }


    render() {
        return (
            <Swipeable style={{height:"100%"}} onSwipedRight={this.swipeRight} onSwipedLeft={this.swipeLeft} children={
                <React.Fragment>
                    <div
                        className='categoryPageHeader pl-2 pr-2 pt-2 d-flex flex-row justify-content-between align-items-center'>
                        <ArrowBackRoundedIcon onClick={this.handleBack}/>
                        <div className='categoryPageSelector text-center d-flex justify-content-around flex-row'>
                            <KeyboardArrowLeftRoundedIcon onClick={this.previousPage}/>
                            <div className='categoryPageSelectorText IranSans'>{this.partEnglish2Persian(this.props.match.params["part"])}</div>
                            <KeyboardArrowRightRoundedIcon onClick={this.nextPage} />
                        </div>
                        <ArrowBackRoundedIcon className='invisible'/>
                    </div>

                    <div className='categoryPageContainer'>
                        <div className='heightFitContent'>
                            {this.state.categoryList}
                        </div>
                    </div>
                </React.Fragment>
            }/>
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


