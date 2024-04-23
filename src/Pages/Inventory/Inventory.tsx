import './Inventory.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';

export const Inventory = () => {
    return (
        <div className="Container" >
            <Sidebar />
            <div className="Container-2">
                <Navbar />
            </div>
            <div className="wrapper">
                <div className="widget1">
                    <h3>Overall Inventory</h3>
                </div>
                <div className="widget2">
                    <h3>Products</h3>
                </div>
            </div>
        </div>
    );
}
export default Inventory;