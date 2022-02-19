import React from "react";
import './css/style.css';
import '../../assets/fonts/fonts.css'
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
import {Themes} from "../../assets/Themes";

class WelcomePage extends React.Component {

    state = {
        currentSliderImages: [],
        foodList: ls.getLSResFoods(),
        currentFoodIDs: [],
        catsFullInfo: ls.getLSResFullInfoCategories(),
        currentActivePart: 'restaurant',
        handClass: "shakeHands",
        allowToShake: true,
        partsPersianNames: {coffeeshop: 'کافی شاپ', restaurant: 'رستوران'},
        resParts: this.props.resParts.length > 0 ? this.props.resParts : ls.getLSResParts(),
        resInfo: ls.getLSResInfo(),
        currentTheme: 'wintone',
        subsetFoods: {},
        lockCategory: true,
        currentCategory: ''
    }

    constructor(props) {
        super(props);
    }

    changeCurrentCategory = (newState) => {
        this.setState({
            currentCategory: newState
        })
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

    changeTheme() {
        if (Themes[this.state.currentTheme]) {
            let colors = document.querySelector(':root')
            colors.style.setProperty('--primary-color', Themes[this.state.currentTheme]['primary_color'])
            colors.style.setProperty('--background-color', Themes[this.state.currentTheme]['background_color'])
            colors.style.setProperty('--secondary-color', Themes[this.state.currentTheme]['secondary_color'])
            colors.style.setProperty('--text-color', Themes[this.state.currentTheme]['text_color'])
            colors.style.setProperty('--app-title-color', Themes[this.state.currentTheme]['app_title_color'])
            colors.style.setProperty('--text-secondary-color', Themes[this.state.currentTheme]['text_secondary_color'])
        } else {

        }

    }

    updateScrollSpy = () => {
        const options = {
            sectionClass: '.sections',
            menuActiveTarget: '.menu-item',
            offset: 400,
            scrollContainer: '#scroller',
            smoothScroll: true,
        }

        scrollSpy('#category-scroller', options)
    }

    mounted = () => {
        this.setState({
            currentSliderImages: []
        })
        this.changeTheme()

        setTimeout(() => {
            this.updateScrollSpy()
        }, 1000)

        if (this.state.resParts.length < 1) {
            this.props.history.push("/");
        }
        // create food list if it doesn't exist
        if (ls.getLSResFoods().length < 1) {
            requests.getRestaurantFoods((response) => {
                if (response.hasOwnProperty('statusCode') && response.statusCode === 100 * 2) {
                    ls.setLSResFoods(response.data)
                }
            })
        }
        requests.getRestaurantFoods((response) => {
            if (response.hasOwnProperty('statusCode') && response.statusCode === 100 * 2) {
                ls.setLSResFoods(response.data)
            }
        })
        // save res info if it doesn't exist
        if (!ls.getLSResInfo().hasOwnProperty("id")) {
            requests.getRestaurantInfo((response) => {
                if (response.hasOwnProperty('statusCode') && response.statusCode === 100 * 2) {
                    ls.setLSResInfo(response.data)
                }
            })
        }
        requests.getRestaurantInfo((response) => {
            if (response.hasOwnProperty('statusCode') && response.statusCode === 100 * 2) {
                ls.setLSResInfo(response.data)
            }
        })
        let subsets = {};
        let foodArray = [];
        for (let i = 0; i <= this.state.foodList.length; i++) {
            let food = this.state.foodList[i]
            if (food) {
                if (food['relatedMainPersianName']) {
                    if (subsets[food.relatedMainPersianName]) {
                        foodArray = subsets[food.relatedMainPersianName]
                        foodArray.push(food)
                        subsets[food.relatedMainPersianName] = foodArray
                    } else {
                        foodArray = []
                        foodArray.push(food)
                        subsets[food.relatedMainPersianName] = foodArray
                    }
                }
            }
            foodArray = [];

        }
        this.setState({
            subsetFoods: subsets
        })
        this.initialActiveCat()


    }

    initialActiveCat = () => {
        this.setState({
            currentCategory: Object.keys(this.state.catsFullInfo[this.state.currentActivePart])[0]
        })
    }


    componentDidMount() {
        this.mounted()
        setTimeout(() => {
            this.mounted()
        }, 1000)
    }


    render() {
        return (<div id={'welcome-page-main-container'}
                     className={'welcomePageMainContainerCover w-100 h-100 theme-base '} style={{
                scrollSnapType: 'y mandatory', position: 'relative',
            }}>
                <div style={{
                    height: 0, overflow: 'hidden', opacity: 0, display: 'none'
                }}>
                    <PhotoSlider images={this.state.currentSliderImages}/>
                </div>

                <Expander/>
                {/*<div style={{*/}
                {/*    zIndex: '99999'*/}
                {/*}} className={'more-options'}*/}
                {/*     onClick={*/}
                {/*         () => {*/}
                {/*             this.props.history.push('/resDetails')*/}
                {/*         }*/}
                {/*     }*/}
                {/*>...*/}
                {/*</div>*/}
                <div style={{height: '100%', scrollSnapAlign: 'center'}} className={'sections-holder'}>
                    <div className="welcomePageHeader">
                        <span
                            className="textColor">{typeof this.state.resInfo == "object" ? this.state.resInfo.englishName : getComName()} </span>
                        <span className={'app-default-ending-title'}> ONLINE MENU</span>
                    </div>
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
                            <span className="welcomePageDescription">با بالاترین کیفیت ببینی و انتخابش کنی</span>
                            <br/>

                        </div>
                        <div id={'chef'} className="chefImage mt-4" style={{
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
                            {typeof this.state.resParts === "object" ? this.state.resParts.map(eachPart => {
                                return (<div onClick={() => {
                                    setTimeout(() => {
                                        this.updateScrollSpy()
                                        this.initialActiveCat()
                                    }, 200)
                                    this.updateScrollSpy()
                                    document.getElementsByClassName('welcomePageMainContainerCover')[0].scrollBy(0, 1000)
                                    this.setState({
                                        currentActivePart: eachPart
                                    }, () => {
                                        this.updatePart()
                                    })
                                }}
                                             key={eachPart}
                                             className={"openIcons " + (this.state.currentActivePart === eachPart ? 'active-part' : '')}

                                >
                                    <img alt={'F'} src={'/img/resParts/' + eachPart + '.png'}
                                         className="burger"/>
                                    <span
                                        className="burgersAndDonatDescription">{this.state.partsPersianNames[eachPart]}</span>
                                    <br/>
                                    <br/>
                                </div>)
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
                    scrollSnapAlign: 'center', paddingTop: 0
                }}>
                    <div style={{}}>
                        <div className={' pb-1'} style={{
                            position: 'relative', height: '35px'
                        }}>
                            <div onClick={() => {
                                document.getElementById('welcome-page-main-container').scrollBy(0, -(100 * 10 * 5))
                            }}>
                                <i className={'fas fa-angle-double-up go-up-button secondary-text'} style={{
                                    position: 'absolute', right: 10, top: 5, width: 10, height: 10
                                }}
                                />
                            </div>

                            <span className={'IranSans mt-3 cat-text-placeholder secondary-text'}>دسته بندی</span>
                        </div>


                        <FoodsNavBar currentCategory={this.state.currentCategory} lockCategory={this.state.lockCategory}
                                     setCurrentCategory={this.changeCurrentCategory}
                                     catsFullInfo={this.state.catsFullInfo}
                                     currentActivePart={this.state.currentActivePart}
                                     setState={(object) => {
                                         this.setState(object)
                                     }}/>
                    </div>


                    <FoodList currentCategory={this.state.currentCategory} lockCategory={this.state.lockCategory}
                              subsets={this.state.subsetFoods} catsFullInfo={this.state.catsFullInfo}
                              currentActivePart={this.state.currentActivePart}
                              foodList={this.state.foodList} randomColors={this.randomColors}
                              openExpander={openExpander}/>


                </div>


            </div>


        )
    }
}

const mapStateToProps = (store) => {
    return {
        tableScanned: store.rTempData.tableScanned, resParts: store.rRestaurantInfo.resParts
    }
}

const mapDispatchToProps = () => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);
