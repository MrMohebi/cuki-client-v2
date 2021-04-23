import React, {useState} from "react";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import './css/style.css'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents} from 'react-leaflet'
import L from 'leaflet'
import "leaflet/dist/leaflet.css"
import markerPNG from './img/marker.png'
import markerShadowPNG from './img/marker-shadow.png'
import {connect} from "react-redux";
import * as requests from "../../ApiRequests/ApiRequests";
import * as actions from "../../stores/reduxStore/actions";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import {useSwipeable} from 'react-swipeable';
import cashBlack from './img/cashBlack.png'
import cashWhite from './img/cashWhite.png'
import onlineBlack from './img/onlineBlack.png'
import onlineWhite from './img/onlineWhite.png'
import waiterBlack from './img/waiterBlack.png'
import waiterWhite from './img/waiterWhite.png'
import outResBlack from './img/outResBlack.png'
import outResWhite from './img/outResWhite.png'
import fixBodyClass from "../../functions/fixSwalBody";
import {HashLoader} from "react-spinners";
import LoadingOverlay from "react-loading-overlay";

export const Swipeable = ({children, style, ...props}) => {
    const handlers = useSwipeable(props);
    return (<div style={style} {...handlers}>{children}</div>);
}

const ReactSwal = withReactContent(Swal)

let coordinates = [30.287486, 57.052301]

let markerIcon = L.icon({
    iconUrl: markerPNG,
    shadowUrl: markerShadowPNG,

    iconSize:     [40, 60], // size of the icon
    shadowSize:   [40, 30], // size of the shadow
    iconAnchor:   [20, 60], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 30],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});


function MarkerToolTip() {
    let [position, setPosition] = useState(coordinates)
    useMapEvents({
        click: (e) => {
            coordinates = [e.latlng['lat'], e.latlng['lng']]
            setPosition(e.latlng)
            document.getElementsByClassName('payWayContainer')[0].scrollBy(0,250)
        },
    })
    return position === null ? null : (
        <Marker icon={markerIcon} position={position}>
            <Popup>حله همین جا</Popup>
        </Marker>
    )
}


class PayWay extends React.Component{

    constructor(props) {
        super(props)
        this.mapDetailsTableContainer = React.createRef()
    }


    state = {
        outResClass:'',
        inResClass:'',
        onlineClass:'',
        offlineClass:'',
        tableClass:'tableContainerClass',
        table:this.props.tableScanned > 0 ? this.props.tableScanned:"",
        addressDetailsClass:'addressDetails',
        mapClass:'mapContainer',
        inOrOut: 'in',
        onlineOrCash:'online',
        addressDetails: '',
        textHolderDetailsClass:'w-100 IranSans text-right mt-3',
        iconSize:'20px',
        onlineIcon:onlineWhite,
        cashIcon:cashBlack,
        inResIcon:waiterBlack,
        outResIcon:outResBlack,
        loading: false,
        orderDetails:'',
    }
    componentDidMount() {
        this.state.inOrOut === 'in' ? this.enableInRes() : this.enableOutRes()
        this.state.onlineOrCash === 'online' ? this.enableOnline() : this.enableCash()

        if (this.state.inOrOut === 'in'){
            this.setState({
                addressDetailsClass:'d-none',
                mapClass:'d-none',
                tableClass:'animate__animated animate__fadeInRight tableContainerClass'
            })
        }else{
            this.setState({
                addressDetailsClass:'d-animate__animated animate__fadeInRight addressDetails',
                mapClass:'d-animate__animated animate__fadeInUp mapContainer',
                tableClass:'d-none tableContainerClass',
            })
        }


    }

    enableInRes = () =>{
        this.setState({
            inResClass:'payWayActive',
            outResClass:'payWayNormal',
            inOrOut:'in',
            tableClass:'animate__animated animate__fadeInRight tableContainerClass',
            mapClass:'animate__animated animate__fadeOut mapContainer d-none',
            addressDetailsClass:'animate__animated animate__fadeOut d-none',
            textHolderDetailsClass:'d-none',
            outResIcon:outResWhite,
            inResIcon:waiterBlack

        })
        this.mapDetailsTableContainer.current.style.height = '80px'
    }

    enableOutRes = () =>{
        this.setState({
            inResClass:'payWayNormal',
            outResClass:'payWayActive',
            inOrOut:'out',
            tableClass:'h-0Animate',
            mapClass:'animate__animated animate__fadeIn mapContainer',
            addressDetailsClass:'animate__animated animate__fadeIn addressDetails ',
            textHolderDetailsClass:'w-100 IranSans text-right mt-3',
            outResIcon:outResBlack,
            inResIcon:waiterWhite
        })
        this.mapDetailsTableContainer.current.style.height = '1000px'
    }

