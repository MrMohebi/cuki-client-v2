import React from "react";
import './css/style.css';
import '@fortawesome/fontawesome-free/css/all.css'
import {connect} from "react-redux";
import {useSwipeable} from 'react-swipeable';
import getComName, {getFullName} from "../../functions/getComName";
import * as ls from "../../stores/localStorage/localStorage"
import * as requests from '../../ApiRequests/ApiRequests'
import $ from 'jquery'
import ding from './assets/ding.mp3'
import FoodListPage from "../FoodListPage/FoodListPage";
import {NavLink} from "react-router-dom";
import {ButtonBase, rgbToHex} from "@material-ui/core";
import ColorThief from "colorthief/dist/color-thief";
import ActiveMenuLink from "active-menu-link";
import scrollSpy from 'simple-scrollspy'
import * as RandomColor from "../../functions/RandomColor";
import gsap from "gsap";
import PhotoSlider from "./Components/PhotoSlider";


const CT = new ColorThief();
export const Swipeable = ({children, style, ...props}) => {
    const handlers = useSwipeable(props);
    return (<div style={style}  {...handlers}>{children}</div>);
}

class WelcomePage extends React.Component {

    state = {
        foodList: ls.getLSResFoods(),
        currentFoodIDs: [],
        catsFullInfo: ls.getLSResFullInfoCategories(),
        currentActivePart: 'restaurant',
        handClass: "shakeHands",
        allowToShake: true,
        partsPersianNames: {coffeeshop: 'کافی شاپ', restaurant: 'رستوران'},
        resParts: this.props.resParts.length > 0 ? this.props.resParts : ls.getLSResParts(),
        resInfo: ls.getLSResInfo(),
        lastPagerTime: 0,
        canCallPager: false,
        timerAnimationClass: 'd-none',
        timerText: '',
        chefTooltipCoolDown: false,
        chefSentences: [
            'دارم میام خدمتتون',
            'دندون رو جیگر بذار الان میام',
            'سه سوته اونجام',
            'درخواستت توی الویته',
            'چشم، الان میام'
        ]
    }
    expanderW = 300;

    constructor(props) {
        super(props);
        this.Timer = React.createRef()
        this.lastExpanderPosition = React.createRef();
        this.lastClickedFood = React.createRef();
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
            sectionClass: '.sections',           // Query selector to your sections
            menuActiveTarget: '.menu-item',       // Query selector to your elements that will be added `active` class
            offset: 180,                          // Menu item will active before scroll to a matched section 100px
            scrollContainer: '#scroller', // Listen scroll behavior on `.scroll-container` instead of `window`
        }
        setTimeout(() => {
            // console.log(this.state.catsFullInfo[this.state.currentActivePart])
            scrollSpy('#category-scroller', options)

        }, 1000)

