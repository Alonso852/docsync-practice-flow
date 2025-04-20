
import React from "react";
import { cn } from "@/lib/utils";

interface StatusCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: string | number;
    isPositive: boolean;
  };
  className?: string;
}

const StatusCard: React.FC<StatusCardProps> = ({
  title,
  value,
  icon,
  change,
  className,
}) => {
  return (
    <div className={cn(
      "bg-white rounded-xl p-6 shadow-sm border card-hover", 
      className
    )}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <h3 className="text-3xl font-bold mt-2">{value}</h3>
          
          {change && (
            <div className="flex items-center mt-2">
              <span className={cn(
                "text-xs font-medium",
                change.isPositive ? "text-green-600" : "text-red-600"
              )}>
                {change.isPositive ? "+" : "-"}{change.value}
              </span>
              <span className="text-xs text-gray-500 ml-1">vs last month</span>
            </div>
          )}
        </div>
        
        <div className="p-3 bg-blue-50 text-docsync-blue rounded-lg">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
