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
import cashBlack from './img/cashBlack.png'
import cashWhite from './img/cashWhite.png'
import inRes from './img/outOfRes.png'
import outOfRes from './img/outOfRes.png'
import onlineBlack from './img/onlineBlack.png'
import onlineWhite from './img/onlineWhite.png'
import waiterBlack from './img/waiterBlack.png'
import waiterWhite from './img/waiterWhite.png'

const ReactSwal = withReactContent(Swal)

let coordinates = [30.287486, 57.052301]

let markerIcon = L.icon({
    iconUrl: markerPNG,
    shadowUrl: markerShadowPNG,

    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});


function MarkerToolTip() {
    let [position, setPosition] = useState(coordinates)
    const map = useMapEvents({
        click: (e) => {
            coordinates = [e.latlng['lat'], e.latlng['lng']]
            setPosition(e.latlng)
            document.getElementsByClassName('payWayContainer')[0].scrollBy(0,250)
        },
    })
    return position === null ? null : (
        <Marker icon={markerIcon} position={position}>
            <Popup>You clicked here</Popup>
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
        table:'',
        addressDetailsClass:'addressDetails',
        mapClass:'mapContainer',
        inOrOut: 'out',
        onlineOrCash:'cash',
        addressDetails: '',
        textHolderDetailsClass:'w-100 IranSans text-right mt-3',
        iconSize:'20px'
    }
    componentDidMount() {
        this.state.inOrOut === 'in' ? this.enableInRes() : this.enableOutRes()
        this.state.onlineOrCash === 'online' ? this.enableOnline() : this.enableCash()

        if (this.state.inOrOut === 'in'){
            this.setState({
                addressDetailsClass:'d-none',
                mapClass:'d-none',
                tableClass:'animate__animated animate__fadeInUp tableContainerClass'
            })
        }else{
            this.setState({
                addressDetailsClass:'d-animate__animated animate__fadeInUp addressDetails',
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
            textHolderDetailsClass:'d-none'

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
            textHolderDetailsClass:'w-100 IranSans text-right mt-3'
        })
        this.mapDetailsTableContainer.current.style.height = '1000px'
    }

    enableOnline = () =>{
        this.setState({
            onlineClass:'payWayActive',
            offlineClass:'payWayNormal',
            onlineOrCash:'online'
        })
    }
    enableCash = () =>{
        this.setState({
            onlineClass:'payWayNormal',
            offlineClass:'payWayActive',
            onlineOrCash:'cash',
            cashIcon:cashBlack
        })
    }

    calTotalPrice = () =>{
        let totalPrice = 0;
        for (let i = 0; i <= this.props.orderList.length; i++) {
            if (this.props.orderList[i]) {
                totalPrice = totalPrice + this.props.orderList[i].price * this.props.orderList[i].number
            }
        }
        return totalPrice
    }


    handleSubmit = () =>{
        if(!((this.state.inOrOut === "in" && this.state.table.toString().length > 2) || this.state.inOrOut === "out")){
            ReactSwal.fire({
                title: 'نه صبر کن',
                icon: 'info',
                confirmButtonText: "اها اوکیه وایسا",
                text: "!یه چیز رو کامل وارد نکردی"
            })
            return ;
        }

        ReactSwal.fire({
            title: 'خب در مجموع',
            icon: 'info',
            confirmButtonText: 'سفارشمو ثبت کن',
            showDenyButton: true,
            denyButtonText: "نه وایسا یه چیزو عوض کنم",
            text: 'قیمت کل  فاکتور: ' + this.calTotalPrice() / 1000 + "هزار تومن \n",
        }).then(result => {
            if (result.isConfirmed) {
                if (this.props.trackingId < 1000) {
                    if(this.state.inOrOut === "in"){
                        requests.sendOrder(
                            this.callbackSendOrder,
                            this.state.table,
                            {},
                            this.props.orderList.map(eachFood =>{return {id:eachFood.foods_id, number:eachFood.number}})
                        )
                    }else {
                        requests.sendOrder(
                            this.callbackSendOrder,
                            "",
                            {coordinates:coordinates, addressDetails: this.state.addressDetails},
                            this.props.orderList.map(eachFood =>{return {id:eachFood.foods_id, number:eachFood.number}}),
                        )
                    }
                }
            }
        })
    }

    callbackSendOrder = (res) =>{
        console.log(res);
        console.log(res.statusCode)
        if(res.hasOwnProperty("statusCode") && res.statusCode === 200){
            this.props.setTrackingId(res.data.trackingId)
            ReactSwal.fire({
                title: 'تمومه',
                icon: 'success',
                confirmButtonText: 'اوکیه',
                text: "خب سفارشت رو ثبت کردیم، یکم دیگه آمادس :)" + "\n" +
                    " : شماره سفارش" + res.data.trackingId
            }).then(() => {
                if(this.state.onlineOrCash === "cash"){
                    this.history.push("/main")
                }else {
                    this.history.push("/dongi")
                }
            })
        }
    }

    handleBack = () =>{
        this.props.history.goBack();
    }

    render(){
        return(
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
                                <div style={{height:this.state.iconSize,width:this.state.iconSize,background:`url(${onlineBlack})`,backgroundRepeat:'no-repeat',backgroundSize:'cover'}}/>
                            </div>

                            <div className={this.state.offlineClass} onClick={this.enableCash}>نقدی
                                <div style={{height:this.state.iconSize,width:this.state.iconSize,background:`url(${cashBlack})`,backgroundRepeat:'no-repeat',backgroundSize:'cover'}}/>
                            </div>
                        </div>
                    </div>
                    <div className='payWayOptionsContainer d-flex flex-row-reverse justify-content-between'>
                        <span className='IranSans payWayText ' >تحویل سفارش چطور؟</span>
                        <div className='payWayButtonsContainer d-flex flex-column justify-content-between'>
                            <div className={this.state.inResClass +' inResTextSmaller'} onClick={this.enableInRes}>
                                درون رستوران
                                <div style={{height:this.state.iconSize,width:this.state.iconSize,background:`url(${waiterBlack})`,backgroundRepeat:'no-repeat',backgroundSize:'cover'}}/>
                            </div>
                            <div className={this.state.outResClass} onClick={this.enableOutRes}>بیرون بر
                                <div style={{height:this.state.iconSize,width:this.state.iconSize,background:`url(${inRes})`,backgroundRepeat:'no-repeat',backgroundSize:'cover'}}/>
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
                            <input placeholder='000' type='number' className='tableInput' onChange={(e)=>(this.setState({table:e.target.value.toString()}))}/>
                        </div>
                    </div>
                    <div className='BillSubmitButton mt-2' onClick={this.handleSubmit}>
                        <span>پرداخت</span>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        token:store.rUserInfo.token,
        orderList: store.rTempData.orderList,
        trackingId: store.rTempData.trackingId,
    }
}

const mapDispatchToProps = () => {
    return {
        setTrackingId: actions.setTrackingId,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PayWay);
