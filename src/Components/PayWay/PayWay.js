import React, {useState} from "react";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import './css/style.css'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents} from 'react-leaflet'
import L from 'leaflet'
import "leaflet/dist/leaflet.css"
import markerPNG from './img/marker.png'
import markerShadowPNG from './img/marker-shadow.png'

let markerIcon = L.icon({
    iconUrl: markerPNG,
    shadowUrl: markerShadowPNG,

    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

function MyComponent() {
    let [position, setPosition] = useState(null)
    const map = useMapEvents({
        click: (e) => {
            setPosition(e.latlng)
            console.log(e.latlng);
        },
    })
    return position === null ? null : (
        <Marker icon={markerIcon} position={position}>
            <Popup>You clicked here</Popup>
        </Marker>
    )
}


class PayWay extends React.Component{
    state = {
        outResClass:'',
        inResClass:'',
        onlineClass:'',
        offlineClass:'',
        tableClass:'',
        table:'',
        addressDetailsClass:'addressDetails',
        mapClass:'mapContainer',
        inOrOut: 'in',
        onlineOrCash:'cash',
        addressDetails:'',
    }
    componentDidMount() {
        if (this.state.inOrOut === 'in'){
           this.enableInRes()
        }else{
            this.enableOutRes()
        }
        if (this.state.onlineOrCash === 'online'){
            this.enableOnline()

        }else{
            this.enableCash()

        }
        if (this.state.inOrOut === 'in'){
            this.setState({
                addressDetailsClass:'d-none',
                mapClass:'d-none',
                tableClass:'animate__animated animate__fadeInUp'

            })
        }else{
            this.setState({
                addressDetailsClass:'d-animate__animated animate__fadeInUp',
                mapClass:'d-animate__animated animate__fadeInUp',
                tableClass:'d-none'

            })
        }
    }

    enableInRes = ()=>{ this.setState({
        inResClass:'payWayActive',
        outResClass:'payWayNormal',
        inOrOut:'in'
    })}
    enableOutRes = ()=>{this.setState({
        inResClass:'payWayNormal',
        outResClass:'payWayActive',
        inOrOut:'out'

    })}
    enableOnline = ()=>{this.setState({
        onlineClass:'payWayActive',
        offlineClass:'payWayNormal',
        onlineOrCash:'online'
    })}
    enableCash = ()=>{this.setState({
        onlineClass:'payWayNormal',
        offlineClass:'payWayActive',
        onlineOrCash:'cash'
    })}
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
                <div className='payWayContainer'>
                    <div className='payWayOptionsContainer d-flex flex-row-reverse justify-content-between'>
                        <span className='IranSans payWayText ' >نحوه پرداخت چجوری باشه؟</span>
                        <div className='payWayButtonsContainer d-flex flex-column justify-content-between'>
                            <div className={this.state.onlineClass} onClick={this.enableOnline}
                            >آنلاین</div>
                            <div className={this.state.offlineClass} onClick={this.enableCash}>نقدی</div>

                        </div>
                    </div>

                    <div className='payWayOptionsContainer d-flex flex-row-reverse justify-content-between'>
                        <span className='IranSans payWayText ' >تحویل سفارش چطور؟</span>
                        <div className='payWayButtonsContainer d-flex flex-column justify-content-between'>
                            <div className={this.state.inResClass} onClick={this.enableInRes}>درون رستوران</div>
                            <div className={this.state.outResClass} onClick={this.enableOutRes}>بیرون بر</div>

                        </div>
                    </div>
                    <div className={this.state.mapClass}>
                        <MapContainer zoomControl={false} style={{height: "300px"}} center={[30.287486, 57.052301]} zoom={15} >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <MyComponent/>
                        </MapContainer>
                    </div>
                    <textarea name="Text1" cols="40" rows="5" className={this.state.addressDetailsClass} onChange={(e)=>{
                        this.setState({
                            addressDetails:e.target.value.toString(),
                        })
                    }}/>
                    <input className={this.state.tableClass}/>
                    <div className='BillSubmitButton mt-2'>
                        <span>پرداخت</span>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default PayWay;