import { useNavigate } from "react-router-dom";
import Home from "./pages/homePage/Home";

// src/pages/NotFoundPage.jsx
export default function NotFoundPage() {
    const navigate = useNavigate();

  const goBack = () => {
    if (typeof window !== "undefined") window.history.back();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-b from-gray-100 to-white text-gray-800">
      <h1 className="text-7xl font-extrabold text-gray-900">404</h1>
      <h2 className="mt-4 text-2xl md:text-3xl font-semibold">
        Page Not Found
      </h2>
      <p className="mt-2 text-gray-600 text-center max-w-md">
        Sorry, the page you are looking for doesn’t exist or has been moved.
      </p>

      <div className="mt-6 flex flex-wrap gap-4">
        <button
          onClick={()=>navigate("/")}
          className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Go Home
        </button>
        <button
          onClick={goBack}
          className="px-5 py-2 rounded-lg border border-gray-400 text-gray-700 hover:bg-gray-200 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
