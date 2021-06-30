import React from "react";
import './css/style.css'
import KeyboardArrowLeftRoundedIcon from '@material-ui/icons/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import {NavLink} from "react-router-dom";
import { useSwipeable } from 'react-swipeable';
import LoadingOverlay from 'react-loading-overlay';
import {ClimbingBoxLoader} from "react-spinners";
import * as ls from "../../stores/localStorage/localStorage"
import * as requests from '../../ApiRequests/ApiRequests'
import foodsListAdaptor from "../../functions/foodsListAdaptor";

export const Swipeable = ({children, style, ...props}) => {
    const handlers = useSwipeable(props);
    return (<div style={style} { ...handlers }>{children}</div>);
}

class CategoryPage extends React.Component {
    state = {
        catsFullInfo:  ls.getLSResFullInfoCategories(),
    }

    componentDidMount() {
        console.log(this.state.catsFullInfo);
        if(!(this.state.catsFullInfo.hasOwnProperty('parts') &&  this.state.catsFullInfo.parts.length > 0)){
            this.getData()
        }
    }

    dataArrive = (response) => {
        if (response.hasOwnProperty('statusCode') && response.statusCode === 200) {
            ls.setLSResFoods(response.data)
            this.setState({
                catsFullInfo: foodsListAdaptor(response.data)
            })
        }
    }

    getData = () => {
        requests.getRestaurantFoods(this.dataArrive);
    }

    nextPage = () =>{
        let catIndex = this.state.catsFullInfo["parts"].indexOf(this.props.match.params["part"])
        if(catIndex >= this.state.catsFullInfo["parts"].length-1)
            this.props.history.push("/category/"+this.state.catsFullInfo["parts"][0]);
        else
            this.props.history.push("/category/"+this.state.catsFullInfo["parts"][catIndex+1]);
    }

    previousPage = () =>{
        let catIndex = this.state.catsFullInfo["parts"].indexOf(this.props.match.params["part"])
        if(catIndex !== 0)
            this.props.history.push("/category/"+this.state.catsFullInfo["parts"][catIndex-1]);
        else
            this.props.history.push("/category/"+this.state.catsFullInfo["parts"][this.state.catsFullInfo["parts"].length-1]);
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
            <LoadingOverlay
                active={!this.state.catsFullInfo.hasOwnProperty('parts')}
                spinner={<ClimbingBoxLoader color={'white'}/>}
                text='وایسا چک کنم ببینم چی چیا داریم'
            >
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
                            {
                                this.state.catsFullInfo.hasOwnProperty('parts') && this.state.catsFullInfo.parts.length > 0 ? this.state.catsFullInfo.partsCategories[this.props.match.params["part"]].map(eachCategory => {
                                    let persianName = this.state.catsFullInfo[this.props.match.params["part"]][eachCategory].persianName
                                    let logo = this.state.catsFullInfo[this.props.match.params["part"]][eachCategory].logo
                                    let color = this.state.catsFullInfo[this.props.match.params["part"]][eachCategory].averageColor.toString()
                                    return (
                                        <NavLink key={persianName} to={'/category/'+this.props.match.params["part"]+'/'+eachCategory} className='categoryPageEachCategoryContainer'>
                                            <div  className="categoryPageEachCategory">
                                                <div className="categoryPageEachCategoryImage" style={{
                                                    background: 'url(/img/categories/'+ logo +'.png)',
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                    backgroundRepeat: 'no-repeat'
                                                }}/>
                                                <span className="categoryPageEachCategoryName" style={{color:color}}>{persianName}</span>
                                            </div>
                                        </NavLink>
                                    )
                                }):null
                            }
                        </div>
                    </div>
                </React.Fragment>
            }/>
            </LoadingOverlay>
        )
    }
}

export default CategoryPage


