
import React from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Appointment type
interface Appointment {
  appointment_id: number;
  patient: {
    patient_id: number;
    first_name: string;
    last_name: string;
  };
  appointment_date: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
}

interface AppointmentCalendarProps {
  appointments: Appointment[];
  onDateClick?: (date: Date) => void;
  className?: string;
}

const AppointmentCalendar: React.FC<AppointmentCalendarProps> = ({
  appointments,
  onDateClick,
  className
}) => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };
  
  const handlePrevMonth = () => {
    setCurrentDate(prev => {
      const prevMonth = new Date(prev);
      prevMonth.setMonth(prev.getMonth() - 1);
      return prevMonth;
    });
  };
  
  const handleNextMonth = () => {
    setCurrentDate(prev => {
      const nextMonth = new Date(prev);
      nextMonth.setMonth(prev.getMonth() + 1);
      return nextMonth;
    });
  };
  
  // Get days for the current month
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);
  
  // Get appointments for the current month
  const appointmentsInMonth = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.appointment_date);
    return appointmentDate.getMonth() === month && appointmentDate.getFullYear() === year;
  });
  
  // Group appointments by day
  const appointmentsByDay: Record<number, Appointment[]> = {};
  appointmentsInMonth.forEach(appointment => {
    const day = new Date(appointment.appointment_date).getDate();
    if (!appointmentsByDay[day]) {
      appointmentsByDay[day] = [];
    }
    appointmentsByDay[day].push(appointment);
  });
  
  // Calendar days array
  const days = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }
  
  // Get day names
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Get month name
  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  return (
    <div className={cn("bg-white rounded-xl shadow-sm border p-6", className)}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <CalendarIcon className="mr-2 h-5 w-5 text-gray-500" />
          <h3 className="text-lg font-semibold">
            {monthName} {year}
          </h3>
        </div>
        <div className="flex space-x-2">
          <Button size="icon" variant="outline" onClick={handlePrevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="outline" onClick={handleNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {/* Day headers */}
        {dayNames.map((name, i) => (
          <div 
            key={`header-${i}`}
            className="text-center text-sm font-medium text-gray-500 py-2"
          >
            {name}
          </div>
        ))}
        
        {/* Calendar cells */}
        {days.map((day, i) => {
          // Skip empty cells
          if (day === null) {
            return <div key={`empty-${i}`} className="p-2" />;
          }
          
          const dayAppointments = appointmentsByDay[day] || [];
          const hasAppointments = dayAppointments.length > 0;
          const todayDate = new Date();
          const isToday = todayDate.getDate() === day && 
                          todayDate.getMonth() === month && 
                          todayDate.getFullYear() === year;
          
          return (
            <div
              key={`day-${day}`}
              className={cn(
                "p-1 min-h-[80px] border rounded-md",
                isToday ? "bg-blue-50 border-docsync-blue" : "hover:bg-gray-50",
                hasAppointments ? "cursor-pointer" : ""
              )}
              onClick={() => {
                if (onDateClick) {
                  const clickedDate = new Date(year, month, day);
                  onDateClick(clickedDate);
                }
              }}
            >
              <div className="text-right text-sm mb-1">
                <span className={cn(
                  "inline-block rounded-full w-6 h-6 text-center leading-6",
                  isToday ? "bg-docsync-blue text-white" : ""
                )}>
                  {day}
                </span>
              </div>
              
              {/* Appointment dots/indicators */}
              <div className="space-y-1">
                {dayAppointments.slice(0, 3).map((appointment, index) => (
                  <div 
                    key={`apt-${appointment.appointment_id}`}
                    className={cn(
                      "text-xs truncate py-1 px-1.5 rounded",
                      appointment.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : 
                      appointment.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                      'bg-red-100 text-red-800'
                    )}
                  >
                    {appointment.patient.first_name} {appointment.patient.last_name.charAt(0)}.
                  </div>
                ))}
                
                {dayAppointments.length > 3 && (
                  <div className="text-xs text-center text-gray-500">
                    +{dayAppointments.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AppointmentCalendar;
