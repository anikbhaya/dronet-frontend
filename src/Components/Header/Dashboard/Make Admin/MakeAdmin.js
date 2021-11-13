import axios from 'axios';
import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { useForm } from 'react-hook-form';
import useAuth from '../../../../hooks/useAuth';

const MakeAdmin = () => {
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const { user, isLoading, isAdmin } = useAuth()
    
    const onSubmit = data => {
        axios.post('https://hidden-anchorage-77198.herokuapp.com/makeAdmin', data)
        .then(res => {
            confirmAlert({
                customUI: ({ onClose }) => {
                  return (
                    <div className='flex items-center flex-col mx-auto mt-5 p-7 bg-white shadow-lg rounded-md'>
                        <i className="fas fa-check text-3xl bg-green-400 w-16 h-16 flex justify-center items-center rounded-full text-green-800"></i>
                      <h1 className="my-5 text-2xl font-medium text-gray-800">Admin access granted successfully</h1>
                      <button className="bg-green-500 text-white rounded-md px-8 py-2 text-base font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300" onClick={onClose}>Ok</button>
                    </div>
                  );
                }
              });
            reset()}
            )
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center my-40">
                <div
                    className="
                animate-spin
                rounded-full
                h-32
                w-32
                border-t-2 border-b-2 border-purple-500
              "
                ></div>
            </div>
        )
    }

    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center h-full">
            <input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4 w-1/2" {...register("email", { required: true })} placeholder="Email" />
            <input className=" bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-full focus:outline-none focus:shadow-outline cursor-pointer " type="submit" value="Add as Admin" />
        </form>
    );
};

export default MakeAdmin;