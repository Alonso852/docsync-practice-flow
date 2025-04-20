
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { 
  Search, 
  UserPlus,
  Edit,
  Trash2,
  Calendar,
  Phone,
  Mail,
  User,
  X,
  ChevronLeft,
  ChevronRight,
  Filter
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data (in a real app, this would come from an API)
const mockPatients = [
  {
    patient_id: 101,
    first_name: "Michael",
    last_name: "Johnson",
    date_of_birth: "1985-06-15",
    gender: "M" as const,
    phone: "555-123-4567",
    email: "michael.johnson@example.com",
    address: "123 Main St, Anytown, CA 12345",
    created_at: "2024-01-15T10:30:00",
    appointments: [
      {
        appointment_id: 1,
        date: "2025-04-21T09:30:00",
        status: "Scheduled" as const,
        doctor: "Dr. Elizabeth Smith",
        notes: "Regular checkup"
      },
      {
        appointment_id: 2,
        date: "2025-02-10T14:15:00",
        status: "Completed" as const,
        doctor: "Dr. Elizabeth Smith",
        notes: "Follow-up for medication"
      }
    ]
  },
  {
    patient_id: 102,
    first_name: "Sarah",
    last_name: "Williams",
    date_of_birth: "1990-03-22",
    gender: "F" as const,
    phone: "555-234-5678",
    email: "sarah.williams@example.com",
    address: "456 Oak Ave, Sometown, NY 54321",
    created_at: "2024-02-20T14:45:00",
    appointments: [
      {
        appointment_id: 3,
        date: "2025-04-20T14:15:00",
        status: "Completed" as const,
        doctor: "Dr. Elizabeth Smith",
        notes: "Follow-up for medication"
      }
    ]
  },
  {
    patient_id: 103,
    first_name: "Robert",
    last_name: "Davis",
    date_of_birth: "1978-11-30",
    gender: "M" as const,
    phone: "555-345-6789",
    email: "robert.davis@example.com",
    address: "789 Pine St, Othertown, TX 67890",
    created_at: "2024-03-05T09:15:00",
    appointments: [
      {
        appointment_id: 4,
        date: "2025-04-22T11:00:00",
        status: "Scheduled" as const,
        doctor: "Dr. William Jones",
        notes: ""
      }
    ]
  },
  {
    patient_id: 104,
    first_name: "Jennifer",
    last_name: "Miller",
    date_of_birth: "1982-09-12",
    gender: "F" as const,
    phone: "555-456-7890",
    email: "jennifer.miller@example.com",
    address: "321 Elm St, Anycity, FL 13579",
    created_at: "2024-03-15T11:30:00",
    appointments: [
      {
        appointment_id: 5,
        date: "2025-04-21T16:30:00",
        status: "Cancelled" as const,
        doctor: "Dr. Elizabeth Smith",
        notes: "Patient requested cancellation"
      }
    ]
  },
  {
    patient_id: 105,
    first_name: "David",
    last_name: "Brown",
    date_of_birth: "1975-05-27",
    gender: "M" as const,
    phone: "555-567-8901",
    email: "david.brown@example.com",
    address: "654 Maple Dr, Somewhere, WA 97531",
    created_at: "2024-04-01T16:00:00",
    appointments: [
      {
        appointment_id: 6,
        date: "2025-04-23T10:45:00",
        status: "Scheduled" as const,
        doctor: "Dr. William Jones",
        notes: "Annual physical"
      }
    ]
  }
];

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isPatientDetailsOpen, setIsPatientDetailsOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  
  // Filter patients based on search term and filters
  const filteredPatients = mockPatients.filter(patient => {
    const fullName = `${patient.first_name} ${patient.last_name}`.toLowerCase();
    const email = patient.email.toLowerCase();
    
    // Search filter
    const matchesSearch = fullName.includes(searchTerm.toLowerCase()) || 
                          email.includes(searchTerm.toLowerCase());
    
    // Gender filter
    const matchesGender = genderFilter === "all" || patient.gender === genderFilter;
    
    return matchesSearch && matchesGender;
  });
  
  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  // Calculate age from date of birth
  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };
  
  const handleViewPatient = (patient: any) => {
    setSelectedPatient(patient);
    setIsPatientDetailsOpen(true);
  };
  
  const handleCreatePatient = () => {
    setIsCreateDialogOpen(true);
  };

  return (
    <div>
      <DashboardHeader 
        title="Patients" 
        subtitle="Manage patient records"
        showAppointmentButton={false}
      />
      
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input
            className="pl-10"
            placeholder="Search patients by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <div className="w-48">
            <Select value={genderFilter} onValueChange={setGenderFilter}>
              <SelectTrigger>
                <div className="flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Gender" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genders</SelectItem>
                <SelectItem value="M">Male</SelectItem>
                <SelectItem value="F">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            onClick={handleCreatePatient}
            className="bg-docsync-blue hover:bg-blue-600 flex items-center whitespace-nowrap"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Add Patient
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact Information
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Demographics
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Appointment
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <User className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                    <p>No patients found</p>
                  </td>
                </tr>
              ) : (
                filteredPatients.map((patient) => {
                  // Sort appointments by date (newest first) to get last appointment
                  const sortedAppointments = [...patient.appointments].sort((a, b) => 
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                  );
                  const lastAppointment = sortedAppointments[0];
                  
                  return (
                    <tr key={patient.patient_id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleViewPatient(patient)}>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                            {patient.first_name.charAt(0)}{patient.last_name.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {patient.first_name} {patient.last_name}
                            </div>
                            <div className="text-xs text-gray-500">
                              ID: {patient.patient_id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 flex items-center mb-1">
                          <Phone className="w-3 h-3 mr-2" />
                          {patient.phone}
                        </div>
                        <div className="text-sm text-gray-900 flex items-center">
                          <Mail className="w-3 h-3 mr-2" />
                          {patient.email}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {patient.gender === 'M' ? 'Male' : patient.gender === 'F' ? 'Female' : 'Other'}, {calculateAge(patient.date_of_birth)} years
                        </div>
                        <div className="text-xs text-gray-500">
                          DOB: {formatDate(patient.date_of_birth)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {lastAppointment ? (
                          <div>
                            <div className="text-sm text-gray-900">
                              {formatDate(lastAppointment.date)}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center">
                              <span className={`
                                h-2 w-2 rounded-full mr-1
                                ${lastAppointment.status === 'Scheduled' ? 'bg-blue-500' : 
                                  lastAppointment.status === 'Completed' ? 'bg-green-500' : 
                                  'bg-red-500'}
                              `} />
                              {lastAppointment.status}
                            </div>
                          </div>
                        ) : (
                          <div className="text-sm text-gray-500">None</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-end items-center space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Handle edit
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Handle delete
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 flex items-center justify-between border-t">
          <div className="text-sm text-gray-500">
            Showing {filteredPatients.length} of {mockPatients.length} patients
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Create Patient Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Patient</DialogTitle>
            <DialogDescription>
              Enter patient information to create a new record.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            {/* Personal Information */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first_name">First Name</Label>
                <Input id="first_name" placeholder="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">Last Name</Label>
                <Input id="last_name" placeholder="Doe" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date_of_birth">Date of Birth</Label>
                <Input type="date" id="date_of_birth" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select>
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="M">Male</SelectItem>
                    <SelectItem value="F">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Contact Information */}
            <div className="pt-4 border-t">
              <h3 className="text-sm font-medium mb-4">Contact Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="555-123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john.doe@example.com" />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" placeholder="123 Main St, Anytown, CA 12345" />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsCreateDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              className="bg-docsync-blue hover:bg-blue-600"
              onClick={() => setIsCreateDialogOpen(false)}
            >
              Add Patient
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Patient Details Sheet */}
      <Sheet open={isPatientDetailsOpen} onOpenChange={setIsPatientDetailsOpen}>
        <SheetContent className="sm:max-w-[600px] overflow-y-auto">
          {selectedPatient && (
            <>
              <SheetHeader className="mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 mr-4">
                      {selectedPatient.first_name.charAt(0)}{selectedPatient.last_name.charAt(0)}
                    </div>
                    <div>
                      <SheetTitle className="text-xl">
                        {selectedPatient.first_name} {selectedPatient.last_name}
                      </SheetTitle>
                      <SheetDescription>
                        Patient ID: {selectedPatient.patient_id}
                      </SheetDescription>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setIsPatientDetailsOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </SheetHeader>
              
              <div className="space-y-8">
                {/* Quick Actions */}
                <div className="flex space-x-2">
                  <Button className="flex-1 bg-docsync-blue hover:bg-blue-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Appointment
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Patient
                  </Button>
                </div>
                
                {/* Tabs */}
                <Tabs defaultValue="details">
                  <TabsList className="grid grid-cols-2 w-full">
                    <TabsTrigger value="details">Patient Details</TabsTrigger>
                    <TabsTrigger value="appointments">Appointments</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="details" className="space-y-6 mt-6">
                    {/* Personal Information */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium mb-4 text-gray-500 uppercase">Personal Information</h3>
                      <div className="grid grid-cols-2 gap-y-3">
                        <div>
                          <div className="text-sm text-gray-500">Date of Birth</div>
                          <div className="font-medium">{formatDate(selectedPatient.date_of_birth)}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Age</div>
                          <div className="font-medium">{calculateAge(selectedPatient.date_of_birth)} years</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Gender</div>
                          <div className="font-medium">
                            {selectedPatient.gender === 'M' ? 'Male' : 
                             selectedPatient.gender === 'F' ? 'Female' : 'Other'}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Patient Since</div>
                          <div className="font-medium">
                            {formatDate(selectedPatient.created_at)}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Contact Information */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium mb-4 text-gray-500 uppercase">Contact Information</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="text-sm text-gray-500">Phone</div>
                          <div className="font-medium flex items-center">
                            <Phone className="w-4 h-4 mr-2 text-gray-400" />
                            {selectedPatient.phone}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Email</div>
                          <div className="font-medium flex items-center">
                            <Mail className="w-4 h-4 mr-2 text-gray-400" />
                            {selectedPatient.email}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Address</div>
                          <div className="font-medium">
                            {selectedPatient.address}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="appointments" className="mt-6">
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium text-gray-500 uppercase">Appointment History</h3>
                        <Button variant="outline" size="sm">
                          <Calendar className="w-4 h-4 mr-2" />
                          New Appointment
                        </Button>
                      </div>
                    </div>
                    
                    {selectedPatient.appointments.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <Calendar className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                        <p>No appointments found for this patient</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {selectedPatient.appointments.map((appointment: any) => (
                          <div 
                            key={appointment.appointment_id}
                            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="font-medium">{formatDate(appointment.date)}</div>
                                <div className="text-sm text-gray-500">
                                  {new Date(appointment.date).toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </div>
                              </div>
                              <div className={`
                                px-3 py-1 rounded-full text-xs font-medium
                                ${appointment.status === 'Scheduled' ? 'status-scheduled' : 
                                  appointment.status === 'Completed' ? 'status-completed' : 
                                  'status-cancelled'}
                              `}>
                                {appointment.status}
                              </div>
                            </div>
                            
                            <div className="mt-2">
                              <div className="text-sm text-gray-700">
                                <span className="font-medium">Doctor:</span> {appointment.doctor}
                              </div>
                              
                              {appointment.notes && (
                                <div className="text-sm text-gray-500 mt-2">
                                  <span className="font-medium">Notes:</span> {appointment.notes}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Patients;
