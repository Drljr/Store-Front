import './Sidebar.css';
import { useNavigate } from "react-router-dom";
import { CiHome } from "react-icons/ci";
import { GiHandTruck } from "react-icons/gi";
import { IoBarChartOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { BsBox } from "react-icons/bs";
import { GoChecklist } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";

export const Sidebar = () => {

    const navigate = useNavigate();

    // Renamed functions to reflect their purposes
    const handleDashboardClick = () => { navigate("/Dashboard") };
    const handleInventoryClick = () => { navigate("/Inventory") };
    const handleReportsClick = () => { navigate("/Reports") }
    const handleOrdersClick = () => { navigate("/Orders") };
    const handleSupplyClick = () => { navigate("/Suppliers") }
    const handleManagementClick = () => { navigate("/ManageStore") };
    const handleSettingsClick = () => { navigate("/Settings") };
    const handleLogoutClick = () => { navigate("/") };
    return (
        <div className='Sidebar'>

            <div className="center">
                <ul>
                    <li onClick={handleDashboardClick}>
                        <span><CiHome className='icon1' /> Dashboard </span>
                    </li>
                    <li onClick={handleInventoryClick}>
                        <span><GiHandTruck className='icon2' /> Inventory </span>
                    </li>
                    <li onClick={handleReportsClick}>
                        <span><IoBarChartOutline className='icon3' /> Reports </span>
                    </li>
                    <li onClick={handleSupplyClick}>
                        <span><FaRegUserCircle className='icon4' /> Suppliers </span>
                    </li>
                    <li onClick={handleOrdersClick}>
                        <span><BsBox className='icon5' /> Orders </span>
                    </li>
                    <li onClick={handleManagementClick}>
                        <span><GoChecklist className='icon6' /> Manage Stores </span>
                    </li>
                </ul>
                            <div className='center2'>
                <ul>
                    <li onClick={handleSettingsClick}>
                        <span><IoSettingsOutline className='icon7' /> Settings </span>
                    </li>
                    <li onClick={handleLogoutClick}>
                        <span><MdOutlineLogout className='icon8' /> Logout </span>
                    </li>
                </ul>
            </div>
            </div>

        </div>
    )
}

export default Sidebar;