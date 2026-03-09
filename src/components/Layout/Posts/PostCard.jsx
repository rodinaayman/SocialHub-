import { useState, useContext, useRef } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Image, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Textarea } from "@heroui/react";
import { BsShare, BsThreeDots } from "react-icons/bs";
import { FaRegComment, FaChevronUp, FaTrash } from "react-icons/fa6";
import { FiEdit, FiThumbsUp } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";
import CommentCard from './../../Comments/CommentCard';
import TopCommentCard from '../../Comments/TopCommentCard';
import CommentForm from './../../Comments/CommentForm';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPostComments } from '../../../Service/Comment.service';
import { AuthContext } from '../../../context/AuthContext';
import { deletePost, updatePost } from '../../../Service/post.service';

export default function PostCard({ post }) {
    const [showAllComments, setShowAllComments] = useState(false);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editBody, setEditBody] = useState(post?.body || "");
    const [editImage, setEditImage] = useState(null);
    const fileInputRef = useRef(null);

    const { userId } = useContext(AuthContext);
    const queryClient = useQueryClient();

    const user = post?.user;
    const topComment = post?.topComment;

    const isMyPost = user?._id === userId;

    const {
        data: allComments = [],
        isLoading: loadingComments,
    } = useQuery({
        queryKey: ['comments', post._id],
        queryFn: getPostComments,
        enabled: showAllComments,
    });

    const { mutate: mutateDelete } = useMutation({
        mutationFn: deletePost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
    });

    const { mutate: mutateUpdate, isPending: isUpdating } = useMutation({
        mutationFn: updatePost,
        onSuccess: () => {
            setIsEditModalOpen(false);
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
    });

    const handleToggleComments = () => setShowAllComments(!showAllComments);
    const handleViewAllClick = () => setShowAllComments(true);
    const hideComments = () => setShowAllComments(false);

    const handleEditClick = () => {
        setEditBody(post.body);
        setEditImage(null);
        setIsEditModalOpen(true);
    };

    const handleUpdateSubmit = () => {
        if (!editBody.trim()) return;
        mutateUpdate({ postId: post._id, body: editBody, image: editImage });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) setEditImage(file);
    };

    const removeSelectedImage = () => {
        setEditImage(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <>
            <Card className="w-full mb-6 overflow-hidden">
                <CardHeader className="gap-3 pb-4 px-4 pt-4">
                    <Link to={`/profile/${user?._id}`} className="flex items-center gap-3 flex-1 hover:opacity-80 transition-opacity">

                        <div className="flex items-center gap-3 flex-1">
                            <Image
                                alt={user?.name || 'User'}
                                radius="full"
                                src={user?.photo}
                                className="h-11 w-11 object-cover"
                            />
                            <div className="flex flex-col">
                                <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                                <p className="text-xs text-gray-500">
                                    {post.createdAt ? new Date(post.createdAt).toLocaleDateString('ar-EG') : ""}
                                </p>
                            </div>
                        </div>
                    </Link>



                    {isMyPost && (
                        <Dropdown>
                            <DropdownTrigger>
                                <Button isIconOnly variant="light" className="text-gray-500">
                                    <BsThreeDots size={20} />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Post Actions">
                                <DropdownItem
                                    key="edit"
                                    startContent={<FiEdit />}
                                    onPress={handleEditClick}
                                >
                                    Edit Post
                                </DropdownItem>
                                <DropdownItem
                                    key="delete"
                                    className="text-danger"
                                    color="danger"
                                    startContent={<FaTrash />}
                                    onPress={() => mutateDelete(post._id)}
                                >
                                    Delete Post
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    )}
                </CardHeader>

                <Divider />

                <CardBody className="px-4 py-3">
                    <p className="text-lg leading-relaxed text-gray-800">{post.body}</p>
                </CardBody>

                {post?.image && (
                    <div className="w-full">
                        <Image
                            alt="Post image"
                            radius="none"
                            src={post.image}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                )}

                <div className="w-full text-right px-4 py-2">
                    <Link to={`/post-details/${post._id}`} className="text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium">
                        View details
                    </Link>
                </div>

                <Divider />

                <CardFooter className="pt-4 pb-2 px-4">
                    <div className="grid grid-cols-3 gap-2 w-full">
                        <button className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-600">
                            <FiThumbsUp className="text-lg" />
                            <span className="font-medium">Like</span>
                        </button>
                        <button onClick={handleToggleComments} className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-600">
                            <FaRegComment className="text-lg" />
                            <span className="font-medium">Comment</span>
                        </button>
                        <button className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-600">
                            <BsShare className="text-lg" />
                            <span className="font-medium">Share</span>
                        </button>
                    </div>
                </CardFooter>

                <div className="border-t border-gray-200 bg-gray-100">
                    {!showAllComments && topComment && (
                        <>
                            <TopCommentCard comment={topComment} />
                            <div className="px-4 py-3">
                                <button
                                    onClick={handleViewAllClick}
                                    className="w-full text-left text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 group transition-all py-2 px-3 rounded-lg hover:bg-blue-50"
                                >
                                    <FaRegComment className="w-4 h-4 group-hover:scale-110" />
                                    <span>View all comments</span>
                                </button>
                            </div>
                        </>
                    )}

                    {showAllComments && (
                        <>
                            <div className="mb-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 m-2">
                                <div className="flex items-center gap-2">
                                    <p className="text-sm font-extrabold tracking-wide text-slate-700">Comments</p>
                                    <span className="rounded-full bg-blue-200 px-2.5 py-1 text-sm font-bold text-blue-700">
                                        {allComments.length}
                                    </span>
                                </div>
                                <button
                                    onClick={hideComments}
                                    className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-all"
                                >
                                    <FaChevronUp className="w-4 h-4" />
                                    <span>Hide</span>
                                </button>
                            </div>

                            {loadingComments ? (
                                <div className="px-4 py-8 text-center bg-white mx-2 rounded-xl">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                                </div>
                            ) : (
                                <div className="bg-white mx-2 rounded-xl p-4">
                                    {allComments.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center py-12 text-center">
                                            <div className="bg-blue-50 p-4 rounded-full mb-4">
                                                <FaRegComment className="text-4xl text-blue-500" />
                                            </div>
                                            <p className="text-lg font-semibold text-gray-700 mb-1">No comments yet</p>
                                            <p className="text-sm text-gray-400">Be the first to comment.</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-3 max-h-96 overflow-y-auto">
                                            {allComments.map((comment) => (
                                                <CommentCard key={comment._id} comment={comment} />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="m-2 rounded-xl overflow-hidden bg-white shadow-sm">
                                <CommentForm postId={post._id} />
                            </div>
                        </>
                    )}
                </div>
            </Card>

            <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} size="xl">
                <ModalContent>
                    <ModalHeader>Edit Post</ModalHeader>
                    <ModalBody>
                        <Textarea
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                            placeholder="What's on your mind?"
                            className="mb-4"
                        />

                        {(editImage || post.image) && (
                            <div className="relative w-full mb-2 inline-block">
                                <img
                                    src={editImage ? URL.createObjectURL(editImage) : post.image}
                                    alt="Preview"
                                    className="max-h-60 w-full object-cover rounded-lg border"
                                />
                                <Button
                                    isIconOnly
                                    size="sm"
                                    color="danger"
                                    className="absolute top-2 right-2 rounded-full"
                                    onClick={removeSelectedImage}
                                >
                                    <FaTimes />
                                </Button>
                            </div>
                        )}

                        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
                        <Button variant="flat" onClick={() => fileInputRef.current.click()}>
                            {post.image || editImage ? "Change Photo" : "Add Photo"}
                        </Button>
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