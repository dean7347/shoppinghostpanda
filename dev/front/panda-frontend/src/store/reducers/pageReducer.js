import {SET_ERROR, SET_LOADING, SET_SUBMITTED, SET_SUCCESS} from "../types";

const initialState = {
    loading: false,
    error: '',
    success: '',
    submitted: false
}

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case SET_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case SET_SUCCESS:
            return {
                ...state,
                success: action.payload
            }
        case SET_SUBMITTED:
            return {
                ...state,
                submitted: action.payload
            }
        default:
            return state
    }
}
