import './Reports.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';

export const Reports = () => {
    return (
        <div className="Container" >
            <Sidebar />
            <div className="Container-2">
                <Navbar />
            </div>
            <div className="wrapper">
                <div className="widgets-1">
                    <h3>Overview</h3>
                </div>
                <div className="widgets-2">
                    <h3>Best Selling Category</h3>
                </div>
                <div className="widget">
                    <h3>Profit & Revenue</h3>
                </div>
                <div className="widget">
                    <h3>Best Selling Product</h3>
                </div>
            </div>
        </div>
    );
}
export default Reports;