    enableOnline = () =>{
        this.setState({
            onlineClass:'payWayActive',
            offlineClass:'payWayNormal',
            onlineOrCash:'online',
            onlineIcon:onlineWhite,
            cashIcon:cashBlack
        })
    }
    enableCash = () =>{
        this.setState({
            onlineClass:'payWayNormal',
            offlineClass:'payWayActive',
            onlineOrCash:'cash',
            cashIcon:cashWhite,
            onlineIcon:onlineBlack
        })

    }

    calTotalPrice = () =>{
        let totalPrice = 0;
        for (let i = 0; i <= this.props.orderList.length; i++) {
            if (this.props.orderList[i]) {
                totalPrice += this.props.orderList[i].totalPrice
            }
        }
        return totalPrice
    }


    handleSubmit = () =>{
        if(this.state.inOrOut === "in" && this.state.table < 1){
            ReactSwal.fire({
                title: 'نه صبر کن',
                icon: 'info',
                confirmButtonText: "اها اوکیه وایسا",
                text: "!شماره میزت رو نگفتی"
            })
            fixBodyClass()
            return ;
        }else if(this.state.inOrOut === "out" && coordinates[0] === 30.287486 && coordinates[1] === 57.052301){
            ReactSwal.fire({
                title: 'نه صبر کن',
                icon: 'info',
                confirmButtonText: "اها اوکیه وایسا",
                text: "!آدرس رو نگفتی که"
            })
            fixBodyClass()
            return ;
        }

        if(this.calTotalPrice() < 900){
            ReactSwal.fire({
                title: 'نه صبر کن',
                icon: 'info',
                confirmButtonText: "حله",
                text: "سفارشت رو فکر کنم قبلا ثبت کردیم. توی سفارشت باز اون پایین باید باشه."
            })
            fixBodyClass()
            return ;
        }

        ReactSwal.fire({
            title: 'خب در مجموع',
            icon: 'info',
            confirmButtonText: 'سفارشم رو ثبت کن',
            showDenyButton: true,
            denyButtonText: "نه وایسا یه چیزو عوض کنم",
            text: 'قیمت کل  فاکتور: ' + this.calTotalPrice() / 1000 + "هزار تومن \n",
        }).then(result => {
            if (result.isConfirmed) {
                this.setState({loading:true})
                if(this.state.inOrOut === "in"){
                    requests.sendOrder(
                        this.callbackSendOrder,
                        this.state.table,
                        {},
                        this.props.orderList.map(eachFood =>{return {id:eachFood.foods_id, number:eachFood.number}}),
                        this.state.orderDetails
                    )
                }else {
                    requests.sendOrder(
                        this.callbackSendOrder,
                        "",
                        {coordinates:coordinates, addressDetails: this.state.addressDetails},
                        this.props.orderList.map(eachFood =>{return {id:eachFood.foods_id, number:eachFood.number}}),
                        this.state.orderDetails
                    )
                }
            }
        })
        fixBodyClass()

    }

    getOpenOrders=()=>{
        requests.getOpenOrders(this.callbackOpenOrders, this.props.token);
    }
    callbackOpenOrders = (res) =>{
        if(res.hasOwnProperty("statusCode") && res.statusCode === 200){
            actions.setOpenOrdersListInfo(res.data)
        }
    }

    callbackSendOrder = (res) =>{
        this.setState({loading:false})
        if(res.hasOwnProperty("statusCode") && res.statusCode === 200){
            this.props.setOrderList([])
            this.props.setTrackingId(res.data.trackingId)
            ReactSwal.fire({
                title: 'تمومه',
                icon: 'success',
                confirmButtonText: 'اوکیه',
                html: "خب سفارشت رو ثبت کردیم؛<br/>" +
                    "(: یکم دیگه آمادس<br/>" +
                     `<span style='font-weight: bold'>${res.data.trackingId}</span> :شماره سفارش`
            }).then(() => {
                this.getOpenOrders()
                if(this.state.onlineOrCash === "cash"){
                    this.props.history.push("/main")
                }else {
                    this.props.history.push("/dongi?trackingId="+res.data.trackingId)
                }
            })
            fixBodyClass()
        }
    }

    swipeRight = () => {
        // if(this.props.openOrdersList.length !== 0){
        //     this.props.history.push("/openOrders")
        // } else{
        //     this.props.history.push("/login")
        // }
    }

    swipeLeft = () => {
        // this.props.history.push("/main")
    }


    handleBack = () =>{
        this.props.history.goBack();
    }

