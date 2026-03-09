import React from 'react'
import { Card, CardHeader, CardBody, Image } from "@heroui/react";

export default function TopCommentCard({ comment }) {
    const Comment = comment.commentCreator;

    return (
        <Card fullWidth className="w-full my-2 bg-gray-50 mx-auto px-3 py-3 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <p className="mb-2 font-bold uppercase tracking-wide text-xs text-slate-500 bg-slate-50 px-3 py-1 rounded-full inline-block w-fit">
                Top Comment
            </p>

            <CardHeader className="gap-3 pb-0 p-0">
                <div className="flex items-start gap-3 w-full">
                    <Image
                        alt={`${Comment.name}'s profile`}
                        radius="full"
                        src={Comment.photo}
                        className="h-10 w-10 flex-shrink-0 object-cover border-2 border-white shadow-md"
                    />

                    <div className="flex-1 min-w-0 bg-white p-4 rounded-2xl shadow-sm">
                        <p className="text-sm font-bold text-gray-900 truncate mb-1">
                            {Comment.name}
                        </p>

                        <p className="text-sm text-gray-800 leading-relaxed break-words mb-2">
                            {comment.content}
                        </p>
                        
                        {comment.image && (
                             <Image
                                alt="Comment attachment"
                                radius="lg"
                                src={comment.image}
                                className="w-full max-w-xs object-cover mt-1"
                            />
                        )}
                    </div>
                </div>
            </CardHeader>
        </Card>
    )
}