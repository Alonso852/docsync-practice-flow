
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface NavbarProps {
  transparent?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ transparent = false }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  
  // Track scroll position to change navbar style
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        transparent && !isScrolled
          ? "bg-transparent text-white"
          : "bg-white text-foreground shadow-sm",
        isScrolled && "shadow-md"
      )}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold flex items-center"
          >
            <svg 
              viewBox="0 0 24 24" 
              className="w-8 h-8 mr-2"
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
              <path d="M14.5 4H9.5a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1Z" />
              <path d="M12 11h4" />
              <path d="M12 16h4" />
              <path d="M8 11h.01" />
              <path d="M8 16h.01" />
            </svg>
            DocSync
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={cn(
                "font-medium hover:text-docsync-blue",
                transparent && !isScrolled ? "text-white" : ""
              )}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={cn(
                "font-medium hover:text-docsync-blue",
                transparent && !isScrolled ? "text-white" : ""
              )}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={cn(
                "font-medium hover:text-docsync-blue",
                transparent && !isScrolled ? "text-white" : ""
              )}
            >
              Contact
            </Link>
            <Link to="/login">
              <Button 
                className={cn(
                  transparent && !isScrolled 
                    ? "bg-white text-docsync-blue hover:bg-gray-100" 
                    : "bg-docsync-blue text-white hover:bg-blue-600"
                )}
              >
                Log In
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2 space-y-3">
            <Link 
              to="/" 
              className="block py-2 font-medium hover:text-docsync-blue"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="block py-2 font-medium hover:text-docsync-blue"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="block py-2 font-medium hover:text-docsync-blue"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link 
              to="/login" 
              className="block py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Button className="w-full bg-docsync-blue text-white hover:bg-blue-600">
                Log In
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
