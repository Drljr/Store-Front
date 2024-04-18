import './Sidebar.css';
import logo from '../../assets/logo.png';
// import { FaHome } from "react-icons/fa";
// import { FaUserGroup } from "react-icons/fa6";
// import { FaUsers } from "react-icons/fa";
// import { TbMoneybag } from "react-icons/tb";
// import { GiShakingHands } from "react-icons/gi";
// import { FaPiggyBank } from "react-icons/fa";
// import { GiReceiveMoney } from "react-icons/gi";
// import { FaUserCheck } from "react-icons/fa6";
// import { FaUserXmark } from "react-icons/fa6";
// import { FaBriefcase } from "react-icons/fa";
// import { GoChevronDown } from "react-icons/go";
// import { BsBank } from "react-icons/bs";
// import { BiSolidCoinStack } from "react-icons/bi";
// import { GrTransaction } from "react-icons/gr";
// import { GiFlowerTwirl } from "react-icons/gi";
// import { FaUserGear } from "react-icons/fa6";
// import { FaScroll } from "react-icons/fa";
// import { VscGraph } from "react-icons/vsc";
// import { RiEqualizerFill } from "react-icons/ri";
// import { LuBadgePercent } from "react-icons/lu";
// import { TbClipboardList } from "react-icons/tb";
import { useNavigate } from "react-router-dom";



export const Sidebar = () => {

    const navigate = useNavigate();
    const handleClick = () => { navigate("../Dashboard") }

    return (
        <div className='Sidebar'>
            <div className="top">
                <img src={logo} alt="sign in" className="logo" />
            </div>
            <div className="center">
                <ul>

                    <li onClick={handleClick} >
                        {/* <FaHome className="icon" /> */}
                        <span> Dashboard </span>
                    </li>
                    <li>
                        {/* <FaUserGroup className="icon" /> */}
                        <span> inventory </span>
                    </li>
                    <li>
                        {/* <FaUsers className="icon" /> */}
                        <span> Reports </span>
                    </li>
                    <li>
                        {/* <TbMoneybag className="icon" /> */}
                        <span> Suppliers </span>
                    </li>
                    <li>
                        {/* <GiShakingHands className="icon" /> */}
                        <span> Orders </span>
                    </li>
                    <li>
                        {/* <FaPiggyBank className="icon" /> */}
                        <span> Manage Stores </span>
                    </li>
                    
                </ul>
            </div>
        </div>
    )
}
export default Sidebar;