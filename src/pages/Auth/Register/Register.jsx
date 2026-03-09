
import { zodResolver } from '@hookform/resolvers/zod';

import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';

const registerSchema = z.object({
  name: z.string().nonempty('*Name is required').min(3, "*Name must be at least 3 characters").max(20, "*Name cannot be more than 20 characters"),
  username: z.string().optional(),
  email: z.email('*Email is invalid'),
  password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, "*Password must have 8+ chars, uppercase, lowercase, number & special char"),
  rePassword: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, "*Password must have 8+ chars, uppercase, lowercase, number & special char"),
  dateOfBirth: z.string().min(1, "*Date of birth required"),
  gender: z.enum(['male', 'female'], "*Gender is Required"),
}).refine((data) => data.password === data.rePassword, {
  message: "*Password and confirm password should be the same",
  path: ['rePassword']
});

const API_URL = "https://route-posts.routemisr.com/users/signup";

export default function Register() {
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();


  async function submitForm(data) {
    setIsLoading(true);
    setErrorMessage('');

    const apiData = {
      name: data.name,
      username: data.username || "",
      email: data.email,
      password: data.password,
      rePassword: data.rePassword,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender
    };


    try {
      const res = await axios.post(API_URL, apiData);

      if (res.data.success) {
        timeoutRef.current = setTimeout(() => navigate('/auth/login'), 3000);
      }
    } catch (error) {

      setErrorMessage(error.response?.data?.message || error.response?.data?.errors?.[0]);
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
      name: "",
      username: "",
      email: "",
      dateOfBirth: "",
      gender: "",
      password: "",
      rePassword: ""
    },
    mode: 'onTouched',
    resolver: zodResolver(registerSchema),
  });

  return (
    <div className="w-full  mx-auto">
      <form
        onSubmit={handleSubmit(submitForm)}
        className="w-full bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 space-y-6">
        <div className="text-center space-y-3">
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900">Create Account</h2>
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/auth/login')} className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors"
            >
              Sign in
            </button>
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button className="group flex items-center justify-center gap-3 bg-white rounded-2xl p-4 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border border-gray-100">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 512 512">
                <path d="M500 261.8C500 403.3 403.1 504 260 504 122.8 504 12 393.2 12 256S122.8 8 260 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9c-88.3-85.2-252.5-21.2-252.5 118.2 0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9l-140.8 0 0-85.3 236.1 0c2.3 12.7 3.9 24.9 3.9 41.4z" />
              </svg>
            </div>
            <span className="font-semibold text-gray-800 group-hover:text-red-600 transition-colors">Google</span>
          </button>
          <button className="group flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl p-4 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 hover:from-blue-700 hover:to-blue-800">
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

        <div className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
              Full Name
            </label>
            <div className="relative">
              <input
                {...register('name')}
                type="text"
                className="w-full pl-12 pr-4 py-4 bg-white/50 backdrop-blur-sm border-2 border-gray-200 rounded-2xl text-lg font-medium focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all duration-300 hover:border-gray-300 shadow-lg hover:shadow-xl"
                placeholder="Enter your full name"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="currentColor" viewBox="0 0 448 512">
                <path d="M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z" />
              </svg>
            </div>{
              errors.name && touchedFields.name && (<p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )
            }

          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
              UserName
            </label>
            <div className="relative">
              <input
                {...register('username')}
                type="text"
                className="w-full pl-12 pr-4 py-4 bg-white/50 backdrop-blur-sm border-2 border-gray-200 rounded-2xl text-lg font-medium focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all duration-300 hover:border-gray-300 shadow-lg hover:shadow-xl"
                placeholder="Enter your username (optinal)"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="currentColor" viewBox="0 0 448 512">
                <path d="M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z" />
              </svg>
            </div>{
              errors.username && touchedFields.username && (<p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
              )
            }

          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <input
                {...register('email')}
                type="email"
                className="w-full pl-12 pr-4 py-4 bg-white/50 backdrop-blur-sm border-2 border-gray-200 rounded-2xl text-lg font-medium focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all duration-300 hover:border-gray-300 shadow-lg hover:shadow-xl"
                placeholder="name@example.com"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="currentColor" viewBox="0 0 512 512">
                <path d="M48 64c-26.5 0-48 21.5-48 48 0 15.1 7.1 29.3 19.2 38.4l208 156c17.1 12.8 40.5 12.8 57.6 0l208-156c12.1-9.1 19.2-23.3 19.2-38.4 0-26.5-21.5-48-48-48L48 64zM0 196L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-188-198.4 148.8c-34.1 25.6-81.1 25.6-115.2 0L0 196z" />
              </svg>
            </div>
            {
              errors.email && touchedFields.email && (<p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )
            }
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input

                {...register('password')}

                type="password"
                className="w-full pl-12 pr-4 py-4 bg-white/50 backdrop-blur-sm border-2 border-gray-200 rounded-2xl text-lg font-medium focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all duration-300 hover:border-gray-300 shadow-lg hover:shadow-xl"
                placeholder="Create a strong password"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="currentColor" viewBox="0 0 384 512">
                <path d="M128 96l0 64 128 0 0-64c0-35.3-28.7-64-64-64s-64 28.7-64 64zM64 160l0-64C64 25.3 121.3-32 192-32S320 25.3 320 96l0 64c35.3 0 64 28.7 64 64l0 224c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 224c0-35.3 28.7-64 64-64z" />
              </svg>
            </div>
            {
              errors.password && touchedFields.password && (<p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )
            }
          </div>

          <div>
            <label htmlFor="rePassword" className="block text-sm font-bold text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                {...register('rePassword')}

                type="password"
                className="w-full pl-12 pr-4 py-4 bg-white/50 backdrop-blur-sm border-2 border-gray-200 rounded-2xl text-lg font-medium focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all duration-300 hover:border-gray-300 shadow-lg hover:shadow-xl"
                placeholder="Confirm your password"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="currentColor" viewBox="0 0 384 512">
                <path d="M128 96l0 64 128 0 0-64c0-35.3-28.7-64-64-64s-64 28.7-64 64zM64 160l0-64C64 25.3 121.3-32 192-32S320 25.3 320 96l0 64c35.3 0 64 28.7 64 64l0 224c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 224c0-35.3 28.7-64 64-64z" />
              </svg>
            </div>
            {
              errors.rePassword && touchedFields.rePassword && (<p className="text-red-500 text-xs mt-1">{errors.rePassword.message}</p>
              )
            }
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-bold text-gray-700 mb-2">
                Date Of Birth
              </label>
              <div className="relative">
                <input
                  {...register('dateOfBirth')}
                  type="date"
                  className="w-full pl-12 pr-4 py-4 bg-white/50 backdrop-blur-sm border-2 border-gray-200 rounded-2xl text-lg font-medium focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all duration-300 hover:border-gray-300 shadow-lg hover:shadow-xl"
                />

                <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="currentColor" viewBox="0 0 448 512">
                  <path d="M128 0C110.3 0 96 14.3 96 32l0 32-32 0C28.7 64 0 92.7 0 128l0 48 448 0 0-48c0-35.3-28.7-64-64-64l-32 0 0-32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 32-128 0 0-32c0-17.7-14.3-32-32-32zM0 224L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-192-448 0z" />
                </svg>
              </div>
              {
                errors.dateOfBirth && touchedFields.dateOfBirth && (<p className="text-red-500 text-xs mt-1">{errors.dateOfBirth.message}</p>
                )
              }
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-bold text-gray-700 mb-2">
                Gender
              </label>
              <div className="relative">
                <select
                  {...register('gender')}
                  name="gender"
                  className="w-full pl-12 pr-4 py-4 bg-white/50 backdrop-blur-sm border-2 border-gray-200 rounded-2xl text-lg font-medium focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all duration-300 hover:border-gray-300 shadow-lg hover:shadow-xl appearance-none"
                >
                  <option >Select your gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="currentColor" viewBox="0 0 640 512">
                  <path d="M480-64c-17.7 0-32 14.3-32 32S462.3 0 480 0L530.7 0 474 56.7c-26.3-15.7-57.1-24.7-90-24.7-35.4 0-68.4 10.5-96 28.5-27.6-18-60.6-28.5-96-28.5-97.2 0-176 78.8-176 176 0 86.3 62.1 158.1 144 173.1l0 34.9-32 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l32 0 0 32c0 17.7 14.3 32 32 32s32-14.3 32-32l0-32 32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-32 0 0-34.9c23.3-4.3 44.9-13.1 64-25.6 27.6 18 60.6 28.5 96 28.5 97.2 0 176-78.8 176-176 0-41.1-14.1-79-37.8-109L576 45.3 576 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-128c0-17.7-14.3-32-32-32L480-64zM336 309.2c20.2-28.6 32-63.5 32-101.2s-11.8-72.6-32-101.2c14.6-6.9 30.8-10.8 48-10.8 61.9 0 112 50.1 112 112S445.9 320 384 320c-17.2 0-33.5-3.9-48-10.8zM288 150.3c10.2 16.9 16 36.6 16 57.7s-5.8 40.9-16 57.7c-10.2-16.9-16-36.6-16-57.7s5.8-40.9 16-57.7zm-48-43.5c-20.2 28.6-32 63.5-32 101.2s11.8 72.6 32 101.2c-14.5 6.9-30.8 10.8-48 10.8-61.9 0-112-50.1-112-112S130.1 96 192 96c17.2 0 33.5 3.9 48 10.8z" />
                </svg>
              </div>
              {
                errors.gender && touchedFields.gender && (<p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>
                )
              }

            </div>
          </div>
        </div>
        <p className='text-1xl text-center text-red-600'>{errorMessage}</p>

        <button
          type="submit"
          className="w-full py-5 px-8 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-black text-xl rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-4 focus:ring-blue-500/50"

        >
          <span>Create Account</span>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 512 512">
            <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-105.4 105.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
          </svg>
        </button>
      </form>
    </div>
  );
};





