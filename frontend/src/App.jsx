import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Footer from "./components/Footer";
import { useAuthStore } from "./store/authUser";
import { useEffect } from "react";

function App() {
  const { user, isCheckingAuth, authCheck } = useAuthStore();
  console.log("auth user is here: ", user);

  useEffect(() => {
    authCheck();
  }, []);
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/signup" element={<SignUpPage/>} />
    </Routes>
    <Footer />
    </>
  )
}

export default App
