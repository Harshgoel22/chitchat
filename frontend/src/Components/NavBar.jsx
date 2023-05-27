import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../images/chitchat_logo.png';
import {faHouse, faVideo, faMagnifyingGlass, faBars} from '@fortawesome/free-solid-svg-icons';
import Avatar from '@mui/joy/Avatar';
import Tooltip from '@mui/joy/Tooltip';

const NavBar = () => {
    return (
        <div className="navbar" class="bg-gray-800 min-h-[70px] flex space-x-[28%]">
            <div className="logo">
                <img src={logo} alt='logo' class="max-h-[68px] pl-6 pt-2 pb-2"></img>
            </div>
            <div className='nav-items' class="flex space-x-16">
                <button class="pl-6 pt-4 pb-2 text-center">
                <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" style={{color: "#089667",}} />
                <br/>
                <p class="text-gray-500">Search</p>
                </button>
                <button class="pl-6 pt-4 pb-2 text-center">
                    <FontAwesomeIcon icon={faHouse} size="xl" style={{color: "#089667",}} />
                    <br/>
                    <p class="text-gray-500">Home</p>
                </button>
                <button class="pl-6 pt-4 pb-2 text-center">
                    <FontAwesomeIcon icon={faVideo} size="xl" style={{color: "#089667",}} />
                    <br/>
                    <p class="text-gray-500">Video</p>
                </button>
            </div>
            <div className='account-details' class="flex pl-6 pt-2 pb-2 space-x-16">
                <Tooltip title="avatar" size="md">
                    <button variant="solid"><Avatar/></button>
                </Tooltip>
                <Tooltip title="Settings" size="md" variant="solid">
                    <button variant="solid">
                        <FontAwesomeIcon icon={faBars} size="xl" style={{color: "#474E68",}} />
                    </button>
                </Tooltip>
            </div>
        </div>
    );
}

export default NavBar;