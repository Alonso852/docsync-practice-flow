
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import AppointmentCalendar from "@/components/dashboard/AppointmentCalendar";
import { 
  Calendar, 
  Clock, 
  Search, 
  UserPlus, 
  Edit, 
  Trash2,
  ChevronLeft,
  ChevronRight,
  Filter,
  User,
  Clipboard 
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Mock data (in a real app, this would come from an API)
const mockAppointments = [
  {
    appointment_id: 1,
    patient: {
      patient_id: 101,
      first_name: "Michael",
      last_name: "Johnson"
    },
    doctor: {
      user_id: 201,
      first_name: "Dr. Elizabeth",
      last_name: "Smith"
    },
    assistant: {
      user_id: 301,
      first_name: "Amanda",
      last_name: "Roberts"
    },
    appointment_date: "2025-04-21T09:30:00",
    status: "Scheduled" as const,
    notes: "Regular checkup"
  },
  {
    appointment_id: 2,
    patient: {
      patient_id: 102,
      first_name: "Sarah",
      last_name: "Williams"
    },
    doctor: {
      user_id: 201,
      first_name: "Dr. Elizabeth",
      last_name: "Smith"
    },
    assistant: null,
    appointment_date: "2025-04-20T14:15:00",
    status: "Completed" as const,
    notes: "Follow-up for medication"
  },
  {
    appointment_id: 3,
    patient: {
      patient_id: 103,
      first_name: "Robert",
      last_name: "Davis"
    },
    doctor: {
      user_id: 202,
      first_name: "Dr. William",
      last_name: "Jones"
    },
    assistant: {
      user_id: 302,
      first_name: "Thomas",
      last_name: "Clark"
    },
    appointment_date: "2025-04-22T11:00:00",
    status: "Scheduled" as const
  },
  {
    appointment_id: 4,
    patient: {
      patient_id: 104,
      first_name: "Jennifer",
      last_name: "Miller"
    },
    doctor: {
      user_id: 201,
      first_name: "Dr. Elizabeth",
      last_name: "Smith"
    },
    assistant: null,
    appointment_date: "2025-04-21T16:30:00",
    status: "Cancelled" as const,
    notes: "Patient requested cancellation"
  },
  {
    appointment_id: 5,
    patient: {
      patient_id: 105,
      first_name: "David",
      last_name: "Brown"
    },
    doctor: {
      user_id: 202,
      first_name: "Dr. William",
      last_name: "Jones"
    },
    assistant: {
      user_id: 301,
      first_name: "Amanda",
      last_name: "Roberts"
    },
    appointment_date: "2025-04-23T10:45:00",
    status: "Scheduled" as const,
    notes: "Annual physical"
  }
];

const mockPatients = [
  {
    patient_id: 101,
    first_name: "Michael",
    last_name: "Johnson",
  },
  {
    patient_id: 102,
    first_name: "Sarah",
    last_name: "Williams",
  },
  {
    patient_id: 103,
    first_name: "Robert",
    last_name: "Davis",
  },
  {
    patient_id: 104,
    first_name: "Jennifer",
    last_name: "Miller",
  },
  {
    patient_id: 105,
    first_name: "David",
    last_name: "Brown",
  }
];

const mockDoctors = [
  {
    user_id: 201,
    first_name: "Dr. Elizabeth",
    last_name: "Smith",
  },
  {
    user_id: 202,
    first_name: "Dr. William",
    last_name: "Jones",
  },
  {
    user_id: 203,
    first_name: "Dr. Richard",
    last_name: "Taylor",
  }
];

const mockAssistants = [
  {
    user_id: 301,
    first_name: "Amanda",
    last_name: "Roberts",
  },
  {
    user_id: 302,
    first_name: "Thomas",
    last_name: "Clark",
  }
];

const Appointments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [doctorFilter, setDoctorFilter] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  
  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };
  
  // Format time to readable format
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  // Filter appointments based on search term and filters
  const filteredAppointments = mockAppointments.filter(appointment => {
    const patientName = `${appointment.patient.first_name} ${appointment.patient.last_name}`.toLowerCase();
    const doctorName = `${appointment.doctor.first_name} ${appointment.doctor.last_name}`.toLowerCase();
    
    // Search filter
    const matchesSearch = patientName.includes(searchTerm.toLowerCase()) || 
                          doctorName.includes(searchTerm.toLowerCase());
    
    // Status filter
    const matchesStatus = statusFilter === "all" || appointment.status.toLowerCase() === statusFilter.toLowerCase();
    
    // Doctor filter
    const matchesDoctor = doctorFilter === "all" || appointment.doctor.user_id.toString() === doctorFilter;
    
    return matchesSearch && matchesStatus && matchesDoctor;
  });
  
  const handleEditAppointment = (appointment: any) => {
    setSelectedAppointment(appointment);
    setIsEditDialogOpen(true);
  };
  
  const handleCreateAppointment = () => {
    setIsCreateDialogOpen(true);
  };

  return (
    <div>
      <DashboardHeader 
        title="Appointments" 
        subtitle="Manage your schedule"
      />
      
      <Tabs defaultValue="list" className="mb-8">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="list" className="flex items-center">
              <Clipboard className="w-4 h-4 mr-2" />
              List View
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Calendar View
            </TabsTrigger>
          </TabsList>
          
          <Button 
            onClick={handleCreateAppointment}
            className="bg-docsync-blue hover:bg-blue-600 flex items-center"
          >
            <Calendar className="w-4 h-4 mr-2" />
            <UserPlus className="w-4 h-4 mr-2" />
            New Appointment
          </Button>
        </div>
        
        <div className="my-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input
              className="pl-10"
              placeholder="Search patient or doctor name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <div className="w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <div className="flex items-center">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-48">
              <Select value={doctorFilter} onValueChange={setDoctorFilter}>
                <SelectTrigger>
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Doctor" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Doctors</SelectItem>
                  {mockDoctors.map(doctor => (
                    <SelectItem key={doctor.user_id} value={doctor.user_id.toString()}>
                      {doctor.first_name} {doctor.last_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <TabsContent value="list" className="mt-6">
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Patient
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Doctor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Notes
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredAppointments.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                        <Calendar className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                        <p>No appointments found</p>
                      </td>
                    </tr>
                  ) : (
                    filteredAppointments.map((appointment) => (
                      <tr key={appointment.appointment_id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                              {appointment.patient.first_name.charAt(0)}{appointment.patient.last_name.charAt(0)}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {appointment.patient.first_name} {appointment.patient.last_name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {formatDate(appointment.appointment_date)}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {formatTime(appointment.appointment_date)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {appointment.doctor.first_name} {appointment.doctor.last_name}
                          </div>
                          {appointment.assistant && (
                            <div className="text-xs text-gray-500">
                              Asst: {appointment.assistant.first_name} {appointment.assistant.last_name}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`
                            px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                            ${appointment.status === 'Scheduled' ? 'status-scheduled' : 
                              appointment.status === 'Completed' ? 'status-completed' : 
                              'status-cancelled'}
                          `}>
                            {appointment.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-500 max-w-xs truncate">
                            {appointment.notes || "No notes"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end items-center space-x-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleEditAppointment(appointment)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="px-6 py-4 flex items-center justify-between border-t">
              <div className="text-sm text-gray-500">
                Showing {filteredAppointments.length} of {mockAppointments.length} appointments
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
        </TabsContent>
        
        <TabsContent value="calendar" className="mt-6">
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="p-6">
              <AppointmentCalendar 
                appointments={filteredAppointments.map(apt => ({
                  appointment_id: apt.appointment_id,
                  patient: apt.patient,
                  appointment_date: apt.appointment_date,
                  status: apt.status
                }))}
                onDateClick={(date) => console.log("Clicked date:", date)} 
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Create Appointment Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Appointment</DialogTitle>
            <DialogDescription>
              Schedule a new appointment for a patient.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            {/* Patient Select */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="patient" className="text-right">
                Patient
              </Label>
              <div className="col-span-3">
                <Select>
                  <SelectTrigger id="patient">
                    <SelectValue placeholder="Select a patient" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockPatients.map(patient => (
                      <SelectItem key={patient.patient_id} value={patient.patient_id.toString()}>
                        {patient.first_name} {patient.last_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Doctor Select */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="doctor" className="text-right">
                Doctor
              </Label>
              <div className="col-span-3">
                <Select>
                  <SelectTrigger id="doctor">
                    <SelectValue placeholder="Select a doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockDoctors.map(doctor => (
                      <SelectItem key={doctor.user_id} value={doctor.user_id.toString()}>
                        {doctor.first_name} {doctor.last_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Assistant Select (Optional) */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="assistant" className="text-right">
                Assistant (Optional)
              </Label>
              <div className="col-span-3">
                <Select>
                  <SelectTrigger id="assistant">
                    <SelectValue placeholder="Select an assistant (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">None</SelectItem>
                    {mockAssistants.map(assistant => (
                      <SelectItem key={assistant.user_id} value={assistant.user_id.toString()}>
                        {assistant.first_name} {assistant.last_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Date and Time */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <div className="col-span-3">
                <Input type="date" id="date" />
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time" className="text-right">
                Time
              </Label>
              <div className="col-span-3">
                <Input type="time" id="time" />
              </div>
            </div>
            
            {/* Status */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <div className="col-span-3">
                <Select defaultValue="Scheduled">
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Scheduled">Scheduled</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Notes */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                Notes
              </Label>
              <div className="col-span-3">
                <Textarea id="notes" placeholder="Additional notes (optional)" />
              </div>
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
              Create Appointment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Appointment Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Appointment</DialogTitle>
            <DialogDescription>
              Update the appointment details.
            </DialogDescription>
          </DialogHeader>
          
          {selectedAppointment && (
            <div className="grid gap-4 py-4">
              {/* Patient info (read-only) */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">
                  Patient
                </Label>
                <div className="col-span-3 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 mr-2">
                    {selectedAppointment.patient.first_name.charAt(0)}
                    {selectedAppointment.patient.last_name.charAt(0)}
                  </div>
                  <span className="font-medium">
                    {selectedAppointment.patient.first_name} {selectedAppointment.patient.last_name}
                  </span>
                </div>
              </div>
              
              {/* Doctor Select */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-doctor" className="text-right">
                  Doctor
                </Label>
                <div className="col-span-3">
                  <Select defaultValue={selectedAppointment.doctor.user_id.toString()}>
                    <SelectTrigger id="edit-doctor">
                      <SelectValue placeholder="Select a doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockDoctors.map(doctor => (
                        <SelectItem key={doctor.user_id} value={doctor.user_id.toString()}>
                          {doctor.first_name} {doctor.last_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Assistant Select (Optional) */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-assistant" className="text-right">
                  Assistant (Optional)
                </Label>
                <div className="col-span-3">
                  <Select defaultValue={selectedAppointment.assistant?.user_id.toString() || ""}>
                    <SelectTrigger id="edit-assistant">
                      <SelectValue placeholder="Select an assistant (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">None</SelectItem>
                      {mockAssistants.map(assistant => (
                        <SelectItem key={assistant.user_id} value={assistant.user_id.toString()}>
                          {assistant.first_name} {assistant.last_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Date and Time */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-date" className="text-right">
                  Date
                </Label>
                <div className="col-span-3">
                  <Input 
                    type="date" 
                    id="edit-date" 
                    defaultValue={new Date(selectedAppointment.appointment_date)
                      .toISOString().split('T')[0]} 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-time" className="text-right">
                  Time
                </Label>
                <div className="col-span-3">
                  <Input 
                    type="time" 
                    id="edit-time" 
                    defaultValue={new Date(selectedAppointment.appointment_date)
                      .toTimeString().split(' ')[0].substring(0, 5)} 
                  />
                </div>
              </div>
              
              {/* Status */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">
                  Status
                </Label>
                <div className="col-span-3">
                  <Select defaultValue={selectedAppointment.status}>
                    <SelectTrigger id="edit-status">
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Scheduled">Scheduled</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Notes */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-notes" className="text-right">
                  Notes
                </Label>
                <div className="col-span-3">
                  <Textarea 
                    id="edit-notes" 
                    placeholder="Additional notes (optional)"
                    defaultValue={selectedAppointment.notes || ""}
                  />
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              className="bg-docsync-blue hover:bg-blue-600"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Update Appointment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Appointments;
