
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, MoreHorizontal } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

type TableActionsProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
};

const TableActions = ({ searchQuery, onSearchChange }: TableActionsProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search customers..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8 w-full md:w-[300px] bg-background"
          />
        </div>
        <Button variant="outline" size="icon" className="hidden md:flex">
          <Filter className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex gap-2 w-full sm:w-auto">
        <Button size="sm" variant="outline" className="bg-white">
          Export
        </Button>
        <Button size="sm" className="bg-purple-500 hover:bg-purple-600">
          Add Customer
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View All</DropdownMenuItem>
            <DropdownMenuItem>Export as CSV</DropdownMenuItem>
            <DropdownMenuItem>Import Customers</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TableActions;
