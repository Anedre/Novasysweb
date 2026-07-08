import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./context/ThemeContext";
import { router } from "./router.jsx";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.jsx";

// To activate a seasonal theme, import it and pass to ThemeProvider:
// import { cyberTheme } from './context/themes';
// Then: <ThemeProvider seasonalTheme={cyberTheme}>

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