    render(){
        return(
            <Swipeable style={{height: "100%"}} onSwipedRight={this.swipeRight} onSwipedLeft={this.swipeLeft} children={
                <LoadingOverlay
                    active={this.state.loading}
                    spinner={<HashLoader
                        css={{
                            transform: 'translate(-50%,-250%) !important',
                            position: 'absolute',
                            left: '50%'
                        }}
                        color={'white'}/>}
                    text='... سفارش ثبت شه'
                >
                    <React.Fragment>
                        <div
                            className='categoryPageHeader pl-2 pr-2 pt-2 d-flex flex-row justify-content-between align-items-center'>
                            <ArrowBackRoundedIcon onClick={this.handleBack}/>
                            <div className='text-center d-flex justify-content-around flex-row'>
                                <div className='IranSans'>نحوه پرداخت</div>
                            </div>
                            <ArrowBackRoundedIcon className='invisible'/>
                        </div>
                        <div  className='payWayContainer'>
                            <div className='payWayOptionsContainer d-flex flex-row-reverse justify-content-between'>
                                <span className='IranSans payWayText ' >نحوه پرداخت چجوری باشه؟</span>
                                <div className='payWayButtonsContainer d-flex flex-column justify-content-between'>
                                    <div className={this.state.onlineClass} onClick={this.enableOnline}
                                    >آنلاین
                                        <div className='payWayButtonIcons' style={{height:this.state.iconSize,width:this.state.iconSize,background:`url(${this.state.onlineIcon})`,backgroundRepeat:'no-repeat',backgroundSize:'cover'}}/>
                                    </div>

                                    <div className={this.state.offlineClass} onClick={this.enableCash}>نقدی
                                        <div className='payWayButtonIcons' style={{height:this.state.iconSize,width:this.state.iconSize,background:`url(${this.state.cashIcon})`,backgroundRepeat:'no-repeat',backgroundSize:'cover'}}/>
                                    </div>
                                </div>
                            </div>
                            <div className='payWayOptionsContainer d-flex flex-row-reverse justify-content-between'>
                                <span className='IranSans payWayText ' >تحویل سفارش چطور؟</span>
                                <div className='payWayButtonsContainer d-flex flex-column justify-content-between'>
                                    <div className={this.state.inResClass +' inResTextSmaller'} onClick={this.enableInRes}>
                                        درون رستوران
                                        <div className='payWayButtonIcons' style={{height:this.state.iconSize,width:this.state.iconSize,background:`url(${this.state.outResIcon})`,backgroundRepeat:'no-repeat',backgroundSize:'cover'}}/>
                                    </div>
                                    <div className={this.state.outResClass} onClick={this.enableOutRes}>بیرون بر
                                        <div className='payWayButtonIcons' style={{height:this.state.iconSize,width:this.state.iconSize,background:`url(${this.state.inResIcon})`,backgroundRepeat:'no-repeat',backgroundSize:'cover'}}/>
                                    </div>

                                </div>
                            </div>
                            <div  ref={this.mapDetailsTableContainer} className='mapDetailsTableContainer'>
                                <div className={this.state.mapClass}>
                                    <MapContainer zoomControl={false} style={{height: "300px"}} center={coordinates} zoom={15} >
                                        <TileLayer
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                        <MarkerToolTip/>
                                    </MapContainer>
                                </div>
                                <div className={this.state.textHolderDetailsClass}> : توضیحات آدرس</div>
                                <textarea name="Text1" cols="40" rows="5" className={this.state.addressDetailsClass} onChange={(e)=>{
                                    this.setState({
                                        addressDetails:e.target.value.toString(),
                                    })
                                }}/>

                                <div className={this.state.tableClass}>
                                    <span className='tableTextHolder'>شماره میز</span>
                                    <input value={this.state.table} placeholder='000' type='number' className='tableInput' onChange={(e)=>( e.target.value.length > 3 ? null : this.setState({table:e.target.value}))}/>
                                </div>
                            </div>
                            <div className={'w-100 IranSans text-right mt-3'}> : توضیحات سفارش</div>
                            <textarea name="Text1" cols="40" rows="5" className={"addressDetails mb-2"} onChange={(e)=>{
                                this.setState({
                                    orderDetails:e.target.value.toString(),
                                })
                            }}/>
                            <div className='BillSubmitButton mt-2' onClick={this.handleSubmit}>
                                <span>پرداخت</span>
                            </div>
                        </div>
                    </React.Fragment>
                </LoadingOverlay>
            }/>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        openOrdersList: store.rTempData.openOrdersList,
        token:store.rUserInfo.token,
        orderList: store.rTempData.orderList,
        trackingId: store.rTempData.trackingId,
        tableScanned:store.rTempData.tableScanned,
    }
}

const mapDispatchToProps = () => {
    return {
        setTrackingId: actions.setTrackingId,
        setOrderList:actions.setOrderList,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PayWay);
