import React from "react";
import "./Dash.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
// import Navbar from "../../Components/Navbar/Navbar";

const Dash = () => {
    return (
        <div className="Container" >
            <Sidebar />
            {/* <div className="wrapper">
                <Navbar />
            </div> */}
        </div>
    );
}
export default Dash;