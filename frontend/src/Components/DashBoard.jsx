import NavBar from './NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faVideo, faMessage, faRightFromBracket, faIndianRupeeSign} from '@fortawesome/free-solid-svg-icons';
import Message from './Message';
import Tooltip from '@mui/joy/Tooltip';

const DashBoard = () => {
    return (
        <div class="bg-gray-400 min-h-screen">
            <NavBar/>
            <div class="flex relative h-[600px] w-[1200px] bg-gray-200 rounded-md mt-8 ml-auto mr-auto ">
                <div class=" relative flex flex-col sidebar min-h-full w-14 rounded-tl-md pl-4 justify-center pb-14 rounded-bl-md space-y-6 bg-gray-700">
                    <div id="msg" class="icons h-12 w-12 p-3 absolute left-1 top-48 rounded-full bg-gray-500">
                        <Tooltip title="Message" size="md">
                            <FontAwesomeIcon icon={faMessage} size="xl" style={{color: "white",}} />
                        </Tooltip>   
                    </div>
                    <div id="video" class="icons h-12 w-12 p-3 absolute left-1 top-56 rounded-full">
                        <Tooltip title="Video-Calling" size="md">
                            <FontAwesomeIcon icon={faVideo} size="xl" style={{color: "white",}} />
                        </Tooltip>   
                    </div>
                    <div id="msg" class="icons h-12 w-12 p-3 absolute left-2 top-[280px] rounded-full">
                        <Tooltip title="Payment" size="md">
                            <FontAwesomeIcon icon={faIndianRupeeSign} size="xl" style={{color: "white",}} />
                        </Tooltip>   
                    </div>
                    <div id="msg" class="icons h-12 w-12 p-3 absolute left-1 bottom-8 rounded-full">
                        <Tooltip title="Logout" size="md">
                            <FontAwesomeIcon icon={faRightFromBracket} size="xl" style={{color: "white",}} />
                        </Tooltip>   
                    </div>
                </div>
                <Message/>
            </div>
        </div>
    );
}

export default DashBoard;