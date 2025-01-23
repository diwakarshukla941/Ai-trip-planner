import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTrip from "./create-trip/Index";
import Header from "./components/custom/Header";
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ViewTrip from "./view-trip/[tripId]/Index";
import MyTrips from "./my-trips";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header /> {/* Render Header inside the router context */}
        <App />
      </>
    ),
  },
  {
    path: "/create-trip",
    element: (
      <>
        <Header />
        <CreateTrip />
      </>
    ),
  },
  {
    path: "/view-trip/:tripId",
    element: (
      <>
        <Header />
        <ViewTrip />
      </>
    ),
  },
  {
    path: "/my-trips",
    element: (
      <>
        <Header />
        <MyTrips />
      </>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <RouterProvider router={router} />
      <Toaster />
    </GoogleOAuthProvider>
  </StrictMode>
);
