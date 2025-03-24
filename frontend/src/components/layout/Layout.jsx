import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserService } from '../../services';

/**
 * Компонент шапки приложения
 */
const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const isAuthenticated = UserService.isAuthenticated();
  const userData = UserService.getUserData();
  
  const handleLogout = () => {
    UserService.logout();
    navigate('/login');
  };
  
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-blue-600">ЕвентОрг</span>
            </Link>
            
            {isAuthenticated && (
              <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link to="/events" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Мои мероприятия
                </Link>
                <Link to="/profile" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Профиль
                </Link>
              </nav>
            )}
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isAuthenticated ? (
              <div className="ml-3 relative">
                <div>
                  <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition"
                  >
                    <span className="sr-only">Открыть меню пользователя</span>
                    {userData?.avatar ? (
                      <img className="h-8 w-8 rounded-full" src={userData.avatar} alt="" />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-medium">
                        {userData?.name?.charAt(0) || 'U'}
                      </div>
                    )}
                  </button>
                </div>
                
                {isMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>
                      Профиль
                    </Link>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Выйти
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link to="/login" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  Войти
                </Link>
                <Link to="/register" className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                  Регистрация
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

/**
 * Компонент подвала приложения
 */
const Footer = () => {
  return (
    <footer className="bg-white mt-12 py-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-sm text-gray-500">
              &copy; 2024 ЕвентОрг. Все права защищены.
            </p>
          </div>
          <div className="mt-8 md:mt-0 md:order-2">
            <p className="text-center text-sm text-gray-500">
              Создано с ❤️ для организации мероприятий
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

/**
 * Компонент общей разметки приложения
 */
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout; 