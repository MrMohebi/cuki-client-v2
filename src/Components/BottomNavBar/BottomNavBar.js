import React from "react";
import './css/style.css'
import {NavLink} from "react-router-dom";
import 'animate.css/animate.css'

import {IconButton} from '@material-ui/core';

import cf from './img/cartFill.png'
import co from './img/cartOut.png'
import chf from './img/cartHisFill.png'
import cho from './img/cartHisOut.png'
import hf from './img/homeFill.png'
import ho from './img/homeOut.png'
import hef from './img/heartFill.png'
import heo from './img/heartOut.png'
import uf from './img/userFill.png'
import uo from './img/userOut.png'

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
                                    style={{width:`${this.state.iconSize}`, height:`${this.state.iconSize}`, background:`url(${cf})`}}/>
                        :
                        <IconButton className='BottomNavigationIcons'
                                    style={{width:`${this.state.iconSize}`, height:`${this.state.iconSize}`,background:`url(${co})`}}/>
                    }
                </NavLink>
                <NavLink className='navLinkBottomNav' to={"/t1"}>
                    {window.location.pathname === "/t1" ?
                        <IconButton className='BottomNavigationIcons'
                                    style={{width:`${this.state.iconSize}`, height:`${this.state.iconSize}`,background:`url(${chf})`}}/>
                        :
                        <IconButton className='BottomNavigationIcons'
                                    style={{width:`${this.state.iconSize}`, height:`${this.state.iconSize}`,background:`url(${cho})`}}/>
                    }
                </NavLink>
                <NavLink className='navLinkBottomNav' to={"/fl"}>
                    {window.location.pathname === "/fl" ?
                        <IconButton className='BottomNavigationIcons'
                                    style={{width:`${this.state.iconSize}`, height:`${this.state.iconSize}`,background:`url(${hf})`}}/>
                        :
                        <IconButton className='BottomNavigationIcons'
                                    style={{width:`${this.state.iconSize}`, height:`${this.state.iconSize}`,background:`url(${ho})`}}/>
                    }
                </NavLink>
                <NavLink className='navLinkBottomNav' to={"/t4"}>
                    {window.location.pathname === "/t4" ?
                        <IconButton className='BottomNavigationIcons'
                                    style={{width:`${this.state.iconSize}`, height:`${this.state.iconSize}`,background:`url(${hef})`}}/>
                        :
                        <IconButton className='BottomNavigationIcons'
                                    style={{width:`${this.state.iconSize}`, height:`${this.state.iconSize}`,background:`url(${heo})`}}/>
                    }
                </NavLink>
                <NavLink className='navLinkBottomNav' to={"/t5"}>
                    {window.location.pathname === "/t5" ?
                        <IconButton className='BottomNavigationIcons'
                                    style={{width:`${this.state.iconSize}`, height:`${this.state.iconSize}`,background:`url(${uf})`}}/>
                        :
                        <IconButton className='BottomNavigationIcons'
                                    style={{width:`${this.state.iconSize}`, height:`${this.state.iconSize}`,background:`url(${uo})`}}/>
                    }
                </NavLink>
            </div>
        )
    }
}

export default BottomNavBar;
