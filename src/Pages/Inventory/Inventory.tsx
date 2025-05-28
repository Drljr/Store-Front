import './Inventory.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';
import { ListFilter } from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '../../api/axios.js';
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

    const [products, setProducts] = useState([]);
    useEffect(() => {
        api.get('http://localhost:5000/products')
          .then(response => setProducts(response.data))
          .catch(error => console.error("Error fetching products:", error));
    }, []);
    
    // Callback passed to modal to add product to state
    const handleAddProduct = (newProduct) => {
        setProducts(prev => [...prev, newProduct]);
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
                            <button className='addproduct' onClick={() => setIsModalOpen(true)}>Add Product</button>
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
                            {products.map((product) => (
                                <tr key={product._id}>
                                    <td>{product.name}</td>
                                    <td>${product.buyingPrice.toFixed(2)}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.thresholdValue} packets</td>
                                    <td>{new Date(product.expiryDate).toLocaleDateString()}</td>
                                    <td>{product.availability ? 'In Stock' : 'Out of Stock'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {isModalOpen && <Modal closeModal={closeModal} onAdd={handleAddProduct} />}
        </div>
    );
}
export default Inventory;