        console.log(this.state)
        console.log(this.state.catsFullInfo[this.state.currentActivePart])
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
        let lSPager = ls.getLSPager()
        lSPager = lSPager > 0 ? lSPager : 0
        if (lSPager) {
            this.setState({lastPagerTime: parseInt(lSPager)})
        } else {
            this.setState({lastPagerTime: parseInt(lSPager)})
        }
        setInterval(this.updateTimer, 5000)
        setTimeout(() => {
            if (this.state.canCallPager) {
                if (this.props.tableScanned)
                    this.chefTooltip('با لمس گارسونمون میتونی صداش بزنی!', 0, 3000)
            }
        }, 1500)
    }

    rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    chefTooltip = (text, delay, duration) => {
        if (this.state.chefTooltipCoolDown === false) {
            this.setState({chefTooltipCoolDown: true})
            let chef = $('#chef')
            chef ? chef.tooltip('dispose')
                :
                console.log('cannotFindChef')

            chef ? chef.tooltip({
                title: text,
                placement: 'bottom',
                trigger: 'focus'
            }) : console.log('cannotFindChef')

            setTimeout(() => {
                chef.tooltip('show')
            }, delay)
            setTimeout(() => {
                chef.tooltip('hide')
                this.setState({chefTooltipCoolDown: false})
            }, duration + delay)
        }
    }


    updateTimer = () => {
        let seconds = (this.state.lastPagerTime / 1000 - Date.now() / 1000 + 300)
        this.setState({
            timerText: new Date(seconds * 1000).toISOString().substr(14, 5)
        })
        if (seconds < 1) {
            this.setState({
                canCallPager: true,
                timerAnimationClass: 'd-none'
            })
        } else {
            this.setState({
                canCallPager: false,
                timerAnimationClass: 'animate__fadeIn'
            })
        }
    }
    swipeRight = () => {
        this.props.history.push("/bill")
    }
    callPager = () => {
        let now = Date.now()
        ls.setLSPager(now)
        this.setState({lastPagerTime: now})
        requests.callPager(this.props.tableScanned, this.callPagerCallback)
    }

    callPagerCallback = (res) => {
    }

    togglePagerCall = (e) => {
        if (this.props.tableScanned > 0 || ls.getLSPager() / 1000 > (Date.now() / 1000) - 300) {
            if (this.state.canCallPager) {
                let audio = new Audio(ding)
                audio.volume = 0.4
                audio.play()
                e.target.style.transform = 'scale(0.9)'
                setTimeout(() => {
                    e.target.style.transform = 'scale(1)'
                }, 200)
                this.callPager()
            } else {
                let rand = Math.floor(Math.random() * this.state.chefSentences.length)
                this.chefTooltip(this.state.chefSentences[rand], 0, 3000)
            }
        }


    }

    swipeLeft = () => {
        this.props.history.push("/likedFoods")
    }
    openExpander = (e, open) => {
        let mainContainer = document.getElementsByClassName('welcomePageMainContainerCover ')[0]
        let expander = document.getElementById('expander')
        let overlay = document.getElementById('expander-overlay')

        if (open) {
            expander.style.transition = '0s ease'

            mainContainer.style.overflow = 'hidden'

            expander.style.height = this.expanderW + 'px'
            expander.style.width = this.expanderW + 'px'

            this.lastExpanderPosition.current = {
                top: '',
                left: ''
            }

            let offset = 0;
            if (window.innerWidth > 800) {
                offset = window.innerWidth - 800
                console.log(offset)
            }

            expander.style.top = "calc(100% + " + (e.currentTarget.getBoundingClientRect().y - 13) + "px )"
            this.lastExpanderPosition.current.top = "calc(100% + " + (e.currentTarget.getBoundingClientRect().y - 13) + "px )"
            expander.style.left = ((e.currentTarget.getBoundingClientRect().x - offset / 2) + e.currentTarget.getBoundingClientRect().width / 2 - this.expanderW / 2 + "px")
            this.lastExpanderPosition.current.left = ((e.currentTarget.getBoundingClientRect().x - offset / 2) + e.currentTarget.getBoundingClientRect().width / 2 - this.expanderW / 2 + "px")

            expander.style.transition = '.3s ease'
            expander.style.pointerEvents = 'all'

            overlay.style.opacity = '1';
            overlay.style.pointerEvents = 'all';
            // e.currentTarget.style.opacity = 0
            let duplicated = e.currentTarget.firstChild.cloneNode(true)
            duplicated.style.transition = '0.3s ease';

            e.currentTarget.firstChild.style.opacity = 0
            this.lastClickedFood.current = e.currentTarget.firstChild;

            duplicated.style.marginTop = '0px';
            duplicated.classList.add('expended');
            // duplicated.firstChild.children[1].
            duplicated.querySelector('.priceAndImage').children[1].style.margin = '10px'
            setTimeout(() => {
                expander.style.left = ((window.innerWidth / 2 - this.expanderW / 2) - offset / 2) + 'px';
                expander.style.top = "calc(100vh + " + (window.innerHeight / 2 - this.expanderW / 2) + "px )";
                expander.style.width = (window.innerWidth - offset) + 'px'
                expander.style.left = '0';
                expander.style.height = window.innerHeight + 'px';
                expander.style.top = '100%';


                // gsap.to(duplicated, {
                //     height: window.innerHeight,
                //     borderRadius: 0,
                //     minHeight: window.innerHeight,
                //     width: window.innerWidth,
                //     // duration: 0.3,
                //     // ease:'power.out'
                // })
                setTimeout(() => {
                    // this.openExpander(null, false)
                }, 2000)
                duplicated.style.height = document.body.getBoundingClientRect().width - 50 + 'px';
                duplicated.style.width = document.body.getBoundingClientRect().width - 50 + 'px';
                // duplicated.style.borderRadius = 0;


            }, 0)

            // console.log(e.currentTarget.getBoundingClientRect().x-offset)
            expander.firstChild ? expander.firstChild.replaceWith(duplicated) :
                expander.append(duplicated)

            setTimeout(() => {
                // this.openExpander(null, false)
                // console.log(this.lastExpanderPosition)
                let image = duplicated.querySelector('#food-image')
                let price = duplicated.querySelector('#food-price')
                let name = duplicated.querySelector('#food-name')
                let details = duplicated.querySelector('#food-details')
                let elementTransitions = '.3s ease'
                // image.style.marginRight = (document.body.getBoundingClientRect().width/2 - 50)+'px'
                image.style.setProperty('transition', elementTransitions, 'important')
                price.style.setProperty('transition', elementTransitions, 'important')
                name.style.setProperty('transition', elementTransitions, 'important')
                details.style.setProperty('transition', elementTransitions, 'important')

                image.style.setProperty('height', '80px', 'important')
                image.style.setProperty('width', '80px', 'important')
                image.style.right = '10px'
                image.style.top = '10px'

                price.style.top = '10px'
                price.style.left = '10px'

                name.style.width = '0%'
                name.style.right = '120px'
                name.style.top = '30px'

                details.style.top = '90px'
                details.style.textAlign = 'right'
                details.style.padding = '20px'
                details.style.whiteSpace = 'normal'

            }, 50)


        } else {
            let duplicated = document.getElementById('expander').firstChild
            overlay.style.pointerEvents = 'none'
            expander.style.left = this.lastExpanderPosition.current.left
            expander.style.top = this.lastExpanderPosition.current.top
            expander.style.width = this.expanderW + 'px'
            expander.style.height = this.expanderW + 'px'
            duplicated.style.height = '';
            duplicated.style.width = '';
            expander.style.pointerEvents = 'none'
            duplicated.style.borderRadius = '20px 35px 20px 20px';


            this.lastClickedFood.current.style.opacity = 1
            duplicated.querySelector('.priceAndImage').children[1].style.margin = '0px'

            let image = duplicated.querySelector('#food-image')
            let price = duplicated.querySelector('#food-price')
            let name = duplicated.querySelector('#food-name')
            let details = duplicated.querySelector('#food-details')
            let elementTransitions = '.3s ease'
            // image.style.marginRight = (document.body.getBoundingClientRect().width/2 - 50)+'px'
            image.style.setProperty('transition', elementTransitions, 'important')
            price.style.setProperty('transition', elementTransitions, 'important')
            name.style.setProperty('transition', elementTransitions, 'important')
            details.style.setProperty('transition', elementTransitions, 'important')

            image.style.setProperty('height', '', 'important')
            image.style.setProperty('width', '', 'important')
            image.style.right = '0px'
            image.style.top = '0px'

            price.style.top = '0px'
            price.style.left = '0px'

            name.style.width = '100%'
            name.style.right = '0px'
            name.style.top = '60px'

            details.style.top = '90px'
            details.style.textAlign = 'center'
            details.style.padding = '0px'
            details.style.whiteSpace = 'nowrap'

            setTimeout(() => {
                overlay.style.opacity = 0;
                duplicated.style.opacity = 0
            }, 300)


        }

    }


    render() {
        return (
            <Swipeable style={{height: "100%", position: 'relative'}}
                // onSwipedRight={this.swipeRight}
                // onSwipedLeft={this.swipeLeft}
                       children={
                           <div className='welcomePageMainContainerCover w-100 h-100' style={{
                               scrollSnapType: 'y mandatory',
                               position: 'relative'
                           }}>
                               <div id={'expander-overlay'} className={'expander-overlay'}>
                                   <div
                                       className={'close-button d-flex flex-row-reverse align-items-center justify-content-between'}>
                                       <i className={'fa fa-times'}/>
                                       <span>بستن</span>
                                   </div>

                               </div>


                               <div id={'expander'} className={'expander '}
                                    onClick={(e) => {
                                        if (e.target.classList.contains('expander')) {
                                            this.openExpander(null, false)
                                        }
                                    }}
                                    style={
                                        {
                                            position: "absolute",
                                            background: "transparent",
                                            width: this.expanderW,
                                            height: this.expanderW,
                                            zIndex: 9999,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            transition: '.3s ease'

                                        }
                                    }
                               />
                               <div className={'more-options'}
                                    onClick={
                                        () => {
                                            this.props.history.push('/resDetails')
                                        }

                                    }
                               >...
                               </div>
                               <div style={{height: '100%', scrollSnapAlign: 'center'}} className={'sections-holder'}>
                                   <p className="welcomePageHeader">
                                       {/*<PhotoSlider/>*/}

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
                                           <span
                                               className="welcomePageDescription">اینجا میتونی غذاهای مورد علاقتو</span>
                                           <br/>
                                           <span
                                               className="welcomePageDescription">با بالاترین کیفیت ببینی و بعد انتخابش کنی</span>
                                           <br/>
                                           <span
                                               className="welcomePageDescription">حتی میتونی دونگی پرداخت کنی</span>
                                       </div>
                                       <div id={'chef'} className="chefImage " style={{
                                           background: 'url("/img/WelcomePage/chefIcon.png")',
                                           backgroundSize: 'cover',
                                           backgroundPosition: 'center',
                                           backgroundRepeat: 'no-repeat'
                                       }}
                                            onClick={() => {
                                                if (ls.getLSResInfo().hasOwnProperty("permissions") && ls.getLSResInfo()["permissions"].indexOf("pager") !== -1) {
                                                    this.togglePagerCall()
                                                } else {
                                                    this.chefTooltip("متاسفانه پیجر گارسونمون فعال نیست.", 0, 3000)
                                                }
                                            }}
                                       />
                                       <div id={'pagerTimer'} ref={this.Timer}
                                            className={'text-left IranSans w-100 pagerTimer animate__animated ' + this.state.timerAnimationClass}>{this.state.timerText ? this.state.timerText : '00:00'}</div>
                                       <br/>
                                   </div>
                                   <br/>
                                   <div className="welcomePageFrames2 pt-1 ">
                                       <div className="d-flex justify-content-around ">
                                           {/*{*/}
                                           {/*    typeof this.state.resParts === "object" ? this.state.resParts.map(eachPart => {*/}
                                           {/*        return (*/}
                                           {/*            <div onClick={() => {*/}
                                           {/*                if (ls.getLSResFullInfoCategories().hasOwnProperty(eachPart))*/}
                                           {/*                    this.props.history.push("/category/" + eachPart)*/}
                                           {/*            }} key={eachPart} className="openIcons">*/}
                                           {/*                <img alt={'F'} src={'/img/resParts/' + eachPart + '.png'}*/}
                                           {/*                     className="burger" style={{}}/>*/}
                                           {/*                <span*/}
                                           {/*                    className="burgersAndDonatDescription">{this.state.partsPersianNames[eachPart]}</span>*/}
                                           {/*                <br/>*/}
                                           {/*                <br/>*/}
                                           {/*            </div>*/}
                                           {/*        )*/}
                                           {/*    }) : <div/>}*/}

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


                               {/*---------------------------------- NAVBAR ----------------------------------*/}
                               <div className={'sections-holder'} style={{
                                   scrollSnapAlign: 'center'
                               }}>

                                   <div id={'top-nav-container'} style={{
                                       height: '160px',
                                       width: '99%',
                                       zIndex: 999,
                                       minHeight: '160px',
                                       position: 'absolute',
                                       top: '0',
                                       background: 'rgba(255,255,255,0.84)',
                                       // backdropFilter: 'blur(20px)'
                                   }}>

                                       <div className={' pb-1'}>
                                           <span className={'IranSans mt-3'}>دسته بندی</span>

                                       </div>


                                       <div className={'w-100'} style={{
                                           position: 'relative',
                                       }}>

                                           <ButtonBase style={{
                                               height: '100%',
                                               width: 40,
                                               position: 'absolute',
                                               zIndex: 2,
                                               left: 0,
                                               borderRadius: '0 100 100 0',
                                               transform: 'translate(0,50%)',
                                               bottom: '50%',
                                               background: 'white',
                                               boxShadow: 'rgb(255 255 255) 14px 0px 20px',
                                               fontSize: 20
                                           }}
                                                       onClick={() => {
                                                           document.getElementById('category-scroller').scrollBy(-100, 0)
                                                       }}
                                           >
                                               <i className="fas fa-angle-left " style={{
                                                   // border:'solid 1px gray',
                                                   width: 50,
                                                   height: 50,
                                                   lineHeight: 2.5,
                                               }}/>
                                           </ButtonBase>

                                           <ButtonBase style={{
                                               height: '100%',
                                               width: 40,
                                               position: 'absolute',
                                               zIndex: 2,
                                               right: 0,
                                               transform: 'translate(0,50%)',
                                               bottom: '50%',
                                               borderRadius: '100 0 0 100',
                                               background: 'white',
                                               boxShadow: 'rgb(255 255 255) -14px 0px 20px',
                                               fontSize: 20
                                           }}
                                                       onClick={() => {
                                                           document.getElementById('category-scroller').scrollBy(100, 0)
                                                       }}
                                           >
                                               <i className="fas fa-angle-right " style={{
                                                   // border:'solid 1px gray',
                                                   width: 50,
                                                   height: 50,
                                                   lineHeight: 2.5,
                                               }}/>
                                           </ButtonBase>


                                           <div id={'category-scroller'} className={'d-flex flex-row-reverse mt-3'}
                                                style={{
                                                    padding: '10px 50px 0 100px',
                                                    overflow: 'scroll',
                                                    scrollBehavior: 'smooth',

                                                }}>
                                               {
                                                   this.state.catsFullInfo[this.state.currentActivePart] ? Object.keys(this.state.catsFullInfo[this.state.currentActivePart]).map(eachCategory => {
                                                           let persianName = this.state.catsFullInfo[this.state.currentActivePart][eachCategory]['persianName']
                                                           // let logo = this.state.catsFullInfo[this.props.match.params["part"]][eachCategory].logo
                                                           // let color = this.state.catsFullInfo[this.props.match.params["part"]][eachCategory].averageColor.toString()
                                                           // let color = CT.getColor(<img alt={'ad'} src={'/img/categories/' + (eachCategory.toLowerCase().includes('pizza') ? 'pizza' : eachCategory) + '.png'}/>)

                                                           // console.log(CT.getColor(img))
                                                           // console.log(eachCategory)
                                                           return (
                                                               <a style={{
                                                                   display: 'contents'
                                                               }} className={'menu-item'} href={'#' + eachCategory}>
                                                                   <ButtonBase style={{
                                                                       borderRadius: 15,
                                                                       transition: '0.2s ease ',
                                                                       minWidth: '75px'
                                                                       // boxShadow: this.state.currentCat === eachCategory ? "#dbdbdb 0 0 6px" : '',
                                                                       // border: this.state.currentCat === eachCategory ? 'solid #a7a7a7 1px' : 'white 1px solid',
                                                                       // transform: this.state.currentCat === eachCategory ? 'translateY(-10px)' : 'translateY(0px)'
                                                                   }}
                                                                               onClick={() => {
                                                                                   this.setState({
                                                                                       currentFoodIDs: this.state.catsFullInfo[this.state.currentActivePart][eachCategory]['foodList'],
                                                                                       currentCat: eachCategory
                                                                                   })
                                                                               }}
                                                                               className='categoryPageEachCategoryContainer mx-2 my-2'>
                                                                       <div style={{
                                                                           boxShadow: " 0 0 7px 0px #b9b9b9"
                                                                       }} className="categoryPageEachCategory">
                                                                           <div className="categoryPageEachCategoryImage"
                                                                                style={{
                                                                                    backgroundImage: 'url(/img/categories/' + (eachCategory.toLowerCase().includes('pizza') ? 'pizza' : eachCategory) + '.png)',
                                                                                    backgroundSize: 'cover',
                                                                                    backgroundPosition: 'center',
                                                                                    backgroundRepeat: 'no-repeat'
                                                                                }}/>
                                                                           <span
                                                                               className="categoryPageEachCategoryName">{persianName}</span>
                                                                       </div>
                                                                   </ButtonBase>
                                                               </a>


                                                           )
                                                       })
                                                       :
                                                       <div></div>
                                               }
                                           </div>

                                       </div>
                                   </div>

                                   {/*<FoodListPage foodList={this.state.currentFoodIDs}/>*/}
                                   {/*<ul*/}
                                   {/*    style={{*/}
                                   {/*        marginTop: "10px",*/}
                                   {/*        display: "flex",*/}
                                   {/*        flexDirection: "row",*/}
                                   {/*        overflowY: "hidden",*/}
                                   {/*        whiteSpace: "nowrap",*/}
                                   {/*        listStyleType: "none",*/}
                                   {/*        paddingLeft: "20px",*/}
                                   {/*        backgroundColor: "#e2e2e2",*/}
                                   {/*        flexWrap: "nowrap",*/}
                                   {/*        height: "70px",*/}
                                   {/*        justifyItems: "center"*/}
                                   {/*    }}*/}
                                   {/*>*/}
                                   {/*    /!*{this.state.catsFullInfo[this.state.currentActivePart].map(category => (*!/*/}
                                   {/*    /!*    <li*!/*/}
                                   {/*    /!*        key={category.id}*!/*/}
                                   {/*    /!*        style={{*!/*/}
                                   {/*    /!*            display: "inline-block",*!/*/}
                                   {/*    /!*            margin: "20px"*!/*/}
                                   {/*    /!*        }}*!/*/}
                                   {/*    /!*        ref={this[category.id]}*!/*/}
                                   {/*    /!*    >*!/*/}

                                   {/*    /!*    </li>*!/*/}
                                   {/*    /!*))}*!/*/}
                                   {/*</ul>*/}

                                   {/*<div id={'fader'}/>*/}

                                   {/*---------------------------------- FOODS ----------------------------------*/}
                                   <div style={{
                                       height: '100%',
                                       overflowY: 'scroll',
                                       scrollBehavior: 'smooth',
                                       paddingTop: '180px',
                                   }} id={'scroller'}>
                                       {
                                           this.state.catsFullInfo[this.state.currentActivePart] ? Object.keys(this.state.catsFullInfo[this.state.currentActivePart]).map(eachCat => {
                                                   let category = this.state.catsFullInfo[this.state.currentActivePart][eachCat]
                                                   // console.log(category.foodList)

                                                   // console.log(this.state.foodList)
                                                   let filteredFoods = this.state.foodList.filter(eachFood => {
                                                       if (eachFood) {
                                                           // console.log(eachFood.id)
                                                           return category.foodList.includes(eachFood.id);
                                                       }

                                                   })
                                                   // console.log('filtered foods')
                                                   // console.log(filteredFoods)
                                                   return (
                                                       <div className={'sections '} style={{
                                                           paddingTop: 170,
                                                           marginTop: -130
                                                       }} id={category['englishName']}>
                                                           <div className={'line'}>
                                                               <p style={{
                                                                   fontSize: '0.9rem',
                                                                   paddingTop: '15px'
                                                               }}
                                                                  className={'food-category-text text-black-50 IranSans'}>{category['persianName']}</p>

                                                           </div>
                                                           <div className={'mt-3 d-flex flex-wrap'}>


                                                               {
                                                                   filteredFoods.map(eachFood => {
                                                                       if (eachFood) {
                                                                           let colors = RandomColor.RandomColor(eachFood.id);
                                                                           let timeout;
                                                                           let isInOrderList = false;
                                                                           // if ((typeof this.props.orderList.filter(food => food.id === eachFood.id)[0] !== "undefined")) {
                                                                           //     isInOrderList = true;
                                                                           // }
                                                                           return (
                                                                               <div onContextMenu={(e) => {
                                                                                   e.preventDefault()
                                                                               }}
                                                                                    key={eachFood['id']}
                                                                                    className='foodListEachFoodContainer animate__animated animate__fadeInDown'
                                                                                    onClick={(e) => {
                                                                                        // // clearTimeout(timeout)
                                                                                        // if (eachFood.status === 'inStock') {
                                                                                        //     // if (!isInOrderList) {
                                                                                        //     //     this.orderScripts(eachFood.id);
                                                                                        //     // }
                                                                                        // }
                                                                                        // this.setState({allowToShow: false})
                                                                                        // if (!e.target.classList.contains('decrease') && (eachFood.status === 'inStock')) {
                                                                                        //     this.orderScripts(eachFood.id);
                                                                                        //     if ((eachFood.status === 'in stock' || eachFood.status === 'inStock') && !e.target.classList.contains('increase') && !e.target.classList.contains('decrease')) {
                                                                                        //         this.clickAnimation('food' + eachFood['id'])
                                                                                        //     }
                                                                                        // }
                                                                                        this.openExpander(e, true)


                                                                                    }}

                                                                                   // onTouchStart={(e) => {
                                                                                   //     if ((eachFood.status === 'in stock' || eachFood.status === 'inStock') && !e.target.classList.contains('increase') && !e.target.classList.contains('decrease')) {
                                                                                   //         this.pressAnimation('food' + eachFood['id'])
                                                                                   //     }
                                                                                   //     this.setState({
                                                                                   //         firstPointerPosition: {
                                                                                   //             x: e.targetTouches[0].pageX,
                                                                                   //             y: e.targetTouches[0].pageY
                                                                                   //         }
                                                                                   //     })
                                                                                   //     this.setState({allowToShow: true})
                                                                                   //     // timeout = setTimeout(() => {
                                                                                   //     //     if (this.state.allowToShow) {
                                                                                   //     //         this.foodDetails(eachFood);
                                                                                   //     //     }
                                                                                   //     //     this.setState({allowToShow: false})
                                                                                   //     //     clearTimeout(timeout)
                                                                                   //     // }, 400)
                                                                                   //
                                                                                   // }}
                                                                                   //
                                                                                   // onPointerMove={(e) => {
                                                                                   //     this.checkForMove(e)
                                                                                   // }}
                                                                                   // onTouchEnd={() => {
                                                                                   //     this.setState({allowToShow: false})
                                                                                   //     this.releaseAnimation('food' + eachFood['id'])
                                                                                   // }}
                                                                               >
                                                                                   <div className='foodListEachFood'
                                                                                        id={'food' + eachFood['id']}
                                                                                        style={{backgroundColor: colors.background}}>
                                                                                       {
                                                                                           parseInt(eachFood.discount) > 0 ?
                                                                                               <span
                                                                                                   className={'discountPercentage'}>{eachFood.discount ? eachFood.discount + "%" : '0'}  </span>
                                                                                               :
                                                                                               null
                                                                                       }
                                                                                       <div style={{
                                                                                           minHeight: '50px'
                                                                                       }} className='priceAndImage'>
                                                                                           {
                                                                                               (eachFood.status === 'in stock' || eachFood.status === 'inStock') ?
                                                                                                   eachFood.discount === 0 ?
                                                                                                       <span
                                                                                                           id={'food-price'}
                                                                                                           style={{
                                                                                                               position: 'absolute',
                                                                                                               left: 0,
                                                                                                               top: 0

                                                                                                           }}
                                                                                                           className='eachFoodPrice '>
                                                                                {eachFood.price / 1000} T
                                                                            </span>
                                                                                                       :
                                                                                                       <div

                                                                                                           className={'d-flex flex-column justify-content-center'}>

                                                                                                           <span
                                                                                                               style={{
                                                                                                                   textDecoration: 'line-through',
                                                                                                                   fontSize: '0.6rem',
                                                                                                                   lineHeight: '1.5rem',
                                                                                                                   color: '#787878'
                                                                                                               }}
                                                                                                               className='eachFoodPrice'>
                                                                                {eachFood.price / 1000} T
                                                                            </span>
                                                                                                           <span
                                                                                                               style={{fontWeight: 'bolder'}}
                                                                                                               className='eachFoodPriceDiscount'>
                                                                                {eachFood.price * (1 - eachFood.discount / 100) / 1000} T
                                                                            </span>
                                                                                                       </div>

                                                                                                   :
                                                                                                   <span
                                                                                                       className='outOfStockTextHolder'>
                                                                                ناموجود
                                                                           </span>
                                                                                           }
                                                                                           <div id={'food-image'}
                                                                                                className='eachFoodImage'
                                                                                                style={{
                                                                                                    background: "transparent",
                                                                                                    backgroundSize: 'cover',
                                                                                                    backgroundPosition: 'center',
                                                                                                    position: 'absolute',
                                                                                                    right: '0px',
                                                                                                    top: '0px'

                                                                                                }}>
                                                                                               <img
                                                                                                   src={eachFood['thumbnail']}
                                                                                                   style={{
                                                                                                       width: '100%',
                                                                                                       height: '100%',
                                                                                                       borderRadius: '50px'
                                                                                                   }}
                                                                                                   alt={'foodImage'}/>
                                                                                           </div>
                                                                                       </div>

                                                                                       {/*<div*/}
                                                                                       {/*    // className='w-100 justify-content-center d-flex'>*/}
                                                                                       <span id={'food-name'}
                                                                                             className='foodName'
                                                                                             style={{
                                                                                                 width: '100%',
                                                                                                 top: '60px',
                                                                                                 overflow: 'visible',
                                                                                                 right: 0,
                                                                                                 position: 'absolute',
                                                                                                 color: colors.foreground,
                                                                                                 fontSize: ((20 / eachFood['persianName'].length) >= 1.5 ? 1.5 : (20 / eachFood['persianName'].length)) + 'rem'
                                                                                             }}>{eachFood.persianName}</span>
                                                                                       {/*</div>*/}
                                                                                       {isInOrderList ?
                                                                                           <div
                                                                                               className={'foodNumberIncreaseDecreaseContainer  increase highBrightness d-flex flex-row justify-content-center  mt-3 animate__animated animate__fadeIn animate__faster'}>
                                                                                               <div
                                                                                                   style={{backgroundColor: colors.foreground + '50'}}
                                                                                                   onClick={() => {
                                                                                                       this.handleDecreaseFoodNumber(eachFood['id'])
                                                                                                   }}
                                                                                                   className={'decreaseFoodNumberButtonContainer decrease d-flex justify-content-center align-items-center'}>
                                                                                                   <div
                                                                                                       className="foodNumberIncreaseButton decrease d-flex justify-content-center align-items-center">
                                                                                                       <svg
                                                                                                           xmlns="http://www.w3.org/2000/svg"
                                                                                                           width="20"
                                                                                                           height="20"
                                                                                                           fill="black"
                                                                                                           className="bi bi-dash decrease"
                                                                                                           viewBox="0 0 16 16">
                                                                                                           <path
                                                                                                               className={'decrease'}
                                                                                                               d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                                                                                                       </svg>
                                                                                                   </div>
                                                                                               </div>
                                                                                               <div
                                                                                                   style={{backgroundColor: colors.foreground + '50'}}
                                                                                                   className={'FoodNumberHolderContainer increase d-flex justify-content-center align-items-center'}>
                                                                           <span
                                                                               className={'IranSans'}>{(this.props.orderList.filter(food => food.id === eachFood.id)[0] ? this.props.orderList.filter(food => food.id === eachFood.id)[0].number : 0)}</span>
                                                                                               </div>
                                                                                               <div
                                                                                                   style={{backgroundColor: colors.foreground + '50'}}
                                                                                                   onClick={() => {
                                                                                                       this.clickAnimation(eachFood['id'])
                                                                                                   }}
                                                                                                   className={'increaseFoodNumberButtonContainer increase d-flex justify-content-center align-items-center'}>
                                                                                                   <div
                                                                                                       className="foodNumberIncreaseButton increase d-flex justify-content-center align-items-center">
                                                                                                       <svg
                                                                                                           xmlns="http://www.w3.org/2000/svg"
                                                                                                           width="20"
                                                                                                           height="20"
                                                                                                           fill="black"
                                                                                                           className="bi bi-plus increase "
                                                                                                           viewBox="0 0 16 16">
                                                                                                           <path
                                                                                                               className={'increase'}
                                                                                                               d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                                                                                       </svg>
                                                                                                   </div>
                                                                                               </div>
                                                                                           </div>
                                                                                           :
                                                                                           <div
                                                                                               className='w-100 d-flex justify-content-center'>
                                                                                               <span id={'food-details'}
                                                                                                     style={{
                                                                                                         width: '100%',
                                                                                                         right: 0,
                                                                                                         position: 'absolute',
                                                                                                         top: '90px',
                                                                                                         overflow: 'hidden'
                                                                                                     }}
                                                                                                     className='foodDetails animate__animated animate__fadeInUp animate__faster'>{eachFood.details ? eachFood.details.join(' - ') : ''}
                                                                                               </span>
                                                                                           </div>
                                                                                       }

                                                                                   </div>
                                                                               </div>
                                                                           )
                                                                       }
                                                                   })

                                                               }


                                                               {/*{*/}
                                                               {/*    filteredFoods.map(eachfood => {*/}
                                                               {/*        return <h4>{eachfood['persianName']}</h4>*/}
                                                               {/*    })*/}
                                                               {/*}*/}

                                                           </div>
                                                           {/*<p>{this.state.catsFullInfo[this.state.currentActivePart][eachCat]}</p>*/}
                                                       </div>


                                                   )
                                               }) :
                                               <div></div>
                                       }

                                       <div style={{
                                           height: '70vh'
                                       }}/>
                                   </div>

                               </div>


                           </div>

                       }/>
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
