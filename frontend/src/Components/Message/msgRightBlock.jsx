import { Avatar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useEffect,useState } from 'react';
import io from 'socket.io-client';
import { useSelector,useDispatch } from 'react-redux';
import { updateMsgList,sendMessage } from '../../redux/actions/message_action';
import { ReceiverReply, SenderReply } from './SenderReply';
import GridLoader from "react-spinners/GridLoader";
// import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
const socket = io.connect("http://localhost:5000");

export const MsgRightBlock = (props)=>{
    const [msg,setMsg] = useState("");
    const dispatch = useDispatch();
    const recMsg = useSelector(state=>state.onChangeSearch.chatData);
    const [on,setOn] = useState(props.online);
    const [loader, setLoader] = useState(false);

    const {setList,sender,online,username} = props;
    let itr1=-1;

    const sendMsg = async ()=>{
        setLoader(true);
        await dispatch(sendMessage(sender,username,msg));
        socket.emit("send_message",{msg, sender, receiver: username});
        setLoader(false);
    }
    useEffect(()=>{
        setOn(()=>{
            return online;
        })
        // dispatch(updateMsgList(sender));
        socket.emit("join_room",sender);
        socket.on("receive_message",(data)=>{
            console.log("received data: ",data);
            dispatch(updateMsgList(sender));
            // dispatch(onChangeSearch("",sender));
            // setList([]);
        });
        socket.on("delMsgReceiver",(data)=>{
            console.log(`index: ${data}`);
            dispatch(updateMsgList(sender));
        })
        return ()=>{
            socket.disconnect();
        }
    },[sender,setList,dispatch,online,username]);

    return (
        <div className="relative right-part w-[824px] min-h-full">
            <div className="flex flex-row m-2 space-x-2">
                <Avatar/>
                <div className="relative flex flex-col min-w-full">
                    <p className="font-bold absolute">{props.fname} {props.lname}</p>
                    <p className="text-green-400 text-sm top-5 font-semibold absolute">{on}</p>
                </div>
            </div>
            <div className="h-1 min-w-full bg-gray-400"></div>
            <div className='relative max-h-[480px] overflow-hidden overflow-y-auto'>
                <div className="messageZone relative max-h-[480px] flex flex-col space-y-1">
                    {recMsg.map((items)=>{
                        return (items.username===props.username)?
                            items.data.map((data)=>{
                                itr1++;
                                return (data.sent==='send') ? 
                                    <SenderReply itr1={itr1} data={data} {...props}/> : <ReceiverReply itr1={itr1} data={data} {...props}/>
                            }):null;
                    })}
                    {/* {props.list.map((data)=>{
                        itr1++;
                        return (data.username===props.username)?
                            <SenderReply itr1={itr1} data={data}/> : null;
                    })} */}
                </div>
            </div>
            <div className='absolute left-96 top-64'>
                <GridLoader
                    loading={loader}
                    size={10}
                    color={'red'}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
            <div className="flex flex-row absolute bottom-0 m-2.5 h-12 rounded-lg w-[800px] bg-white">
                {/* <div onClick={()=>{setEmoji(prev=>!prev)}} className='p-2 pr-1'><InsertEmoticonIcon/></div> */}
                <input type='text' value={msg} onChange={(e)=>{setMsg(e.target.value)}} className="p-3 rounded-lg outline-none min-h-full w-[740px]" placeholder="Write your message . . . ."></input>
                <SendIcon onClick={()=>{
                    if(msg!==""){
                        sendMsg();
                        setMsg("");
                    }
                }} sx={{position: 'absolute', right: '24px', bottom: '14px', scale: '1.2'}}/>
            </div>
        </div>
    )
}