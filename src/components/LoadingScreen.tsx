import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-[#e0e5ec] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-4xl font-bold text-center text-medical-dark mb-8">
          MediMix
        </h1>
        <div className="space-y-8">
          <div className="flex justify-center">
            <div className="loader">
              <div className="item1"></div>
              <div className="item2"></div>
              <div className="item3"></div>
            </div>
          </div>
          <p className="text-center text-medical-dark">Loading medical database...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;