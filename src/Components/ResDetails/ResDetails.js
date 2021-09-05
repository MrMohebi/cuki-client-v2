import React from "react";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import './css/ResDetails.css'
import phoneImage from './img/phone.png';
import instagramImage from './img/instagram.png';
import locationImage from './img/location.png';

import * as ls from "../../stores/localStorage/localStorage"
import * as requests from '../../ApiRequests/ApiRequests'


class ResDetails extends React.Component{

    // TODO:show all res data base on resInfo field
    state = {
        resInfo:ls.getLSResInfo(),
        resPhone:'',
        resAddress:'',
        resInstagram:'',
        resWebsite:'',
        logoLink:'',
        openTimes:[[],[],[],[],[],[],[],]
    }
    componentDidMount() {

        // if(typeof this.state.resInfo !== "object"){
            this.getResData()
        // }
    }

    handleBack = ()=>{
        this.props.history.goBack();
    }

    getResData = () =>{

        requests.getRestaurantInfo((res)=>{
            if(res.hasOwnProperty("statusCode") && res.statusCode === 200){
                ls.setLSResInfo(res.data)
                this.setState({
                    resInfo:res.data,
                    logoLink:res.data['logoLink'],
                    resInstagram:res.data['socialLinks'],
                    openTimes:JSON.parse(res.data['openTime'])

                })
            }
        })
    }



    render() {
        return (
            <React.Fragment>
                <div className='categoryPageHeader  pl-2 pr-2 pt-2 d-flex flex-row justify-content-between align-items-center'>
                    <ArrowBackRoundedIcon onClick={this.handleBack}/>
                    <div className='categoryPageSelector text-center d-flex justify-content-around flex-row'>
                        <div className='categoryPageSelectorText IranSans'>اظلاعات رستوران</div>
                    </div>
                    <ArrowBackRoundedIcon className='invisible'/>
                </div>
                <div className='resDetailsContainer IranSansLight'>
                    <div className={'w-100 d-flex justify-content-center align-items-center'}>
                        <img className={'res-details-logo'} src={this.state.logoLink} style={{opacity:this.state.logoLink?1:0,transition:'all 0.5s ease'}} alt=''/>
                    </div>

                    <section className={' w-100'} style={{transition:'all 0.2s ease',opacity:this.state.resPhone?1:0,display:this.state.resPhone.length?'block':'none'}}>

                        <div className={'mt-5 w-100 d-flex flex-row justify-content-around align-items-center'}>
                            <span className={'w-75 text-right'}>{this.state.resPhone}</span>
                                <div className={'res-details-icons'} style={{background:`url(${phoneImage})`,backgroundSize:'cover'}}/>
                        </div>
                        <div className={'mt-3 w-100 d-flex flex-row justify-content-around align-items-center'}>
                            <div className={'w-75 text-right'}>{this.state.resAddress}</div>
                                <div className={'res-details-icons'} style={{background:`url(${locationImage})`,backgroundSize:'cover'}}/>
                        </div>

                    </section>
                    <section>
                        {this.state.resInstagram?
                            <div>
                                <div className={'w-100 text-right pr-3 mt-5 IranSans'} style={{fontSize:'1.5rem'}}>لینک ارطباتی</div>
                                <div className={'mt-3 w-100 d-flex flex-row justify-content-around align-items-center'}>
                                    <div className={'w-75 text-right'}>{this.state.resAddress}</div>
                                    <div className={'res-details-icons'} style={{background:`url(${instagramImage})`,backgroundSize:'cover'}}/>
                                </div>
                            </div>
                            :
                            <div/>
                        }


                    </section>

                    <section>

                            <div>
                                <div className={'w-100  mt-5 IranSans'} style={{fontSize:'1.5rem'}}>ساعات کار مجموعه</div>

                            </div>
                        <div className={'res-details-open-time-container d-flex flex-column align-items-start rtl'}>
                            <span className={'open-time-texts'}>شنبه از {this.state.openTimes[0][0]} تا {this.state.openTimes[0][this.state.openTimes[0].length-1]}</span>
                            <span className={'open-time-texts'}>یک شنبه از {this.state.openTimes[1][0]} تا {this.state.openTimes[1][this.state.openTimes[1].length-1]}</span>
                            <span className={'open-time-texts'}>دو شنبه از {this.state.openTimes[2][0]} تا {this.state.openTimes[2][this.state.openTimes[2].length-1]}</span>
                            <span className={'open-time-texts'}>سه شنبه از {this.state.openTimes[3][0]} تا {this.state.openTimes[3][this.state.openTimes[3].length-1]}</span>
                            <span className={'open-time-texts'}>چهار شنبه از {this.state.openTimes[4][0]} تا {this.state.openTimes[4][this.state.openTimes[5].length-1]}</span>
                            <span className={'open-time-texts'}>پنج شنبه از {this.state.openTimes[5][0]} تا {this.state.openTimes[5][this.state.openTimes[5].length-1]}</span>
                            <span className={'open-time-texts'}>جمعه از {this.state.openTimes[6][0]} تا {this.state.openTimes[6][this.state.openTimes[6].length-1]}</span>




                            {/*<span className={'open-time-texts'}>یکشنبه از 0 تا 04</span>*/}
                            {/*<span className={'open-time-texts'}>دوشنبه از 0 تا 04</span>*/}
                            {/*<span className={'open-time-texts'}>سه شنبه از 0 تا 04</span>*/}
                            {/*<span className={'open-time-texts'}>چهار شنبه از 0 تا 04</span>*/}
                            {/*<span className={'open-time-texts'}>پنج شنبه از 0 تا 04</span>*/}
                            {/*<span className={'open-time-texts'}>جمعه از 0 تا 04</span>*/}
                        </div>




                    </section>


                </div>
            </React.Fragment>
            )

    }
}

export default ResDetails;