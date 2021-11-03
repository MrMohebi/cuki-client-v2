import React from "react";
import './css/style.css'
import {NavLink} from "react-router-dom";
import 'animate.css/animate.css'
import {connect} from "react-redux";


import {Badge, IconButton} from '@material-ui/core';

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
        // return (
        //     <div className='w-100 d-flex justify-content-center position-absolute bottomNavContainer '>
        //         <div className='bottomNavBarMain' onContextMenu={(e) => {
        //             e.preventDefault()
        //         }}>
        //
        //             {
        //                 this.props.openOrdersList.length > 0 ?
        //                     <Badge color='default' badgeContent={window.location.pathname === "/openOrders" ? 0 : this.props.openOrdersList.length}>
        //                         <NavLink className='navLinkBottomNav' to={"/openOrders"}>
        //                             {window.location.pathname.split("/").some(ePath=> ["eachOpenOrderDetails", 'openOrders'].indexOf(ePath) !== -1)  ?
        //                                 <IconButton className='BottomNavigationIcons'
        //                                             style={{
        //                                                 width: `${this.state.iconSize}`,
        //                                                 height: `${this.state.iconSize}`,
        //                                                 background: `url(${chf})`
        //                                             }}/>
        //                                 :
        //                                 <IconButton className='BottomNavigationIcons'
        //                                             style={{
        //                                                 width: `${this.state.iconSize}`,
        //                                                 height: `${this.state.iconSize}`,
        //                                                 background: `url(${cho})`
        //                                             }}/>
        //                             }
        //                         </NavLink>
        //                     </Badge>
        //                     :
        //                     null
        //             }
        //             <Badge color='secondary' badgeContent={window.location.pathname === "/bill" ? 0 : this.props.orderList.length}>
        //                 <NavLink className='navLinkBottomNav' to={"/bill"}>
        //                     {window.location.pathname.split("/").some(ePath=> ["bill", "payway", 'dongi'].indexOf(ePath) !== -1) ?
        //                         <IconButton className='BottomNavigationIcons'
        //                                     style={{
        //                                         width: `${this.state.iconSize}`,
        //                                         height: `${this.state.iconSize}`,
        //                                         background: `url(${cf})`
        //                                     }}/>
        //                         :
        //                         <IconButton className='BottomNavigationIcons'
        //                                     style={{
        //                                         width: `${this.state.iconSize}`,
        //                                         height: `${this.state.iconSize}`,
        //                                         background: `url(${co})`
        //                                     }}/>
        //                     }
        //                 </NavLink>
        //             </Badge>
        //
        //             <NavLink className='navLinkBottomNav' to={"/main"}>
        //                 {window.location.pathname.split("/").some(ePath=> ["main", "category"].indexOf(ePath) !== -1) ?
        //                     <IconButton className='BottomNavigationIcons'
        //                                 style={{
        //                                     width: `${this.state.iconSize}`,
        //                                     height: `${this.state.iconSize}`,
        //                                     background: `url(${hf})`
        //                                 }}/>
        //                     :
        //                     <IconButton className='BottomNavigationIcons'
        //                                 style={{
        //                                     width: `${this.state.iconSize}`,
        //                                     height: `${this.state.iconSize}`,
        //                                     background: `url(${ho})`
        //                                 }}/>
        //                 }
        //             </NavLink>
        //             <NavLink className='navLinkBottomNav' to={"/likedFoods"}>
        //                 {window.location.pathname.split("/").some(ePath=> ['likedFoods'].indexOf(ePath) !== -1)  ?
        //                     <IconButton className='BottomNavigationIcons'
        //                                 style={{
        //                                     width: `${this.state.iconSize}`,
        //                                     height: `${this.state.iconSize}`,
        //                                     background: `url(${hef})`
        //                                 }}/>
        //                     :
        //                     <IconButton className='BottomNavigationIcons'
        //                                 style={{
        //                                     width: `${this.state.iconSize}`,
        //                                     height: `${this.state.iconSize}`,
        //                                     background: `url(${heo})`
        //                                 }}/>
        //                 }
        //             </NavLink>
        //             <NavLink className='navLinkBottomNav' to={"/login"}>
        //                 {window.location.pathname.split("/").some(ePath=> ['profile', 'eachOrderHistoryDetails', 'login', 'signup'].indexOf(ePath) !== -1)  ?
        //                     <IconButton className='BottomNavigationIcons'
        //                                 style={{
        //                                     width: `${this.state.iconSize}`,
        //                                     height: `${this.state.iconSize}`,
        //                                     background: `url(${uf})`
        //                                 }}/>
        //                     :
        //                     <IconButton className='BottomNavigationIcons'
        //                                 style={{
        //                                     width: `${this.state.iconSize}`,
        //                                     height: `${this.state.iconSize}`,
        //                                     background: `url(${uo})`
        //                                 }}/>
        //                 }
        //             </NavLink>
        //         </div>
        //     </div>
        //
        // )
        return <div></div>
    }
}

const mapStateToProps = (store) => {
    return {
        token: store.rUserInfo.token,
        orderList: store.rTempData.orderList,
        openOrdersList: store.rTempData.openOrdersList,
    }
}

const mapDispatchToProps = () => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(BottomNavBar);
