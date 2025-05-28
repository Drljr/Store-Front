import './Suppliers.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';
import { ListFilter } from 'lucide-react';
import { useState, useEffect } from 'react';
import SupplierModal from './supplierModal';
import api from '../../api/axios.js';


export const Suppliers = () => {
    const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);

    const openSupplierModal = () => {
        setIsSupplierModalOpen(true);
    };
    const closeSupplierModal = () => {
        setIsSupplierModalOpen(false);
    };

    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        api.get('http://localhost:5000/suppliers')
            .then(response => setSuppliers(response.data))
            .catch(error => console.error("Error fetching suppliers:", error));
    }, []);



    return (
        <div className="Container" >
            <Navbar />
            <div className="Container-2">
                <Sidebar />
            </div>
            <div className="wrapper">
                <div className="widget">
                    <h3>
                        Suppliers
                        <span>
                            <button className='addsupplier' onClick={openSupplierModal}>Add Supplier</button>
                            <button className='filter'>
                                <ListFilter className='filter-icon' size={12} />
                                Filter
                            </button>
                        </span>
                    </h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Supplier Name</th>
                                <th>Products Supplied</th>
                                <th>Contact Number</th>
                                <th>Email</th>
                                <th>Type</th>
                                <th>Amount Supplied</th>
                            </tr>
                        </thead>
                        <tbody>
                            {suppliers.map((supplier, index) => (
                                <tr key={index}>
                                    <td>{supplier.name}</td>
                                    <td>{supplier.products.join(', ')}</td>
                                    <td>{supplier.contactNumber}</td>
                                    <td>{supplier.email}</td>
                                    <td>{supplier.type}</td>
                                    <td>{supplier.amountSupplied}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {isSupplierModalOpen && (
                <SupplierModal closeModal={closeSupplierModal} />
            )}
        </div>
    );
}
export default Suppliers;