import { Avatar } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import SendIcon from '@mui/icons-material/Send';
import { useEffect,useState } from 'react';
import io from 'socket.io-client';
const socket = io.connect("http://localhost:5000");

export const MsgRightBlock = (props)=>{
    
    const [msg,setMsg] = useState("");
    const [recMsg, setRecMsg] = useState([]);

    const sendMsg = ()=>{
        setRecMsg((prev)=>{
            return [
                ...prev,
                {msg: msg, sent: 'send'}
            ]
        })
        socket.emit("send_message",{msg,sender: props.id, receiver: props.username});
    }

    useEffect(()=>{
        socket.on("receive_message",(data)=>{
            console.log("received: ",data);
            setRecMsg((prev)=>{
                return [
                    ...prev,
                    data
                ]
            });
        })
        return ()=>{
            socket.disconnect();
        }
    },[]);

    return (
        <div class="relative right-part w-[824px] min-h-full">
            <div class="flex flex-row m-2 space-x-2">
                <Avatar/>
                <div class="relative flex flex-col min-w-full">
                    <p class="font-bold absolute">{props.fname} {props.lname}</p>
                    <p class="text-green-400 text-sm top-5 font-semibold absolute">Online</p>
                </div>
            </div>
            <div class="h-1 min-w-full bg-gray-400"></div>
            <div class="messageZone relative flex flex-col space-y-1">
                {recMsg.map((data, index)=>{
                    return (data.sent==='send') ? 
                        <div key={index} class="flex flex-row w-96 m-2 p-1 ml-96 rounded-full space-x-2 bg-green-400">
                            <div class="w-8 h-8 p-1 pl-2 rounded-full bg-gray-600">
                                <FontAwesomeIcon icon={faUser} style={{color:"white"}}/>
                            </div>
                            <p>{data.msg}</p>
                        </div> : 
                        <div key={index} class="flex flex-row space-x-2 p-1 w-96 m-2 ml-16 rounded-full bg-green-100">
                            <div class="w-8 h-8 p-1 pl-2 rounded-full bg-gray-600">
                                <FontAwesomeIcon icon={faUser} style={{color:"white"}}/>
                            </div>
                            <p>{data.msg}</p>
                        </div>
                })}
            </div>
            <div class="flex flex-row absolute bottom-0">
                <input value={msg} onChange={(e)=>{setMsg(e.target.value)}} class="p-3 rounded-md m-2.5 w-[800px]" placeholder="Write your message . . . ."></input>
                <SendIcon onClick={sendMsg} sx={{position: 'absolute', right: '30px', bottom: '22px', scale: '1.2'}}/>
            </div>
        </div>
    )
}