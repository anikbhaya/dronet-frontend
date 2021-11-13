import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Rating from 'react-rating';
import { NavLink } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import useAuth from '../../hooks/useAuth';
import bgBanner from '../../images/banner-bg.jpg'
import './Home.css'
import droneImg from '../../images/drone-1.png'

const Home = () => {
  const [products, setProducts] = useState([])
  const [reviews, setReviews] = useState([])
  const { user, isLoading, setIsLoading } = useAuth()

  useEffect(() => {
    axios.get(`https://hidden-anchorage-77198.herokuapp.com/products?quantity=${6}`)
        .then(res => {
          setProducts(res.data)
        })

    axios.get(`https://hidden-anchorage-77198.herokuapp.com/reviews?email=${user.email}`)
      .then(res => setReviews(res.data))
  }, [isLoading])
  return (
    <>
      <Header />


      <div style={{ background: `url(${bgBanner}) no-repeat center center/cover` }} className="h-screen relative z-10" id="banner">
        <div className="container mx-auto p-4 flex items-center h-full">
          <div>
            <h1 className="text-5xl font-bold text-white  ">Your <span className="text-primary">Drone</span>. Your <span className="text-primary">Rules</span>.</h1>
            <p className="text-white my-5 w-1/2">We’re the only GPS-enabled drone company whose drones can see in six dimensions (so it can avoid those low-flying seagulls and helicopters).</p>
            <NavLink to="/drones" className="inline-block bg-primary text-white px-6 py-2 rounded bg-gradient-to-b  from-primary to-primary-dark hover:from-primary-dark hover:to-primary ">Explore Drones</NavLink>
          </div>
        </div>
      </div>


      <div id="products"className="container mx-auto p-4 my-10">
      <h1 className="text-5xl font-bold text-center  mb-4">Latest <span className="text-primary">Drones</span></h1>
      <p className="text-center mb-3">Business intelligence derived from drone data is only as good as the data that is used to generate it.</p>
      <hr className="border-b-4 border-secondary w-28 mx-auto mb-8" />

{
  products.length > 0 ? <div id="products" className=" grid grid-cols-3 gap-10">
    {
      products.map(product =>
        <div className="" key={product._id}>
          <div className=" w-full bg-gradient-to-b from-secondary to-secondary-dark shadow-lg rounded-xl p-4">
            <div className="flex flex-col ">
              <div className="">
                <div className="relative h-62 w-full mb-3">


                  <div className="flex items-center w-full justify-between mb-3">
                    <h2 className="text-xl font-bold mr-auto cursor-pointer text-gray-200 hover:text-purple-500  ">{product.name}
                    </h2>

                  </div>
                  <div className="relative">
                    <img src={product.img} alt="Just a flower" className=" w-full   object-fill  rounded-2xl" />
                    <div className="absolute flex flex-col top-0 right-0 p-3">
                      <button className="transition ease-in duration-300 bg-gray-800  hover:text-purple-500 shadow hover:shadow-md text-gray-500 rounded-full w-8 h-8 text-center p-1"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg></button>
                    </div>
                  </div>
                </div>
                <div className="flex-auto justify-evenly">
                  <div className="flex flex-wrap ">

                    <div className="w-full flex-none text-sm flex items-center text-gray-600 mb-2">
                      <Rating
                        readonly
                        initialRating={product.rating}
                        emptySymbol={<i className="far fa-star text-yellow-500"></i>}
                        fullSymbol={<i className="fa fa-star text-yellow-500"></i>}
                      />
                      <span className=" whitespace-nowrap ml-2 text-white"> {product.rating}</span>
                    </div>
                    <p className="text-white my-3">{product.description.slice(0, 60)} ...</p>
                  </div>
                  <div className="text-xl text-white font-semibold mt-1">${product.price}</div>
                  <div className="flex space-x-2 text-sm font-medium justify-start">
                    <NavLink to={`/placeOrder/${product._id}`} className="transition ease-in duration-300 inline-flex items-center text-white mx-auto font-medium mb-2 md:mb-0  px-5 py-2 bg-gradient-to-b  from-primary to-primary-dark hover:from-primary-dark hover:to-primary rounded ">
                      Buy Now
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )

    }
  </div>
    :
    <div className="w-full flex justify-center items-center my-40">
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
}
      </div>


      <div id="reviews" className="bg-gray-100">
        <div className="container mx-auto p-4 py-12">


          <div >
            <div className="w-full text-center pb-8">
              <i className="fas fa-quote-right text-6xl text-primary"></i>

              <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-gray-900 pb-2">
                Check what out customers say about us
              </h1>
              <hr className="border-b-4 border-secondary w-28 mx-auto mb-8" />

            </div>
            <div className="grid grid-cols-2 gap-4">
              {
                reviews.map(review =>

                  <div key={review._id} className="bg-white rounded-lg p-6">
                    <div className="flex items-center space-x-6 mb-4">
                      <img className="h-28 w-28 object-cover object-center rounded-full"
                        src={review.img} alt="photo" />
                      <div>
                        <p className="text-xl text-gray-700 font-normal mb-1">{review.fullName}</p>
                        <Rating
                          readonly
                          initialRating={review.rating}
                          emptySymbol={<i className="far fa-star text-yellow-500"></i>}
                          fullSymbol={<i className="fa fa-star text-yellow-500"></i>}
                        />
                        <p>{review.rating}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-400 leading-loose font-normal text-base">{review.review}</p>
                    </div>
                  </div>
                )
              }
            </div>
          </div>


        </div>
      </div>

      <div id="manual">
        <div className="container mx-auto p-4 py-12">
          <h2 className="text-4xl font-bold text-center">Just Click, and <span className="text-primary">Fly</span></h2>
          <div className="grid grid-cols-2 flex justify-center">
            <div className="w-3/5 grid gap-4 mt-8">
              <div className="bg-gray-100 p-3 border-l-4 border-primary">
                <h3 className="font-bold">Capture: Flight & Walkthrough</h3>
                <p>Digitally capture your sight by flying or walking with the DroneDeploy Flight or Walkthrough apps</p>
              </div>
              <div className="bg-gray-100 p-3 border-l-4 border-primary">
                <h3 className="font-bold">Live Map: In-field Insights</h3>
                <p>Make decisions at the field edge with real-time drone mapping</p>
              </div>
              <div className="bg-gray-100 p-3 border-l-4 border-primary">
                <h3 className="font-bold">Analysis: Explore Drone Data</h3>
                <p>Accurate measurements and annotations to make smarter business decisions</p>
              </div>
              <div className="bg-gray-100 p-3 border-l-4 border-primary">
                <h3 className="font-bold">Virtual Walkthrough: 360 Tour</h3>
                <p>Get a comprehensive view of your site from any perspective.</p>
              </div>
            </div>
            <div className="mt-8">
              <img className="w-full" src={droneImg} alt="" />
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>

    </>
  );
};

export default Home;