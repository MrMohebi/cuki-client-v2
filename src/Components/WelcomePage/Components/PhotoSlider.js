import React from 'react';

const PhotoSlider = (props) => {
    return (
        <div id={'photo-slider'} style={{
            position: 'relative',
            width: '100%',
            height: '200px',
            marginTop: '200px',
            paddingRight: '10px',
            paddingLeft: '10px',
        }}>
            <div
                onClick={() => {
                    document.getElementById('photo-slider-inner').scrollBy(-100, 0)
                }}
                style={{
                    cursor: 'pointer',
                    height: "100%",
                    width: '50px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    left: '10px',
                    color: 'white',
                    fontSize: '2rem',
                    zIndex: 5,
                    background: 'linear-gradient(to right, #00000087 00%, rgba(51, 51, 51, 0))'
                }}
            >
                <i className="fas fa-angle-left"/>
            </div>

            <div className={'photo-slider-inner'} id={'photo-slider-inner'} style={{
                width: '100%',
                overflowX: 'scroll',
                overflowY: 'hidden',
                height: '200px',
                scrollSnapType: 'x mandatory',
                display: 'flex',
                flexFlow: 'row',
                position: "relative",
                // justifyContent:'center'
            }}>

                {props.images.map(eachURL => {
                    return (
                        <div style={{
                            minHeight: 200,
                            minWidth: 200,
                            height: 200,
                            width: 200,
                            backgroundImage: 'url(' + eachURL + ')',
                            scrollSnapAlign: 'center',
                            marginLeft: 5,
                            marginRight: 5,
                            borderRadius: 10
                        }}/>
                    )
                })}


            </div>
            <div
                onClick={() => {
                    document.getElementById('photo-slider-inner').scrollBy(100, 0)
                }}
                style={{
                    cursor: 'pointer',
                    height: "100%",
                    width: '50px',
                    // background:'black',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    right: '10px',
                    top: '0',
                    color: 'white',
                    fontSize: '2rem',
                    zIndex: 5,
                    background: 'linear-gradient(to left, #00000087 00%, rgba(51, 51, 51, 0))'
                }}
            >
                <i className="fas fa-angle-right"/>
            </div>
        </div>

    );
};

export default PhotoSlider;