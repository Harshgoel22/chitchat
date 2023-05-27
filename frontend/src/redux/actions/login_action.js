import { MAKE_CHANGE_LOGIN } from "./action_types"

const makeChangeLogin = ({name, value})=> {
    return {
        type: MAKE_CHANGE_LOGIN,
        name: name,
        value: value
    }
}

export default makeChangeLogin;