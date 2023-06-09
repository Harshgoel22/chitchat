import { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { onChangeSearch } from '../../redux/actions/message_action';
import SortIcon from '@mui/icons-material/Sort';
import Card from './Card';
import { useDispatch, useSelector } from 'react-redux';
import { MsgRightBlock } from './msgRightBlock';
import MoonLoader from "react-spinners/MoonLoader";

const Message = ()=>{
    
    let itr=0;
    const dispatch = useDispatch();
    const list = useSelector(state=>state.onChangeSearch.payload);
    const msgData = useSelector(state=>state.onChangeSearch.msgData);
    // console.log(`msgData: ${msgData}`);
    const [listt, setList] = useState([]);
    const [loader, setLoader] = useState(false);

    const [msg,setMsg] = useState("");
    const [search, setSearch] = useState("");
    const {id} = useParams();

    useEffect(()=>{
        dispatch(onChangeSearch(search, id));
    },[dispatch,search,id]);

    return (
        <div className="main-div relative flex flex-row bg-gray-200 rounded-tr-md rounded-br-md">
            <div className="flex flex-col left-part min-h-full w-80 bg-gray-300">
                <div className="upper-part flex flex-row p-6 pb-0">
                    <SortIcon style={{margin:"4px"}}/>
                    <h1 className="text-xl font-bold font-sans">Messages</h1>
                </div>
                <div className="searchBar relative h-4 w-72 ml-auto mr-auto mt-2 p-4 rounded-md">
                    <input value={search} onChange={async (e)=>{
                        setSearch(e.target.value);
                        setLoader(true);
                        await dispatch(onChangeSearch(e.target.value, id))
                        setLoader(false);
                    }} className="p-1.5 top-0 w-72 right-0 absolute rounded-md bg-gray-200" placeholder='   🔍  Search'></input>
                </div>
                <div className="lower-div relative flex flex-col overflow-y-auto overflow-x-hidden">
                    <div className="mt-4 ml-2">
                        {list.map((data)=>{
                            itr++;
                            return (
                                <Card key={itr} index={itr} msg={msg} setList={setList} active={msgData.username} setSearch={setSearch} {...data}/>
                            )
                        })}
                    </div>
                </div>
                {loader?
                    <div className='absolute left-32 top-44'>
                        <MoonLoader
                            loading={loader}
                            size={50}
                            color={'red'}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                :null}
            </div>         
            {/* right msg block */}
            {(Object.keys(msgData).length===0) ? 
                <div className="absolute left-[620px] top-52 text-3xl text-center w-60">
                    <p>Search to connect with your friends and relatives</p>
                </div> : 
                <MsgRightBlock msg={msg} setMsg={setMsg} sender={id} list={listt} setList={setList} {...msgData}/>
            }
        </div>
    )
}

export default Message;