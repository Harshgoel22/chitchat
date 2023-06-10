import { LOGOUT } from "./action_types";

export const logout = (id)=>{
    return async function(dispatch){
        await fetch('http://localhost:5000/logout',{
            method: 'POST',
            body: JSON.stringify({id}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        dispatch({
            type: LOGOUT
        })
    }
}