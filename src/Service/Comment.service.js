import axios from 'axios';
const API_URL = 'https://route-posts.routemisr.com';

export const getPostComments = async ({ queryKey }) => {
  const [_key, postId] = queryKey;
  const token = localStorage.getItem("user_token");
  const { data } = await axios.get(`${API_URL}/posts/${postId}/comments?page=1&limit=10`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data.data.comments; 
};

export const addComment = async ({ postId, content, image }) => {
  const token = localStorage.getItem("user_token");
  const formData = new FormData();
  formData.append("content", content); 
  if (image) {
    formData.append("image", image); 
      }
  const { data } = await axios.post(
    `${API_URL}/posts/${postId}/comments`,
    formData, 
       { 
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data' 
         } 
    }
  );
  return data.data.comment;
};



export const updateComment = async ({postId, commentId, content, image }) => {
  const token = localStorage.getItem("user_token");
  const formData = new FormData();
  formData.append("content", content);
  if (image) {
    formData.append("image", image);
  }

  const { data } = await axios.put(
    `${API_URL}/posts/${postId}/comments/${commentId}`, 
    formData, 
    {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    }
  );
  return data.data.comment;
};

export const deleteComment = async ({postId, commentId}) => {
  const token = localStorage.getItem("user_token");
  const { data } = await axios.delete(`${API_URL}/posts/${postId}/comments/${commentId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data;
};


