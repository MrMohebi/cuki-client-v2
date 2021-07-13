import React, {useState} from "react";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import './css/style.css'
import {MapContainer, Marker, Popup, TileLayer, useMapEvents} from 'react-leaflet'
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
import fixBodyClass from "../../functions/fixSwalBody";
import {HashLoader} from "react-spinners";
import LoadingOverlay from "react-loading-overlay";
import * as ls from "../../stores/localStorage/localStorage";
import cashWhite from './img/cashWhite.png'
import onlineWhite from './img/onlineWhite.png'
import inResWhite from './img/waiterWhite.png'
import outResWhite from './img/outResWhite.png'

export const Swipeable = ({children, style, ...props}) => {
    const handlers = useSwipeable(props);
    return (<div style={style} {...handlers}>{children}</div>);
}

const ReactSwal = withReactContent(Swal)

let coordinates = [30.287486, 57.052301]

let markerIcon = L.icon({
    iconUrl: markerPNG,
    shadowUrl: markerShadowPNG,

    iconSize: [40, 60], // size of the icon
    shadowSize: [40, 30], // size of the shadow
    iconAnchor: [20, 60], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 30],  // the same for the shadow
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});


function MarkerToolTip() {
    let [position, setPosition] = useState(coordinates)
    useMapEvents({
        click: (e) => {
            coordinates = [e.latlng['lat'], e.latlng['lng']]
            setPosition(e.latlng)
            document.getElementsByClassName('payWayContainer')[0].scrollBy(0, 250)
        },
    })
    return position === null ? null : (
        <Marker icon={markerIcon} position={position}>
            <Popup>حله همین جا</Popup>
        </Marker>
    )
}


class PayWay extends React.Component {

    constructor(props) {
        super(props)
        this.mapDetailsTableContainer = React.createRef()
    }


    state = {
        outResClass: '',
        inResClass: '',
        onlineClass: '',
        onlineCompleteClass: '',
        offlineClass: '',
        makeIWillComeClass: 'payWayNormal',
        tableClass: 'tableContainerClass',
        table: this.props.tableScanned > 0 ? this.props.tableScanned : "",
        addressDetailsClass: 'addressDetails',
        mapClass: 'mapContainer',
        inOrOut: 'in',
        onlineOrCash: 'online',
        addressDetails: '',
        textHolderDetailsClass: 'w-100 IranSans text-right mt-3',
        iconSize: '20px',
        // onlineIcon: onlineWhite,
        // cashIcon: cashBlack,
        // inResIcon: waiterBlack,
        // outResIcon: outResBlack,
        loading: false,
        orderDetails: '',
    }

    componentDidMount() {
        this.state.inOrOut === 'in' ? this.enableInRes() : this.enableOutRes()
        this.state.onlineOrCash === 'online' ? this.enableOnline() : this.enableCash()

        if (this.state.inOrOut === 'in') {
            this.setState({
                addressDetailsClass: 'd-none',
                mapClass: 'd-none',
                tableClass: 'animate__animated animate__fadeInRight tableContainerClass'
            })
        } else {
            this.setState({
                addressDetailsClass: 'd-animate__animated animate__fadeInRight addressDetails',
                mapClass: 'd-animate__animated animate__fadeInUp mapContainer',
                tableClass: 'd-none tableContainerClass',
            })
        }
    }

    enableInRes = () => {
        this.setState({
            inResClass: 'payWayActive',
            outResClass: 'payWayNormal',
            inOrOut: 'in',
            makeIWillComeClass: 'payWayNormal',
            tableClass: 'animate__animated animate__fadeInRight tableContainerClass',
            mapClass: 'animate__animated animate__fadeOut mapContainer d-none',
            addressDetailsClass: 'animate__animated animate__fadeOut d-none',
            textHolderDetailsClass: 'd-none',
        })
        this.mapDetailsTableContainer.current.style.height = '80px'
    }

