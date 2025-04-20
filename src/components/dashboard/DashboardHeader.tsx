
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, User, Bell } from "lucide-react";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  showAppointmentButton?: boolean;
  showPatientButton?: boolean;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  subtitle,
  showAppointmentButton = true,
  showPatientButton = true,
}) => {
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
          {subtitle && (
            <p className="text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
        
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <Button size="icon" variant="outline" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
          </Button>
          
          {showPatientButton && (
            <Button variant="outline" className="flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              <User className="h-4 w-4 mr-2" />
              New Patient
            </Button>
          )}
          
          {showAppointmentButton && (
            <Button className="flex items-center bg-docsync-blue hover:bg-blue-600">
              <Plus className="h-4 w-4 mr-2" />
              <Calendar className="h-4 w-4 mr-2" />
              New Appointment
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
