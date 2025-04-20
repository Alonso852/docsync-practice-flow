
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, User, Clock } from "lucide-react";

// Appointment type based on database schema
interface Appointment {
  appointment_id: number;
  patient: {
    patient_id: number;
    first_name: string;
    last_name: string;
  };
  appointment_date: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  notes?: string;
}

interface AppointmentListProps {
  appointments: Appointment[];
  title?: string;
  limit?: number;
  showViewAll?: boolean;
}

const AppointmentList: React.FC<AppointmentListProps> = ({
  appointments,
  title = "Upcoming Appointments",
  limit = 5,
  showViewAll = true,
}) => {
  // Limit the number of appointments to display
  const displayedAppointments = appointments.slice(0, limit);
  
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

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        {showViewAll && (
          <Button variant="outline" size="sm">
            View All
          </Button>
        )}
      </div>
      
      {displayedAppointments.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Calendar className="w-12 h-12 mx-auto text-gray-300 mb-2" />
          <p>No appointments scheduled</p>
        </div>
      ) : (
        <div className="space-y-4">
          {displayedAppointments.map((appointment) => (
            <div 
              key={appointment.appointment_id}
              className="flex items-start p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex-shrink-0 mr-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-docsync-blue">
                  <User size={18} />
                </div>
              </div>
              
              <div className="flex-grow">
                <h4 className="font-medium">
                  {appointment.patient.first_name} {appointment.patient.last_name}
                </h4>
                
                <div className="flex flex-wrap items-center mt-1 text-sm text-gray-500">
                  <div className="flex items-center mr-4">
                    <Calendar size={14} className="mr-1" />
                    {formatDate(appointment.appointment_date)}
                  </div>
                  <div className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    {formatTime(appointment.appointment_date)}
                  </div>
                </div>
                
                {appointment.notes && (
                  <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                    {appointment.notes}
                  </p>
                )}
              </div>
              
              <div className="flex-shrink-0 ml-2">
                <div className={`
                  px-3 py-1 rounded-full text-xs font-medium
                  ${appointment.status === 'Scheduled' ? 'status-scheduled' : 
                    appointment.status === 'Completed' ? 'status-completed' : 
                    'status-cancelled'}
                `}>
                  {appointment.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentList;
