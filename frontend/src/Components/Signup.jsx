import Avatar from "@mui/joy/Avatar/Avatar";
import {useSelector, useDispatch} from 'react-redux';
import { clearDataSignup, makeChangeSignup, submitDataSignup, toggleSeen } from "../redux/actions/signup_action";
import { signupChangeValidate } from "../redux/actions/signup_action";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import MyModal from "./Modal";

const Signup = (props) => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const list = useSelector(state => state.signupChange.data);
    const error = useSelector(state => state.signupError.data);
    const toggleHandler = useSelector(state=>state.togglerEye);
    
    return (
        <div id="signup_page" class="bg-gray-700 min-h-[570px] min-w-[340px] z-10 absolute ml-[550px] rounded-3xl mt-16">
            <div className="intro">
                <p class="text-white text-xl text-center pt-8 font-semibold">Welcome to our community</p>
                <div class="pt-8 flex justify-center"><Avatar/></div>
                <p class="text-white pt-2 text-center">Signup</p>
            </div>
            <div className="entryFields" class="text-center">
                <form>
                    <div class="flex relative ml-[50px]">
                        <div class="mt-2">
                            <input type="text" name="fname" value={list.fname} onChange={(event)=>{
                                dispatch(makeChangeSignup(event.target));
                                dispatch(signupChangeValidate(event.target))
                            }} placeholder="Firstname" class="bg-gray-300 placeholder:text-slate-500 placeholder:text-center rounded-md mt-8 mr-2 p-[1px] w-[110px]"></input>
                            <p id="fname" class="text-red-500 text-xs text-start p-1">{error.fname}</p>
                        </div>
                        <div class="mt-6">
                            <input type="text" name="lname" value={list.lname} onChange={event=>{
                                dispatch(makeChangeSignup(event.target));
                                dispatch(signupChangeValidate(event.target))
                            }} placeholder="Lastname" class="bg-gray-300 placeholder:text-slate-500 placeholder:text-center rounded-md mt-4 ml-2 p-[1px] w-[110px]"></input><br/>
                            <p id="lname" class="text-red-500 text-xs text-start p-1">{error.lname}</p>
                        </div>
                    </div>
                    <div>
                        <input type="text" name="username" value={list.username} onChange={event=>{
                            dispatch(makeChangeSignup(event.target));
                            dispatch(signupChangeValidate(event.target))
                        }} placeholder="Username" class="bg-gray-300 placeholder:text-slate-500 placeholder:text-center rounded-md mt-2 p-[1px] w-60"></input><br/>
                        <p id="username" class="text-red-500 text-xs text-start pl-[50px] p-1">{error.username}</p>
                    </div>
                    <div>
                        <input type="email" name="email" value={list.email} onChange={event=>{
                            dispatch(makeChangeSignup(event.target));
                            dispatch(signupChangeValidate(event.target))
                        }} placeholder="Email" class="bg-gray-300 placeholder:text-slate-500 placeholder:text-center rounded-md mt-2 p-[1px] w-60"></input><br/>
                        <p id="email" class="text-red-500 text-xs text-start pl-[50px] p-1">{error.email}</p>
                    </div>
                    <div class="relative">
                        <div class="relative">
                            <input id="pasword" type="password" name="pasword" value={list.pasword} onChange={event=>{
                                dispatch(makeChangeSignup(event.target));
                                dispatch(signupChangeValidate(event.target))
                            }} placeholder="Password" class="bg-gray-300 placeholder:text-slate-500 placeholder:text-center rounded-md mt-2 p-[1px] w-60"></input>
                            <button class="absolute top-2 right-14" onClick={(e)=>{dispatch(toggleSeen("pasword"));e.preventDefault()}}>
                                {toggleHandler.pasword?<FontAwesomeIcon icon={faEyeSlash} />:<FontAwesomeIcon icon={faEye} />}
                            </button>
                            <p class="text-red-500 text-xs text-start pl-[50px] p-1">{error.pasword}</p>
                        </div>
                    </div>
                    <div class="relative">
                        <div class="relative">
                            <input id="confirm_pasword" type="password" name="confirm_pasword" value={list.confirm_pasword} onChange={event=>{
                                dispatch(makeChangeSignup(event.target));
                                dispatch(signupChangeValidate(event.target, list.pasword))
                            }} placeholder="Confirm Password" class="bg-gray-300 placeholder:text-slate-500 placeholder:text-center rounded-md mt-2 p-[1px] w-60"></input>
                            <button class="absolute top-2 right-14" onClick={(e)=>{dispatch(toggleSeen("confirm_pasword"));e.preventDefault()}}>
                                {toggleHandler.confirm_pasword?<FontAwesomeIcon icon={faEyeSlash} />:<FontAwesomeIcon icon={faEye} />}
                            </button>
                        </div>
                        <p class="text-red-500 text-xs text-start pl-[50px] p-1">{error.confirm_pasword}</p>
                    </div>
                    <div>
                        <button onClick={(e)=>{
                            dispatch(submitDataSignup(e,list, error.valid));
                            dispatch(clearDataSignup());
                            setOpen(true);
                            }} class="mt-4 bg-lime-500 w-60 p-1 rounded-md font-semibold">Signup</button>
                        {open&&<MyModal open={open} setOpen={setOpen}/>}
                    </div>
                </form>
            </div>
            <div>
                <p class="text-white text-center pr-4 mt-8 ml-8 mb-4">If you have signed up already, then <button class="bg-gray-500 hover:bg-slate-400 rounded-md" name="login_page" onClick={props.manageUser}>login</button></p>
            </div>
        </div>
    );
}

export default Signup;