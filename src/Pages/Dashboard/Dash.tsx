import "./Dash.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";

const Dash = () => {
    return (
        <div className="Container">
            <Navbar />
            <div className="Container-2">
                <Sidebar />
            </div>
            <div className="wrapper">
                <div className="widget-row">
                    <div className="widget-1">
                        <h3>Sales Overview</h3>
                    </div>
                    <div className="widget-2">
                        <h3>Inventory Summary</h3>
                    </div>
                </div>
                <div className="widget-row">
                    <div className="widget-1">
                        <h3>Purchase Overview</h3>
                    </div>
                    <div className="widget-2">
                        <h3>Product Summary</h3>
                    </div>
                </div>
                <div className="widget-row-2">
                    <div className="widget-3">
                        <h3>Sales & Purchase</h3>
                    </div>
                    <div className="widget-4">
                        <h3>Order Summary</h3>
                    </div>
                </div>
                <div className="widget-row-2">
                    <div className="widget-3">
                        <h3>Top Selling Stock</h3>
                    </div>
                    <div className="widget-4">
                        <h3>Low Quantity Stock</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dash;