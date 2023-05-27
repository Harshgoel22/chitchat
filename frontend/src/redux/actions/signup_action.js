import {SIGNUP_CHANGE_VALIDATE, MAKE_CHANGE_SIGNUP, SUBMIT_DATA_SIGNUP} from "./action_types";
import { CLEAR_DATA_SIGNUP, TOGGLE_SEEN } from "./action_types";

const signupChangeValidate = ({name, value}, prev='')=> {
    return {
        type: SIGNUP_CHANGE_VALIDATE, 
        name: name,
        prev: prev,
        value: value
    }
}

const makeChangeSignup = ({name, value})=> {
    return {
        type: MAKE_CHANGE_SIGNUP,
        name: name,
        value: value
    }
}

const toggleSeen = (id, name) => {
    return {
        type: TOGGLE_SEEN,
        id: id,
        name: name
    }
}

const submitDataSignup = (e, data) => {
    return {
        type: SUBMIT_DATA_SIGNUP,
        event: e,
        payload: data
    }
}

export const clearDataSignup = () => {
    return {
        type: CLEAR_DATA_SIGNUP
    }
}

export {makeChangeSignup, signupChangeValidate, toggleSeen, submitDataSignup};