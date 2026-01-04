import React from 'react';
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { router } from "./router.jsx";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.jsx";

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
