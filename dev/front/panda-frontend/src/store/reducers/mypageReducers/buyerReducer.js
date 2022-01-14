import {FETCH_BUYER_DASHBOARD, FETCH_BUYER_SITUATION, FETCH_BUYER_SITUATION_LIST} from "../../types";

const initialState = {
    dashboard: null,
    situationList: null,
    situationDetail: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BUYER_DASHBOARD:
            return {
                ...state,
                dashboard: action.payload
            }
        case FETCH_BUYER_SITUATION_LIST:
            return {
                ...state,
                situationList: action.payload
            }
        case FETCH_BUYER_SITUATION:
            return {
                ...state,
                situationDetail: action.payload
            }
        default:
            return state
    }
}
