/** @format */

import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Bars3Icon,
  XMarkIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  HomeIcon,
  PencilSquareIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    {
      path: "/",
      label: "Home",
      icon: <HomeIcon className="h-5 w-5" />,
      description: "Upload and manage your videos",
    },
    {
      path: "/editor",
      label: "Editor",
      icon: <PencilSquareIcon className="h-5 w-5" />,
      description: "Edit captions and customize themes",
    },
    {
      path: "/blog",
      label: "Blog",
      icon: <BookOpenIcon className="h-5 w-5" />,
      description: "Latest updates and tutorials",
    },
    {
      path: "/settings",
      label: "Settings",
      icon: <Cog6ToothIcon className="h-5 w-5" />,
      description: "Configure application settings",
    },
    {
      path: "/help",
      label: "Help",
      icon: <QuestionMarkCircleIcon className="h-5 w-5" />,
      description: "Get help and support",
    },
  ];

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-dark/95 backdrop-blur-md shadow-lg"
          : "bg-dark/80 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div
            className="flex items-center space-x-3 group cursor-pointer"
            onClick={handleLogoClick}
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative text-2xl font-bold text-primary group-hover:text-primary/90 transition-colors">
                DelpCap©
              </span>
            </div>
            <span className="text-xs text-light/60 group-hover:text-light/80 transition-colors">
              v1.0
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`group relative flex flex-col items-center space-y-1 text-sm font-medium transition-all duration-300 ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-light/80 hover:text-primary"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="h-5 w-5 transition-transform group-hover:scale-110">
                    {link.icon}
                  </span>
                  <span>{link.label}</span>
                </div>
                <span className="text-xs text-light/40 group-hover:text-light/60 transition-colors">
                  {link.description}
                </span>
                {location.pathname === link.path && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-light/80 hover:text-primary transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isOpen
              ? "max-h-[500px] opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-start space-x-3 p-3 rounded-lg transition-all duration-300 ${
                  location.pathname === link.path
                    ? "bg-primary/10 text-primary"
                    : "text-light/80 hover:bg-dark/40 hover:text-primary"
                }`}
              >
                <span className="h-5 w-5 mt-0.5">{link.icon}</span>
                <div className="flex-1">
                  <div className="font-medium">{link.label}</div>
                  <div className="text-xs text-light/60 mt-0.5">
                    {link.description}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
