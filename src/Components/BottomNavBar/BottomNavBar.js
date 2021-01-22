import React from "react";
import './css/style.css'
import {NavLink} from "react-router-dom";
import 'animate.css/animate.css'

import {IconButton} from '@material-ui/core';


class BottomNavBar extends React.Component {
    state = {
        iconSize: "25px",
    }


    render() {
        return (
            <div className='bottomNavBarMain' onContextMenu={(e) => {
                e.preventDefault()
            }}>
                <NavLink className='navLinkBottomNav' to={"/t"}>
                    {window.location.pathname === "/t" ?
                        <IconButton className='BottomNavigationIcons'
                                    style={{width:`${this.state.iconSize}`, height:`${this.state.iconSize}`, background: `url("./img/navBar/cartFill.png")`}}/>
                        :
                        <IconButton className='BottomNavigationIcons'
                                    style={{width:`${this.state.iconSize}`, height:`${this.state.iconSize}`, background: `url("./img/navBar/cartOut.png")`}}/>
                    }
                </NavLink>
                <NavLink className='navLinkBottomNav' to={"/t1"}>
                    {window.location.pathname === "/t1" ?
                        <IconButton className='BottomNavigationIcons'
                                    style={{width:`${this.state.iconSize}`, height:`${this.state.iconSize}`, background: `url("./img/navBar/cartHisFill.png")`}}/>
                        :
                        <IconButton className='BottomNavigationIcons'
                                    style={{width:`${this.state.iconSize}`, height:`${this.state.iconSize}`, background: `url("./img/navBar/cartHisOut.png")`}}/>
                    }
                </NavLink>
                <NavLink className='navLinkBottomNav' to={"/t3"}>
                    {window.location.pathname === "/t3" ?
                        <IconButton className='BottomNavigationIcons'
                                    style={{width:`${this.state.iconSize}`, height:`${this.state.iconSize}`, background: `url("./img/navBar/homeFill.png")`}}/>
                        :
                        <IconButton className='BottomNavigationIcons'
                                    style={{width:`${this.state.iconSize}`, height:`${this.state.iconSize}`, background: `url("./img/navBar/homeOut.png")`}}/>
                    }
                </NavLink>
                <NavLink className='navLinkBottomNav' to={"/t4"}>
                    {window.location.pathname === "/t4" ?
                        <IconButton className='BottomNavigationIcons'
                                    style={{width:`${this.state.iconSize}`, height:`${this.state.iconSize}`, background: `url("./img/navBar/heartFill.png")`}}/>
                        :
                        <IconButton className='BottomNavigationIcons'
                                    style={{width:`${this.state.iconSize}`, height:`${this.state.iconSize}`, background: `url("./img/navBar/HeartOut.png")`}}/>
                    }
                </NavLink>
                <NavLink className='navLinkBottomNav' to={"/t5"}>
                    {window.location.pathname === "/t5" ?
                        <IconButton className='BottomNavigationIcons'
                                    style={{width:`${this.state.iconSize}`, height:`${this.state.iconSize}`, background: `url("./img/navBar/userFill.png")`}}/>
                        :
                        <IconButton className='BottomNavigationIcons'
                                    style={{width:`${this.state.iconSize}`, height:`${this.state.iconSize}`, background: `url("./img/navBar/userOut.png")`}}/>
                    }
                </NavLink>
            </div>
        )
    }
}

export default BottomNavBar;
