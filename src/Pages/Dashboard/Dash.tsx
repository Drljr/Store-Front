import "./Dash.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import Sales from "../../assets/Sales.png";
import Revenue from "../../assets/Revenue.png";
import Profit from "../../assets/Profit.png";
import Cost from "../../assets/Cost.png";
// import Quantity from "../../assets/Quantity.png";
// import Map from "../../assets/On the way.png";
import Purchases from "../../assets/Purchase.png";
import Cancel from "../../assets/Cancel.png";
// import Suppliers from "../../assets/Suppliers.png";
// import Categories from "../../assets/Categories.png";





const Dash = () => {

    return (
        <div className="Container" >
            <Sidebar />
            <div className="Container-2">
                <Navbar />
            </div>
            <div className="wrapper">
                <div className="widget-1">
                    <h3>Sales Overview</h3>
                    <div className="content">
                        <img src={Sales} alt="sign in" className="Sales" />
                        <p>Sales</p>
                    </div>
                    <div className="content">
                        <img src={Revenue} alt="sign in" className="Revenue" />
                    </div>
                    <div className="content">
                        <img src={Profit} alt="sign in" className="Profit" />
                    </div>
                    <div className="content">
                        <img src={Cost} alt="sign in" className="Cost" />
                    </div>
                </div>
                <div className="widget-2">
                    <h3>Inventory Summary</h3>
                </div>
                <div className="widget-1">
                    <h3>Purchase Overview</h3>
                    <div className="content">
                        <img src={Purchases} alt="sign in" className="Purchase" />
                    </div>
                    <div className="content">
                        <img src={Cost} alt="sign in" className="Cost" />
                    </div>
                    <div className="content">
                        <img src={Cancel} alt="sign in" className="Cancel" />
                    </div>
                    <div className="content">
                        <img src={Profit} alt="sign in" className="Return" />
                    </div>
                </div>
                <div className="widget-2">
                    <h3>Product Summary</h3>
                </div>
                <div className="widget-3">
                    <h3>Purchase</h3>
                </div>
                <div className="widget-4">
                    <h3>Order Summary</h3>
                </div>
                <div className="widget-3">
                    <h3>Top Selling Stock</h3>
                </div>
                <div className="widget-4">
                    <h3>Low Quantity Stock</h3>
                </div>
            </div>

        </div>
    );
}
export default Dash;