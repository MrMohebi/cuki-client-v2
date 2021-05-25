import React from "react";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import './css/ResDetails.css'
import {TextField} from "@material-ui/core";
import VerificationCodeInput from "../Components/VerificationCodeInput/vCodeInput";


class ResDetails extends React.Component{
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
                    <section className={'h-50 w-100'}>
                        <div className={'mt-3 w-100 d-flex flex-row justify-content-around align-items-center'}>
                            <div className={'w-75 text-right'}>09031232531</div>
                                <div className={'res-details-icons'}  ></div>
                        </div>
                    </section>

                </div>
            </React.Fragment>
            )

    }
}

export default ResDetails;