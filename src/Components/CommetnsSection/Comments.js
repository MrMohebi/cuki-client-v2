import React, {useState, useEffect} from 'react';
import moment from "jalali-moment";
import * as requests from "../../ApiRequests/ApiRequests";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import {useSwipeable} from 'react-swipeable';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

const ReactSwal = withReactContent(Swal)

function Comments(props) {
    let [lastCommentDate, setLastCommentDate] = useState(Math.floor(Date.now() / 1000))
    let [commentsDiv, setCommentsDiv] = useState([<div/>])
    let [newCommentsList, setNewCommentsList] = useState([])
    let [commentsFilled, setCommentsFilled] = useState(false)
    let [canLeaveComment, setCanLeaveComment] = useState(false)
    let [commentInputClass, setCommentInputClass] = useState(' d-none')
    let [executedUseEffectTimes, setExecutedUseEffectTimes] = useState(0)
    let [commentBody, setCommentBody] = useState('')

    useEffect(()=>{
        if(executedUseEffectTimes < 1){
            getComments()
            setExecutedUseEffectTimes(executedUseEffectTimes += 1)
        }
    })


    let getComments = () =>{
        requests.getCommentsByFoodId(callbackGetComments, props.foodId, lastCommentDate, 10)
    }

    let callbackGetComments = (res) =>{
        console.log(res);
        if(res.hasOwnProperty("statusCode") && res.statusCode === 200){
            setNewCommentsList(res.data.comments)
            setCanLeaveComment(res.data['isAllowedLeaveComment'])
            setLastCommentDate(res.data.comments[res.data.comments.length -1]['commented_date'])
        }else if(res.hasOwnProperty("statusCode")) {
            setCanLeaveComment(res.data['isAllowedLeaveComment'])
        }
    }





    let sendComment = () => {
        if (commentBody.length > 3 ){
            requests.sendComment(callbackSendComment, props.foodId, commentBody)
        }

    }

    let callbackSendComment = (res) =>{
        if(res.hasOwnProperty("statusCode") && res.statusCode ===200){
            ReactSwal.fire({
                text: 'خیلی ممنون که نظرتو بهمون گفتی :)',
                icon: 'success',
                timer: 2000,
                timerProgressBar: true,
            })
        }
    }


    let enableComment = () => {
        document.getElementsByClassName('newCommentInput')[0].classList.remove('d-none')
        document.getElementsByClassName('sendCommentButton')[0].classList.remove('d-none')
    }
    let disableComment = () => {
        document.getElementsByClassName('newCommentInput')[0].classList.add('d-none')
        document.getElementsByClassName('sendCommentButton')[0].classList.add('d-none')
    }

    let commentsFullPage = () => {
        if (canLeaveComment)
            enableComment()

        document.getElementsByClassName('foodDetailsComments')[0].style.height = '100%'
        setCommentsFilled(true)
    }
    let commentsMiniPage = () => {
        disableComment()
        document.getElementsByClassName('foodDetailsComments')[0].style.height = '45%'
        setCommentsFilled(false)
    }


    let swipes = useSwipeable({onSwipedUp:commentsFullPage, onSwipedDown:commentsMiniPage})

    return (
        <div className='foodDetailsComments'>
            {canLeaveComment ?
                <div onClick={() => {
                    commentsFullPage()
                }}
                     className='newCommentContainer'>
                    <span className='newCommentTextContainer'>نوشتن نظر</span>
                    <div className='newCommentPenContainer'>
                        <CreateOutlinedIcon fontSize={"small"}/>
                    </div>
                </div>
                :
                <div className='cannotComment'>
                    <span className='newCommentTextContainer'>هنوز نمیتونی نظری بنویسی</span>
                    <div className='newCommentPenContainer'>
                        <HelpOutlineIcon fontSize={"small"}/>
                    </div>
                </div>
            }

            <div {...swipes} onClick={() => {commentsFilled ? commentsMiniPage() : commentsFullPage()}} className='w-100 littlePinHolder'>
                <div className='littleCommentPin'/>
            </div>

            <div className='mainCommentContainer'>
                <textarea onChange={(e)=>{
                    setCommentBody(e.target.value)
                }} className={'newCommentInput ' + commentInputClass}/>
                <span className={'sendCommentButton ' + commentInputClass}  onClick={(e) => {
                    sendComment()
                }}>ارسال</span>
                {
                    commentsDiv.concat(
                        newCommentsList.map(eComment=>{
                            return(
                                <div key={eComment['commented_date']} className='eachComment'>
                                    <span className='eachCommentName'>{eComment.name}</span>
                                    <span className='eachCommentTime'>{moment.utc(parseInt(eComment['commented_date'])).format("jM/jD")}</span>
                                    <span className='eachCommentContent'>{eComment.body}</span>
                                </div>
                            )
                        })
                    )
                }

            </div>
        </div>
    );
}

export default Comments;




