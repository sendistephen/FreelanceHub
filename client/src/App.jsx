import React from 'react';
import Navbar from './components/navbar/Navbar';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import Gigs from './pages/gigs/Gigs';
import Gig from './pages/gig/Gig';
import Orders from './pages/orders/Orders';
import MyGigs from './pages/myGigs/MyGigs';
import Add from './pages/add/Add';
import Messages from './pages/messages/Messages';
import Message from './pages/message/Message';
import './App.scss';

const Layout = () => {
  return (
    <div className="App">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/gigs',
        element: <Gigs />,
      },
      {
        path: '/gig/:id',
        element: <Gig />,
      },
      {
        path: '/orders',
        element: <Orders />,
      },
      {
        path: '/mygigs',
        element: <MyGigs />,
      },
      {
        path: '/add',
        element: <Add />,
      },
      {
        path: '/messages',
        element: <Messages />,
      },
      {
        path: '/messages/:id',
        element: <Message />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
