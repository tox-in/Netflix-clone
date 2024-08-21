import { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, Search, Menu } from "lucide-react";
import { useAuthStore } from "../store/authUser";
import { useContentStore } from "../store/content";

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, logout } = useAuthStore();
    const { contentType, setContentType } = useContentStore();

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const handleSetContentType = (type) => {
        if (contentType !== type) {
            setContentType(type);
        }
    };

    return (
        <header className='max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20'>
            <div className="flex items-center gap-10 z-50">
                <Link to="/">
                    <img src="/netflix-logo.png" alt="netflix logo" className="w-32 sm:w-40" />
                </Link>

                {/* desktop navbar items */}
                <div className="hidden sm:flex gap-2 items-center">
                    <Link to="/" className="hover-underline" onClick={() => handleSetContentType("movie")}>
                        Movies
                    </Link>
                    <Link to="/" className="hover-underline" onClick={() => handleSetContentType("tv")}>
                        Tv Shows
                    </Link>
                    <Link to="/history" className="hover-underline">
                        Search History
                    </Link>
                </div>
            </div>

            <div className="flex gap-2 items-center z-20">
                <Link to={"/search"}>
                    <Search className="size-6 cursor-pointer" />
                </Link>
                {user && (
                    <>
                        <img src={user.image} alt="avatar" className="h-8 rounded cursor-pointer" />
                        <LogOut className="size-6 cursor-pointer" onClick={logout} />
                    </>
                )}
                <div className="sm:hidden">
                    <Menu className="size-6 cursor-pointer" onClick={toggleMobileMenu}></Menu> 
                </div>
            </div>

            {/* mobile navbar items */}
            {isMobileMenuOpen && (
                <div className="w-full flex sm:hidden mt-4 z-50 bg-black border rounded border-gray-800 flex-col">
                    <Link to={"/"} className="black hover-underline p-2" onClick={() => { toggleMobileMenu(); handleSetContentType("movie"); }}>
                        Movies 
                    </Link>
                    <Link to={"/"} className="black hover-underline p-2" onClick={() => { toggleMobileMenu(); handleSetContentType("tv"); }}>
                        Tv Shows 
                    </Link>
                    <Link to={"/history"} className="black hover-underline p-2" onClick={toggleMobileMenu}>
                        Search History
                    </Link>
                </div>
            )}
        </header>
    )
}

export default Navbar;
