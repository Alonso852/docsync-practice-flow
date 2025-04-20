
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ShieldCheck, Clock, Users, Calendar } from "lucide-react";

const About = () => {
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About DocSync</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering healthcare professionals with intelligent tools to focus on what matters most — patient care.
          </p>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1469474968028-56623f02e42e"
                alt="Serene medical environment" 
                className="rounded-xl shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-6">
                At DocSync, we believe that healthcare providers should spend more time caring for patients and less time managing administrative tasks. Our mission is to create intuitive software that streamlines practice operations and enhances the patient experience.
              </p>
              <p className="text-lg text-gray-700">
                We've designed DocSync to be a comprehensive solution that adapts to the unique workflows of medical practices, ensuring doctors and their staff can work efficiently and effectively.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border card-hover text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-docsync-blue mx-auto mb-6">
                <Calendar size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Intelligent Scheduling</h3>
              <p className="text-gray-600">
                Optimize your calendar with our smart scheduling system that prevents conflicts and maximizes efficiency.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border card-hover text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-docsync-green mx-auto mb-6">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Complete Patient Profiles</h3>
              <p className="text-gray-600">
                Maintain comprehensive patient records with medical history, appointments, and contact information.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border card-hover text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mx-auto mb-6">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Secure Role-Based Access</h3>
              <p className="text-gray-600">
                Ensure data security with customized access levels for doctors and assistants.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border card-hover text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mx-auto mb-6">
                <Clock size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Automated Workflows</h3>
              <p className="text-gray-600">
                Reduce manual tasks with automated appointment reminders, follow-ups, and status updates.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Who It's For Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Who DocSync Is For</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Doctors */}
            <div className="bg-blue-50 p-8 rounded-xl border border-blue-100">
              <h3 className="text-2xl font-bold mb-4 text-docsync-blue">Doctors</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 mr-3 mt-1">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-docsync-blue">
                      ✓
                    </div>
                  </div>
                  <p className="text-gray-700">
                    <strong>Primary care physicians</strong> seeking to optimize patient scheduling and record management
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mr-3 mt-1">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-docsync-blue">
                      ✓
                    </div>
                  </div>
                  <p className="text-gray-700">
                    <strong>Specialists</strong> who need efficient patient flow and comprehensive records
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mr-3 mt-1">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-docsync-blue">
                      ✓
                    </div>
                  </div>
                  <p className="text-gray-700">
                    <strong>Practice owners</strong> looking to improve operational efficiency
                  </p>
                </li>
              </ul>
            </div>
            
            {/* Assistants */}
            <div className="bg-green-50 p-8 rounded-xl border border-green-100">
              <h3 className="text-2xl font-bold mb-4 text-docsync-green">Medical Assistants</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 mr-3 mt-1">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-docsync-green">
                      ✓
                    </div>
                  </div>
                  <p className="text-gray-700">
                    <strong>Front desk staff</strong> responsible for patient scheduling and intake
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mr-3 mt-1">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-docsync-green">
                      ✓
                    </div>
                  </div>
                  <p className="text-gray-700">
                    <strong>Medical assistants</strong> who help manage patient flow and records
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mr-3 mt-1">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-docsync-green">
                      ✓
                    </div>
                  </div>
                  <p className="text-gray-700">
                    <strong>Practice administrators</strong> overseeing day-to-day operations
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Practice?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Join the thousands of healthcare professionals who have streamlined their practice with DocSync.
          </p>
          <Link to="/login">
            <Button className="text-lg py-6 px-10 bg-docsync-blue text-white hover:bg-blue-600">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default About;
