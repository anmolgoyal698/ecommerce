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
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

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
          },
          {
            path: "/payment",
            element: <PaymentScreen/>
          },
          {
            path: "/placeorder",
            element: <PlaceOrderScreen/>
          },
          {
            path: "/order/:id",
            element: <OrderScreen/>
          }
        ]
      }
  
    ],
  },
]);

const App = () => (
  <Provider store={store}>
    <PayPalScriptProvider deferLoading={true}>
      <RouterProvider router={router} />
    </PayPalScriptProvider>
  </Provider>
);

export default App;
