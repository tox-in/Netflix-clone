import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className='max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20'>
      <div className="flex items-center gap-10 z-50">
        <Link to="/">
            <img src="/netflix-logo.png" alt="netflix logo" className="w-32 sm:w-40" />
        </Link>
      </div>
    </header>
  )
}

export default Navbar
