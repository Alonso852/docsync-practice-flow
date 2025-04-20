
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Alert,
  AlertDescription
} from "@/components/ui/alert";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { User, Mail, Phone, Key, Activity, ShieldCheck, Eye, EyeOff, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock user data
const mockUserData = {
  user_id: 201,
  role_id: 1, // 1 = Doctor
  role_name: "Doctor",
  first_name: "Elizabeth",
  last_name: "Smith",
  email: "dr.elizabeth.smith@example.com",
  phone: "555-987-6543",
  created_at: "2023-12-01T09:00:00",
  recent_activity: [
    {
      type: "login",
      date: "2025-04-20T08:45:00",
      details: "Logged in from Chrome on Windows"
    },
    {
      type: "patient_update",
      date: "2025-04-19T14:30:00",
      details: "Updated patient record: Sarah Williams"
    },
    {
      type: "appointment_complete",
      date: "2025-04-19T11:15:00",
      details: "Marked appointment as complete: Michael Johnson"
    },
    {
      type: "appointment_create",
      date: "2025-04-18T16:20:00",
      details: "Created new appointment for David Brown"
    }
  ]
};

const Profile = () => {
  const [phone, setPhone] = useState(mockUserData.phone);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState("");
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateSuccess(false);
    setUpdateError("");
    
    // Simple validation
    if (newPassword && newPassword !== confirmPassword) {
      setUpdateError("New password and confirmation don't match");
      return;
    }
    
    // Simulate update
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setUpdateSuccess(true);
    }, 1500);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };
  
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'login':
        return <ShieldCheck className="h-5 w-5 text-blue-500" />;
      case 'patient_update':
        return <User className="h-5 w-5 text-orange-500" />;
      case 'appointment_complete':
        return <Activity className="h-5 w-5 text-green-500" />;
      case 'appointment_create':
        return <Activity className="h-5 w-5 text-purple-500" />;
      default:
        return <Activity className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar with user info */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src="" alt={`${mockUserData.first_name} ${mockUserData.last_name}`} />
                  <AvatarFallback className="text-xl">
                    {getInitials(mockUserData.first_name, mockUserData.last_name)}
                  </AvatarFallback>
                </Avatar>
                
                <h2 className="text-xl font-bold">
                  Dr. {mockUserData.first_name} {mockUserData.last_name}
                </h2>
                <p className="text-sm text-gray-500 mt-1">{mockUserData.role_name}</p>
                
                <div className="w-full mt-6 space-y-3">
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="text-gray-600 truncate">{mockUserData.email}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="text-gray-600">{mockUserData.phone}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <User className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="text-gray-600">Member since {formatDate(mockUserData.created_at)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main content */}
        <div className="md:col-span-3">
          <Tabs defaultValue="account">
            <TabsList className="mb-6">
              <TabsTrigger value="account" className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                Account
              </TabsTrigger>
              <TabsTrigger value="activity" className="flex items-center">
                <Activity className="h-4 w-4 mr-2" />
                Activity
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>
                    Update your account details and password
                  </CardDescription>
                </CardHeader>
                
                <form onSubmit={handleProfileUpdate}>
                  <CardContent className="space-y-6">
                    {updateSuccess && (
                      <Alert className="bg-green-50 text-green-800 border-green-100">
                        <AlertDescription>
                          Your profile has been updated successfully.
                        </AlertDescription>
                      </Alert>
                    )}
                    
                    {updateError && (
                      <Alert className="bg-red-50 text-red-800 border-red-100">
                        <AlertDescription>
                          {updateError}
                        </AlertDescription>
                      </Alert>
                    )}
                    
                    {/* Contact Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Contact Information</h3>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="first_name">First Name</Label>
                          <Input 
                            id="first_name" 
                            value={mockUserData.first_name} 
                            disabled 
                          />
                          <p className="text-xs text-gray-500">
                            Contact admin to change name
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last_name">Last Name</Label>
                          <Input 
                            id="last_name" 
                            value={mockUserData.last_name} 
                            disabled 
                          />
                          <p className="text-xs text-gray-500">
                            Contact admin to change name
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            value={mockUserData.email} 
                            disabled 
                          />
                          <p className="text-xs text-gray-500">
                            Contact admin to change email
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input 
                            id="phone" 
                            value={phone} 
                            onChange={(e) => setPhone(e.target.value)} 
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Password Change */}
                    <div className="space-y-4 pt-6 border-t">
                      <h3 className="text-lg font-medium">Change Password</h3>
                      <p className="text-sm text-gray-500">
                        Leave blank if you don't want to change your password
                      </p>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="current_password">Current Password</Label>
                          <div className="relative">
                            <Input 
                              id="current_password" 
                              type={showCurrentPassword ? "text" : "password"} 
                              value={currentPassword}
                              onChange={(e) => setCurrentPassword(e.target.value)}
                              className="pr-10"
                            />
                            <button
                              type="button"
                              className="absolute inset-y-0 right-0 pr-3 flex items-center"
                              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            >
                              {showCurrentPassword ? (
                                <EyeOff className="h-4 w-4 text-gray-500" />
                              ) : (
                                <Eye className="h-4 w-4 text-gray-500" />
                              )}
                            </button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="new_password">New Password</Label>
                            <div className="relative">
                              <Input 
                                id="new_password" 
                                type={showNewPassword ? "text" : "password"} 
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="pr-10"
                              />
                              <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                              >
                                {showNewPassword ? (
                                  <EyeOff className="h-4 w-4 text-gray-500" />
                                ) : (
                                  <Eye className="h-4 w-4 text-gray-500" />
                                )}
                              </button>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="confirm_password">Confirm New Password</Label>
                            <div className="relative">
                              <Input 
                                id="confirm_password" 
                                type={showConfirmPassword ? "text" : "password"} 
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="pr-10"
                              />
                              <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              >
                                {showConfirmPassword ? (
                                  <EyeOff className="h-4 w-4 text-gray-500" />
                                ) : (
                                  <Eye className="h-4 w-4 text-gray-500" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="border-t pt-6">
                    <Button 
                      type="submit" 
                      className="ml-auto bg-docsync-blue hover:bg-blue-600"
                      disabled={isUpdating}
                    >
                      {isUpdating && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      {isUpdating ? "Updating..." : "Save Changes"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            
            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Your recent actions in the system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {mockUserData.recent_activity.map((activity, index) => (
                      <div 
                        key={index}
                        className="flex items-start border-b pb-4 last:border-0 last:pb-0"
                      >
                        <div className="flex-shrink-0 mr-4">
                          <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                            {getActivityIcon(activity.type)}
                          </div>
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">
                              {activity.details}
                            </p>
                            <span className="text-xs text-gray-500">
                              {formatDateTime(activity.date)}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {activity.type === 'login' ? 'Security' : 
                             activity.type === 'patient_update' ? 'Patient Management' : 
                             'Appointment Management'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
