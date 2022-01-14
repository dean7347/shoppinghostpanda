
import {
    FETCH_PANDA_SETTLEMENT_LIST,
} from "../../types";
import axios from "axios";
import {setError} from "../pageActions";

export const fetchPandaDashBoard = () => {
    return async dispatch => {

    }
}

export const fetchPandaSettlementList = (data) => {
    return async dispatch => {
        try {
            const res = await axios.post('/api/pandadashboard', {
                startDay: data.startDate,
                endDay: data.endDate,
                status: data.searchStatus
            })
            if (res.data) {
                const list = res.data
                console.log('판다 정산 목록: ',list)
                dispatch({
                    type: FETCH_PANDA_SETTLEMENT_LIST,
                    payload: list
                })
            }
        } catch (error) {
            console.log(error)
            dispatch(setError("판다 정산 목록 이상"))
        }
    }
}

export const fetchPandaSettlement = () => {
    return async dispatch => {

    }
}
