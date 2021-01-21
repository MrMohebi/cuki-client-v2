import React from "react";
import './css/style.css'
import { BsHeart,BsHeartFill,BsHouse,BsHouseFill,BsPerson,BsFillPersonFill,BsClockHistory } from "react-icons/bs";
import { IoCartOutline,IoCart } from "react-icons/io5";
import {NavLink} from "react-router-dom";
import 'animate.css/animate.css'
import cartHisOut from '../../assets/img/navBar/cartHisOut.png'
import cartOut from '../../assets/img/navBar/cartOut.png'
import cartFill from '../../assets/img/navBar/cartFill.png'
import cartHisFill from '../../assets/img/navBar/cartHisFill.png'
import homeFill from '../../assets/img/navBar/homeFill.png'
import homeOut from '../../assets/img/navBar/homeOut.png'
import heartFill from '../../assets/img/navBar/heartFill.png'
import heartOut from '../../assets/img/navBar/heartOut.png'
import userFill from '../../assets/img/navBar/userFill.png'
import userOut from '../../assets/img/navBar/userOut.png'
import {IconButton} from '@material-ui/core';





class BottomNavBar extends React.Component{
    state = {
        iconSize:10,

    }
    x = `../../assets/img/navBar`


    render() {
        return(
            <div className='bottomNavBarMain' onContextMenu={(e)=>{e.preventDefault()}}>
                <NavLink className='navLinkBottomNav' to={"/t"}  >

                        {window.location.pathname === "/t" ?
                            <IconButton className='BottomNavigationIcons'  style={{width:'40px',height:'40px',background:`url(${cartFill})`}}/>
                        :
                            <IconButton className='BottomNavigationIcons'  style={{width:'40px',height:'40px',background:`url(${cartOut})`}}/>

                        }
                </NavLink>
                <NavLink className='navLinkBottomNav' to={"/t1"}  >

                        {window.location.pathname === "/t1" ?
                            <IconButton className='BottomNavigationIcons'  style={{width:'40px',height:'40px',background:`url(${cartHisFill})`}}/>
                        :
                            <IconButton className='BottomNavigationIcons'  style={{width:'40px',height:'40px',background:`url(${cartHisOut})`}}/>

                        }
                </NavLink>
                <NavLink className='navLinkBottomNav' to={"/t3"}  >

                        {window.location.pathname === "/t3" ?
                            <IconButton className='BottomNavigationIcons'  style={{width:'40px',height:'40px',background:`url(${homeFill})`}}/>
                        :
                            <IconButton className='BottomNavigationIcons'  style={{width:'40px',height:'40px',background:`url(${homeOut})`}}/>

                        }
                </NavLink>
                <NavLink className='navLinkBottomNav' to={"/t4"}  >

                        {window.location.pathname === "/t4" ?
                            <IconButton className='BottomNavigationIcons'  style={{width:'40px',height:'40px',background:`url(${heartFill})`}}/>
                        :
                            <IconButton className='BottomNavigationIcons'  style={{width:'40px',height:'40px',background:`url(${heartOut})`}}/>

                        }
                </NavLink>
                <NavLink className='navLinkBottomNav' to={"/t5"}  >

                        {window.location.pathname === "/t5" ?
                            <IconButton className='BottomNavigationIcons'  style={{width:'40px',height:'40px',background:`url(${userFill})`}}/>
                        :
                            <IconButton className='BottomNavigationIcons'  style={{width:'40px',height:'40px',background:`url(${userOut})`}}/>

                        }
                </NavLink>



                {/*{window.location.pathname === "/t"?<IoCartOutline style={{fontSize:this.iconSize}}/>:<IoCart style={{fontSize:this.iconSize}}/>}*/}
                {/*{window.location.pathname === "/t"?<BsClockHistory style={{fontSize:this.iconSize}}/>:null}*/}
                {/*{window.location.pathname === "/t"?<BsHouse style={{fontSize:this.iconSize}}/>:<BsHouseFill style={{fontSize:this.iconSize}}/>}*/}
                {/*{window.location.pathname === "/t"?<BsHeart style={{fontSize:this.iconSize}}/>:<BsHeartFill style={{fontSize:this.iconSize}}/>}*/}
                {/*{window.location.pathname === "/t"?<BsPerson style={{fontSize:this.iconSize}}/>:<BsFillPersonFill style={{fontSize:this.iconSize}}/>}*/}
            </div>
        )
    }
}
export default BottomNavBar;
