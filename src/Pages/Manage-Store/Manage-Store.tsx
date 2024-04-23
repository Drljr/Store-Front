import './Manage-Store.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';

export const ManageStore = () => {
    return (
        <div className="Container" >
            <Sidebar />
            <div className="Container-2">
                <Navbar />
            </div>
            <div className="wrapper">
                <div className="widgets">
                    <h3>Manage Store</h3>
                </div>
            </div>
        </div>
    );
}
export default ManageStore;