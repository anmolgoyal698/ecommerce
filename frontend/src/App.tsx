import HomeScreen from "./screens/HomeScreen";
import RootLayout from "./components/RootLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import store from "./store";
import { Provider } from "react-redux";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PrivateRoute from "./components/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomeScreen />,
      },
          {
        path: "/login",
        element: <LoginScreen/>
      },
      {
        path: "/register",
        element: <RegisterScreen/>
      },
 
      {
        path: "/products/:id",
        element: <ProductDetailsScreen />,
      },
      {
        path: "/cart",
        element: <CartScreen/>
      },
      {
        element: <PrivateRoute />,
        children: [
          //protected routes
          {
            path: "/shipping",
            element: <ShippingScreen/>
          }
        ]
      }
  
    ],
  },
]);

const App = () => (
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

export default App;
