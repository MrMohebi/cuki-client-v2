import React from 'react';
import {ButtonBase} from "@material-ui/core";

const FoodsNavBar = (props) => {
    return (
        <div id={'top-nav-container'} style={{
            width: '100%',
            zIndex: 999,
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexFlow: 'row',
            height:'101px'
        }}>
            <ButtonBase style={{
                width: '7.5%',
                zIndex: 2,
                borderRadius: '0 100 100 0',
                background: 'white',
                fontSize: 20
            }}
                        className={'navbar-navigation-btn'}
                        onClick={() => {
                            document.getElementById('category-scroller').scrollBy(-100, 0)
                        }}
            >
                <i className="fas fa-angle-left " style={{
                    width: 50,
                    height: 50,
                    lineHeight: 2.5,
                }}
                />
            </ButtonBase>


            <div id={'category-scroller-outer'} >
                <div id={'category-scroller'} className={'d-flex flex-row-reverse '}
                     style={{
                         padding: '10px 0px 0 0px',
                         overflow: 'scroll',
                         scrollBehavior: 'smooth',
                         borderRadius: 15,
                         position: 'relative'
                     }}>
                    {
                        props.catsFullInfo[props.currentActivePart] ? Object.keys(props.catsFullInfo[props.currentActivePart]).map(eachCategory => {
                                let persianName = props.catsFullInfo[props.currentActivePart][eachCategory]['persianName']
                                return (
                                    <a style={{
                                        display: 'contents'
                                    }} className={'menu-item'} href={'#' + eachCategory}>
                                        <ButtonBase style={{
                                            borderRadius: 15,
                                            transition: '0.2s ease ',
                                        }}
                                                    onClick={() => {
                                                        props.setState({
                                                            currentFoodIDs: props.catsFullInfo[props.currentActivePart][eachCategory]['foodList'],
                                                            currentCat: eachCategory
                                                        })
                                                    }}
                                                    className='categoryPageEachCategoryContainer mx-2 my-2'>
                                            <div style={{
                                                boxShadow: "rgb(255,255,255) 0px 0px 0px 0px"
                                            }} className="categoryPageEachCategory">
                                                <div className="categoryPageEachCategoryImage"
                                                     style={{
                                                         backgroundImage: 'url(/img/categories/' + (eachCategory.toLowerCase().includes('pizza') ? 'pizza' : eachCategory) + '.png)',
                                                         backgroundSize: 'cover',
                                                         backgroundPosition: 'center',
                                                         backgroundRepeat: 'no-repeat'
                                                     }}/>
                                                <span
                                                    className="categoryPageEachCategoryName">{persianName}</span>
                                            </div>
                                        </ButtonBase>
                                    </a>
                                )
                            })
                            :
                            <div/>
                    }
                </div>


                <div id={'nav-right-shadow'} style={{
                    content: '',
                    height: '100%',
                    top: 0,
                    right: 0,
                    width: '20px',
                    background: 'linear-gradient(to left, #fff1da, #fff1da00)',
                    position: 'absolute',
                }}/>
                <div id={'nav-left-shadow'} style={{
                    content: '',
                    height: '100%',
                    top: 0,
                    left: 0,
                    width: '20px',
                    background: 'linear-gradient(to right, #fff1da, #fff1da00)',
                    position: 'absolute',
                }}/>

            </div>

            <ButtonBase className={'navbar-navigation-btn'} style={{
                width: '7.5%',
                zIndex: 2,
                borderRadius: '0 100 100 0',
                background: 'white',
                fontSize: 20
            }}
                        onClick={() => {
                            document.getElementById('category-scroller').scrollBy(100, 0)
                        }}
            >
                <i className="fas fa-angle-right " style={{
                    width: 50,
                    height: 50,
                    lineHeight: 2.5,
                }}/>
            </ButtonBase>
        </div>
    );
};

export default FoodsNavBar;