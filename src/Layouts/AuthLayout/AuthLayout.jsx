// import React from 'react'
// import { Outlet } from 'react-router-dom'

// export default function AuthLayout() {
//   return (
//     <div>
//       <Outlet/>
//     </div>
//   )
// }

import React, { useEffect, useState } from 'react';
import Login from './../../pages/Auth/Login/Login';
import Register from './../../pages/Auth/Register/Register';
import { useLocation, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';


 
const AuthLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    
    if (token) {
      navigate('/');
      return;
    }

    if (location.pathname === '/auth') {
      navigate('/auth/login');
    }
  }, [navigate, location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-emerald-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start lg:items-center">
        <div className="text-white bg-gradient-to-br from-blue-500 to-blue-700  bg-center bg-cover flex flex-col justify-between p-10 rounded-3xl shadow-2xl">
          
          <div className="text-center mb-12">
            <div className="w-24 h-24 mx-auto bg-white/20 rounded-3xl flex items-center justify-center mb-8 backdrop-blur-xl shadow-2xl">
              <span className="text-3xl font-black">SH</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 drop-shadow-2xl leading-tight">
              SocialHub
            </h1>
            <p className="text-xl sm:text-2xl font-bold max-w-md mx-auto leading-relaxed opacity-95">
              Welcome back to SocialHub App
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="group flex items-center gap-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:border-white/50">
                <div className="icon w-10 h-10 flex justify-center items-center rounded-xl bg-blue-700/20 text-blue-100 flex-shrink-0">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 512 512">
                    <path d="M0 352L0 128C0 75 43 32 96 32l320 0c53 0 96 43 96 96l0 224c0 53-43 96-96 96l-120 0c-5.2 0-10.2 1.7-14.4 4.8L166.4 539.2c-4.2 3.1-9.2 4.8-14.4 4.8-13.3 0-24-10.7-24-24l0-72-32 0c-53 0-96-43-96-96z"/>
                  </svg>
                </div>
                <div className="card-body">
                  <h4 className="text-white font-bold text-sm leading-tight group-hover:text-blue-300 transition-colors">Real-time Chat</h4>
                  <span className="text-white/90 text-xs block leading-tight">Instant messaging</span>
                </div>
              </div>

              <div className="group flex items-center gap-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:border-white/50">
                <div className="icon w-10 h-10 flex justify-center items-center rounded-xl bg-blue-700/20 text-blue-100 flex-shrink-0">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 448 512">
                    <path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm64 80a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM272 224c8.4 0 16.1 4.4 20.5 11.5l88 144c4.5 7.4 4.7 16.7 .5 24.3S368.7 416 360 416L88 416c-8.9 0-17.2-5-21.3-12.9s-3.5-17.5 1.6-24.8l56-80c4.5-6.4 11.8-10.2 19.7-10.2s15.2 3.8 19.7 10.2l26.4 37.8 61.4-100.5c4.4-7.1 12.1-11.5 20.5-11.5z"/>
                  </svg>
                </div>
                <div className="card-body">
                  <h4 className="text-white font-bold text-sm leading-tight group-hover:text-blue-100 transition-colors">Share Media</h4>
                  <span className="text-white/90 text-xs block leading-tight">Photos & videos</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="group flex items-center gap-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:border-white/50">
                <div className="icon w-10 h-10 flex justify-center items-center rounded-xl bg-blue-700/20 text-pink-100 flex-shrink-0">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 448 512">
                    <path d="M224 0c-17.7 0-32 14.3-32 32l0 3.2C119 50 64 114.6 64 192l0 21.7c0 48.1-16.4 94.8-46.4 132.4L7.8 358.3C2.7 364.6 0 372.4 0 380.5 0 400.1 15.9 416 35.5 416l376.9 0c19.6 0 35.5-15.9 35.5-35.5 0-8.1-2.7-15.9-7.8-22.2l-9.8-12.2C400.4 308.5 384 261.8 384 213.7l0-21.7c0-77.4-55-142-128-156.8l0-3.2c0-17.7-14.3-32-32-32zM162 464c7.1 27.6 32.2 48 62 48s54.9-20.4 62-48l-124 0z"/>
                  </svg>
                </div>
                <div className="card-body">
                  <h4 className="text-white font-bold text-sm leading-tight group-hover:text-pink-100 transition-colors">Smart Alerts</h4>
                  <span className="text-white/90 text-xs block leading-tight">Stay updated</span>
                </div>
              </div>

              <div className="group flex items-center gap-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:border-white/50">
                <div className="icon w-10 h-10 flex justify-center items-center rounded-xl bg-blue-700/20 text-blue-100 flex-shrink-0">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 640 512">
                    <path d="M320 16a104 104 0 1 1 0 208 104 104 0 1 1 0-208zM96 88a72 72 0 1 1 0 144 72 72 0 1 1 0-144zM0 416c0-70.7 57.3-128 128-128 12.8 0 25.2 1.9 36.9 5.4-32.9 36.8-52.9 85.4-52.9 138.6l0 16c0 11.4 2.4 22.2 6.7 32L32 480c-17.7 0-32-14.3-32-32l0-32zm521.3 64c4.3-9.8 6.7-20.6 6.7-32l0-16c0-53.2-20-101.8-52.9-138.6 11.7-3.5 24.1-5.4 36.9-5.4 70.7 0 128 57.3 128 128l0 32c0 17.7-14.3 32-32 32l-86.7 0zM472 160a72 72 0 1 1 144 0 72 72 0 1 1 -144 0zM160 432c0-88.4 71.6-160 160-160s160 71.6 160 160l0 16c0 17.7-14.3 32-32 32l-256 0c-17.7 0-32-14.3-32-32l0-16z"/>
                  </svg>
                </div>
                <div className="card-body">
                  <h4 className="text-white font-bold text-sm leading-tight group-hover:text-blue-300 transition-colors">Communities</h4>
                  <span className="text-white/90 text-xs block leading-tight">Find your tribe</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center py-10 px-2 lg:px-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

