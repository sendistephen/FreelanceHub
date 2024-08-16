import React, { useEffect, useState } from 'react';
import './Navbar.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { userStore } from '../../store/userStore';
import apiClient from '../../utils/apiClient';

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const currentUser = userStore((state) => state.user);
  const clearUser = userStore((state) => state.clearUser);

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', isActive);

    return () => window.removeEventListener('scroll', isActive);
  }, []);

  const handleLogout = async () => {
    try {
      // delete user cookie
      await apiClient.post('/auth/logout');
      clearUser();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={active || pathname !== '/' ? 'navbar active' : 'navbar'}>
      <div className="container">
        <div className="logo">
          <Link to="/" className="link">
            <span className="text">freelancehub</span>
            <span className="dot">.</span>
          </Link>
        </div>

        <div className="links">
          <span>Business</span>
          <span>Explore</span>
          <span>English</span>
          <Link to="/login" className="link">
            Signin
          </Link>
          {!currentUser?.isSeller && <span>Become a seller</span>}
          {!currentUser?.isSeller && <button>Join</button>}
          {currentUser && (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={currentUser.img ?? './noAvatar.jpeg'} alt="user" />
              <span>{currentUser.username}</span>
              {open && (
                <div className="options">
                  {currentUser.isSeller && (
                    <>
                      <Link to="/gigs" className="link">
                        Gigs
                      </Link>
                      <Link to="/add" className="link">
                        Add new gig
                      </Link>
                    </>
                  )}
                  <Link to="/messages" className="link">
                    Messages
                  </Link>
                  <Link to="/orders" className="link">
                    Orders
                  </Link>
                  <Link className="link" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {active ||
        (pathname !== '/' && (
          <>
            <hr />
            <div className="menu">
              <Link className="link menuLink" to="/">
                Graphics & Design
              </Link>
              <Link className="link menuLink" to="/">
                Video & Animation
              </Link>
              <Link className="link menuLink" to="/">
                Writing & Translation
              </Link>
              <Link className="link menuLink" to="/">
                AI Services
              </Link>
              <Link className="link menuLink" to="/">
                Digital Marketing
              </Link>
              <Link className="link menuLink" to="/">
                Music & Audio
              </Link>
              <Link className="link menuLink" to="/">
                Programming & Tech
              </Link>
              <Link className="link menuLink" to="/">
                Business
              </Link>
              <Link className="link menuLink" to="/">
                Lifestyle
              </Link>
            </div>
            <hr />
          </>
        ))}
    </div>
  );
};

export default Navbar;
