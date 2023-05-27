import { SIGNUP_CHANGE_VALIDATE } from "../../actions/action_types"

const regExp = {
    username: /^[a-zA-Z.0-9_-]{6,16}/,
    email: /^[a-zA-Z0-9._-]{5,}@[a-zA-Z]{5,}[.][a-zA-Z]{2,}[a-zA-Z.]*/,
    pasword: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$&*%])[a-zA-Z_\d!@#$%&*]{8,}/
}

const initialState = {
    data: {
        fname: '',
        lname: '',
        username: '',
        email: '',
        pasword: '',
        confirm_pasword: ''
    }
}

const reducer1 = (state=initialState, action)=> {
    // console.log("signup_reducer -> ",state.data);
    switch(action.type){
        case SIGNUP_CHANGE_VALIDATE: 
            if(action.value===''){
                state.data[action.name] = 'Required field...!';
            }else if(action.name==='username'){
                state.data.username = regExp.username.test(action.value)?'':'Invalid username! Atleast 6 characters';
            }else if(action.name==='email'){
                state.data.email = regExp.email.test(action.value)?'':'Invalid email! Atleast 12 characters';
            }else if(action.name==='pasword'){
                state.data.pasword = regExp.pasword.test(action.value)?'':'Invalid password! Atleast 8 characters';
            }else if(action.name==='confirm_pasword'){
                // console.log("prev => ", action.prev);
                state.data.confirm_pasword = (action.value===action.prev)?'':'Different password and confirm password!';
            }
            return {
                ...state,
                data: {
                    ...state.data
                }
            }
        default: return state;
    }
}

export default reducer1;