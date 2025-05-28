import './Orders.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';
import { ListFilter } from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '../../api/axios.js';
// import Modal  from './Modal';

export const Orders = () => {

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


    const [orders, setOrders] = useState([]);

    useEffect(() => {
        api.get('http://localhost:5000/orders')
            .then(response => setOrders(response.data))
            .catch(error => console.error("Error fetching orders:", error));
    }, []);


    return (
        <div className="Container" >
            <Navbar />
            <div className="Container-2">
                <Sidebar />
            </div>
            <div className="wrapper">
                <div className="widget1">
                    <h3>Overall Orders</h3>
                </div>
                <div className="widget2">
                    <h3>Orders
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
                                <th>Order Value</th>
                                <th>Quantity</th>
                                <th>Order ID</th>
                                <th>Expected Delivery</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={order._id || index}>
                                    <td>{order.productName}</td>
                                    <td>${order.orderValue}</td>
                                    <td>{order.quantity}</td>
                                    <td>{order.orderId}</td>
                                    <td>{order.expectedDelivery}</td>
                                    <td>{order.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {isModalOpen && <Modal closeModal={closeModal} />}
        </div>
    );
}
export default Orders;