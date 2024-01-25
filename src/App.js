import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header';
import Body from './components/Body';
import Cart from './components/Cart'
import { createBrowserRouter, RouterProvider, Route, Outlet } from 'react-router-dom';
import About from './components/About-us';
import Contact from './components/Contact';
import Error from './components/Error';
import ResMenu from './components/Res-Menu';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
const AppLayout = () => {

  return (
    <Provider store={appStore}>
    <div className="app">
      {/* header */}
      <Header />
      <Outlet />
    </div>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true, // This route will be active on "/". You can also use "path: ''".
        element: <Body />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path:"/restaurants/:resId",
        element: <ResMenu/>,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter} />);
