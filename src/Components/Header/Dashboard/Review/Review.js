import axios from 'axios';
import React, { useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { useForm } from 'react-hook-form';
import Rating from 'react-rating';
import useAuth from '../../../../hooks/useAuth';

const Review = () => {
    const [rating, setRating] = useState(0)
    const { user } = useAuth()
    const { register, handleSubmit, watch, reset, control, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(user)
        data.rating = parseFloat(rating)
        data.fullName = user.displayName
        data.img = user.photoURL || 'https://i.ibb.co/FVdSWWM/download.jpg'
        data.email = user.email
        axios.post('https://hidden-anchorage-77198.herokuapp.com/submitReview', data)
            .then(res => {
                confirmAlert({
                    customUI: ({ onClose }) => {
                        return (
                            <div className='flex items-center flex-col mx-auto mt-5 p-7 bg-white shadow-lg rounded-md'>
                                <i className="fas fa-check text-3xl bg-green-400 w-16 h-16 flex justify-center items-center rounded-full text-green-800"></i>
                                <h1 className="my-5 text-2xl font-medium text-gray-800">Review Submitted Successfully!</h1>
                                <button className="bg-green-500 text-white rounded-md px-8 py-2 text-base font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300" onClick={onClose}>Ok</button>
                            </div>
                        );
                    }
                });
                reset()
            })
    }

    const handleRating = (e) => {
        setRating(e.target.value)
        console.log(e.target.value)
        e.preventDefault()
    }

    return (
        <div className="bg-white min-w-1xl flex flex-col rounded-xl shadow-lg">
            <div className="px-12 py-5">
                <h2 className="text-gray-800 text-3xl font-semibold">Your opinion matters to us!</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-200 w-full flex flex-col items-center">
                <div className="flex flex-col items-center py-6 space-y-3">
                    <span className="text-lg text-gray-800">How was quality of our service?</span>
                    <div id="rating-contain" className="">
                        <label htmlFor="rating">
                            <Rating
                            readonly
                                initialRating={rating}
                                emptySymbol={<i className="text-3xl far fa-star text-yellow-500"></i>}
                                fullSymbol={<i className="text-3xl fa fa-star text-yellow-500"></i>}
                            />
                        </label>
                        <input id="rating" className="" defaultValue="0" onChange={handleRating} type="range" step=".1" max="5" className="range" />

                    </div>

                </div>
                <div className="w-3/4 flex flex-col"  >

                    <textarea {...register("review", { required: true })} placeholder="Feel free to share your feedback" rows="3" className="p-4 text-gray-500 rounded-xl resize-none"></textarea>
                    <button type="submit" className="py-3 my-8 text-lg bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white">Submit Review</button>
                </div>
            </form>
        </div>
    );
};

export default Review;