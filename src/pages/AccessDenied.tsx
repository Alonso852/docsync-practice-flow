
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ShieldAlert } from "lucide-react";

const AccessDenied = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="text-docsync-red mb-6">
            <ShieldAlert className="w-24 h-24 mx-auto text-red-500" />
          </div>
          
          <h1 className="text-4xl font-bold mb-4">403</h1>
          <h2 className="text-2xl font-semibold mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-8">
            Sorry, you don't have permission to access this page. Please contact your administrator if you believe this is an error.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              asChild
              className="bg-docsync-blue hover:bg-blue-600"
            >
              <Link to="/">
                Return Home
              </Link>
            </Button>
            
            <Button 
              asChild
              variant="outline"
            >
              <Link to="/contact">
                Contact Support
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AccessDenied;
