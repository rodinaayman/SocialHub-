import React, { useState, useContext, useRef } from 'react'; 
import { Card, Avatar, Button, Textarea } from "@heroui/react";
import { FaImage, FaTimes } from "react-icons/fa";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '../../../Service/post.service';
import { AuthContext } from '../../../context/AuthContext';

export default function CreatePost() {
    const [body, setBody] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const imageInputRef = useRef(null);

    const queryClient = useQueryClient();
    const { userData } = useContext(AuthContext);

    const { mutate: submitPost, isPending } = useMutation({
        mutationFn: (newPost) => createPost(newPost),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            setBody("");
            setImage(null);
            setImagePreview(null);
            
            if (imageInputRef.current) {
                imageInputRef.current.value = "";
            }
        },
        onError: (err) => {
            console.error("Error creating post:", err);
        }
    });

    const handleImageClick = () => {
        imageInputRef.current.click();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        setImage(null);
        setImagePreview(null);
        if (imageInputRef.current) {
            imageInputRef.current.value = "";
        }
    };

    const handlePost = () => {
        if (!body.trim() && !image) return;
        submitPost({ body, image });
    };

    return (
        <Card className="w-full mb-6 shadow-sm rounded-xl bg-white p-4">
            <div className="flex gap-3">
                <Avatar 
                    src={userData?.photo || "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png"} 
                    className="h-10 w-10 " 
                />
                
                <div className="flex-1">
                    <Textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder={`What's on your mind, ${userData?.name?.split(' ')[0] || 'User'}?`}
                        className="mb-2"
                        minRows={2}
                        variant="flat"
                    />

                    {imagePreview && (
                        <div className="relative inline-block mb-3">
                            <img 
                                src={imagePreview} 
                                alt="Preview" 
                                className="max-h-60 rounded-lg border object-cover" 
                            />
                            <Button 
                                isIconOnly 
                                size="sm" 
                                color="danger" 
                                className="absolute top-2 right-2 rounded-full"
                                onClick={removeImage}
                            >
                                <FaTimes />
                            </Button>
                        </div>
                    )}

                    <div className="flex items-center justify-between border-t pt-3 mt-2">
                        <div className="flex gap-1">
                            <input 
                                type="file" 
                                ref={imageInputRef} 
                                className="hidden" 
                                accept="image/*"
                                onChange={handleImageChange} 
                            />
                            
                            <Button 
                                variant="light" 
                                size="sm"
                                startContent={<FaImage className="text-green-500" />} 
                                className="text-gray-600"
                                onClick={handleImageClick} 
                            >
                                Photo
                            </Button>
                        </div>

                        <Button 
                            color="primary" 
                            size="sm"
                            onClick={handlePost}
                            isLoading={isPending}
                            isDisabled={!body.trim() && !image}
                        >
                            Post
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
}