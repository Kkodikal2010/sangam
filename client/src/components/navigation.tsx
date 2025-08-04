import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";

interface NavigationProps {
  isAuthenticated?: boolean;
}

export default function Navigation({ isAuthenticated = false }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <Heart className="h-8 w-8 text-rose-600" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                Sangam
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/mission">
              <a className="text-gray-700 dark:text-gray-300 hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
                Our Mission
              </a>
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link href="/dashboard">
                  <a className="text-gray-700 dark:text-gray-300 hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
                    Dashboard
                  </a>
                </Link>
                <Link href="/matches">
                  <a className="text-gray-700 dark:text-gray-300 hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
                    Matches
                  </a>
                </Link>
                <Link href="/profile">
                  <a className="text-gray-700 dark:text-gray-300 hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
                    Profile
                  </a>
                </Link>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-rose-600 hover:bg-rose-700 text-white">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
              <Link href="/mission">
                <a className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
                  Our Mission
                </a>
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link href="/dashboard">
                    <a className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
                      Dashboard
                    </a>
                  </Link>
                  <Link href="/matches">
                    <a className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
                      Matches
                    </a>
                  </Link>
                  <Link href="/profile">
                    <a className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
                      Profile
                    </a>
                  </Link>
                </>
              ) : (
                <div className="flex flex-col space-y-2 px-3">
                  <Link href="/login">
                    <Button variant="ghost" className="w-full justify-start">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}