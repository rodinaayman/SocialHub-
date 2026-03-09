import axios from 'axios';
const API_URL = 'https://route-posts.routemisr.com';

export const getSinglePost = async (postId) => {
  const token = localStorage.getItem("user_token");
  const { data } = await axios.get(`${API_URL}/posts/${postId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data.data.post ; 
};

export const getAllPosts = async () => {
  const token = localStorage.getItem("user_token");
  const { data } = await axios.get(`${API_URL}/posts`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { sort: "-createdAt" } 
  });
  return data.data.posts; 
};



export const createPost = async (postData) => {
  const token = localStorage.getItem("user_token");
  
  const formData = new FormData();
  if (postData.body) formData.append("body", postData.body);
  if (postData.image) formData.append("image", postData.image);

  const { data } = await axios.post(`${API_URL}/posts`, formData, {
    headers: { 
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
  return data;
};


export const updatePost = async ({ postId, body, image }) => {
  const token = localStorage.getItem("user_token");
  const formData = new FormData();
  formData.append("body", body);
  if (image) {
    formData.append("image", image);
  }

  const { data } = await axios.put(`${API_URL}/posts/${postId}`, formData, {
    headers: { 
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
  return data;
};

export const deletePost = async (postId) => {
  const token = localStorage.getItem("user_token");
  const { data } = await axios.delete(`${API_URL}/posts/${postId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data;
};
