import './Orders.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';

export const Orders = () => {
    return (
        <div className="Container" >
            <Sidebar />
            <div className="Container-2">
                <Navbar />
            </div>
            <div className="wrapper">
                <div className="widget1">
                    <h3>Overall Orders</h3>
                </div>
                <div className="widget2">
                    <h3>Orders</h3>
                </div>
            </div>
        </div>
    );
}
export default Orders;