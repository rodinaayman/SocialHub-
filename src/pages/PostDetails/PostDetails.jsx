import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import PostCard from '../../components/Layout/Posts/PostCard';
import { Button } from "@heroui/react";
import { FaArrowLeft } from "react-icons/fa";
import { getSinglePost } from '../../Service/post.service';

export default function PostDetails() {
    const { postId } = useParams();
    const navigate = useNavigate();

       const { data: post, isLoading, isError } = useQuery({
        queryKey: ['post', postId], 
        queryFn: () => getSinglePost(postId),
        enabled: !!postId, 
    });

    if (isLoading) {
        return (
            <div className='py-12 flex justify-center items-center min-h-screen'>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (isError) {
        return <p className="text-center text-red-500 mt-10">Error loading post</p>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <Button 
                    variant="light" 
                    startContent={<FaArrowLeft />}
                    onClick={() => navigate('/')}
                    className="text-gray-600 hover:text-blue-600"
                >
                    Back to Home
                </Button>
            </div>

            <div className="flex justify-center">
                {post ? <PostCard post={post} /> : <p>Post not found</p>}
            </div>
        </div>
    );
}