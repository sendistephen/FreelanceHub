import React, { useEffect, useState } from 'react';
import './Navbar.scss';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', isActive);

    return () => window.removeEventListener('scroll', isActive);
  }, []);

  const currentUser = {
    id: 1,
    username: 'Stephen',
    img: 'https://avatars.githubusercontent.com/u/100200821?s=400&u=c3e9d3f0e0c6b4b2b1e6d9c1c2f3a4b5&v=4',
    isSeller: true,
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
          <span>Signin</span>
          {!currentUser?.isSeller && <span>Become a seller</span>}
          {!currentUser?.isSeller && <button>Join</button>}
          {currentUser && (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={currentUser.img} alt="user" />
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
                  <span>Logout</span>
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
