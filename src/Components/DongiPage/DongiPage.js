import React from "react";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import './css/style.css'
class DongiPage extends React.Component{
    render(){
        return(
            <React.Fragment>
                <div
                    className='categoryPageHeader pl-2 pr-2 pt-2 d-flex flex-row justify-content-between align-items-center'>
                    <ArrowBackRoundedIcon/>
                    <div className='text-center d-flex justify-content-around flex-row'>
                        <div className='IranSans'>نحوه پرداخت</div>
                    </div>
                    <ArrowBackRoundedIcon className='invisible'/>
                </div>
                <div className='dongiPageContainer d-flex flex-column '>



                    <div className='eachDongContainer w-100 d-flex flex-row-reverse'>
                        <span className='eachDongFoodName font-weight-bold'>{'پیتزا قارچ و خامه '}<span> </span><span className='IranSans DongiPayText'>پرداخت </span></span>
                        <div className='howMuchContainer'>
                            <div className='howMuchNumber IranSans'><span>تا </span> <span className='greenDongiText'>2 </span></div>
                            <div className='IranSans'>110 T</div>
                        </div>
                        <span className='dongiFromText'>از</span>
                        <div className='howMuchContainer'>
                            <div className='howMuchNumber IranSans'><span>تا </span> <span className='greenDongiText'>2 </span></div>
                            <div className='IranSans'>110 T</div>
                        </div>
                    </div>



                    <div className='eachDongContainer w-100 d-flex flex-row-reverse'>
                        <span className='eachDongFoodName font-weight-bold'>{'پیتزا قارچ و خامه '}<span> </span><span className='IranSans DongiPayText'>پرداخت </span></span>
                        <div className='howMuchContainer'>
                            <div className='howMuchNumber IranSans'><span>تا </span> <span className='greenDongiText'>2 </span></div>
                            <div className='IranSans'>110 T</div>
                        </div>
                        <span className='dongiFromText'>از</span>
                        <div className='howMuchContainer'>
                            <div className='howMuchNumber IranSans'><span>تا </span> <span className='greenDongiText'>2 </span></div>
                            <div className='IranSans'>110 T</div>
                        </div>
                    </div>



                    <div className='eachDongContainer w-100 d-flex flex-row-reverse'>
                        <span className='eachDongFoodName font-weight-bold'>{'پیتزا قارچ و خامه '}<span> </span><span className='IranSans DongiPayText'>پرداخت </span></span>
                        <div className='howMuchContainer'>
                            <div className='howMuchNumber IranSans'><span>تا </span> <span className='greenDongiText'>2 </span></div>
                            <div className='IranSans'>110 T</div>
                        </div>
                        <span className='dongiFromText'>از</span>
                        <div className='howMuchContainer'>
                            <div className='howMuchNumber IranSans'><span>تا </span> <span className='greenDongiText'>2 </span></div>
                            <div className='IranSans'>110 T</div>
                        </div>
                    </div>




                </div>
            </React.Fragment>
        )
    }
}
export default DongiPage;