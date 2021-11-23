import React from "react";
import './css/style.css';
import '@fortawesome/fontawesome-free/css/all.css'
import {connect} from "react-redux";
import getComName, {getFullName} from "../../functions/getComName";
import * as ls from "../../stores/localStorage/localStorage"
import * as requests from '../../ApiRequests/ApiRequests'
import scrollSpy from 'simple-scrollspy'
import PhotoSlider from "./Components/PhotoSlider";
import FoodsNavBar from "./Components/FoodsNavBar";
import FoodList from "./Components/FoodList";
import Expander from "./Components/Expander";
import {openExpander} from "./Components/Expander";

class WelcomePage extends React.Component {

    state = {
        currentSliderImages: ['https://image.freepik.com/free-photo/delicious-vietnamese-food-including-pho-ga-noodles-spring-rolls-white-table_181624-34062.jpg', 'https://media.istockphoto.com/photos/food-backgrounds-table-filled-with-large-variety-of-food-picture-id1155240408?k=20&m=1155240408&s=612x612&w=0&h=Zvr3TwVQ-wlfBnvGrgJCtv-_P_LUcIK301rCygnirbk=', 'https://media.istockphoto.com/photos/top-view-table-full-of-food-picture-id1220017909?k=20&m=1220017909&s=170667a&w=0&h=4I_l8ZyiZ8sebPsRo6UpFmdrV-MZgEvxb3smE-TbgLE='],
        foodList: ls.getLSResFoods(),
        currentFoodIDs: [],
        catsFullInfo: ls.getLSResFullInfoCategories(),
        currentActivePart: 'restaurant',
        handClass: "shakeHands",
        allowToShake: true,
        partsPersianNames: {coffeeshop: 'کافی شاپ', restaurant: 'رستوران'},
        resParts: this.props.resParts.length > 0 ? this.props.resParts : ls.getLSResParts(),
        resInfo: ls.getLSResInfo(),
    }

    constructor(props) {
        super(props);
    }

    updatePart() {
        let allCurrentPartIds = [];
        Object.keys(this.state.catsFullInfo[this.state.currentActivePart]).forEach(key => {
            this.state.catsFullInfo[this.state.currentActivePart][key]['foodList'].forEach(id => {
                allCurrentPartIds.push(id)
            });
        })
        this.setState({
            currentFoodIDs: allCurrentPartIds
        })
    }

    componentDidMount() {
        const options = {
            sectionClass: '.sections',
            menuActiveTarget: '.menu-item',
            offset: 400,
            scrollContainer: '#scroller',
        }
        setTimeout(() => {
            scrollSpy('#category-scroller', options)
        }, 1000)

        if (this.state.resParts.length < 1) {
            this.props.history.push("/");
        }
        // create food list if it doesn't exist
        if (ls.getLSResFoods().length < 1) {
            requests.getRestaurantFoods((response) => {
                if (response.hasOwnProperty('statusCode') && response.statusCode === 200) {
                    ls.setLSResFoods(response.data)
                }
            })
        }
        // save res info if it doesn't exist
        if (!ls.getLSResInfo().hasOwnProperty("id")) {
            requests.getRestaurantInfo((response) => {
                if (response.hasOwnProperty('statusCode') && response.statusCode === 200) {
                    ls.setLSResInfo(response.data)
                }
            })
        }
    }

