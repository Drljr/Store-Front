import "./Dash.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";



const Dash = () => {

    return (
        <div className="Container" >
            <Sidebar />
            <div className="Container-2">
                <Navbar />
            </div>
            <div className="wrapper">
                <div className="widget-1">
                    <h3>sales overview</h3>
                </div>
                <div className="widget-2">
                    <h3>Inventory summary</h3>
                </div>
                <div className="widget-1">
                    <h3>sales overview</h3>
                </div>
                <div className="widget-2">
                    <h3>Inventory summary</h3>
                </div>
                <div className="widget-3">
                    <h3>sales overview</h3>
                </div>
                <div className="widget-4">
                    <h3>Inventory summary</h3>
                </div>
                <div className="widget-3">
                    <h3>sales overview</h3>
                </div>
                <div className="widget-4">
                    <h3>Inventory summary</h3>
                </div>
            </div>

        </div>
    );
}
export default Dash;