import { MAKE_CHANGE_SIGNUP , CLEAR_DATA_SIGNUP} from "../../actions/action_types";

const initialState1 = {
    data: {
        fname: '',
        lname: '',
        username: '',
        email: '',
        pasword: '',
        confirm_pasword: ''
    }
}

const reducer2 = (state=initialState1, action)=> {
    switch(action.type){
        case MAKE_CHANGE_SIGNUP:
            console.log("makeChangeSignup -> ",state.data);
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.name]: action.value
                }
            }
        case CLEAR_DATA_SIGNUP:
            Object.keys(state.data).forEach(key=>state.data[key]="");
            return {
                ...state,
                data: {
                    ...state.data
                }
            }
        default:
            return state;
    }
}

export default reducer2;