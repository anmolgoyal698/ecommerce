import HomeScreen from "./screens/HomeScreen";
import RootLayout from "./components/RootLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    children: [
      {
        index: true,
        element: <HomeScreen/>
      },
      {
        path: '/products/:id',
        element: <ProductDetailsScreen/>
      }
    ]
  }
]);


const App = () => (
  <RouterProvider router={router}/>
);

export default App;
