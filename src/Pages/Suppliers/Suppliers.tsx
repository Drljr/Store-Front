import './Suppliers.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';
import { ListFilter } from 'lucide-react';
import { useState } from 'react';
import SupplierModal from './supplierModal';


export const Suppliers = () => {
    const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);

    const openSupplierModal = () => {
        setIsSupplierModalOpen(true);
    };
    const closeSupplierModal = () => {
        setIsSupplierModalOpen(false);
    };

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
                                <th>On the way</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Supplier 1</td>
                                <td>Product A, Product B</td>
                                <td>(123) 456-7890</td>
                                <td>supplier1@example.com</td>
                                <td>Not Taking return</td>
                                <td>13</td>
                            </tr>
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