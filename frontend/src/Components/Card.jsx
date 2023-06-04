import Avatar from "@mui/joy/Avatar/Avatar";
import { useDispatch } from "react-redux";
import { updateRecentTab, onChangeSearch } from "../redux/actions/message_action";
import { useParams } from "react-router-dom";

const Card = (props)=>{
    const {id} = useParams();
    const dispatch = useDispatch();
    return (
        <button onClick={async ()=>{
            await dispatch(updateRecentTab(props.username, id));
            props.setSearch("");
            await dispatch(onChangeSearch("", id));
        }}>
            <div class="relative flex flex-row card w-72 h-[65px] rounded-md m-2 p-2.5 mt-0 bg-gray-500">
                <Avatar sx={{margin: "2px"}}/>
                <div class="absolute -top-0 left-12 text-slate-100 min-w-full">
                    <h class="font-bold absolute top-1 left-4">{props.fname} {props.lname}</h>
                    <p class="text-xs absolute left-4 top-6 mt-0.5">{props.username}</p>
                    <p class="text-sm absolute top-10 left-4 text-green-400">how are you? . . . .</p>
                </div>
            </div>
        </button>
    )
}

export default Card;