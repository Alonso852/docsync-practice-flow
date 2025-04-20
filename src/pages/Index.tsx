
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Calendar, Users, ShieldCheck, Clock } from "lucide-react";

const Index = () => {
  return (
    <>
      <Navbar transparent={true} />
      
      {/* Hero Section */}
      <section className="hero-section pt-36 pb-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 fade-in">
            Streamline Your Practice with DocSync
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90 fade-in">
            The intelligent management system that simplifies appointments, 
            patient care, and practice operations.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 fade-in">
            <Link to="/login">
              <Button className="w-full sm:w-auto text-lg py-6 px-8 bg-white text-docsync-blue hover:bg-gray-100">
                Log In
              </Button>
            </Link>
            <Button
              variant="outline" 
              className="w-full sm:w-auto text-lg py-6 px-8 border-white text-white hover:bg-white/10"
            >
              Learn More
            </Button>
          </div>
        </div>
        
        {/* Hero image or illustration */}
        <div className="container mx-auto px-4 mt-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
              alt="Doctor using DocSync platform" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-white" id="features">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features for Medical Professionals</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Designed specifically for doctors and their assistants, DocSync provides
              the tools you need to run your practice efficiently.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border card-hover">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center text-docsync-blue mb-6">
                <Calendar size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Smart Scheduling</h3>
              <p className="text-gray-600">
                Intuitive calendar interface for managing appointments with real-time 
                updates and conflict detection.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border card-hover">
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center text-docsync-green mb-6">
                <Users size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Patient Management</h3>
              <p className="text-gray-600">
                Complete patient profiles with medical history, contact information, 
                and appointment records in one place.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border card-hover">
              <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-6">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Role-Based Access</h3>
              <p className="text-gray-600">
                Secure, role-specific interfaces for doctors and assistants with 
                appropriate permissions and data visibility.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border card-hover">
              <div className="w-14 h-14 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 mb-6">
                <Clock size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Time-Saving Tools</h3>
              <p className="text-gray-600">
                Reduce administrative workload with automated reminders, status updates, 
                and streamlined workflows.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonial/CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-docsync-blue to-blue-600 text-white rounded-2xl p-8 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Practice?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Join thousands of medical professionals who have streamlined their 
              practice operations with DocSync.
            </p>
            <Link to="/login">
              <Button className="text-lg py-6 px-10 bg-white text-docsync-blue hover:bg-gray-100">
                Get Started Today
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Doctor & Assistant Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
                alt="Doctor using tablet" 
                className="rounded-xl shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Designed for Doctors</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 mr-3 mt-1">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-docsync-blue">
                      ✓
                    </div>
                  </div>
                  <p className="text-lg text-gray-700">
                    <strong>Complete patient visibility</strong> with comprehensive history and notes
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mr-3 mt-1">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-docsync-blue">
                      ✓
                    </div>
                  </div>
                  <p className="text-lg text-gray-700">
                    <strong>Optimized scheduling</strong> to maximize patient care time
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mr-3 mt-1">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-docsync-blue">
                      ✓
                    </div>
                  </div>
                  <p className="text-lg text-gray-700">
                    <strong>Streamlined workflows</strong> reduce administrative burden
                  </p>
                </li>
              </ul>
              
              <div className="mt-8">
                <Link to="/about">
                  <Button variant="outline" className="text-docsync-blue border-docsync-blue hover:bg-blue-50">
                    Learn More About Doctor Features
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mt-20">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold mb-6">Empowering Assistants</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 mr-3 mt-1">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-docsync-green">
                      ✓
                    </div>
                  </div>
                  <p className="text-lg text-gray-700">
                    <strong>Efficient patient registration</strong> and data management
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mr-3 mt-1">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-docsync-green">
                      ✓
                    </div>
                  </div>
                  <p className="text-lg text-gray-700">
                    <strong>Intuitive appointment scheduling</strong> with doctor availability views
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mr-3 mt-1">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-docsync-green">
                      ✓
                    </div>
                  </div>
                  <p className="text-lg text-gray-700">
                    <strong>Role-appropriate access</strong> to practice information
                  </p>
                </li>
              </ul>
              
              <div className="mt-8">
                <Link to="/about">
                  <Button variant="outline" className="text-docsync-green border-docsync-green hover:bg-green-50">
                    Learn More About Assistant Features
                  </Button>
                </Link>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <img 
                src="https://images.unsplash.com/photo-1473091534298-04dcbce3278c"
                alt="Assistant at computer" 
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default Index;
