import { ON_CHANGE_SEARCH, UPDATE_RECENT_TAB } from "../../actions/action_types";

const initialState = {
    payload: [],
    msgData: {}
}

export const reducer9 = (state=initialState,action)=>{
    switch(action.type){
        case ON_CHANGE_SEARCH:
            return {
                ...state,
                payload: [...action.data]
            }
        case UPDATE_RECENT_TAB:
            return {
                ...state,
                msgData: action.data
            }
        default:
            return state;
    }
}