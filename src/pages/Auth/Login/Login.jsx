
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';
import { AuthContext } from '../../../context/AuthContext';


const loginSchema = z.object({
  email: z.email('*Email is invalid'),
  password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, "*Password must have 8+ chars, uppercase, lowercase, number & special char"),
});
const API_URL = "https://route-posts.routemisr.com/users/signin";


export default function Login() {
    const { saveUserToken } = useContext(AuthContext); 

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  async function submitForm(data) {
    console.log(' Login data:', data);
    setIsLoading(true);
    setErrorMessage('');

    const loginData = {
      email: data.email,
      password: data.password
    };

    try {
      const res = await axios.post(API_URL, loginData);

      if (res.data.success || res.data.message === 'success') {
        console.log(res.data);

        if (res.data.data.token) {
          saveUserToken(res.data.data.token)
        }
        timeoutRef.current = setTimeout(() => navigate('/'), 2000);
      }
    } catch (error) {
      console.error(' Login error:', error.response?.data);
      setErrorMessage(error.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields, isSubmitting }
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: 'onTouched',
    resolver: zodResolver(loginSchema),
  });

  return (
    <div className="order-1 lg:order-2 w-full lg:max-w-lg xl:max-w-xl">


      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl border border-white/20">
        <div className="text-center mb-8">
          <h2 className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent mb-4">
            Welcome Back
          </h2>
          <p className="text-lg text-gray-600 font-medium">Sign in to your SocialHub account</p>
        </div>

        <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button type="button" className="group flex items-center justify-center gap-3 bg-white rounded-2xl p-4 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border border-gray-100">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 512 512">
                  <path d="M500 261.8C500 403.3 403.1 504 260 504 122.8 504 12 393.2 12 256S122.8 8 260 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9c-88.3-85.2-252.5-21.2-252.5 118.2 0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9l-140.8 0 0-85.3 236.1 0c2.3 12.7 3.9 24.9 3.9 41.4z" />
                </svg>
              </div>
              <span className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">Google</span>
            </button>
            <button type="button" className="group flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl p-4 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 hover:from-blue-700 hover:to-blue-800">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 320 512">
                  <path d="M80 299.3l0 212.7 116 0 0-212.7 86.5 0 18-97.8-104.5 0 0-34.6c0-51.7 20.3-71.5 72.7-71.5 16.3 0 29.4 .4 37 1.2l0-88.7C291.4 4 256.4 0 236.2 0 129.3 0 80 50.5 80 159.4l0 42.1-66 0 0 97.8 66 0z" />
                </svg>
              </div>
              <span className="font-semibold">Facebook</span>
            </button>
          </div>

          <div className="relative text-center text-sm text-gray-500 mb-8">
            <span className="relative px-4 py-1">or use your email</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent h-px" />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address *</label>
            <div className="relative">
              <input
                {...register('email')}
                type="email"
                className="w-full px-4 py-4 bg-white/50 backdrop-blur-sm border-2 border-gray-200 rounded-2xl text-lg font-medium focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all duration-300 hover:border-gray-300 shadow-lg hover:shadow-xl"
                placeholder="name@example.com"
              />
            </div>
            {errors.email && touchedFields.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Password *</label>
            <div className="relative">
              <input
                {...register('password')}
                type="password"
                className="w-full px-4 py-4 bg-white/50 backdrop-blur-sm border-2 border-gray-200 rounded-2xl text-lg font-medium focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all duration-300 hover:border-gray-300 shadow-lg hover:shadow-xl"
                placeholder="Enter your password"
              />
            </div>
            {errors.password && touchedFields.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-900 hover:from-blue-700 hover:to-blue-950 text-white font-black text-xl py-5 rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-[1.02] transition-all duration-300 focus:ring-4 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
        {errorMessage && (
          <div className="my-6  p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-xl text-sm">
            {errorMessage}
          </div>
        )}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/auth/register')}
              className="font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};


