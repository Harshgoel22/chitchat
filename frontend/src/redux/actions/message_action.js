import { ON_CHANGE_SEARCH, UPDATE_RECENT_TAB } from "./action_types";

export const onChangeSearch = (searchTag, id)=>{
    return async function(dispatch){
        const data = await (await fetch('http://localhost:5000/onChangeSearch',{
            method: 'POST',
            body:JSON.stringify({searchTag, id}),
            headers: {
                'Content-Type': 'application/json'
            }
        })).json();
        console.log(`searching_results: ${data}`);
        dispatch({
            type: ON_CHANGE_SEARCH,
            data: data
        })
    }
}

export const updateRecentTab = (username, id)=>{
    return async function(dispatch){
        const data = await (await fetch('http://localhost:5000/updateRecentTab',{
            method: 'POST',
            body:JSON.stringify({username, id}),
            headers: {
                'Content-Type': 'application/json'
            }
        })).json();
        console.log(`tab Data: ${data}`);
        dispatch({
            type: UPDATE_RECENT_TAB,
            data: data
        })
    }
}