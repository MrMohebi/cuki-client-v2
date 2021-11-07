import React from 'react';

const PhotoSlider = () => {
    return (
        <div style={{
            width:'100%',
            overflowX:'scroll',
            height:'300px',
            scrollSnapType:'x mandatory',
            display:'flex',
            flexFlow:'row'
        }}>

            <div style={{
                minHeight:300,
                minWidth:300,
                background:'red',
                scrollSnapAlign:'center',
                marginLeft:20,
                marginRight:20,
            }}/>
            <div style={{
                minHeight:300,
                minWidth:300,
                background:'red',
                scrollSnapAlign:'center',
                marginLeft:20,
                marginRight:20,
            }}/>
            <div style={{
                minHeight:300,
                minWidth:300,
                background:'red',
                scrollSnapAlign:'center',
                marginLeft:20,
                marginRight:20,
            }}/>
            
        </div>
    );
};

export default PhotoSlider;