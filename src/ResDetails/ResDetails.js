import React from "react";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import './css/ResDetails.css'
import phoneImage from './img/phone.png';
import instagramImage from './img/instagram.png';
import locationImage from './img/location.png';
import {TextField} from "@material-ui/core";
import VerificationCodeInput from "../Components/VerificationCodeInput/vCodeInput";

import * as requests from '../ApiRequests/ApiRequests'


class ResDetails extends React.Component{

    state = {
        resPhone:'',
        resAddress:'',
        resInstagram:'',
        resWebsite:''
    }
    componentDidMount() {
        requests.getRestaurantInfo((res)=>{
            let data = res['data']['restaurantInfo'];
            console.log(data)
            this.setState({
                resPhone:JSON.parse(data.phone).join(',  '),
                resAddress:data.address
            })
            console.log(res)
        })
    }



    render() {
        return (
            <React.Fragment>
                <div
                    className='categoryPageHeader  pl-2 pr-2 pt-2 d-flex flex-row justify-content-between align-items-center'>
                    <ArrowBackRoundedIcon onClick={this.handleBack}/>
                    <div className='categoryPageSelector text-center d-flex justify-content-around flex-row'>
                        <div className='categoryPageSelectorText IranSans'>اظلاعات رستوران</div>
                    </div>
                    <ArrowBackRoundedIcon className='invisible'/>
                </div>
                <div className='resDetailsContainer IranSansLight'>
                    <section className={' w-100'}>
                        <div className={'mt-5 w-100 d-flex flex-row justify-content-around align-items-center'}>
                            <div className={'w-75 text-right'}>{this.state.resPhone}</div>
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
                                <div className={'w-100 text-right pr-3 mt-5 IranSans'} style={{fontSize:'1.5rem'}}>شروع کار مجموعه</div>

                            </div>




                    </section>


                </div>
            </React.Fragment>
            )

    }
}

export default ResDetails;