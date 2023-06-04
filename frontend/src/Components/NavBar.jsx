import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../images/chitchat_logo.png';
import {faAngleDown} from '@fortawesome/free-solid-svg-icons';
import Avatar from '@mui/joy/Avatar';
import Tooltip from '@mui/joy/Tooltip';

const NavBar = () => {
    return (
        <div className="navbar" class="bg-gray-800 min-h-[70px] flex flex-row justify-between relative">
            <div className="logo">
                <img src={logo} alt='logo' class="max-h-[68px] pl-6 pt-2 pb-2"></img>
            </div>
            <div className='account-details' class="flex flex-row mr-10 space-x-4">
                <Tooltip title="avatar" size="md">
                    <button variant="solid"><Avatar/></button>
                </Tooltip>
                <button variant="solid">
                    <FontAwesomeIcon icon={faAngleDown} size="xl" style={{color: "#474E68",}} />
                </button>
            </div>
        </div>
    );
}

export default NavBar;