    render() {
        return (
            <div id={'welcome-page-main-container'} className='welcomePageMainContainerCover w-100 h-100' style={{
                scrollSnapType: 'y mandatory',
                position: 'relative'
            }}>
                <div style={{
                    height: 0,
                    overflow: 'hidden',
                    opacity: 0,
                    display: 'none'
                }}>
                    <PhotoSlider images={this.state.currentSliderImages}/>
                </div>

                <Expander/>
                <div style={{
                    zIndex: '99999'
                }} className={'more-options'}
                     onClick={
                         () => {
                             this.props.history.push('/resDetails')
                         }
                     }
                >...
                </div>
                <div style={{height: '100%', scrollSnapAlign: 'center'}} className={'sections-holder'}>
                    <p className="welcomePageHeader">
                        <span
                            className="textColor">{typeof this.state.resInfo == "object" ? this.state.resInfo.englishName : getComName()} </span>
                        <span> app</span>
                    </p>
                    <div className="welcomePageFrames1">
                        <div className='HandAndHeaderText'>
                            <span className="welcomePageDescriptionH">چی میل داری؟</span>
                            <div onClick={(d) => {
                                if (this.state.allowToShake) {
                                    d.target['classList'].add("element")
                                    this.setState({
                                        allowToShake: false
                                    })
                                    setTimeout(() => {
                                        d.target['classList'].remove("element")
                                        this.setState({
                                            allowToShake: true
                                        })
                                    }, 1000)
                                }
                            }} className={this.state.handClass} style={{
                                background: 'url("/img/WelcomePage/shakeHands.png")',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat'
                            }}/>
                        </div>
                        <div className="text-right">
                            <span className="welcomePageDescription">اینجا میتونی غذاهای مورد علاقتو</span>
                            <br/>
                            <span className="welcomePageDescription">با بالاترین کیفیت ببینی و بعد انتخابش کنی</span>
                            <br/>
                            <span className="welcomePageDescription">حتی میتونی دونگی پرداخت کنی</span>
                        </div>
                        <div id={'chef'} className="chefImage " style={{
                            background: 'url("/img/WelcomePage/chefIcon.png")',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}

                        />
                    </div>
                    <br/>
                    <div className="welcomePageFrames2 pt-1 ">
                        <div className="d-flex justify-content-around ">
                            {
                                typeof this.state.resParts === "object" ? this.state.resParts.map(eachPart => {
                                    return (
                                        <div onClick={() => {
                                            document.getElementsByClassName('welcomePageMainContainerCover')[0].scrollBy(0, 1000)
                                            this.setState({
                                                currentActivePart: eachPart
                                            }, () => {
                                                this.updatePart()
                                            })
                                        }} key={eachPart}
                                             className={"openIcons " + (this.state.currentActivePart === eachPart ? 'active-part' : '')}>
                                            <img alt={'F'} src={'/img/resParts/' + eachPart + '.png'}
                                                 className="burger"/>
                                            <span
                                                className="burgersAndDonatDescription">{this.state.partsPersianNames[eachPart]}</span>
                                            <br/>
                                            <br/>
                                        </div>
                                    )
                                }) : <div/>}
                            <div
                                onClick={() => window.location.href = 'https://vr.cuki.ir/' + getFullName()}
                                className={"openIcons" + (ls.getLSResInfo().hasOwnProperty("permissions") && ls.getLSResInfo()["permissions"].indexOf("360tour") !== -1 ? "" : " d-none ")}>
                                <div className="burger" style={{
                                    background: 'url("/img/resParts/vr.png")',
                                    backgroundSize: '95%',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                }}/>
                                <span
                                    className="burgersAndDonatDescription">تور مجازی</span>
                                <br/>
                                <br/>
                            </div>
                        </div>
                    </div>
                </div>


                <div className={'sections-holder'} style={{
                    scrollSnapAlign: 'center',
                    paddingTop: 0
                }}>
                    <div style={{
                    }}>
                        <div className={' pb-1'} style={{
                            position: 'relative',
                            height:'35px'
                        }}>
                            <div onClick={
                                () => {
                                    document.getElementById('welcome-page-main-container').scrollBy(0, -5000)
                                }
                            }>
                                <i className={'fas fa-angle-double-up'} style={{
                                    position: 'absolute',
                                    right: 10,
                                    top: 5,
                                    width: 10,
                                    height: 10
                                }}


                                />
                            </div>

                            <span className={'IranSans mt-3'}>دسته بندی</span>
                        </div>

                        <FoodsNavBar catsFullInfo={this.state.catsFullInfo} currentActivePart={this.state.currentActivePart}
                                     setState={(object) => {
                                         this.setState(object)
                                     }}/>
                    </div>


                    <FoodList catsFullInfo={this.state.catsFullInfo} currentActivePart={this.state.currentActivePart}
                              foodList={this.state.foodList} randomColors={this.randomColors}
                              openExpander={openExpander}/>


                </div>


            </div>


        )
    }
}

const mapStateToProps = (store) => {
    return {
        tableScanned: store.rTempData.tableScanned,
        resParts: store.rRestaurantInfo.resParts
    }
}

const mapDispatchToProps = () => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);
