import React from "react";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import './css/style.css'
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';


class DongiPage extends React.Component {

    MakeItOpen = (id)=>{
        document.getElementById(id).classList.toggle('eachDongContainerOpened')
        let arrow = document.getElementById(id).getElementsByClassName('dongiArrowDown')[0]
        arrow.classList.toggle('rotate180deg')
    }
    render() {
        return (
            <React.Fragment>
                <div
                    className='categoryPageHeader pl-2 pr-2 pt-2 d-flex flex-row justify-content-between align-items-center'>
                    <ArrowBackRoundedIcon/>
                    <div className='text-center d-flex justify-content-around flex-row'>
                        <div className='IranSans'>نحوه پرداخت</div>
                    </div>
                    <ArrowBackRoundedIcon className='invisible'/>
                </div>

                <div className='dongiPageContainer d-flex flex-column'>

                    <div className='w-100 d-flex flex-column '>
                        <div id='anId' className='eachDongContainer position-relative w-100' >
                            <div className='eachDongContainerHolders' onClick={()=>{
                                this.MakeItOpen('anId')
                            }}>
                                <span className='eachDongFoodName font-weight-bold'>{'پیتزا قارچ و خامه  سس  '}</span>
                                <span className='IranSans DongiPayText eachDongFoodName font-weight-bold'>پرداخت </span>
                                <div className='howMuchContainer'>
                                    <div className='howMuchNumber IranSans'><span>تا </span> <span
                                        className='greenDongiText'>2 </span></div>
                                    <div className='IranSans'>110 T</div>
                                </div>
                                <span className='dongiFromText'>از</span>
                                <div className='howMuchContainer'>
                                    <div className='howMuchNumber IranSans'><span>تا </span> <span
                                        className='greenDongiText'>2 </span></div>
                                    <div className='IranSans'>110 T</div>
                                </div>
                            </div>
                            <div className='d-flex flex-row-reverse align-items-center dongNumberHolder text-center justify-content-center  m-auto'>

                                <AddRoundedIcon className='w-25'/>
                                <div className='dongNumberOfFood '>X 3</div>
                                <RemoveRoundedIcon className='w-25'/>

                            </div>
                            <ArrowDropDownRoundedIcon onClick={()=>{
                                this.MakeItOpen('anId')
                            }} className='position-absolute dongiArrowDown w-100 '/>

                        </div>
                    </div>
                    <div className='DongiSubmitButton mt-5'>
                        <span>پرداخت</span>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default DongiPage;