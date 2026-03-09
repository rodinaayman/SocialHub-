import React, { useContext } from 'react';
import { useParams } from 'react-router-dom'; 
import { Card, Avatar, Divider, Button, Chip } from "@heroui/react";
import { Link } from 'react-router-dom';
import { FaRegEdit } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../context/AuthContext';
import { getUserProfile } from '../../Service/Proflie.service';
import PostListing from '../../components/Layout/Posts/PostListing';
import { Link as RouterLink } from "react-router-dom";
export default function Profile() {
    const { id } = useParams();
    const { userData: myData, userId } = useContext(AuthContext);

   const profileId = id || userId;
    const isMyProfile = profileId === userId;
    

    const { data: profileData } = useQuery({
        queryKey: ['profileData', profileId],
        queryFn: () => getUserProfile(profileId),
        enabled: !!profileId, 
    });


    const displayedUser = isMyProfile ? (myData || profileData) : profileData;

    const stats = [
        { label: 'Posts', value: displayedUser?.postsCount || 0 },
        { label: 'Followers', value: displayedUser?.followersCount || 0 },
        { label: 'Following', value: displayedUser?.followingCount || 0 },
    ];


    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            
            <Card className="shadow-lg mb-8 pt-10 pb-6 px-6">
                <div className="flex justify-center mb-6">
                    <Avatar
                        isBordered
                        color="primary"
                        src={displayedUser?.photo || "https://via.placeholder.com/150"}
                        className="w-32 h-32 md:w-40 md:h-40 text-large shadow-xl"
                    />
                </div>

                <div className="text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                        {displayedUser?.name || 'Loading...'}
                    </h2>
                    <p className="text-sm text-gray-500 mb-2">
                        @{displayedUser?.username || 'username'}
                    </p>
                    
            

                    {isMyProfile && (
                        <div className="flex justify-center mb-4">
                            <Button as={RouterLink} 
                                variant="bordered" 
                                className="rounded-full border-gray-300"
                                startContent={<FaRegEdit />}
                            >
                                Edit Profile
                            </Button>
                        </div>
                    )}

                    <Divider className="my-4" />

                    <div className="flex justify-center gap-8 md:gap-16">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <h3 className="text-xl font-bold text-gray-800">{stat.value}</h3>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    <Divider className="my-4" />

                    <div className="text-left bg-gray-50 p-4 rounded-xl">
                        <h4 className="font-bold text-gray-700 mb-2">About</h4>
                        <div className="space-y-2 text-sm text-gray-600">
                            <p>
                                <span className="font-semibold text-gray-800">Email: </span> 
                                {displayedUser?.email || 'Not Provided'}
                            </p>
                      
                        </div>
                    </div>
                </div>
            </Card>

            <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4 px-2">
                    {isMyProfile ? 'My Posts' : `${displayedUser?.name}'s Posts`}
                </h3>
                <PostListing filter="user" targetUserId={profileId} />
            </div>

        </div>
    );
}