import './Inventory.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';

export const Inventory = () => {
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
                            <button className='addproduct'>Add Product</button>
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
        </div>
    );
}
export default Inventory;