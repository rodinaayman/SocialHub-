import { useContext } from 'react';
import PostCard from './PostCard';
import { AuthContext } from '../../../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { getAllPosts } from '../../../Service/post.service';
import { getUserPosts } from '../../../Service/Proflie.service';



    export default function PostListing({ filter = 'all', targetUserId }) { 
    const { userId } = useContext(AuthContext);

    const { 
        data: posts, 
        isLoading 
    } = useQuery({
        queryKey: ['posts', filter, targetUserId],
        queryFn: async () => {
            if (filter === 'my' && userId) {
                return await getUserPosts(userId);
            }
            if (filter === 'user' && targetUserId) {
                return await getUserPosts(targetUserId);
            }
            return await getAllPosts();
        },
        enabled: filter === 'all' || !!userId || !!targetUserId, 
    });

    if (isLoading) {
        return (
            <div className='py-12 flex justify-center items-center'>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

 

    return (
        <div className='py-6'> 
            <div className='space-y-5'>
                {posts && posts.length > 0 ? (
                    posts.map((post) => (
                        <PostCard key={post._id} post={post} />
                    ))
                ) : (
                    <div className="text-center py-10">
                        <p className="text-gray-500">No posts found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}