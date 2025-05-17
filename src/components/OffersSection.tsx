import { AppDispatch, RootState } from '@/store';
import { fetchPublicOffersAction } from '@/store/actions/publicOffers.action';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const OffersSection = () => {

  const dispatch = useDispatch<AppDispatch>();
  const { offers,loading } = useSelector((state: RootState) => state.userOffers);

  useEffect(()=>{
    dispatch(fetchPublicOffersAction())
  },[])
  return (
    <div className="bg-gray-100 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Exclusive Offers Just for You</h2>
          <p className="text-lg text-gray-600">Don't miss out on these amazing deals!</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
          {/* Left Offer: 20% Off on Food */}
          <div 
            className="relative bg-gradient-to-r from-pink-500 to-yellow-400 text-white text-center py-8 px-10 rounded-lg shadow-lg flex items-center justify-center w-full sm:w-1/2"
            data-aos="fade-right"
            data-aos-delay="200"
            style={{ boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)' }}
          >
            <div className="absolute top-0 left-0 right-0 flex justify-center">
              <div 
                className="w-1/4 h-1 bg-white mb-6"
                style={{ height: '4px', marginTop: '-40px' }}
              ></div>
            </div>
            <div className="relative z-10">
              <h3 className="text-4xl font-bold mb-4">{offers[0]?.title ?? "20% Off on Food"}</h3>
              <p className="text-lg">{offers[0]?.description ?? "Enjoy a 20% discount on all our delicious meals!"}</p>
            </div>
          </div>

          {/* Right Offer: Game Zone Available */}
          <div 
            className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-8 px-10 rounded-lg shadow-lg flex items-center justify-center w-full sm:w-1/2"
            data-aos="fade-left"
            data-aos-delay="300"
            style={{ boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)' }}
          >
            <div className="absolute top-0 left-0 right-0 flex justify-center">
              <div 
                className="w-1/4 h-1 bg-white mb-6"
                style={{ height: '4px', marginTop: '-40px' }}
              ></div>
            </div>
            <div className="relative z-10">
              <h3 className="text-4xl font-bold mb-4">Game Zone Available</h3>
              <p className="text-lg">Step into our exciting Game Zone for endless fun!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffersSection;
