import React, { useState } from 'react'
import PostListing from '../../components/Layout/Posts/PostListing';
import CreatePost from '../../components/Layout/Posts/CreatePost';
import { Helmet } from 'react-helmet';

export default function Home() {
    const [activeTab, setActiveTab] = useState('all');





    return (<>
              <Helmet>
                <title>SocialHub</title>
            </Helmet>
        <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-12 gap-6">

                <div className="col-span-12 md:col-span-3">
                    <div className="bg-white rounded-xl shadow-sm p-4 sticky top-20 border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 px-2">Menu</h3>

                        <div className="flex flex-col gap-2">
                            <button
                                onClick={() => setActiveTab('all')}
                                className={`w-full text-left px-4 py-3 rounded-lg transition-all font-medium flex items-center gap-2 ${activeTab === 'all'
                                        ? 'bg-blue-50 text-blue-600 border border-blue-100'
                                        : 'hover:bg-gray-100 text-gray-600'
                                    }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                                </svg>
                                All Posts
                            </button>

                            <button
                                onClick={() => setActiveTab('my')}
                                className={`w-full text-left px-4 py-3 rounded-lg transition-all font-medium flex items-center gap-2 ${activeTab === 'my'
                                        ? 'bg-blue-50 text-blue-600 border border-blue-100'
                                        : 'hover:bg-gray-100 text-gray-600'
                                    }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
                                My Posts
                            </button>
                        </div>

                    </div>
                </div>

                <div className="col-span-12 md:col-span-9">
                    <CreatePost />
                    <PostListing filter={activeTab} />
                </div>

            </div>
        </div>
    </>

    )
}