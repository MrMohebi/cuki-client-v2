import React from 'react';
import * as RandomColor from "../../../functions/RandomColor";

const FoodList = (props) => {
    let randomColors = ["#FFF7F7", "#D7E2DE", "#D4EBEF", "#FFF7F7", "#fff1da", "#D4EBEF",]

    let calculateTheFontSize = (foodName) => {
        return ((((10 * 2) / foodName.length) >= 1.5 ? 1.5 : (20 / foodName.length)) + 'rem')
    }
    return (<div style={{
            height: 'calc(100% - 121px)', overflowY: 'scroll', scrollBehavior: 'smooth', marginTop: '-15px'
        }} id={'scroller'}>
            {props.catsFullInfo[props.currentActivePart] ? Object.keys(props.catsFullInfo[props.currentActivePart]).map((eachCat, index) => {
                let category = props.catsFullInfo[props.currentActivePart][eachCat]
                let filteredFoods = props.foodList.filter(eachFood => {
                    if (eachFood) {
                        return category.foodList.includes(eachFood.id);
                    }
                })
                if (props.lockCategory && eachCat !== props.currentCategory) {
                    return null
                }

                return (<div key={index} className={'sections '} style={{
                        paddingTop: 170, marginTop: '-130px'
                    }} id={category['englishName']}>
                        <p className={'food-category-text text-black-50 IranSans secondary-text'}>{category['persianName']}
                        </p>

                        <section className={'mt-3 d-flex flex-wrap food-section'} style={{
                            backgroundColor: randomColors[index] ? randomColors[index] : randomColors[index - randomColors.length]
                        }}>

                            {filteredFoods.map((eachFood, index) => {
                                let subsets = props.subsets[eachFood.persianName];
                                if (eachFood && !eachFood['relatedMainPersianName']) {
                                    let colors = RandomColor.RandomColor(eachFood.id);
                                    return (
                                        <div

                                            onContextMenu={(e) => {
                                            e.preventDefault()
                                        }}
                                                 key={eachFood['id']}
                                                 className='foodListEachFoodContainer animate__animated animate__fadeInDown'
                                                 onClick={(e) => {
                                                     props.openExpander(e, true, !!subsets)
                                                 }}
                                        >
                                            <div className='foodListEachFood'
                                                 id={'food' + eachFood['id']}
                                                 style={{backgroundColor: colors.background}}>
                                                {parseInt(eachFood['discount']) > 0 ? subsets ? null : <span
                                                    className={'discountPercentage'}>{eachFood.discount ? eachFood.discount + "%" : '0'}  </span> : null}
                                                <div style={{
                                                    minHeight: '50px'
                                                }} className='priceAndImage'>
                                                    {(eachFood.status === 'in stock' || eachFood.status === 'inStock') ? eachFood.discount === 0 ? subsets ? null :

                                                                <span
                                                                    id={'food-price'}
                                                                    style={{
                                                                        position: 'absolute', right: '70px', top: 0
                                                                    }} className='eachFoodPrice '>
                                                                                {eachFood.price / 1000} T
                                                                                </span>

                                                            : subsets ? null : <div
                                                                className={'d-flex flex-column justify-content-center'}>
                                                                                <span
                                                                                    style={{
                                                                                        textDecoration: 'line-through',
                                                                                        fontSize: '0.6rem',
                                                                                        lineHeight: '1.5rem',
                                                                                        color: '#787878'
                                                                                    }}
                                                                                    className='eachFoodPrice'>
                                                                                    {eachFood.price / 1000} T
                                                                                </span>

                                                                <span
                                                                    id={'food-price ' + index}
                                                                    style={{fontWeight: 'bolder'}}
                                                                    className='eachFoodPriceDiscount'>
                                                                                        {eachFood.price * (1 - eachFood.discount / 100) / 1000} T
                                                                                </span>
                                                            </div>

                                                        : <span
                                                            className='outOfStockTextHolder'>
                                                                                ناموجود
                                                                        </span>}
                                                    <div id={'food-image'}
                                                         className='eachFoodImage'
                                                         style={{
                                                             background: "transparent",
                                                             backgroundSize: 'cover',
                                                             backgroundPosition: 'center',
                                                             position: 'absolute',
                                                             right: '0px',
                                                             top: '0px'

                                                         }}>
                                                        <img
                                                            src={eachFood.thumbnail}
                                                            style={{
                                                                width: '100%', height: '100%', borderRadius: '50px'
                                                            }}
                                                            alt={'foodImage'}/>
                                                    </div>
                                                </div>

                                                <div id={'food-name'}
                                                     className='foodName'
                                                     style={{
                                                         width: '100%',
                                                         top: '60px',
                                                         overflow: 'visible',
                                                         right: '0',
                                                         position: 'absolute',
                                                         color: colors.foreground,
                                                         fontSize: calculateTheFontSize(eachFood['persianName'])
                                                     }}>{eachFood.persianName}</div>
                                                <div className='w-100 d-flex justify-content-center'>
                                                                <span id={'food-details'}
                                                                      style={{
                                                                          width: '100%',
                                                                          right: 0,
                                                                          position: 'absolute',
                                                                          top: '95px',
                                                                          overflow: 'hidden',
                                                                          opacity: subsets ? 0 : 1
                                                                      }}
                                                                      className='foodDetails animate__animated animate__fadeInUp animate__faster'>
                                                                    {eachFood.details ? eachFood.details.join(' - ') : ''}
                                                                </span>

                                                </div>
                                                {subsets ? <div id={'size-price'}
                                                                className={'size-price px-2 IranSans'}>
                                                    {props.subsets[eachFood.persianName].map(subset => {
                                                        return (<div key={subset['englishName']}
                                                                className={'each-size-price d-flex flex-row justify-content-between align-items-center px-2'}>
                                                                <span>{subset['price'] + " " + "T"}</span>
                                                                <span>{subset['persianName']}</span>
                                                            </div>)
                                                    })}
                                                </div> : null}

                                            </div>
                                        </div>)
                                }
                            })

                            }
                        </section>
                    </div>


                )
            }) : <div/>}
            <div style={{
                height: '10vh'
            }}/>
        </div>);
};

export default FoodList;