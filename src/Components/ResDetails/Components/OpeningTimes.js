import React from 'react';

const OpeningTimes = ({openHoursPretty = null}) =>{
    if(openHoursPretty === null) return null

    return (
        <div className={"share-main-container"}>
            <div className={" d-flex flex-column align-items-center"}>
                <h5>ساعات باز بودن آرایشگاه</h5>
                <div className={"text-right"}>
                    {/*equal days*/}
                    {openHoursPretty.length > 0 ?
                        <div>
                            {openHoursPretty.map((eL,eLIndex) => (
                                <>
                                    <div>
                                        :{eL.map(eD=>(
                                        <span> {eD} </span>
                                    ))}
                                    </div>
                                    <div>
                                        {openHoursPretty.equals.hoursPretty[eLIndex].map(eT=>(
                                            <div>
                                                {eT.map(eTT=>(
                                                    <div>
                                                        {eTT[1]} <span> از </span> {eTT[0]} <span> تا </span>
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </>

                            ))}
                        </div>
                        :null
                    }

                    {/*/!*differ days*!/*/}
                    {/*{openHoursPretty.differs.days.length >0 ?*/}
                    {/*    <div>*/}
                    {/*        {openHoursPretty.differs.days.map((eL,eLIndex) => (*/}
                    {/*            <>*/}
                    {/*                <div>*/}
                    {/*                    <span>{eL}</span>*/}
                    {/*                </div>*/}
                    {/*                <div>*/}
                    {/*                    {openHoursPretty.differs.hoursPretty[eLIndex].map(eT=>(*/}
                    {/*                        <div>*/}
                    {/*                            <div>*/}
                    {/*                                {eT[1]} <span> از </span> {eT[0]} <span> تا </span>*/}
                    {/*                            </div>*/}
                    {/*                        </div>*/}
                    {/*                    ))}*/}
                    {/*                </div>*/}
                    {/*            </>*/}

                    {/*        ))}*/}
                    {/*    </div>*/}
                    {/*    :null*/}
                    {/*}*/}


                </div>
            </div>
        </div>

    )
}

export default OpeningTimes;