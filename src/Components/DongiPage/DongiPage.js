import React from "react";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import './css/style.css'
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';
import * as requests from "../../ApiRequests/ApiRequests";
import produce from "immer";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import fixBodyClass from "../../functions/fixSwalBody";
import {Button} from "@material-ui/core";
import {HashLoader} from "react-spinners";
import LoadingOverlay from "react-loading-overlay";
import {Swipeable} from "../BillPage/BillPage";
import {SwipeableListItem} from "@sandstreamdev/react-swipeable-list";

const ReactSwal = withReactContent(Swal)


function url2paramsArray(search) {
    return JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}


class DongiPage extends React.Component {
    timer;

    searchParam = this.props.history.location.search.replace("?", "").length > 2 ? this.props.history.location.search.replace("?", "") : "null=null"
    urlParams = url2paramsArray(this.searchParam) // 12827295

    componentDidMount() {

        this.getOrderList(this.state.trackingId)
        this.timer = setInterval(() => {
            this.getPaidItemsInfo(this.state.trackingId)
            this.setState({
                allPaid: (this.sumFoodPriceOrderList() === this.paidItemsPrice())
            })
        }, 3000)


    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    state = {
        trackingId: this.urlParams['trackingId'] ? this.urlParams['trackingId'] : 0,
        orderList: [],
        paidList: [],
        selectedToPay: [],
        foodsList: <div/>,
        dialogClassName: 'd-none',
        payLink: '',
        loading: false,
        allPaid: false
    }


    MakeItOpen = (id) => {
        document.getElementById(id).classList.toggle('eachDongContainerOpened')
        let arrow = document.getElementById(id).getElementsByClassName('dongiArrowDown')[0]
        arrow.classList.toggle('rotate180deg')
    }

    getOrderList = (trackingId) => {
        requests.getOrderByTrackingId(this.setOrderToState, trackingId)
    }

    getPaidItemsInfo = (trackingId) => {
        requests.getPaymentInfoByTrackingId(this.setPaidItemsToState, trackingId)
    }

    setOrderToState = (res) => {
        if (res.hasOwnProperty("statusCode") && res.statusCode === 200) {
            this.setState({
                orderList: JSON.parse(res.data["order_list"])
            })
            this.getPaidItemsInfo(this.state.trackingId)
        }
    }

    setPaidItemsToState = (res) => {
        if (res.hasOwnProperty("statusCode") && res.statusCode === 200) {
            let newSavedPaidItems = [];
            res.data.map(ePaid => {
                if (ePaid['isPaid'] && ePaid.itemType === "food") {
                    let items = JSON.parse(ePaid.item);
                    items.map(ePaidFood => {
                        let flagUpdate = false
                        newSavedPaidItems.map((eSavedPaidFood, index) => {
                            if (ePaidFood.id === eSavedPaidFood.id) {
                                flagUpdate = true;
                                let newFoodNumber = ePaidFood.number + eSavedPaidFood.number;
                                newSavedPaidItems[index] = {
                                    id: eSavedPaidFood.id,
                                    tPrice: newFoodNumber * ePaidFood['priceAfterDiscount'],
                                    number: newFoodNumber
                                }
                            }
                        })
                        if (!flagUpdate) {
                            newSavedPaidItems.push({
                                id: ePaidFood.id,
                                tPrice: ePaidFood.number * ePaidFood['priceAfterDiscount'],
                                number: ePaidFood.number
                            })
                        }
                    })
                }
                this.setState({
                    paidList: newSavedPaidItems,
                    foodsList: this.createFoodsList(this.state.orderList, newSavedPaidItems),
                })
            })
        } else {
            console.log("Some thing went wrong during fetching Paid Items")
            this.setState({
                foodsList: this.createFoodsList(this.state.orderList, [])
            })
        }
    }

    increaseSelectedFood = (foodId, newNumber, maxNumber) => {
        if (newNumber > maxNumber)
            return false
        let newFoodInfo = {}
        this.setState({
            selectedToPay: produce(this.state.selectedToPay, (draft => {
                let isUpdatedFlag = false
                draft.map((eSFood, index) => {
                    if (eSFood.id === foodId) {
                        draft[index].number += 1
                        isUpdatedFlag = true
                        newFoodInfo = {...draft[index]};
                    }
                })
                if (!isUpdatedFlag) {
                    let newSelectedFood = produce(this.state.orderList.filter(eOFood => eOFood.id === foodId)[0], draft => {
                        draft.number = 1
                    })
                    draft.push(newSelectedFood)
                    newFoodInfo = newSelectedFood;
                }

            })),
            foodsList: this.createFoodsList(this.state.orderList, this.state.paidList, newFoodInfo),
        })
    }

    decreaseSelectedFood = (foodId, newNumber) => {
        if (newNumber < 0)
            return false
        let newFoodInfo = {}
        this.setState({
            selectedToPay: produce(this.state.selectedToPay, (draft => {
                draft.map((eSFood, index) => {
                    if (eSFood.id === foodId) {
                        draft[index].number -= 1
                        newFoodInfo = {...draft[index]};
                        if (draft[index].number <= 0) {
                            newFoodInfo = {id: draft[index].id, number: 0, priceAfterDiscount: 0};
                            draft.splice(index, 1)
                        }
                    }
                })
            })),
            foodsList: this.createFoodsList(this.state.orderList, this.state.paidList, newFoodInfo),
        })
    }

    createFoodsList = (orderList, paidList, newFoodInfo = {id: -1}) => {
        return orderList.map(eFood => {
            let paidFood = paidList.filter(ePFood => ePFood.id === eFood.id)[0]
            let selectedFood = this.state.selectedToPay.filter(eSFood => eSFood.id === eFood.id)[0]
            let totalPrice = paidFood ? ((eFood.number * eFood['priceAfterDiscount']) - paidFood.tPrice) / 1000 : (eFood.number * eFood['priceAfterDiscount']) / 1000
            let totalNumber = paidFood ? eFood.number - paidFood.number : eFood.number
            let selectedPrice
            let selectedNumber
            if (newFoodInfo.id === eFood.id) {
                selectedPrice = (newFoodInfo.number * newFoodInfo['priceAfterDiscount']) / 1000
                selectedNumber = newFoodInfo.number
            } else {
                selectedPrice = (selectedFood) ? (selectedFood.number * selectedFood['priceAfterDiscount']) / 1000 : 0
                selectedNumber = (selectedFood) ? (selectedFood.number) : 0
            }

            return (

                totalNumber !== 0 ?
                    <SwipeableListItem key={eFood.id}
                                       swipeLeft={{
                                           content: <div/>,
                                           action: () => this.decreaseSelectedFood(eFood.id, selectedNumber + 1)
                                       }}
                                       swipeRight={{
                                           content: <div/>,
                                           action: () => this.increaseSelectedFood(eFood.id, selectedNumber + 1, totalNumber)

                                       }}>

                    <div key={eFood.id} id={eFood.id}
                         className='eachDongContainer position-relative w-100 '>

                        <div className='eachDongContainerHolders' onClick={() => {
                            this.MakeItOpen(eFood.id)
                        }}>
                            <span className='eachDongFoodName font-weight-bold'>{eFood.name}</span>
                            <span
                                className='IranSans DongiPayText eachDongFoodName font-weight-bold'>پرداخت </span>
                            <div className='howMuchContainer'>
                                <div className='howMuchNumber IranSans'><span>تا </span> <span
                                    className='greenDongiText'>{selectedNumber} </span></div>
                                <div className='IranSans'>{selectedPrice}T</div>
                            </div>
                            <span className='dongiFromText'>از</span>
                            <div className='howMuchContainer'>
                                <div className='howMuchNumber IranSans'><span>تا </span> <span
                                    className='greenDongiText'>{totalNumber}</span></div>
                                <div className='IranSans'>{totalPrice}T</div>
                            </div>
                        </div>
                        <div
                            className='d-flex flex-row-reverse align-items-center dongNumberHolder text-center justify-content-center  m-auto'>

                            <AddRoundedIcon onClick={() => {
                                this.increaseSelectedFood(eFood.id, selectedNumber + 1, totalNumber)
                            }} className='w-25'/>
                            <div className='dongNumberOfFood '>X {selectedNumber}</div>
                            <RemoveRoundedIcon onClick={() => {
                                this.decreaseSelectedFood(eFood.id, selectedNumber + 1)
                            }} className='w-25'/>

                        </div>
                        <ArrowDropDownRoundedIcon onClick={() => {
                            this.MakeItOpen(eFood.id)
                        }} className='position-absolute dongiArrowDown w-100 '/>

                    </div>
                    </SwipeableListItem>
    :
        <div key={eFood.id} id={eFood.id} style={{height: '60px'}}
             className='eachDongContainer position-relative w-100'>

            <div className='eachDongContainerHolders'>
                <span className='eachDongFoodName font-weight-bold'>{eFood.name}</span>
                <span className='IranSans DongiPayText  font-weight-bold'> </span>
                <span className='IranSans paidItemsText  font-weight-bold'/>
                <span className='IranSans paidItemsText  '>پرداخت شده </span>
                <span className=' font-weight-bold'>{totalPrice}T</span>
            </div>

        </div>
    )
    }
)
}

sumFoodPrice = () => {
    let total = 0;
    this.state.selectedToPay.map(eSFood => {
            total += (eSFood.number * eSFood['priceAfterDiscount'])
        }
    )
    return total
}
paidItemsPrice = () => {
    let total = 0;
    this.state.paidList.map(eSFood => {
        total += (eSFood.number * eSFood['tPrice'])
    })
    return total
}

sumFoodPriceOrderList = () => {
    let total = 0;
    this.state.orderList.map(eSFood => {
        total += (eSFood.number * eSFood['priceAfterDiscount'])
    })
    return total
}


handleSubmit = (dongi) => {

    if (dongi) {
        let totalPrice = this.sumFoodPrice()
        if (totalPrice < 1000) {
            ReactSwal.fire({
                title: 'حداقل یه چیز رو واسه پرداخت انتخاب کن',
                icon: 'info',
                confirmButtonText: "عه حواسم نبود، اوکیه",
            })
            fixBodyClass()
            console.log(this.state.selectedToPay)
            return false;
        }
        requests.sendPaymentRequestFood(this.callbackPaymentRequest, this.state.selectedToPay, totalPrice, this.state.trackingId);
        this.setState({
            selectedToPay: []
        })

    } else {
        let totalPrice = this.sumFoodPriceOrderList()
        requests.sendPaymentRequestFood(this.callbackPaymentRequest, this.state.orderList, totalPrice, this.state.trackingId);
        this.setState({
            selectedToPay: []
        })
    }
    this.setState({
        loading: true,
    })

}


callbackPaymentRequest = (res) => {
    if (res.statusCode === 200) {
        this.setState({
            loading: false,
        })
        ReactSwal.fire({
            title: 'تمومه',
            icon: 'success',
            confirmButtonText: 'بریم درگاه پرداخت',
            showDenyButton: true,
            denyButtonText: "میخوام لینک پرداخت رو ارسال کنم واسه دوستم",
            denyButtonColor: "#47b8e5",
            text: "مبلغ : " + res.data.amount / 1000 + " تومن \n",
        }).then(resultSwalPay => {
            if (resultSwalPay.isConfirmed) {
                window.open(res.data.url, '_blank').focus()
            } else if (resultSwalPay.isDenied) {
                if (navigator.clipboard !== undefined) {
                    navigator.clipboard.writeText(
                        "لینک پرداخت دونگ کوکی" + "\n" +
                        "مبلغ : " + res.data.amount / 1000 + " هزار تومن \n" + "\n" +
                        " بزن روی لینک پایینی بری تو درگاه " + "\n"
                        + res.data.url).then(() => {
                        ReactSwal.fire("لینک توی کلیپ بورد ذخیره شد")
                    })
                } else {
                    this.setState({
                        dialogClassName: 'animate__fadeIn animate__animated',
                        payLink: res.data.url
                    })
                }


            }
        });
        fixBodyClass()
    } else {
        ReactSwal.fire({
            title: '!!! آخ',
            icon: 'error',
            confirmButtonText: 'اوکیه',
            text: "یه چیزی درست کار نکرد، میشه از اول امتحان کنی؟",
        });
        fixBodyClass()
    }
}

handleBack = () => {
    this.props.history.goBack()
}

render()
{
    return (
        <Swipeable style={{height: "100%"}} onSwipedRight={this.swipeRight} onSwipedLeft={this.swipeLeft}
                   children={
                       <LoadingOverlay
                           active={this.state.loading}
                           spinner={<HashLoader
                               css={{
                                   transform: 'translate(-50%,-250%) !important',
                                   position: 'absolute',
                                   left: '50%'
                               }}
                               color={'white'}/>}
                           text='... انجام کارای بانکی'
                       >
                           <React.Fragment>
                               <div
                                   className='categoryPageHeader pl-2 pr-2 pt-2 d-flex flex-row justify-content-between align-items-center'>
                                   <ArrowBackRoundedIcon onClick={this.handleBack}/>
                                   <div className='text-center d-flex justify-content-around flex-row'>
                                       <div className='IranSans'>نحوه پرداخت</div>
                                   </div>
                                   <ArrowBackRoundedIcon className='invisible'/>
                               </div>
                               <div className={'dongiDialog ' + this.state.dialogClassName}>
                                   <div className='dialogContainer'>
                        <span className='payLinkTextHolder'>
                            اینم از لینک
                        </span>
                                       <input className='linkInput' ref={'linkInput'} type="text" readOnly
                                              value={this.state.payLink}/>
                                       <Button onClick={() => {
                                           this.refs.linkInput.select()
                                           document.execCommand('copy')
                                           this.refs.copied.innerHTML = 'کپی شد'
                                           setTimeout(() => {
                                               this.setState({
                                                   dialogClassName: 'animate__fadeOut animate__animated'
                                               })
                                           }, 500)
                                           setTimeout(() => {
                                               this.setState({
                                                   dialogClassName: 'd-none'
                                               })
                                           }, 1000)
                                       }} className='w-25 m-auto' variant={"contained"} color={"primary"}>
                                           کپی
                                       </Button>
                                       <span ref={'copied'} className='IranSans copiedHolder m-auto w-50'/>
                                   </div>
                               </div>
                               <div className='dongiPageContainer d-flex flex-column'>
                                   <div className='w-100 d-flex flex-column '>

                                       {this.state.foodsList}

                                   </div>

                                   {
                                       !this.state.allPaid ?
                                           <div
                                               className={'dongiPayButtonsContainer d-flex justify-content-around '}>
                                               <div onClick={() => {
                                                   this.handleSubmit(true)
                                               }} className='DongiSubmitButtonNew mt-5'>
                                                   <span>پرداخت دونگ</span>
                                               </div>

                                               <div onClick={() => {
                                                   this.handleSubmit(false)
                                               }} className='DongiAllSubmitButtonNew mt-5'>
                                                   <span>پرداخت یکجا</span>
                                               </div>

                                           </div>
                                           :
                                           <div
                                               className={'dongiPayButtonsContainer d-flex justify-content-around '}>
                                               <div className='DongiPaidNoticeBt mt-5'>
                                                   <span>(: همش پرداخت شده</span></div>
                                           </div>
                                   }


                               </div>
                           </React.Fragment>
                       </LoadingOverlay>
                   }/>
    )
}
}

export default DongiPage;