import { DELETE_CARD, DELETE_MSG, ON_CHANGE_SEARCH, SEND_MSG, UPDATE_MSG_LIST, UPDATE_RECENT_TAB } from "../../actions/action_types";

const initialState = {
    payload: [],
    msgData: {},
    chatData: []
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
        case UPDATE_MSG_LIST:
            return {
                ...state,
                chatData: [...action.list]
            }
        case DELETE_CARD:
            return {
                ...state,
                payload: [...action.data],
                msgData: action.msgData
            }
        case DELETE_MSG:
            return {
                ...state,
                chatData: [...action.data]
            }
        case SEND_MSG:
            return{
                ...state,
                chatData: [...action.data]
            }
        default:
            return state;
    }
}