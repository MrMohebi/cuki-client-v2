import React from 'react';
import { Pannellum } from "pannellum-react";
import "./css/style.css"
import {connect} from "react-redux";
import * as actions from "../../stores/reduxStore/actions";

import outsideDoor from './360Photos/outsideDoor(3500).jpg'
import insideMidMainRoom from './360Photos/insideMidMainRoom(2000)(10ph).jpg'
import stairway from './360Photos/stairway(2500)(10ph).jpg'
import coffeeshopBar from './360Photos/coffeeshopBar(2500)(10ph).jpg'
import coffeeshopStairway from './360Photos/coffeeshopStairway(2500)(10ph).jpg'




class Tour360 extends React.Component{

    state={
        allTourImage:{
            outsideDoor,
            insideMidMainRoom,
            stairway,
            coffeeshopStairway,
            coffeeshopBar,
        },
        currentRoomName: this.props.tour360Photo.length> 3 ? this.props.tour360Photo : outsideDoor,
    }


    handleChangeRoom = (nextRoom, currentRoom=this.state.currentRoomName) =>{
        this.setState({
            currentRoomName: nextRoom,
        })
        this.props.setTour360Photo(nextRoom);
    }
    render() {
        return (
            <div style={{width:"100%", height:"100%",position:'fixed',zIndex:'0'}} >
                <Pannellum
                    width="100%"
                    height="100%"
                    image={this.state.currentRoomName}
                    pitch={0}
                    yaw={0}
                    hfov={70}
                    autoRotate={8}
                    minPitch={-180}
                    maxPitch={180}
                    orientationOnByDefault={true}
                    showZoomCtrl={false}
                    showFullscreenCtrl={false}
                    autoLoad
                >
                    <Pannellum.Hotspot
                        name="outsideDoor2insideMidMainRoom"
                        type="custom"
                        pitch={200}
                        yaw={150}
                        handleClick={(evt , args) => this.handleChangeRoom(args.nextRoom)}
                        handleClickArg={{ "nextRoom":this.state.allTourImage["insideMidMainRoom"] }}
                        tooltip={(evt) =>{
                            let d = document.createElement("div")
                            d.classList.add("hotspot-next-room")
                            if(this.state.currentRoomName !== outsideDoor)
                                evt.style.display = "none"
                            evt.appendChild(d)
                        }}
                    />
                {/* Main room hotspot */}
                    <Pannellum.Hotspot
                        name="insideMidMainRoom2outsideDoor"
                        type="custom"
                        pitch={195}
                        yaw={45}
                        handleClick={(evt , args) => this.handleChangeRoom(args.nextRoom)}
                        handleClickArg={{ "nextRoom":this.state.allTourImage["outsideDoor"] }}
                        tooltip={(evt) =>{
                            let d = document.createElement("div")
                            d.classList.add("hotspot-next-room")
                            if(this.state.currentRoomName !== insideMidMainRoom)
                                evt.style.display = "none"
                            evt.appendChild(d)
                        }}
                    />

                    <Pannellum.Hotspot
                        name="insideMidMainRoom2stairway"
                        type="custom"
                        pitch={195}
                        yaw={100}
                        handleClick={(evt , args) => this.handleChangeRoom(args.nextRoom)}
                        handleClickArg={{ "nextRoom":this.state.allTourImage["stairway"] }}
                        tooltip={(evt) =>{
                            let d = document.createElement("div")
                            d.classList.add("hotspot-next-room")
                            if(this.state.currentRoomName !== insideMidMainRoom)
                                evt.style.display = "none"
                            evt.appendChild(d)
                        }}
                    />
                {/* Main room hotspot */}

                {/* stairWay hotspot */}
                    <Pannellum.Hotspot
                        name="stairway2coffeeshopStairway"
                        type="custom"
                        pitch={0}
                        yaw={-1}
                        handleClick={(evt , args) => this.handleChangeRoom(args.nextRoom)}
                        handleClickArg={{ "nextRoom":this.state.allTourImage["coffeeshopStairway"] }}
                        tooltip={(evt) =>{
                            let d = document.createElement("div")
                            d.classList.add("hotspot-next-room")
                            if(this.state.currentRoomName !== stairway)
                                evt.style.display = "none"
                            evt.appendChild(d)
                        }}
                    />

                    <Pannellum.Hotspot
                        name="stairway2insideMidMainRoom"
                        type="custom"
                        pitch={-30}
                        yaw={90}
                        handleClick={(evt , args) => this.handleChangeRoom(args.nextRoom)}
                        handleClickArg={{ "nextRoom":this.state.allTourImage["insideMidMainRoom"] }}
                        tooltip={(evt) =>{
                            let d = document.createElement("div")
                            d.classList.add("hotspot-next-room")
                            if(this.state.currentRoomName !== stairway)
                                evt.style.display = "none"
                            evt.appendChild(d)
                        }}
                    />
                {/* stairWay hotspot */}

                {/* coffeeshop hotspot */}
                    <Pannellum.Hotspot
                        name="coffeeshopStairway2stairway"
                        type="custom"
                        pitch={210}
                        yaw={-10}
                        handleClick={(evt , args) => this.handleChangeRoom(args.nextRoom)}
                        handleClickArg={{ "nextRoom":this.state.allTourImage["stairway"] }}
                        tooltip={(evt) =>{
                            let d = document.createElement("div")
                            d.classList.add("hotspot-next-room")
                            if(this.state.currentRoomName !== coffeeshopStairway)
                                evt.style.display = "none"
                            evt.appendChild(d)
                        }}
                    />

                    <Pannellum.Hotspot
                        name="coffeeshopStairway2coffeeshopBar"
                        type="custom"
                        pitch={-30}
                        yaw={60}
                        handleClick={(evt , args) => this.handleChangeRoom(args.nextRoom)}
                        handleClickArg={{ "nextRoom":this.state.allTourImage["coffeeshopBar"] }}
                        tooltip={(evt) =>{
                            let d = document.createElement("div")
                            d.classList.add("hotspot-next-room")
                            if(this.state.currentRoomName !== coffeeshopStairway)
                                evt.style.display = "none"
                            evt.appendChild(d)
                        }}
                    />

                    {
                        this.state.currentRoomName === coffeeshopStairway?
                            (<Pannellum.Hotspot
                                type="info"
                                pitch={-5}
                                yaw={-30}
                                text="تیم آرنویا"
                                URL="https://arnoya.ir"
                            />)
                            :
                            (<Pannellum.Hotspot/>)
                    }



                {/* coffeeshop hotspot */}

                {/* coffeeshop bar hotspot */}
                    <Pannellum.Hotspot
                        name="coffeeshopBar2coffeeshopStairway"
                        type="custom"
                        pitch={-30}
                        yaw={-10}
                        handleClick={(evt , args) => this.handleChangeRoom(args.nextRoom)}
                        handleClickArg={{ "nextRoom":this.state.allTourImage["coffeeshopStairway"] }}
                        tooltip={(evt) =>{
                            let d = document.createElement("div")
                            d.classList.add("hotspot-next-room")
                            if(this.state.currentRoomName !== coffeeshopBar)
                                evt.style.display = "none"
                            evt.appendChild(d)
                        }}
                    />
                {/* coffeeshop bar hotspot */}

                </Pannellum>
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        tour360Photo: store.rFrontStates.tour360Photo,
    }
}

const mapDispatchToProps = () =>{
    return{
        setTour360Photo: actions.setTour360Photo,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Tour360);