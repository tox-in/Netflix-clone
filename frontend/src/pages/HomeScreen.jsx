import { useAuthStore } from "../store/authUser";
import Navbar from "../components/Navbar";

const HomeScreen = () => {
  const { logout } = useAuthStore();
  return (
    <>
    <div className="relative h-screen text-white">
      <Navbar />
    </div>
    </>
  )
}

export default HomeScreen
