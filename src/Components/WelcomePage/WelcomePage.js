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
import {ButtonBase} from "@material-ui/core";

export const Swipeable = ({children, style, ...props}) => {
    const handlers = useSwipeable(props);
    return (<div style={style}  {...handlers}>{children}</div>);
}

class WelcomePage extends React.Component {
    state = {
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

    constructor(props) {
        super(props);
        this.Timer = React.createRef()
    }

    componentDidMount() {
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
        setInterval(this.updateTimer, 1000)
        setTimeout(() => {
            if (this.state.canCallPager) {
                if (this.props.tableScanned)
                    this.chefTooltip('با لمس گارسونمون میتونی صداش بزنی!', 0, 3000)
            }
        }, 1500)

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

    render() {
        return (
            <Swipeable style={{height: "100%", position: 'relative'}}
                // onSwipedRight={this.swipeRight}
                // onSwipedLeft={this.swipeLeft}
                       children={
                           <div className='welcomePageMainContainerCover w-100 h-100'>
                               <div className={'more-options'}
                                    onClick={
                                        () => {
                                            this.props.history.push('/resDetails')
                                        }

                                    }
                               >...
                               </div>
                               <div className="forLittlePhones">
                                   <p className="welcomePageHeader">
                            <span
                                className="textColor">{typeof this.state.resInfo == "object" ? this.state.resInfo.englishName : getComName()} </span>
                                       <span>  app</span>
                                   </p>
                                   <div className="welcomePageFrames1">
                                       <div className='HandAndHeaderText'>
                                           <span className="welcomePageDescriptionH"> دوست داری چی بخوری؟</span>
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
                                           <span className="welcomePageDescription">حتی میتونی دونگی پرداخت کنی</span>
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
                                                           this.setState({
                                                               currentActivePart: eachPart
                                                           })

                                                       }} key={eachPart}
                                                            className={"openIcons " + (this.state.currentActivePart === eachPart ? 'active-part' : '')}>
                                                           <img alt={'F'} src={'/img/resParts/' + eachPart + '.png'}
                                                                className="burger" style={{}}/>
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
                                   <div className={'pt-3 pb-1'}>
                                       <span className={'IranSans mt-3'}>دسته بندی</span>

                                   </div>

                               </div>
                               <div className={'w-100 '} style={{
                                   position: 'relative',
                               }}>

                                   <ButtonBase style={{
                                       height: 40,
                                       width: 40,
                                       position: 'absolute',
                                       zIndex: 2,
                                       left: 10,
                                       transform: 'translate(0,50%)',
                                       bottom: '50%',
                                       borderRadius: 50,
                                       background: 'white',
                                       boxShadow: '#c7c7c7 0px 0px 9px',
                                       fontSize: 20
                                   }}>
                                       <i className="fas fa-angle-left " style={{
                                           // border:'solid 1px gray',
                                           width: 50,
                                           height: 50,
                                           lineHeight: 2.5,
                                       }}/>
                                   </ButtonBase>

                                   <ButtonBase style={{
                                       height: 40,
                                       width: 40,
                                       position: 'absolute',
                                       zIndex: 2,
                                       right: 10,
                                       transform: 'translate(0,50%)',
                                       bottom: '50%',
                                       borderRadius: 50,
                                       background: 'white',
                                       boxShadow: '#c7c7c7 0px 0px 9px',
                                       fontSize: 20
                                   }}>
                                       <i className="fas fa-angle-right " style={{
                                           // border:'solid 1px gray',
                                           width: 50,
                                           height: 50,
                                           lineHeight: 2.5,
                                       }}/>
                                   </ButtonBase>


                                   <div className={'d-flex flex-row-reverse mt-3   '} style={{
                                       padding: '0 50px 0 50px',
                                       overflow: 'scroll',
                                   }}>
                                       {
                                           Object.keys(this.state.catsFullInfo[this.state.currentActivePart]).map(eachCategory => {
                                               let persianName = this.state.catsFullInfo[this.state.currentActivePart][eachCategory]['persianName']
                                               // let logo = this.state.catsFullInfo[this.props.match.params["part"]][eachCategory].logo
                                               // let color = this.state.catsFullInfo[this.props.match.params["part"]][eachCategory].averageColor.toString()
                                               return (
                                                   <ButtonBase style={{
                                                       borderRadius: 15,
                                                       transition: '0.2s ease ',
                                                       boxShadow:this.state.currentCat === eachCategory ?'orange 0 0 6px':'',
                                                       border: this.state.currentCat === eachCategory ? 'solid orange 1px' : 'white 1px solid'
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
                                                           <div className="categoryPageEachCategoryImage" style={{
                                                               backgroundImage: 'url(/img/categories/' + (eachCategory.toLowerCase().includes('pizza') ? 'pizza' : eachCategory) + '.png)',
                                                               backgroundSize: 'cover',
                                                               backgroundPosition: 'center',
                                                               backgroundRepeat: 'no-repeat'
                                                           }}/>
                                                           <span
                                                               className="categoryPageEachCategoryName">{persianName}</span>
                                                       </div>
                                                   </ButtonBase>
                                               )
                                           })
                                       }
                                   </div>

                               </div>

                               <FoodListPage foodList={this.state.currentFoodIDs}/>
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
