import React from 'react';

const expanderW = 300;
let lastExpanderPosition = React.createRef();
let lastClickedFood = React.createRef();
let lastOpenedMultiplePrices = React.createRef();

export let openExpander = (e, open, multiplePrices, thumbnailOpened) => {

    let mainContainer = document.getElementsByClassName('welcomePageMainContainerCover ')[0]
    let expander = document.getElementById('expander')
    let overlay = document.getElementById('expander-overlay')
    lastOpenedMultiplePrices.current = multiplePrices

    if (open) {
        try {


            expander.style.transition = '0s ease'

            mainContainer.style.overflow = 'hidden'

            expander.style.height = expanderW + 'px'
            expander.style.width = expanderW + 'px'

            lastExpanderPosition.current = {
                top: '', left: ''
            }

            let offset = 0;
            if (window.innerWidth > 100 * 8) {
                offset = window.innerWidth - 100 * 8
            }

            expander.style.top = "calc(100% + " + (e.currentTarget.getBoundingClientRect().y - (10 * 2)) + "px )"
            lastExpanderPosition.current.top = "calc(100% + " + (e.currentTarget.getBoundingClientRect().y - (10 * 2 + 5)) + "px )"
            expander.style.left = ((e.currentTarget.getBoundingClientRect().x - offset / 2) + e.currentTarget.getBoundingClientRect().width / 2 - expanderW / 2 + "px")
            lastExpanderPosition.current.left = ((e.currentTarget.getBoundingClientRect().x - offset / 2) + e.currentTarget.getBoundingClientRect().width / 2 - expanderW / 2 + "px")

            expander.style.transition = '.3s ease'
            expander.style.pointerEvents = 'all'

            overlay.style.opacity = '1';
            overlay.style.pointerEvents = 'all';
            let duplicated = e.currentTarget.firstChild.cloneNode(true)
            duplicated.style.transition = '0.3s ease';
            // duplicated.appendChild(slider)

            let closeButton = document.createElement('i')
            closeButton.className = 'fas fa-times justify-content-center align-items-center d-flex flex-column position-absolute top-0 left-0 '
            closeButton.style.color = '#565656'
            closeButton.id = 'expander-close'
            closeButton.style.width = '30px'
            closeButton.style.height = '30px'
            closeButton.addEventListener('click', () => {
                openExpander(null, false)
            })

            duplicated.appendChild(closeButton)

            e.currentTarget.firstChild.style.opacity = 0
            lastClickedFood.current = e.currentTarget.firstChild;

            duplicated.style.marginTop = '0px';
            duplicated.style.overflow = 'hidden';
            duplicated.classList.add('expended');
            if (!!multiplePrices && !multiplePrices) duplicated.querySelector('.priceAndImage').children[1].style.margin = '10px'
            setTimeout(() => {
                expander.style.left = ((window.innerWidth / 2 - expanderW / 2) - offset / 2) + 'px';
                expander.style.top = "calc(100vh + " + (window.innerHeight / 2 - expanderW / 2) + "px )";
                expander.style.width = (window.innerWidth - offset) + 'px'
                expander.style.left = '0';
                expander.style.height = window.innerHeight + 'px';
                expander.style.top = '100%';
                duplicated.style.height = '300px';
                duplicated.style.width = document.body.getBoundingClientRect().width - (10 * 5) + 'px';

            }, 0)

            expander.firstChild ? expander.firstChild.replaceWith(duplicated) : expander.append(duplicated)
            setTimeout(() => {
                let image = duplicated.querySelector('#food-image')
                let price = duplicated.querySelector('#food-price')

                if (price) {
                    if (price.innerText === 'ناموجود')
                        price.style.opacity = 0
                }
                let name = duplicated.querySelector('#food-name')
                let details = duplicated.querySelector('#food-details')
                let prices = duplicated.querySelector('#size-price')
                let discount = duplicated.querySelector('.discountPercentage')
                let elementTransitions = '.3s ease '

                image.style.setProperty('transition', elementTransitions, 'important')

                if (!!multiplePrices && !multiplePrices) price.style.setProperty('transition', elementTransitions, 'important')


                name.style.setProperty('transition', elementTransitions, 'important')
                details.style.setProperty('transition', elementTransitions, 'important')

                image.style.setProperty('height', '80px', 'important')
                image.style.setProperty('width', '80px', 'important')
                image.style.right = '10px'
                image.style.top = '10px'
                let handleThumbnailClick = () => {
                    let WH = document.getElementsByClassName('expended')[0].getBoundingClientRect().width - 50
                    image.removeEventListener('click', handleThumbnailClick)
                    thumbnailOpened = true;
                    image.style.width = WH + 'px'
                    image.style.height = WH + 'px'
                    image.style.margin = '0'
                    image.style.right = '50%'
                    image.style.transform = 'translateX(50%)'
                    image.style.borderRadius = '20px'
                    image.style.zIndex = 9999
                    duplicated.style.height = parseInt(duplicated.style.height) + 300 + 'px'
                    name.style.top = WH + 20 + 'px'
                    name.style.right = '20px'
                    details.style.top = WH + 60 + 'px'

                    if (!multiplePrices && !discount) {
                        if (price) {
                            price.style.top = WH + 50 + 'px'
                            price.style.right = '20px'
                        }
                    }
                }
                image.addEventListener("click", handleThumbnailClick)
                if (!multiplePrices && !discount) {
                    if (price) {
                        price.style.top = '60px'
                        price.style.right = '110px'
                    }
                }


                name.style.width = '0'
                name.style.right = '110px'
                name.style.top = '20px'
                name.classList.add('normal-font-size')

                if (multiplePrices) details.style.top = '150px'
                else details.style.top = '90px'
                details.style.fontSize = '0.8rem'
                details.style.textAlign = 'right'
                details.style.padding = '20px'
                details.style.whiteSpace = 'normal'
                details.style.opacity = '1'

                if (prices) {
                    prices.classList.add('extended-prices')
                }

                if (discount) {
                    discount.style.opacity = '0'
                }
            }, (10 * 5))

        } catch (e) {
            console.log(e)
        }
    } else {
        try {


            thumbnailOpened = false;

            let duplicated = document.getElementById('expander').firstChild
            let closeButton = document.getElementById('expander-close') ? document.getElementById('expander-close') : null
            if (closeButton)
                closeButton.remove()

            expander.style.left = lastExpanderPosition.current.left
            expander.style.top = lastExpanderPosition.current.top
            expander.style.width = expanderW + 'px'
            expander.style.height = expanderW + 'px'
            duplicated.style.height = '';
            duplicated.style.width = '';
            expander.style.pointerEvents = 'none'
            duplicated.style.borderRadius = '20px 35px 20px 20px';


            setTimeout(() => {
                lastClickedFood.current.style.opacity = 1
            }, 300)
            if (!!multiplePrices && !multiplePrices) duplicated.querySelector('.priceAndImage').children[1].style.margin = '0px'


            let image = duplicated.querySelector('#food-image')
            let price = duplicated.querySelector('#food-price')
            let name = duplicated.querySelector('#food-name')
            let details = duplicated.querySelector('#food-details')
            let elementTransitions = '.3s ease'
            let discount = duplicated.querySelector('.discountPercentage')

            image.style.setProperty('transition', elementTransitions, 'important')
            if (!!multiplePrices && !multiplePrices)
                if (price) {
                    price.style.setProperty('transition', elementTransitions, 'important')
                }
            name.style.setProperty('transition', elementTransitions, 'important')
            details.style.setProperty('transition', elementTransitions, 'important')

            image.style.setProperty('height', '', 'important')
            image.style.setProperty('width', '', 'important')
            image.style.right = '0px'
            image.style.top = '0px'
            image.style.borderRadius = '59px'
            image.style.transform = 'translate(0,0)'

            if (!multiplePrices && !discount) {
                if (price) {
                    price.style.top = '0px'
                    price.style.right = '70px'
                }
            }


            name.style.width = '100%'
            name.style.right = '0px'
            name.style.top = '60px'
            name.classList.remove('normal-font-size')
            details.style.top = '90px'
            setTimeout(() => {
                details.style.textAlign = 'center'
            }, 200)
            details.style.padding = '0px'
            details.style.whiteSpace = 'nowrap'
            multiplePrices ? details.style.opacity = '0' : details.style.opacity = '1'

            setTimeout(() => {
                overlay.style.opacity = '0';
                duplicated.style.opacity = 0
                overlay.style.pointerEvents = 'none'
                mainContainer.style.overflowY = 'scroll'
            }, (100 * 3))
        }catch (e){
            console.log(e)
        }


    }

}


const Expander = () => {

    let thumbnailOpened = React.useRef(false);

    return (<div>
        <div id={'expander-overlay'} className={'expander-overlay'}/>


        <div id={'expander'} className={'expander'}

             onClick={(e) => {
                 if (e.target.classList.contains('expander')) {
                     openExpander(null, false, lastOpenedMultiplePrices.current, thumbnailOpened.current)
                 }
             }}
             style={{
                 position: "absolute",
                 background: "transparent",
                 width: expanderW,
                 height: expanderW,
                 zIndex: 9999,
                 display: 'flex',
                 justifyContent: 'center',
                 alignItems: 'center',
                 transition: '.3s ease',
                 pointerEvents: 'none'
             }}
        />

    </div>);
};

export default Expander;