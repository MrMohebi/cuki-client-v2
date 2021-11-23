import React from 'react';


const expanderW = 300;
let lastExpanderPosition = React.createRef();
let lastClickedFood = React.createRef();

export let openExpander = (e, open) => {
    let mainContainer = document.getElementsByClassName('welcomePageMainContainerCover ')[0]
    let expander = document.getElementById('expander')
    let overlay = document.getElementById('expander-overlay')

    if (open) {
        let slider = document.getElementById('photo-slider')


        expander.style.transition = '0s ease'

        mainContainer.style.overflow = 'hidden'

        expander.style.height = expanderW + 'px'
        expander.style.width = expanderW + 'px'

        lastExpanderPosition.current = {
            top: '',
            left: ''
        }

        let offset = 0;
        if (window.innerWidth > 800) {
            offset = window.innerWidth - 800
        }

        expander.style.top = "calc(100% + " + (e.currentTarget.getBoundingClientRect().y - 20) + "px )"
        lastExpanderPosition.current.top = "calc(100% + " + (e.currentTarget.getBoundingClientRect().y - 25) + "px )"
        expander.style.left = ((e.currentTarget.getBoundingClientRect().x - offset / 2) + e.currentTarget.getBoundingClientRect().width / 2 - expanderW / 2 + "px")
        lastExpanderPosition.current.left = ((e.currentTarget.getBoundingClientRect().x - offset / 2) + e.currentTarget.getBoundingClientRect().width / 2 - expanderW / 2 + "px")

        expander.style.transition = '.3s ease'
        expander.style.pointerEvents = 'all'

        overlay.style.opacity = '1';
        overlay.style.pointerEvents = 'all';
        let duplicated = e.currentTarget.firstChild.cloneNode(true)
        duplicated.style.transition = '0.3s ease';
        duplicated.appendChild(slider)

        e.currentTarget.firstChild.style.opacity = 0
        lastClickedFood.current = e.currentTarget.firstChild;

        duplicated.style.marginTop = '0px';
        duplicated.style.overflow = 'hidden';
        duplicated.classList.add('expended');
        duplicated.querySelector('.priceAndImage').children[1].style.margin = '10px'
        setTimeout(() => {
            expander.style.left = ((window.innerWidth / 2 - expanderW / 2) - offset / 2) + 'px';
            expander.style.top = "calc(100vh + " + (window.innerHeight / 2 - expanderW / 2) + "px )";
            expander.style.width = (window.innerWidth - offset) + 'px'
            expander.style.left = '0';
            expander.style.height = window.innerHeight + 'px';
            expander.style.top = '100%';
            duplicated.style.height = '500px';
            duplicated.style.width = document.body.getBoundingClientRect().width - 50 + 'px';

        }, 0)

        expander.firstChild ? expander.firstChild.replaceWith(duplicated) :
            expander.append(duplicated)
        setTimeout(() => {
            let image = duplicated.querySelector('#food-image')
            let price = duplicated.querySelector('#food-price')
            let name = duplicated.querySelector('#food-name')
            let details = duplicated.querySelector('#food-details')
            let elementTransitions = '.3s ease '

            image.style.setProperty('transition', elementTransitions, 'important')
            price.style.setProperty('transition', elementTransitions, 'important')
            name.style.setProperty('transition', elementTransitions, 'important')
            details.style.setProperty('transition', elementTransitions, 'important')

            image.style.setProperty('height', '80px', 'important')
            image.style.setProperty('width', '80px', 'important')
            image.style.right = '10px'
            image.style.top = '10px'

            price.style.top = '60px'
            price.style.right = '110px'

            name.style.width = '0'
            name.style.right = '110px'
            name.style.top = '30px'

            details.style.top = '90px'
            details.style.fontSize = '0.8rem'
            details.style.textAlign = 'right'
            details.style.padding = '20px'
            details.style.whiteSpace = 'normal'

        }, 50)


    } else {
        let duplicated = document.getElementById('expander').firstChild
        overlay.style.pointerEvents = 'none'
        expander.style.left = lastExpanderPosition.current.left
        expander.style.top = lastExpanderPosition.current.top
        expander.style.width = expanderW + 'px'
        expander.style.height = expanderW + 'px'
        duplicated.style.height = '';
        duplicated.style.width = '';
        expander.style.pointerEvents = 'none'
        duplicated.style.borderRadius = '20px 35px 20px 20px';


        lastClickedFood.current.style.opacity = 1
        duplicated.querySelector('.priceAndImage').children[1].style.margin = '0px'

        let image = duplicated.querySelector('#food-image')
        let price = duplicated.querySelector('#food-price')
        let name = duplicated.querySelector('#food-name')
        let details = duplicated.querySelector('#food-details')
        let elementTransitions = '.3s ease'
        image.style.setProperty('transition', elementTransitions, 'important')
        price.style.setProperty('transition', elementTransitions, 'important')
        name.style.setProperty('transition', elementTransitions, 'important')
        details.style.setProperty('transition', elementTransitions, 'important')

        image.style.setProperty('height', '', 'important')
        image.style.setProperty('width', '', 'important')
        image.style.right = '0px'
        image.style.top = '0px'

        price.style.top = '0px'
        price.style.right = '70px'

        name.style.width = '100%'
        name.style.right = '0px'
        name.style.top = '60px'

        details.style.top = '90px'
        details.style.textAlign = 'center'
        details.style.padding = '0px'
        details.style.whiteSpace = 'nowrap'

        setTimeout(() => {
            overlay.style.opacity = 0;
            duplicated.style.opacity = 0
        }, 300)

    }

}


const Expander = () => {



    return (
        <div>
            <div id={'expander-overlay'} className={'expander-overlay'}/>


            <div id={'expander'} className={'expander'}

                 onClick={(e) => {
                     if (e.target.classList.contains('expander')) {
                         openExpander(null, false)
                     }
                 }}
                 style={
                     {
                         position: "absolute",
                         background: "transparent",
                         width: expanderW,
                         height: expanderW,
                         zIndex: 9999,
                         display: 'flex',
                         justifyContent: 'center',
                         alignItems: 'center',
                         transition: '.3s ease',
                         pointerEvents:'none'
                     }
                 }
            />

        </div>
    );
};

export default Expander;