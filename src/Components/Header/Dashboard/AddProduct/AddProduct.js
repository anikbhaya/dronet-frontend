import axios from 'axios';
import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { useForm } from 'react-hook-form';

const AddProduct = () => {
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    
    const onSubmit = data => {
        axios.post('https://hidden-anchorage-77198.herokuapp.com/AddNewProduct', data)
            .then(function (response) {
                console.log(response);
                confirmAlert({
                    customUI: ({ onClose }) => {
                      return (
                        <div className='flex items-center flex-col mx-auto mt-5 p-7 bg-white shadow-lg rounded-md'>
                            <i className="fas fa-check text-3xl bg-green-400 w-16 h-16 flex justify-center items-center rounded-full text-green-800"></i>
                          <h1 className="my-5 text-2xl font-medium text-gray-800">Product Added Successfully!</h1>
                          <button className="bg-green-500 text-white rounded-md px-8 py-2 text-base font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300" onClick={onClose}>Ok</button>
                        </div>
                      );
                    }
                  });
                reset();
                
            })
            .catch(function (error) {
                console.log(error);
            })

            
            
    };



    return (
        <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-6">Add A New <span className="text-primary">Drone</span></h2>

            <form className="" onSubmit={handleSubmit(onSubmit)} >
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" {...register("name", { required: true })} placeholder="Drone Model" />
                {errors.name && <span>This field is required</span>}
                <br /><br />
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" {...register("price", { required: true })} placeholder="Price" />
                {errors.price && <span>This field is required</span>}
                <br /><br />
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" {...register("rating", { required: true })} placeholder="Rating" />
                {errors.rating && <span>This field is required</span>}
                <br /><br />
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" {...register("img", { required: true })} placeholder="Image URL" />
                {errors.img && <span>This field is required</span>}
                <br /><br />
                <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" {...register("description", { required: true })} placeholder="Description" />
                {errors.description && <span>This field is required</span>}
                <br /><br />
                <input type="submit" value="Submit" className=" bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-full focus:outline-none focus:shadow-outline cursor-pointer mx-auto w-full" />

            </form>
        </div>
    );
};

export default AddProduct;