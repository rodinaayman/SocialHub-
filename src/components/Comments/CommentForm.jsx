import { useState, useContext, useRef } from 'react'; // 1. استيراد useRef
import { Button, Image, Input } from "@heroui/react";
import { FiSend, FiImage } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addComment } from '../../Service/Comment.service';
import { AuthContext } from '../../context/AuthContext';


export default function CommentForm({ postId }) {
    const [commentBody, setCommentBody] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");

    const imageInputRef = useRef(null);

    const queryClient = useQueryClient();
    const { userData } = useContext(AuthContext);

    const { mutate: submitComment, isPending } = useMutation({
        mutationFn: () => addComment({ postId, content: commentBody, image }),
        onSuccess: () => {
            setCommentBody("");
            setImage(null);
            setPreview(null);
            setErrorMsg("");

            if (imageInputRef.current) {
                imageInputRef.current.value = "";
            }

            queryClient.invalidateQueries({ queryKey: ['comments', postId] });
        },
        onError: (err) => {
            console.error("Error posting comment:", err);
            setErrorMsg("Failed to post comment. Try again.");
        }
    });

    const handleAddComment = () => {
        if (commentBody.trim().length < 2) {
            setErrorMsg("Comment must be at least 2 characters.");
            return;
        }
        submitComment();
    };

    const handleImageClick = () => {
        imageInputRef.current.click();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        setImage(null);
        setPreview(null);
        if (imageInputRef.current) {
            imageInputRef.current.value = "";
        }
    };

    const isInvalid = commentBody.trim().length > 0 && commentBody.trim().length < 2;

    return (
        <div className="p-3 bg-white flex items-start gap-2">
            <Image
                alt="User"
                radius="full"
                src={userData?.photo || "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png"}
                className="h-8 w-8 flex-shrink-0 object-cover mt-1"
            />

            <div className="flex-1 flex flex-col gap-2">
                <Input
                    value={commentBody}
                    onChange={(e) => {
                        setCommentBody(e.target.value);
                        if (e.target.value.trim().length >= 2 || e.target.value.trim().length === 0) {
                            setErrorMsg("");
                        }
                    }}
                    className="flex-1"
                    placeholder="Write a comment..."
                    size="sm"
                    variant="flat"
                    isInvalid={!!errorMsg}
                    errorMessage={errorMsg}
                />

                {preview && (
                    <div className="relative w-24 h-24 inline-block">
                        <img
                            src={preview}
                            className="w-full h-full object-cover rounded-lg border"
                            alt="Preview"
                        />
                        <Button
                            isIconOnly
                            size="sm"
                            color="danger"
                            className="absolute -top-2 -right-2 h-5 w-5 min-w-5 rounded-full"
                            onClick={removeImage}
                        >
                            <FaTimes className="text-xs" />
                        </Button>
                    </div>
                )}

                <div className="flex items-center justify-end gap-2">
                    <input
                        type="file"
                        ref={imageInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    
                    <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        className="text-gray-500"
                        onClick={handleImageClick} 
                    >
                        <FiImage className="text-lg" />
                    </Button>

                    <Button
                        isIconOnly
                        size="sm"
                        color="primary"
                        onClick={handleAddComment}
                        isLoading={isPending}
                        disabled={isInvalid || (!commentBody.trim() && !image) || isPending}
                    >
                        <FiSend />
                    </Button>
                </div>
            </div>
        </div>
    );
}