import reducer2 from './signup/make_change_signup';
import reducer1 from './signup/signup_reducer';
import reducer3 from './signup/toggleSeen';
import reducer4 from './signup/submit_data_signup';

const redux = require('redux');
const combineReducers = redux.combineReducers;

const rootReducer = combineReducers({
    signupChange: reducer2,
    signupError: reducer1,
    togglerEye: reducer3,
    signupSubmit: reducer4
});

export default rootReducer;