
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Mail, Phone, MessageSquare } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSuccess(false);
    
    // Validate form
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("All fields are required.");
      return;
    }
    
    // Simulate form submission
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
    }, 1500);
  };

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about DocSync? We're here to help! Reach out to our team for support,
            information, or to schedule a demo.
          </p>
        </div>
      </section>
      
      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
              <p className="text-lg text-gray-700 mb-12">
                Whether you have a question about features, trials, pricing, or anything else, our team is ready to answer all your questions.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-docsync-blue">
                      <Mail size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Email Us</h3>
                    <p className="text-gray-700 mb-1">For general inquiries:</p>
                    <a href="mailto:info@docsync.com" className="text-docsync-blue hover:underline">
                      info@docsync.com
                    </a>
                    <p className="text-gray-700 mt-2 mb-1">For support:</p>
                    <a href="mailto:support@docsync.com" className="text-docsync-blue hover:underline">
                      support@docsync.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-docsync-blue">
                      <Phone size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Call Us</h3>
                    <p className="text-gray-700 mb-1">Monday to Friday, 9am to 5pm EST</p>
                    <a href="tel:+18001234567" className="text-xl font-medium text-docsync-blue hover:underline">
                      +1 (800) 123-4567
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-docsync-blue">
                      <MessageSquare size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Live Chat</h3>
                    <p className="text-gray-700 mb-1">Chat with our support team</p>
                    <Button variant="outline" className="mt-2">
                      Start Chat
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Send us a message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                
                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-4">
                    {isSuccess && (
                      <Alert className="bg-green-50 text-green-800 border-green-100">
                        <AlertDescription>
                          Thank you for your message! We'll get back to you soon.
                        </AlertDescription>
                      </Alert>
                    )}
                    
                    {error && (
                      <Alert className="bg-red-50 text-red-800 border-red-100">
                        <AlertDescription>
                          {error}
                        </AlertDescription>
                      </Alert>
                    )}
                    
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input 
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john.doe@example.com"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="How can we help you?"
                        rows={5}
                        required
                      />
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      type="submit" 
                      className="w-full bg-docsync-blue hover:bg-blue-600"
                      disabled={isLoading}
                    >
                      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {isLoading ? "Sending..." : "Send Message"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Is DocSync HIPAA compliant?</h3>
              <p className="text-gray-700">
                Yes, DocSync is fully HIPAA compliant. We implement all required security measures to protect patient data, including encryption, access controls, and audit trails.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Can I import existing patient data?</h3>
              <p className="text-gray-700">
                Yes, DocSync supports importing patient data from most common medical record systems. Our team will work with you to ensure a smooth transition.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">What kind of support do you offer?</h3>
              <p className="text-gray-700">
                We provide email, phone, and live chat support during business hours, plus extensive documentation and training resources.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Is there a mobile version of DocSync?</h3>
              <p className="text-gray-700">
                Yes, DocSync is fully responsive and works on all devices. We also offer dedicated mobile apps for iOS and Android.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default Contact;
