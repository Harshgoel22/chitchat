import { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { onChangeSearch } from '../redux/actions/message_action';
import SortIcon from '@mui/icons-material/Sort';
import Card from './Card';
import { useDispatch, useSelector } from 'react-redux';
import { MsgRightBlock } from './msgRightBlock';

const Message = ()=>{
    
    const dispatch = useDispatch();
    const list = useSelector(state=>state.onChangeSearch.payload);
    const msgData = useSelector(state=>state.onChangeSearch.msgData);

    const [search, setSearch] = useState("");
    const {id} = useParams();

    useEffect(()=>{
        dispatch(onChangeSearch(search, id));
    },[dispatch,search,id]);

    return (
        <div class="main-div relative flex flex-row bg-gray-200 rounded-tr-md rounded-br-md">
            <div class="flex flex-col left-part min-h-full w-80 bg-gray-300">
                <div class="upper-part flex flex-row p-6 pb-0">
                    <SortIcon style={{margin:"4px"}}/>
                    <h1 class="text-xl font-bold font-sans">Messages</h1>
                </div>
                <div class="searchBar relative h-4 w-72 ml-auto mr-auto mt-2 p-4 rounded-md">
                    <input value={search} onChange={(e)=>{
                        setSearch(e.target.value);
                        dispatch(onChangeSearch(e.target.value, id))
                    }} class="p-1.5 top-0 w-72 right-0 absolute rounded-md bg-gray-200" placeholder='   🔍  Search'></input>
                </div>
                <div class="lower-div relative flex flex-col overflow-y-auto overflow-x-hidden">
                    <div class="mt-4 ml-2">
                        {list.map((data, index)=>{
                            return (
                                <Card key={index} setSearch={setSearch} {...data}/>
                            )
                        })}
                    </div>
                </div>
            </div>         
            {/* right msg block */}
            {(Object.keys(msgData).length===0) ? 
                <div class="absolute left-[620px] top-52 text-3xl text-center w-60">
                    <p>Search to connect with your friends and relatives</p>
                </div> : 
                <MsgRightBlock sender={id} {...msgData}/>
            }
        </div>
    )
}

export default Message;