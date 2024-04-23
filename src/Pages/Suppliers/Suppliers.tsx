import './Suppliers.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';

export const Suppliers = () => {
    return (
        <div className="Container" >
            <Sidebar />
            <div className="Container-2">
                <Navbar />
            </div>
            <div className="wrapper">
                <div className="widget">
                    <h3>Suppliers</h3>
                </div>
            </div>
        </div>
    );
}
export default Suppliers;