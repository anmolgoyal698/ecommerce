import HomeScreen from "./screens/HomeScreen";
import RootLayout from "./components/RootLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    children: [
      {
        index: true,
        element: <HomeScreen/>
      }
    ]
  }
]);


const App = () => (
  <RouterProvider router={router}/>
);

export default App;
