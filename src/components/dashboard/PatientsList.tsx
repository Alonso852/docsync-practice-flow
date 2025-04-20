
import React from "react";
import { Button } from "@/components/ui/button";
import { User, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

// Patient type based on database schema
interface Patient {
  patient_id: number;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: 'M' | 'F' | 'Other';
  phone: string;
  email: string;
}

interface PatientsListProps {
  patients: Patient[];
  limit?: number;
  showSearch?: boolean;
  showViewAll?: boolean;
}

const PatientsList: React.FC<PatientsListProps> = ({
  patients,
  limit = 5,
  showSearch = true,
  showViewAll = true,
}) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  
  // Filter patients based on search term
  const filteredPatients = patients.filter(patient => 
    `${patient.first_name} ${patient.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Limit the number of patients to display
  const displayedPatients = filteredPatients.slice(0, limit);
  
  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
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

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Patients</h3>
        {showViewAll && (
          <Button variant="outline" size="sm">
            View All
          </Button>
        )}
      </div>
      
      {showSearch && (
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input
            className="pl-10"
            placeholder="Search patients"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      
      {displayedPatients.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <User className="w-12 h-12 mx-auto text-gray-300 mb-2" />
          <p>No patients found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {displayedPatients.map((patient) => (
            <div
              key={patient.patient_id}
              className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex-shrink-0 mr-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                  {patient.first_name.charAt(0)}{patient.last_name.charAt(0)}
                </div>
              </div>
              
              <div className="flex-grow">
                <h4 className="font-medium">{patient.first_name} {patient.last_name}</h4>
                <div className="flex flex-wrap mt-1">
                  <span className="text-sm text-gray-500 mr-4">
                    {patient.gender === 'M' ? 'Male' : patient.gender === 'F' ? 'Female' : 'Other'}, {calculateAge(patient.date_of_birth)} years
                  </span>
                  <span className="text-sm text-gray-500">
                    {patient.email}
                  </span>
                </div>
              </div>
              
              <Button variant="ghost" size="sm">View</Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientsList;
