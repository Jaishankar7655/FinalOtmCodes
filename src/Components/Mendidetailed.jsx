import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';

function Mendidetailed() {
  const { id } = useParams(); // Get the product ID from the route
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch product details when component mounts
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]); // Re-fetch if ID changes

  // Loading state
  if (loading) {
    return (
      <div className='w-full min-h-screen flex justify-center items-center'>
        <p className='text-2xl text-gray-600'>Loading product details...</p>
      </div>
    );
  }

  // Error state if no product found
  if (!product) {
    return (
      <div className='w-full min-h-screen flex justify-center items-center'>
        <p className='text-2xl text-red-600'>Product not found</p>
      </div>
    );
  }

  return (
    <>
      <div className='w-full min-h-screen bg-gray-50 flex justify-center items-center px-4 py-8'>
        <div className='w-full max-w-4xl bg-white rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden'>
          <div className='md:w-1/2 bg-gray-100 flex items-center justify-center p-6'>
            <div className='w-full max-w-[300px] h-[300px]'>
              <img
                className='w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105'
                src={product.thumbnail}
                alt={product.title}
              />
            </div>
          </div>
          
          <div className='md:w-1/2 p-6 flex flex-col justify-center space-y-4'>
            <p className='text-3xl font-bold text-gray-800 text-center md:text-left'>
              {product.title}
            </p>
            
            <p className='text-xl text-gray-600 text-center md:text-left'>
              {product.description}
            </p>
            
            <p className='text-xl text-blue-700 font-bold text-center md:text-left'>
              {Math.round(product.price * 84.85)} ₹
            </p>
            
            <p className='text-xl text-yellow-700 font-bold text-center md:text-left'>
              {'★'.repeat(Math.round(product.rating))}
            </p>
            
            <button 
              className='w-full md:w-52 mx-auto md:mx-0 p-3 bg-red-700 text-white text-xl rounded-lg hover:bg-red-800 transition-colors duration-300 active:scale-95'
            >
              Book now
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Mendidetailed