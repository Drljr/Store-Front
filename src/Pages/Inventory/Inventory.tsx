import './Inventory.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';
import { ListFilter } from 'lucide-react';
import { useState } from 'react';
import Modal  from './Modal';

export const Inventory = () => {
    // State to manage modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Function to open the modal
    const openModal = () => {
        setIsModalOpen(true);
    };
    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
    };


    return (
        <div className="Container" >
            <Navbar />
            <div className="Container-2">
            <Sidebar />
            </div>
            <div className="wrapper">
                <div className="widget1">
                    <h3>Overall Inventory</h3>
                </div>
                <div className="widget2">
                    <h3>
                    Products
                        <span>
                            <button className='addproduct' onClick={openModal}>Add Product</button>
                            <button className='filter'>
                                <ListFilter className='filter-icon' size={12} />
                                Filter
                            </button>
                        </span>
                    </h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Buying Price</th>
                                <th>Quantity</th>
                                <th>Threshold Value</th>
                                <th>Expiry Date</th>
                                <th>Availability</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Product 1</td>
                                <td>$10.00</td>
                                <td>Quantity 1</td>
                                <td>100 packets</td>
                                <td>2023-12-31</td>
                                <td>In Stock</td>
                            </tr>
                            <tr>
                                <td>Product 1</td>
                                <td>$10.00</td>
                                <td>Quantity 1</td>
                                <td>100 packets</td>
                                <td>2023-12-31</td>
                                <td>In Stock</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            {isModalOpen && <Modal closeModal={closeModal} />}
        </div>
    );
}
export default Inventory;