    enableIWillComeAndGet = () => {
        this.setState({
            inResClass: 'payWayNormal',
            outResClass: 'payWayNormal',
            //TODO add come and get to the API
            inOrOut: 'comeAndGet',
            makeIWillComeClass: 'payWayActive',
            tableClass: 'animate__animated animate__fadeInRight tableContainerClass d-none',
            mapClass: 'animate__animated animate__fadeOut mapContainer d-none',
            addressDetailsClass: 'animate__animated animate__fadeOut d-none',
            textHolderDetailsClass: 'd-none',
            table: "iWillComeAndGet",
        })
        this.mapDetailsTableContainer.current.style.height = '80px'
    }

    enableOutRes = () => {
        this.setState({
            inResClass: 'payWayNormal',
            outResClass: 'payWayActive',
            onlineCompleteClass: 'payWayNormal',
            inOrOut: 'out',
            tableClass: 'h-0Animate',
            mapClass: 'animate__animated animate__fadeIn mapContainer',
            addressDetailsClass: 'animate__animated animate__fadeIn addressDetails ',
            textHolderDetailsClass: 'w-100 IranSans text-right mt-3',
        })
        this.mapDetailsTableContainer.current.style.height = '1000px'
    }

    enableOnline = () => {
        this.setState({
            onlineClass: 'payWayActive',
            offlineClass: 'payWayNormal',
            onlineCompleteClass: 'payWayNormal',
            onlineOrCash: 'online',
        })
    }

    enableOnlineAll = () => {
        this.setState({
            onlineClass: 'payWayNormal',
            offlineClass: 'payWayNormal',
            onlineCompleteClass: 'payWayActive',
            onlineOrCash: 'onlineAll',
            // onlineIcon: onlineBlack,
            // cashIcon: cashBlack
        })
    }
    enableCash = () => {
        this.setState({
            onlineClass: 'payWayNormal',
            offlineClass: 'payWayActive',
            onlineCompleteClass: 'payWayNormal',
            onlineOrCash: 'cash',
        })

    }

    calTotalPrice = () => {
        let totalPrice = 0;
        for (let i = 0; i <= this.props.orderList.length; i++) {
            if (this.props.orderList[i]) {
                totalPrice += this.props.orderList[i].totalPrice
            }
        }
        return totalPrice
    }


