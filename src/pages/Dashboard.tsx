
import React from "react";
import { 
  Calendar, 
  Users, 
  UserCheck, 
  Clock
} from "lucide-react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatusCard from "@/components/dashboard/StatusCard";
import AppointmentList from "@/components/dashboard/AppointmentList";
import PatientsList from "@/components/dashboard/PatientsList";
import AppointmentCalendar from "@/components/dashboard/AppointmentCalendar";

// Mock data (in a real app, this would come from an API)
const mockAppointments = [
  {
    appointment_id: 1,
    patient: {
      patient_id: 101,
      first_name: "Michael",
      last_name: "Johnson"
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
    date_of_birth: "1985-06-15",
    gender: "M" as const,
    phone: "555-123-4567",
    email: "michael.johnson@example.com"
  },
  {
    patient_id: 102,
    first_name: "Sarah",
    last_name: "Williams",
    date_of_birth: "1990-03-22",
    gender: "F" as const,
    phone: "555-234-5678",
    email: "sarah.williams@example.com"
  },
  {
    patient_id: 103,
    first_name: "Robert",
    last_name: "Davis",
    date_of_birth: "1978-11-30",
    gender: "M" as const,
    phone: "555-345-6789",
    email: "robert.davis@example.com"
  },
  {
    patient_id: 104,
    first_name: "Jennifer",
    last_name: "Miller",
    date_of_birth: "1982-09-12",
    gender: "F" as const,
    phone: "555-456-7890",
    email: "jennifer.miller@example.com"
  },
  {
    patient_id: 105,
    first_name: "David",
    last_name: "Brown",
    date_of_birth: "1975-05-27",
    gender: "M" as const,
    phone: "555-567-8901",
    email: "david.brown@example.com"
  }
];

const Dashboard = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Filter appointments for today
  const todayAppointments = mockAppointments.filter(appointment => {
    const appointmentDate = new Date(appointment.appointment_date);
    return appointmentDate.toDateString() === today.toDateString();
  });
  
  // Get counts for status cards
  const totalPatients = mockPatients.length;
  const totalAppointments = mockAppointments.length;
  const completedAppointments = mockAppointments.filter(apt => apt.status === "Completed").length;
  const scheduledAppointments = mockAppointments.filter(apt => apt.status === "Scheduled").length;

  return (
    <div>
      <DashboardHeader 
        title="Doctor Dashboard" 
        subtitle={formattedDate}
      />
      
      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatusCard 
          title="Total Patients" 
          value={totalPatients}
          icon={<Users size={24} />}
          change={{ value: "12%", isPositive: true }}
        />
        
        <StatusCard 
          title="Total Appointments" 
          value={totalAppointments}
          icon={<Calendar size={24} />}
          change={{ value: "8%", isPositive: true }}
        />
        
        <StatusCard 
          title="Completed" 
          value={completedAppointments}
          icon={<UserCheck size={24} />}
          className="bg-green-50 border-green-100"
        />
        
        <StatusCard 
          title="Scheduled" 
          value={scheduledAppointments}
          icon={<Clock size={24} />}
          className="bg-blue-50 border-blue-100"
        />
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2/3 width on large screens) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Calendar */}
          <AppointmentCalendar 
            appointments={mockAppointments} 
            onDateClick={(date) => console.log("Clicked date:", date)}
          />
          
          {/* Today's Appointments */}
          <AppointmentList 
            appointments={todayAppointments} 
            title="Today's Appointments"
          />
        </div>
        
        {/* Right Column (1/3 width on large screens) */}
        <div className="space-y-8">
          <PatientsList 
            patients={mockPatients}
            limit={4}
          />
          
          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-6">Recent Activity</h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-docsync-blue">
                    <Users size={16} />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Patient Added:</span> Jennifer Miller
                  </p>
                  <p className="text-xs text-gray-500">Today, 11:30 AM</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-docsync-green">
                    <Calendar size={16} />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Appointment Completed:</span> Sarah Williams
                  </p>
                  <p className="text-xs text-gray-500">Today, 2:15 PM</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                    <Calendar size={16} />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Appointment Scheduled:</span> David Brown
                  </p>
                  <p className="text-xs text-gray-500">Today, 9:45 AM</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                    <Calendar size={16} />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Appointment Cancelled:</span> Jennifer Miller
                  </p>
                  <p className="text-xs text-gray-500">Today, 10:15 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
