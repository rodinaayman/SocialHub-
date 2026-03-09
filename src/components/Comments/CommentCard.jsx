import React, { useState, useContext, useRef } from 'react';
import { Image, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Textarea } from "@heroui/react";
import { BsThreeDots } from "react-icons/bs";
import { FaTrash } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../../context/AuthContext';
import { deleteComment, updateComment } from '../../Service/Comment.service';

export default function CommentCard({ comment }) {
    const Comment = comment.commentCreator;
    
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editContent, setEditContent] = useState(comment.content);
    const [editImage, setEditImage] = useState(null);
    const fileInputRef = useRef(null);

    const { userId } = useContext(AuthContext);
     const queryClient = useQueryClient();

    const isMyComment = Comment?._id === userId;

   

     const { mutate: mutateDelete } = useMutation({
        mutationFn: () => deleteComment({ 
            postId: comment.post,  
            commentId: comment._id 
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments', comment.post] });
        },
    });


        const { mutate: mutateUpdate, isPending: isUpdating } = useMutation({
        mutationFn: () => updateComment({ 
            postId: comment.post,   
            commentId: comment._id, 
            content: editContent, 
            image: editImage 
        }),
        onSuccess: () => {
            setIsEditModalOpen(false);
            queryClient.invalidateQueries({ queryKey: ['comments', comment.post] });
        },
    });

    const handleEditClick = () => {
        setEditContent(comment.content);
        setEditImage(null);
        setIsEditModalOpen(true);
    };

    const handleUpdateSubmit = () => {
        if (!editContent.trim()) return;
        mutateUpdate();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) setEditImage(file);
    };

    return (
        <>
            <div className="gap-3 mx-auto px-1 py-2">
                <div className="flex items-start gap-3">
                    <Image
                        alt={`${Comment?.name}'s profile`}
                        radius="full"
                        src={Comment?.photo}
                        className="h-10 w-10  object-cover border-2 border-white shadow-md"
                    />

                    <div className="flex-1 min-w-0 bg-gray-100 p-4 rounded-2xl relative">
                        {isMyComment && (
                            <div className="absolute top-2 right-2 z-10">
                                <Dropdown>
                                    <DropdownTrigger>
                                        <Button isIconOnly variant="light" size="sm" className="text-gray-400 hover:text-gray-600 h-6 w-6 min-w-6">
                                            <BsThreeDots />
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu aria-label="Comment Actions">
                                        <DropdownItem 
                                            key="edit" 
                                            startContent={<FiEdit />}
                                            onPress={handleEditClick}
                                        >
                                            Edit
                                        </DropdownItem>
                                        <DropdownItem 
                                            key="delete" 
                                            className="text-danger" 
                                            color="danger"
                                            startContent={<FaTrash />}
                                            onPress={() => mutateDelete(comment._id)}
                                        >
                                            Delete
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        )}

                        <div className="mb-1 pe-6"> {/* pe-6 عشان النص مياكشش على الزرار */}
                            <span className="text-sm font-bold text-gray-900">
                                {Comment?.name}
                            </span>
                            <span className='text-xs font-bold text-gray-400 ms-2'>
                                @{Comment?.username}
                            </span>
                        </div>

                        <p className="text-sm text-gray-800 leading-relaxed break-words mb-2 pe-2">
                            {comment.content}
                        </p>

                        {comment.image && (
                            <Image
                                alt="Comment attachment"
                                radius="lg"
                                src={comment.image}
                                className="w-full max-w-xs object-cover mt-2"
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Modal التعديل */}
            <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
                <ModalContent>
                    <ModalHeader>Edit Comment</ModalHeader>
                    <ModalBody>
                        <Textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            placeholder="Edit your comment..."
                        />
                        
                        <div className="flex flex-col gap-2">
                            {(editImage || comment.image) && (
                                <div className="relative w-32 h-32 inline-block">
                                    <img 
                                        src={editImage ? URL.createObjectURL(editImage) : comment.image} 
                                        alt="Preview" 
                                        className="w-full h-full object-cover rounded-lg border" 
                                    />
                                    <Button 
                                        isIconOnly 
                                        size="sm" 
                                        color="danger" 
                                        className="absolute -top-2 -right-2 rounded-full"
                                        onClick={() => setEditImage(null)}
                                    >
                                        X
                                    </Button>
                                </div>
                            )}
                            
                            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
                            <Button variant="flat" size="sm" onClick={() => fileInputRef.current.click()}>
                                Change Photo
                            </Button>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="light" onPress={() => setIsEditModalOpen(false)}>Cancel</Button>
                        <Button color="primary" onPress={handleUpdateSubmit} isLoading={isUpdating}>
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}