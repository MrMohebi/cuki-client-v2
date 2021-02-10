import './css/style.css'
import tf from './img/testFood.png'

export default function FoodDetails(props) {
    return(
    <div className={props.mainClass+' foodDetailsMain animate__animated'}>
        <div className='imageAndFoodNameContainer'>
            <div style={{
                background: `url(${tf})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }} className='foodDetailsImg'/>
            <div className='foodDetailsPrice'>32 T</div>
        </div>
        <div className='foodDetailsDetails'>خمیر مخصوص ایتالیایی/فلفل دلمه ای/قارچ/پنیرموزارلا خمیر مخصوص ایتالیایی/فلفل
            دلمه ای/قارچ/پنیرموزارلا
        </div>
        <div className='foodDetailsTimesAndOrderTimeContainer'>
            <div className='timesOrderedContainer'>
                <span className='timesAndOrderTimeText'> تعداد دفعات سفارش غذا</span>
                <span>X 25</span>
            </div>
            <div className='timesOrderedContainer'>
                <span className='timesAndOrderTimeText mt-2'>زمان تقریبی آماده شدن</span>
                <span className='rtl mt-2'><span>25</span> دقیقه </span>
            </div>
        </div>
        <div className='foodDetailsComments'>
            <div className='littleCommentPin'/>
            <div className='mainCommentContainer'>


                <div className='eachComment'>
                    <span className='eachCommentName'> محمد کریمدادی</span>
                    <span className='eachCommentTime'>10/5</span>
                    <span className='eachCommentContent'>هم کیفیت غدا خوب بود هم زود به دستم رسیدهم کیفیت غدا خوب بود هم زود به دستم رسیدهم کیفیت غدا خوب بود هم زود به دستم رسیدهم کیفیت غدا خوب بود هم زود به دستم رسید</span>
                </div>

                <div className='eachComment'>
                    <span className='eachCommentName'> محمد کریمدادی</span>
                    <span className='eachCommentTime'>10/5</span>
                    <span className='eachCommentContent'>هم کیفیت غدا خوب بود هم زود به دستم رسیدهم کیفیت غدا خوب بود هم زود به دستم رسیدهم کیفیت غدا خوب بود هم زود به دستم رسیدهم کیفیت غدا خوب بود هم زود به دستم رسید</span>
                </div>

                <div className='eachComment'>
                    <span className='eachCommentName'> محمد کریمدادی</span>
                    <span className='eachCommentTime'>10/5</span>
                    <span className='eachCommentContent'>هم کیفیت غدا خوب بود هم زود به دستم رسیدهم کیفیت غدا خوب بود هم زود به دستم رسیدهم کیفیت غدا خوب بود هم زود به دستم رسیدهم کیفیت غدا خوب بود هم زود به دستم رسید</span>
                </div>
            </div>
        </div>
    </div>
    )
}