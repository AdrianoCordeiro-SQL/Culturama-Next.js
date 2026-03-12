import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useState } from 'react';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/buscar?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery(''); // Limpa o campo após buscar
    }
  };

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-black text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img
                src={logo}
                alt="Culturama"
                className="h-14 sm:h-16 md:h-20 w-auto hover:opacity-80 transition-opacity"
              />
            </Link>
          </div>

          {/* Search Bar */}
          <div className="w-full sm:w-auto sm:flex-1 max-w-md mx-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="O que você procura?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pr-12 rounded-full bg-transparent border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors"
                style={{ fontFamily: "'Work Sans', sans-serif" }}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-800 rounded-full transition-colors"
                aria-label="Buscar"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </form>
          </div>

          {/* Navigation */}
          <nav className="flex gap-6">
            <Link
              to="/eventos"
              className={`font-medium transition-colors ${
                isActiveRoute('/eventos')
                  ? 'text-yellow-400'
                  : 'text-white hover:text-yellow-400'
              }`}
              style={{ fontFamily: "'Work Sans', sans-serif" }}
            >
              Programação
            </Link>
            <Link
              to="/categorias"
              className={`font-medium transition-colors ${
                isActiveRoute('/categorias') || location.pathname.startsWith('/categorias/')
                  ? 'text-yellow-400'
                  : 'text-white hover:text-yellow-400'
              }`}
              style={{ fontFamily: "'Work Sans', sans-serif" }}
            >
              Categorias
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;