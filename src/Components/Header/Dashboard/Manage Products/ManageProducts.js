import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import useAuth from '../../../../hooks/useAuth';

const ManageProducts = () => {
    const { user } = useAuth()
    const [products, setProducts] = useState([])
    const [deleteCount, setDeleteCount] = useState(0)
    const [dataLoading, setDataLoading] = useState(true)

    const handleDeleteBooking = (id) => {

        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='flex items-center flex-col mx-auto mt-5 p-7 bg-white shadow-lg rounded-md'>
                        <i className="fas fa-trash-alt text-3xl bg-red-400 w-16 h-16 flex justify-center items-center rounded-full text-red-800"></i>
                        <h1 className="my-5 text-2xl font-medium text-gray-900">Are you sure?</h1>
                        <div>
                        <button className="mr-2 bg-gray-600 text-white rounded-md px-8 py-2 text-base font-medium hover:bg-gray-700 focus:outline-none" onClick={onClose}>Cancel</button>

                        <button className="bg-red-500 text-white rounded-md px-8 py-2 text-base font-medium hover:bg-red-600 focus:outline-none"
                            onClick={() => {
                                axios.post('https://hidden-anchorage-77198.herokuapp.com/deleteProducts', { "deleteReqId": id })
                                    .then(function (response) {
                                        // setDeleteCount(response.data.deletedCount)
                                        setDeleteCount(deleteCount + response.data.deletedCount)
                                    })
                                    .catch(function (error) {
                                        console.log(error);
                                    })
                                onClose();
                            }}
                        >
                            Yes, Delete it!
                        </button>
                        </div>
                    </div>
                );
            }
        });



    }



    useEffect(() => {
        setDataLoading(true)
        axios.get('https://hidden-anchorage-77198.herokuapp.com/getProducts')
            .then(function (response) {
                setDataLoading(false)
                setProducts(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [user, deleteCount])
    return (
        <div>



            <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-6">Manage  <span className="text-primary">Products</span></h2>
                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Model
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Price
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Rating
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Delete
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        
                                        {products.length > 0 ?
                                            products.map(product =>
                                                <tr key={product._id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {product.name}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">${product.price}</div>
                                                    </td>
                                                    <td className="px-6 py-4 w-72">
                                                    <div className="text-sm text-gray-900">${product.rating}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <button onClick={() => { handleDeleteBooking(product._id) }} className="text-white bg-red-500 w-7 h-7 rounded"><i className="fas fa-trash-alt"></i></button>
                                                    </td>
                                                </tr>
                                            ) : <tr className="flex justify-center items-center p-6"><td colSpan="3" className="bg-red-200">No Orders Found</td></tr>
                                        }


                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ManageProducts;