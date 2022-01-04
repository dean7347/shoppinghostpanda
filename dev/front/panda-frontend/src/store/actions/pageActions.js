import {SET_ERROR, SET_LOADING, SET_SUBMITTED, SET_SUCCESS} from "../types";

// Set loading
export const setLoading = (value) => {
    return dispatch => {
        dispatch({
            type: SET_LOADING,
            payload: value
        });
    }
}

// Set error
export const setError = (msg) => {
    return dispatch => {
        dispatch({
            type: SET_ERROR,
            payload: msg
        });
    }
}

// Set success
export const setSuccess = (msg) => {
    return dispatch => {
        dispatch({
            type: SET_SUCCESS,
            payload: msg
        });
    }
}

// Set submitted
export const setSubmitted = (success) => {
    return dispatch => {
        dispatch({
            type: SET_SUBMITTED,
            payload: success
        });
    }
}

// after Submit set Loading
export const submitLoading = () => {
    return dispatch => {
        dispatch({
            type: SET_SUBMITTED,
            payload: true
        });
        dispatch({
            type: SET_LOADING,
            payload: false
        });
        dispatch({
            type: SET_SUBMITTED,
            payload: false
        });
    }
}
