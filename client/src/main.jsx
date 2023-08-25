import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Place from "./pages/Place.jsx";
import About from "./About.jsx";
import Login from "./pages/Login.jsx";
import Registration from "./pages/Registration.jsx";
import EditAccount from "./pages/EditAccount.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Registration />,
      },
      {
        path: "/auth/edit/:id",
        element: <EditAccount />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/places/:id",
        element: <Place />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);
