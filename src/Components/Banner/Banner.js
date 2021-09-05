import React, {useEffect, useRef, useState} from "react";
import './css/Banner.css'
import isResOpen from "../../functions/isResOpen";
import {getLSResInfo} from "../../stores/localStorage/localStorage";

/*
props:
   closable  [_bool_]
   color  [_hex_]
   onClickPath [_str_]
   text [_str_]
*/

function Banner(props) {
    const Banner = useRef(null)
    const [closedClass] = useState('')
    useEffect(()=>{
        if (isResOpen(JSON.parse(getLSResInfo()['openTime']))){
            Banner.current.style.height='0px'
        }else{
            Banner.current.style.height='40px'

        }
    },[])

    return(
        <div ref={Banner} className={'w-100 d-flex justify-content-between bannerContainer align-items-center' + closedClass} style={{backgroundColor:props.color}} >
            {props.closable?
                <svg  onClick={()=>{
                    Banner.current['style'].height = '0px'
                }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-x "
                      viewBox="0 0 16 16">
                    <path
                        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
                :
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-x invisible"
                      viewBox="0 0 16 16">
                    <path
                        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            }

            <span className={'bannerText'} onClick={
                props['onClickPath']?
                    ()=>{
                        props.history.push(props['onClickPath'])
                    }
                    :
                    ()=>{}
            } >{props.text}</span>
        </div>
    )

}
export default Banner