import React, { useState } from 'react';
import './Register.scss';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../utils/apiClient';
import { upload } from '../../utils/upload';

const Register = () => {
  const [file, setFile] = useState(null);
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: '',
    img: '',
    country: '',
    phone: '',
    isSeller: false,
    desc: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleSeller = (e) => {
    const { checked } = e.target;
    setCredentials((prev) => ({ ...prev, isSeller: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = await upload(file);
    try {
      await apiClient.post('/auth/register', {
        ...credentials,
        img: url,
      });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a new account</h1>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            placeholder="johndoe"
            onChange={handleChange}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="johndoe@gmail.com"
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="*********"
            onChange={handleChange}
          />
          <label htmlFor="profile_picture">Profile picture</label>
          <input
            type="file"
            name="profile_picture"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label htmlFor="country">Country</label>
          <input
            type="text"
            name="country"
            placeholder="Uganda"
            onChange={handleChange}
          />
          <button type="submit">Register</button>
        </div>
        <div className="right">
          <h1>I want to become a seller</h1>

          <div className="toggle">
            <label htmlFor="isSeller">Activate the seller account</label>
            <label htmlFor="isSeller" className="switch">
              <input type="checkbox" id="isSeller" onChange={handleSeller} />
              <span className="slider round"></span>
            </label>
          </div>

          <label htmlFor="phone">Phone number</label>
          <input
            type="text"
            name="phone"
            placeholder="+254712345678"
            onChange={handleChange}
          />
          <textarea
            name="desc"
            placeholder="Tell us about yourself"
            onChange={handleChange}
            id="desc"
            cols="30"
            rows="10"
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default Register;
