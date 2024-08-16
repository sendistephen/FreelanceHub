import axios from 'axios';

export const upload = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'freelancehub');

  try {
    const response = await axios.post(
      'https://api.cloudinary.com/v1_1/sendisteve/image/upload',
      formData
    );
    const { url } = response.data;
    return url;
  } catch (error) {
    console.error(
      'Error uploading to Cloudinary:',
      error.response ? error.response.data : error.message
    );
  }
};
