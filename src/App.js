import './App.css';
import Rootlayout from './components/rootlayout/Rootlayout';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Home from './components/home/Home';
import Register from './components/register/Register';
import Login from './components/login/Login';
import Aboutus from './components/aboutus/Aboutus';
import UserProfile from './components/user-profile/UserProfile';
import Cart from './components/cart/Cart';
import Products from './components/products/Products';
function App() {
  const router=createBrowserRouter([
    {
      path:"/",
      element:<Rootlayout />,
      children:[
        {
          path:"/",
          element:<Home />
        },
        {
          path:"/register",
          element:<Register />
        },
        {
          path:"/login",
          element:<Login />
        },
        {
          path:"/aboutus",
          element:<Aboutus />
        },
        {
          path:"/user-profile",
          element:<UserProfile />,
          children:[
            {
              path:"products",
              element:<Products />
            },
            {
              path:"cart",
              element:<Cart />
            }
          ]
        }
      ]
    }
  ])
  return (
    <div className="App">
    <RouterProvider router={router} />
    </div>
  );
}

export default App;
