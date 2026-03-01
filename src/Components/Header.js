import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useOnlineOffline from "../utils/useOnlineOffline";
import Username from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  const status = useOnlineOffline();
  const [BtnName, setBtnName] = useState("Login");
  const { localUser } = useContext(Username);
  const cart = useSelector((store) => store.cart.items);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        isScrolled ? "shadow-header" : "shadow-none"
      }`}
    >
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-3 sm:px-5 py-2.5 sm:py-3">
        {/* Left: Logo + Location */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Link to="/" className="flex-shrink-0">
            <img
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
              src="https://img.freepik.com/premium-vector/modern-restaurant-logo-design-template_872774-98.jpg"
              alt="logo"
            />
          </Link>
          <div className="hidden sm:flex items-center gap-1 cursor-pointer group">
            <svg className="w-4 h-4 text-swiggy-orange" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span className="text-sm font-semibold text-slate-title border-b-2 border-slate-title group-hover:text-swiggy-orange group-hover:border-swiggy-orange transition-colors">
              Kolkata
            </span>
            <svg className="w-4 h-4 text-swiggy-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Right: Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          <Link
            to="/"
            className="flex items-center gap-2 text-slate-body hover:text-slate-title transition-colors text-sm font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search
          </Link>
          <Link
            to="/about"
            className="flex items-center gap-2 text-slate-body hover:text-slate-title transition-colors text-sm font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            About
          </Link>
          <Link
            to="/contactus"
            className="flex items-center gap-2 text-slate-body hover:text-slate-title transition-colors text-sm font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Help
          </Link>
          <button
            className="flex items-center gap-2 text-slate-body hover:text-slate-title transition-colors text-sm font-medium"
            onClick={() => {
              BtnName === "Login"
                ? setBtnName("Logout")
                : setBtnName("Login");
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {localUser || BtnName}
          </button>
          <Link
            to="/Cart"
            className="flex items-center gap-2 text-slate-body hover:text-slate-title transition-colors text-sm font-medium relative"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            Cart
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-swiggy-orange text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile: Cart + Hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <Link
            to="/Cart"
            className="flex items-center gap-1 text-slate-body text-sm font-medium relative p-1"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-swiggy-orange text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg hover:bg-slate-bg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5 text-slate-title" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-slate-title" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-border bg-white animate-slide-up">
          <nav className="max-w-[1200px] mx-auto px-3 py-3 flex flex-col gap-1">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 text-slate-body hover:text-slate-title hover:bg-slate-bg transition-colors text-sm font-medium px-3 py-2.5 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 text-slate-body hover:text-slate-title hover:bg-slate-bg transition-colors text-sm font-medium px-3 py-2.5 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              About
            </Link>
            <Link
              to="/contactus"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 text-slate-body hover:text-slate-title hover:bg-slate-bg transition-colors text-sm font-medium px-3 py-2.5 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Help
            </Link>
            <button
              className="flex items-center gap-3 text-slate-body hover:text-slate-title hover:bg-slate-bg transition-colors text-sm font-medium px-3 py-2.5 rounded-lg w-full text-left"
              onClick={() => {
                BtnName === "Login"
                  ? setBtnName("Logout")
                  : setBtnName("Login");
                setMobileMenuOpen(false);
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {localUser || BtnName}
            </button>
          </nav>
        </div>
      )}

      {/* Offline indicator */}
      {!status && (
        <div className="bg-red-500 text-white text-xs text-center py-1.5 font-medium">
          You are offline. Please check your connection.
        </div>
      )}
    </header>
  );
};
export default Header;
