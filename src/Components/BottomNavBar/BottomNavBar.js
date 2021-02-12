import React from "react";
import './css/style.css'
import {NavLink} from "react-router-dom";
import 'animate.css/animate.css'
import {connect} from "react-redux";


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
        iconSize: "27px",
    }

    render() {
        return (
            <div className='w-100 d-flex justify-content-center position-absolute bottomNavContainer '>
                <div className='bottomNavBarMain' onContextMenu={(e) => {
                    e.preventDefault()
                }}>
                    <NavLink className='navLinkBottomNav' to={"/bill"}>
                        {window.location.pathname.includes("/bill") || window.location.pathname.includes("/payway") ?
                            <IconButton className='BottomNavigationIcons'
                                        style={{width:`${this.state.iconSize}`, height:`${this.state.iconSize}`, background:`url(${cf})`}}/>
                            :
                            <IconButton className='BottomNavigationIcons'
                                        style={{width:`${this.state.iconSize}`, height:`${this.state.iconSize}`,background:`url(${co})`}}/>
                        }
                    </NavLink>

                    {
                        this.props.openOrdersList.length > 0 ?
                            <NavLink className='navLinkBottomNav' to={"/openOrders"}>
                                {window.location.pathname.includes("/openOrders") ?
                                    <IconButton className='BottomNavigationIcons'
                                                style={{width:`${this.state.iconSize}`, height:`${this.state.iconSize}`,background:`url(${chf})`}}/>
                                    :
                                    <IconButton className='BottomNavigationIcons'
                                                style={{width:`${this.state.iconSize}`, height:`${this.state.iconSize}`,background:`url(${cho})`}}/>
                                }
                            </NavLink>
                            :
                                null
                    }

                    <NavLink className='navLinkBottomNav' to={"/main"}>
                        {window.location.pathname.includes("/main") ?
                            <IconButton className='BottomNavigationIcons'
                                        style={{width:`${this.state.iconSize}`, height:`${this.state.iconSize}`,background:`url(${hf})`}}/>
                            :
                            <IconButton className='BottomNavigationIcons'
                                        style={{width:`${this.state.iconSize}`, height:`${this.state.iconSize}`,background:`url(${ho})`}}/>
                        }
                    </NavLink>
                    <NavLink className='navLinkBottomNav' to={"/likedFoods"}>
                        {window.location.pathname.includes("/likedFoods") ?
                            <IconButton className='BottomNavigationIcons'
                                        style={{width:`${this.state.iconSize}`, height:`${this.state.iconSize}`,background:`url(${hef})`}}/>
                            :
                            <IconButton className='BottomNavigationIcons'
                                        style={{width:`${this.state.iconSize}`, height:`${this.state.iconSize}`,background:`url(${heo})`}}/>
                        }
                    </NavLink>
                    <NavLink className='navLinkBottomNav' to={"/login"}>
                        {window.location.pathname.includes("/profile") ?
                            <IconButton className='BottomNavigationIcons'
                                        style={{width:`${this.state.iconSize}`, height:`${this.state.iconSize}`,background:`url(${uf})`}}/>
                            :
                            <IconButton className='BottomNavigationIcons'
                                        style={{width:`${this.state.iconSize}`, height:`${this.state.iconSize}`,background:`url(${uo})`}}/>
                        }
                    </NavLink>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (store) => {
    return {
        token:store.rUserInfo.token,
        orderList: store.rTempData.orderList,
        openOrdersList: store.rTempData.openOrdersList,
    }
}

const mapDispatchToProps = () => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(BottomNavBar);
