import axios from 'axios';
const API_URL = 'https://route-posts.routemisr.com';

export const getUserPosts = async (userId) => {
  const token = localStorage.getItem("user_token");
  
  try {
    const { data } = await axios.get(`${API_URL}/users/${userId}/posts`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return data.data?.posts ;

  } catch (error) {
    console.error(error);
    return [];  
  }
};
export const getUserProfile = async (userId) => {
  const token = localStorage.getItem("user_token");
  
  try {
    const { data } = await axios.get(`${API_URL}/users/${userId}/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    return data.data.user || data.data; 

  } catch (error) {
    console.error("Failed to fetch profile", error);
    return null;
  }
};
export const getUserData = async () => {
  const token = localStorage.getItem("user_token");
  
  try {
    const { data } = await axios.get(`${API_URL}/users/profile-data`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    
    return data.data.user ; 
    
  } catch (error) {
    console.error("Failed to fetch user data", error);
    return null;
  }
};

export const changePassword = async ({ password, newPassword }) => {
  const token = localStorage.getItem("user_token");
  const { data } = await axios.patch(`${API_URL}/users/change-password`, {
    password,  
   newPassword, 
     }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data;
};