
import { cn } from "@/lib/utils";

type StatusBadgeProps = {
  status: "active" | "inactive" | "pending";
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <div
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        status === "active" && "bg-green-100 text-green-800",
        status === "inactive" && "bg-gray-100 text-gray-800",
        status === "pending" && "bg-yellow-100 text-yellow-800"
      )}
    >
      <div
        className={cn(
          "w-1.5 h-1.5 mr-1.5 rounded-full",
          status === "active" && "bg-green-400",
          status === "inactive" && "bg-gray-400",
          status === "pending" && "bg-yellow-400"
        )}
      />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </div>
  );
};

export default StatusBadge;