    handleSubmit = () => {
        if (this.state.inOrOut === "in" && this.state.table !== "iWillComeAndGet") {
            ReactSwal.fire({
                title: 'نه صبر کن',
                icon: 'info',
                confirmButtonText: "اها اوکیه وایسا",
                text: "!شماره میزت رو نگفتی"
            }).then()
            fixBodyClass()
            return;
        } else if (this.state.inOrOut === "out" && coordinates[0] === 30.287486 && coordinates[1] === 57.052301) {
            ReactSwal.fire({
                title: 'نه صبر کن',
                icon: 'info',
                confirmButtonText: "اها اوکیه وایسا",
                text: "!آدرس رو نگفتی که"
            }).then()
            fixBodyClass()
            return;
        }

        if (this.calTotalPrice() < 900) {
            ReactSwal.fire({
                title: 'نه صبر کن',
                icon: 'info',
                confirmButtonText: "حله",
                text: "سفارشت رو فکر کنم قبلا ثبت کردیم. توی سفارشت باز اون پایین باید باشه."
            }).then()
            fixBodyClass()
            return;
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
                this.setState({loading: true})
                if (this.state.inOrOut === "in") {
                    requests.sendOrder(
                        this.callbackSendOrder,
                        this.state.table,
                        {},
                        this.props.orderList.map(eachFood => {
                            return {id: eachFood.id, number: eachFood.number}
                        }),
                        this.state.orderDetails
                    )
                } else {
                    requests.sendOrder(
                        this.callbackSendOrder,
                        "",
                        {coordinates: coordinates, addressDetails: this.state.addressDetails},
                        this.props.orderList.map(eachFood => {
                            return {id: eachFood.id, number: eachFood.number}
                        }),
                        this.state.orderDetails
                    )
                }
            }
        })
        fixBodyClass()

    }

    getOpenOrders = () => {
        requests.getOpenOrders(this.callbackOpenOrders, this.props.token);
    }
    callbackOpenOrders = (res) => {
        if (res.hasOwnProperty("statusCode") && res.statusCode === 200) {
            actions.setOpenOrdersListInfo(res.data)
        }
    }

    callbackSendOrder = (res) => {
        this.setState({loading: false})
        if (res.hasOwnProperty("statusCode") && res.statusCode === 200) {
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
                if (this.state.onlineOrCash === "cash") {
                    this.props.history.push("/main")
                } else if (this.state.onlineOrCash === "onlineAll") {
                    requests.sendPaymentRequestFood(
                        this.callbackPaymentRequest,
                        this.props.orderList.map(eachFood => {
                            return {id: eachFood.id, number: eachFood.number}
                        }),
                        res.data.totalPrice,
                        res.data.trackingId
                    );
                } else {
                    this.props.history.push("/dongi?trackingId=" + res.data.trackingId)
                }
            })
            fixBodyClass()
        }
    }

    callbackPaymentRequest = (res) => {
        if (res.statusCode === 200) {
            this.setState({
                loading: false,
                selectedToPay: [],
                notPaidList: []
            })
            ReactSwal.fire({
                title: 'تمومه',
                icon: 'success',
                confirmButtonText: 'بریم درگاه پرداخت',
                showDenyButton: true,
                denyButtonText: "میخوام لینک پرداخت رو ارسال کنم واسه دوستم",
                denyButtonColor: "#47b8e5",
                text: "مبلغ : " + res.data.amount / 1000 + " تومن \n",
            }).then(resultSwalPay => {
                if (resultSwalPay.isConfirmed) {
                    this.props.history.push("/main")
                    window.open(res.data.url, '_blank').focus()
                } else if (resultSwalPay.isDenied) {
                    if (navigator.clipboard !== undefined) {
                        navigator.clipboard.writeText(
                            "لینک پرداخت دونگ کوکی\n\n" +
                            "مبلغ : " + res.data.amount / 1000 + " هزار تومن \n" +
                            "بزن روی لینک پایین تا هدایت شی درگاه پرداخت\n" + res.data.url).then(() => {
                            ReactSwal.fire("لینک توی کلیپ بورد ذخیره شد").then()
                        })
                    } else {
                        this.setState({
                            dialogClassName: 'animate__fadeIn animate__animated',
                            payLink: res.data.url
                        })
                    }


                }
            });
            fixBodyClass()
        } else {
            ReactSwal.fire({
                title: '!!! آخ',
                icon: 'error',
                confirmButtonText: 'اوکیه',
                text: "یه چیزی درست کار نکرد، میشه از اول امتحان کنی؟",
            }).then()
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


    handleBack = () => {
        this.props.history.goBack();
    }

    render() {
        return (
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
                        <div className='payWayContainer'>
                            <div className='payWayOptionsContainer d-flex flex-column justify-content-between'>
                                <span className='IranSans payWayText '>نحوه پرداخت چجوری باشه؟</span>
                                <div
                                    className='payWayButtonsContainer d-flex flex-row-reverse justify-content-around mt-3'>
                                    <div className={this.state.onlineClass} onClick={this.enableOnline}>
                                        آنلاین دونگی
                                        <div className='payWayButtonIcons' style={{
                                            height: this.state.iconSize,
                                            width: this.state.iconSize,
                                            background: `url(${onlineWhite})`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: 'cover'
                                        }}/>
                                    </div>
                                    <div className={this.state.onlineCompleteClass} onClick={this.enableOnlineAll}>
                                        آنلاین یکجا
                                        <div className='payWayButtonIcons' style={{
                                            height: this.state.iconSize,
                                            width: this.state.iconSize,
                                            background: `url(${onlineWhite})`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: 'cover'
                                        }}/>
                                    </div>
                                    <div className={this.state.offlineClass} onClick={this.enableCash}>
                                        نقدی
                                        <div className='payWayButtonIcons' style={{
                                            height: this.state.iconSize,
                                            width: this.state.iconSize,
                                            background: `url(${cashWhite})`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: 'cover'
                                        }}/>
                                    </div>
                                </div>
                            </div>
                            <div className='payWayOptionsContainer d-flex flex-column justify-content-between'>
                                <span className='IranSans payWayText '>تحویل سفارش چطور؟</span>
                                <div
                                    className='payWayButtonsContainer d-flex flex-row-reverse justify-content-around mt-3'>
                                    <div className={this.state.inResClass + ' inResTextSmaller'}
                                         onClick={this.enableInRes}>
                                        درون رستوران
                                        <div className='payWayButtonIcons' style={{
                                            height: this.state.iconSize,
                                            width: this.state.iconSize,
                                            background: `url(${outResWhite})`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: 'cover'
                                        }}/>
                                    </div>
                                    <div className={this.state.makeIWillComeClass + ' inResTextSmaller'}
                                         onClick={this.enableIWillComeAndGet}>
                                        اماده کن میام میبرم
                                        <div className='payWayButtonIcons' style={{
                                            height: this.state.iconSize,
                                            width: this.state.iconSize,
                                            background: `url(${outResWhite})`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: 'cover'
                                        }}/>
                                    </div>
                                    <div
                                        className={this.state.outResClass + (ls.getLSResInfo().hasOwnProperty("permissions") && ls.getLSResInfo()["permissions"].indexOf("delivery") !== -1 ? "" : " d-none ")}
                                        onClick={this.enableOutRes}>
                                        بیرون بر
                                        <div className='payWayButtonIcons' style={{
                                            height: this.state.iconSize,
                                            width: this.state.iconSize,
                                            background: `url(${inResWhite})`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: 'cover'
                                        }}/>
                                    </div>

                                </div>
                            </div>
                            <div ref={this.mapDetailsTableContainer} className='mapDetailsTableContainer'>
                                <div className={this.state.mapClass}>
                                    <MapContainer zoomControl={false} style={{height: "300px"}} center={coordinates}
                                                  zoom={15}>
                                        <TileLayer
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                        <MarkerToolTip/>
                                    </MapContainer>
                                </div>
                                <div className={this.state.textHolderDetailsClass}> : توضیحات آدرس</div>
                                <textarea name="Text1" cols="40" rows="5" className={this.state.addressDetailsClass}
                                          onChange={(e) => {
                                              this.setState({
                                                  addressDetails: e.target.value.toString(),
                                              })
                                          }}/>
                                <div className={this.state.tableClass}>
                                    <span className='tableTextHolder'>شماره میز</span>
                                    <input value={this.state.table} placeholder='000' type='number'
                                           className='tableInput'
                                           onChange={(e) => (e.target.value.length > 3 ? null : this.setState({table: e.target.value}))}/>
                                </div>
                            </div>
                            <div className={'w-100 IranSans text-right mt-3'}> : توضیحات سفارش</div>
                            <textarea name="Text1" cols="40" rows="5" className={"addressDetails mb-2"}
                                      onChange={(e) => {
                                          this.setState({
                                              orderDetails: e.target.value.toString(),
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
        token: store.rUserInfo.token,
        orderList: store.rTempData.orderList,
        trackingId: store.rTempData.trackingId,
        tableScanned: store.rTempData.tableScanned,
    }
}

const mapDispatchToProps = () => {
    return {
        setTrackingId: actions.setTrackingId,
        setOrderList: actions.setOrderList,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PayWay);
