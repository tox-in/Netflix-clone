import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Footer from "./components/Footer";
import { useAuthStore } from "./store/authUser";
import { useEffect } from "react";
import { Loader } from "lucide-react";

function App() {
  const { user, isCheckingAuth, authCheck } = useAuthStore();
  console.log("isCheckingAuth: ", isCheckingAuth);

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  return (
    <>
      {isCheckingAuth ? (
        <div className="h-screen">
          <div className="flex justify-center items-center bg-black h-full">
            <Loader className="animate-spin text-red-600 size-10" />
          </div>
        </div>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
            <Route path="/signup" element={!user ? <SignUpPage /> : <Navigate to="/" />} />
          </Routes>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
