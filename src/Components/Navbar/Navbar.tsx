import './Navbar.css';
import logo from '../../assets/logo.png';
import { IoIosSearch } from "react-icons/io";
import { GoBell } from "react-icons/go";
import profileImage from "../../assets/profile.svg";

export const Navbar = () => {
    return (
        <div className='nav-bar'>
            <div className="top">
                <img src={logo} alt="sign in" className="logo" />
            </div>
            <div className="search">
                <IoIosSearch className='search-icon' />
                <input type="text" placeholder='Search products, supplier, order' />
                <GoBell className='notification-bell' />
                <img className="profile-image" src={profileImage} alt="Profile" />
            </div>
        </div>
    );
}
export default Navbar;