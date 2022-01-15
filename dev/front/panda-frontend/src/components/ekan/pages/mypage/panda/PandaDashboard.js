import React, {useEffect, useState} from "react";
import StatusCard from "../../../UI/cards/StatusCard";

import Chart from 'react-apexcharts'
import Modal from "../../../UI/modal/Modal";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import Message from "../../../UI/Message";
import {chartOptions, pandaDashboardCard} from "./pandaTypes";
import Button from "../../../UI/Button";
import {setError} from "../../../../../store/actions/pageActions";
import {fetchPandaDashBoard} from "../../../../../store/actions/mypageActions/pandaActions";


const PandaDashboard = () => {
    const {error, mode} = useSelector((state) => state.page);
    const [cardItems] = useState(pandaDashboardCard)
    const [showModal, setShowModal] = useState(false)
    const [currentYear] = useState(new Date().getFullYear())
    const dispatch = useDispatch()

    console.log(currentYear)

    useEffect(() => {
        if (error) {
            dispatch(setError(''))
        }
        dispatch(fetchPandaDashBoard(currentYear, () => setLoading(false)))
    }, [])

    useEffect(()=>{
        return(()=>{
            if(error){
                dispatch(setError(''))
            }
        })
    },[error, dispatch])

    return (
        <>
            <div className="container">
                {error && <Message type="danger" msg={error}/>}
                <div className="page-header">
                    <span className="mr-3"><Button text={currentYear} className="is-danger"/></span>
                    <span className="mr-3"><Button text={currentYear - 1}/></span>
                    <span className="mr-3"><Button text={currentYear - 2}/></span>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="row">
                            {
                                cardItems.map((item, index) =>
                                    <div className="col-lg-6 col-sm-12" key={index}>
                                        <StatusCard
                                            link={item.link}
                                            icon={item.icon}
                                            count={item.count}
                                            title={item.title}/>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <div style={{minHeight: "500px"}} className="custom-card">
                            <Chart
                                options={mode === 'theme-mode-dark' ? {
                                    ...chartOptions.options,
                                    theme: {mode: 'dark'}
                                } : {
                                    ...chartOptions.options,
                                    theme: {mode: 'light'}
                                }}
                                series={chartOptions.series}
                                type='line'
                                height='100%'
                            />
                        </div>
                    </div>
                </div>
            </div>

            {
                showModal &&
                <Modal onClose={() => {
                    setShowModal(false)
                }} title={"주문 상세보기"}>
                    {
                        <>
                        </>
                    }

                </Modal>
            }

        </>
    )
}

export default PandaDashboard
