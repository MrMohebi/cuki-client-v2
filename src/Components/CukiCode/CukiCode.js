import React from "react";
import {CircularProgress} from "@material-ui/core";
import * as requests from '../../ApiRequests/ApiRequests'
import './css/CukiCode.css';
import * as PropTypes from "prop-types";
import {CircleSpinner, SphereSpinner} from "react-spinners-kit";
import * as queries from '../../ApiRequests/ApiRequests'


function Alert() {
    return null;
}

Alert.propTypes = {
    severity: PropTypes.string,
    onClose: PropTypes.any,
    children: PropTypes.node
};


class CukiCode extends React.Component {

    state = {
        inputValue: '',
        restaurantsPersianName: [],
        restaurantsEnglishName: [],
        loadingRestaurants:true,
    }


    componentDidMount() {
        queries.getAllRestaurants((res) => {
            if (res['statusCode'] === 200) {

                this.setState({
                    restaurantsPersianName: res['data']['persianNames'],
                    restaurantsEnglishName: res['data']['englishNames'],
                    loadingRestaurants:false
                })
            }
        })
    }

    getCodeCallback = (res) => {
        if (res.statusCode === 200) {
            window.location.href = "/c-" + res.data.resEnglishName
        } else {
            this.setState({
                submitButtonInside: 'مشاهده مجموعه',
                buttonAndTextFieldDisabled: false,
                errorSnackbar: true
            })
            setTimeout(() => {
                this.setState({
                    errorSnackbar: false
                })
            }, 1500)
        }

    }

    handleSubmitClick = (event) => {
        event.preventDefault()
        this.setState({
            submitButtonInside: <CircularProgress size={28} color={"inherit"}/>,
            buttonAndTextFieldDisabled: true
        })
        requests.getResByCode(this.state.code, this.getCodeCallback)
    }

    handleChangeCodeInput = (event) => {
        if (event.target.value < 10000)
            this.setState({code: event.target.value})
    }


    render() {

        return (
            <div className={'w-100 h-100 d-flex flex-column align-items-center px-3  position-relative'}>
                <div className={'main-code-section mt-4 mr-4 ml-4 d-flex flex-column align-items-center pt-4'}>
                    <img src="/img/logo/logoNoText64x64.png" alt="Cuki"/>
                    <h6 className={'cuki-code-header-text'}>cuki</h6>
                    <div
                        className={'input-section  px-2 mb-4 mt-5 d-flex flex-row align-items-center position-relative'}>
                        <div className={'d-flex justify-content-center align-items-center'} style={{
                            width: 30,
                            height: 30,
                        }}>

                            <div style={{
                                transition: '.3s ease',
                                opacity: this.state.inputValue ? 1 : 0
                            }}>
                                {
                                    this.state.inputValue ?
                                        <SphereSpinner color={'gray'} size={20}/>
                                        :
                                        <div/>
                                }
                            </div>
                        </div>

                        <span style={{
                            transform: `translateY(${this.state.inputValue ? '-40px' : '0px'})`,
                            transition: '.2s ease'
                        }} className={'search-place-holder IranSans'}> جستجوی رستوران</span>

                        <input id={'search-input'} onChange={(e) => {
                            this.setState({
                                inputValue: e.target.value
                            })
                        }} className={'IranSans'} style={{
                            outline: 'none',
                            border: 'none',
                            height: 50,
                            background: 'transparent',
                            fontSize: '0.9rem', zIndex: '9'
                        }} dir={'rtl'} type="text"/>
                        <div style={{
                            opacity: this.state.inputValue ? 1 : 0,
                            transition: '0.4 ease'
                        }} className={'auto-complete-holder '}>
                            {
                                this.state.restaurantsPersianName.map((eachRes, index) => {
                                    if (eachRes.includes(this.state.inputValue) && this.state.inputValue) {
                                        return (
                                            <div className={'each-suggest IranSans'} onClick={() => {
                                                window.location.href = window.location.origin+`/c-${this.state.restaurantsEnglishName[index]}`
                                            }}>{eachRes}</div>
                                        )


                                    }
                                })
                            }
                        </div>
                    </div>
                </div>

                <div className={'restaurants-container mt-4 d-flex flex-column align-items-center '}>
                    <div
                        className={'restaurants-header d-flex flex-column w-100 align-items-center'}>
                        <div className={'drawer shadow-sm'}/>
                        <h6 className={'mt-4'} style={{
                            fontFamily: 'AppIranSansBold'
                        }}>رستوران های برتر</h6>
                        <span className={'IranSansLight'} style={{
                            fontSize: '0.7rem',
                            whiteSpace:'nowrap'
                        }}>( بر اساس امتیاز)</span>
                    </div>

                    <div className={'d-flex w-100  mt-3 pb-3 px-3 '+(this.state.loadingRestaurants?"justify-content-center flex-row":" flex-wrap justify-content-between ")}>
                        {
                            !this.state.loadingRestaurants?
                            this.state.restaurantsPersianName.map((eachItem,index)=>{
                                return(
                                    <div className={'each-res-holder'} onClick={()=>{
                                        window.location.href = window.location.origin+`/c-${this.state.restaurantsEnglishName[index]}`
                                    }}>
                                    <div className={'each-res d-flex flex-row justify-content-between align-items-center px-3'}>
                                        <div className={'res-score'}>4.2</div>
                                        <img width={29} height={29} src="/img/logo/logoNoText64x64.png" alt=""/>
                                        <span className={'text-center IranSans w-100'}>{eachItem}</span>
                                    </div>
                                </div>
                                )
                            })
                                :
                                <CircleSpinner color={'#af9e9e'}/>
                        }
                        
                    </div>

                </div>
            </div>
        )
    }
}

export default CukiCode;