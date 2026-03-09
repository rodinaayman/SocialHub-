import React, { useContext, useState } from 'react';
import { Card, CardHeader, CardBody, Input, Button, Divider } from "@heroui/react";
import { FaKey } from "react-icons/fa"; 
import { useMutation } from '@tanstack/react-query';
import { changePassword } from '../../Service/Proflie.service';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
    const [password, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

  const { removeUserToken } = useContext(AuthContext);
    const navigate = useNavigate(); 

    const { mutate: updatePassword, isPending, isError, error } = useMutation({
        mutationFn: changePassword,
        onSuccess: () => {
            removeUserToken(); 
            navigate('/auth/login');
        },
        onError: (err) => {
            console.error(err);
        }
    });
    const handleSubmit = () => {
        updatePassword({ password, newPassword });
    };

    const isFormValid = 
        password.length > 0 && 
        newPassword.length >= 6 && 
        newPassword === confirmPassword;

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Card className="shadow-lg">
                
                <CardHeader className="flex gap-4 p-6 border-b bg-gray-50 rounded-t-xl">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                            <FaKey size={20} />
                        </div>
                        
                        <div className="flex flex-col">
                            <p className="text-xl font-bold text-gray-900">Change Password</p>
                            <p className="text-sm text-gray-500">
                                Keep your account secure by using a strong password.
                            </p>
                        </div>
                    </div>
                </CardHeader>

                <CardBody className="p-6 space-y-8 overflow-visible">
                    
                    {isError && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
                            {error?.response?.data?.message || "Failed to change password. Please check your current password."}
                        </div>
                    )}

            

                    <Input
                        type="password"
                        label="Current password"
                        labelPlacement="outside"
                        placeholder=" "
                        value={password}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        variant="bordered"
                        size="lg"
                        classNames={{
                            label: "font-bold text-gray-700 text-md pb-1",
                        }}
                    />

                    <Divider className="my-4" />

                    <Input
                        type="password"
                        label="New password"
                        labelPlacement="outside"
                        placeholder=" "
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        variant="bordered"
                        size="lg"
                        description="Must be at least 6 characters"
                        classNames={{
                            label: "font-bold text-gray-700 text-md pb-1",
                        }}
                    />

                    <Input
                        type="password"
                        label="Confirm new password"
                        labelPlacement="outside"
                        placeholder=" "
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        variant="bordered"
                        size="lg"
                        isInvalid={confirmPassword !== "" && newPassword !== confirmPassword}
                        errorMessage={confirmPassword !== "" && newPassword !== confirmPassword ? "Passwords do not match" : ""}
                        classNames={{
                            label: "font-bold text-gray-700 text-md pb-1",
                        }}
                    />

                    <div className="flex justify-end pt-6">
                        <Button 
                            color="primary" 
                            size="lg" 
                            onPress={handleSubmit}
                            isLoading={isPending}
                            isDisabled={!isFormValid} 
                        >
                            Update password
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}