import {
    FETCH_BUYER_DASHBOARD,
    FETCH_BUYER_SITUATION,
    FETCH_BUYER_SITUATION_LIST, FETCH_CANCEL_SITUATION_DETAIL,
    FETCH_CANCEL_SITUATION_LIST
} from "../../types";

const initialState = {
    dashboard: null,
    situationList: null,
    situationDetail: null,
    cancelSituationList: null,
    cancelSituationDetail: null
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
        case FETCH_CANCEL_SITUATION_LIST:
            return {
                ...state,
                cancelSituationList: action.payload
            }
        case FETCH_CANCEL_SITUATION_DETAIL:
            return {
                ...state,
                cancelSituationDetail: action.payload
            }
        default:
            return state
    }
}
