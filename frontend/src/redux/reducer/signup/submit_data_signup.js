import { SUBMIT_DATA_SIGNUP } from "../../actions/action_types";

const initialState = {
    loading: false,
    error: ''
}

const reducer4 = async (state=initialState, action)=>{
    switch(action.type){
        case SUBMIT_DATA_SIGNUP:
            action.event.preventDefault();
            try{
                state.loading = true;
                await fetch('http://localhost:5000/signup',{
                    method: 'POST',
                    body: JSON.stringify(action.payload),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                state.loading = false;
                state.error = '';
            }catch(e){
                state.loading = false;
                state.error = 'Sorry, there is some error!';
                console.log("Error in submit_data_signup.js");
            }
            return {...state};
        default:
            return state
    }
}

export default reducer4;
