
import { useState, useMemo } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import StatusBadge from "./StatusBadge";
import TableActions from "./TableActions";
import { ArrowUp, ArrowDown, MoreHorizontal } from "lucide-react";
import { Customer, SortState } from "@/lib/types";
import { customers } from "@/lib/data";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const rowsPerPage = 10;

const TableView = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortState, setSortState] = useState<SortState>({ column: "name", direction: "asc" });

  // Filter data based on search query
  const filteredData = useMemo(() => {
    return customers.filter((customer) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        customer.name.toLowerCase().includes(searchLower) ||
        customer.email.toLowerCase().includes(searchLower) ||
        customer.subscription.toLowerCase().includes(searchLower)
      );
    });
  }, [searchQuery]);

  // Sort data based on sortState
  const sortedData = useMemo(() => {
    if (!sortState.column || !sortState.direction) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortState.column as keyof Customer];
      const bValue = b[sortState.column as keyof Customer];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortState.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortState.direction === "asc" ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });
  }, [filteredData, sortState]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return sortedData.slice(startIndex, startIndex + rowsPerPage);
  }, [sortedData, currentPage]);

  // Handle sort
  const handleSort = (column: string) => {
    setSortState((prev) => ({
      column,
      direction:
        prev.column === column
          ? prev.direction === "asc"
            ? "desc"
            : "asc"
          : "asc",
    }));
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="w-full space-y-6 animate-fade-in">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="gradient-text">Customers</span>
          </h1>
          <p className="text-muted-foreground">
            Manage your customer data, filter and search through records
          </p>
        </div>

        <TableActions searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        <div className="rounded-md border shadow-sm bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="tableHeader">
                <TableRow>
                  <TableHead 
                    className="cursor-pointer w-[200px]"
                    onClick={() => handleSort("name")}
                  >
                    <div className="flex items-center gap-1">
                      Customer
                      {sortState.column === "name" && (
                        sortState.direction === "asc" ? 
                        <ArrowUp className="h-3 w-3" /> : 
                        <ArrowDown className="h-3 w-3" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort("status")}
                  >
                    <div className="flex items-center gap-1">
                      Status
                      {sortState.column === "status" && (
                        sortState.direction === "asc" ? 
                        <ArrowUp className="h-3 w-3" /> : 
                        <ArrowDown className="h-3 w-3" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort("lastActive")}
                  >
                    <div className="flex items-center gap-1">
                      Last Active
                      {sortState.column === "lastActive" && (
                        sortState.direction === "asc" ? 
                        <ArrowUp className="h-3 w-3" /> : 
                        <ArrowDown className="h-3 w-3" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort("subscription")}
                  >
                    <div className="flex items-center gap-1">
                      Subscription
                      {sortState.column === "subscription" && (
                        sortState.direction === "asc" ? 
                        <ArrowUp className="h-3 w-3" /> : 
                        <ArrowDown className="h-3 w-3" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer text-right"
                    onClick={() => handleSort("amount")}
                  >
                    <div className="flex items-center gap-1 justify-end">
                      Amount
                      {sortState.column === "amount" && (
                        sortState.direction === "asc" ? 
                        <ArrowUp className="h-3 w-3" /> : 
                        <ArrowDown className="h-3 w-3" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="w-[70px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((customer) => (
                    <TableRow key={customer.id} className="hover:bg-muted/30">
                      <TableCell className="font-medium">
                        <div>
                          <div>{customer.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {customer.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={customer.status} />
                      </TableCell>
                      <TableCell>{customer.lastActive}</TableCell>
                      <TableCell>{customer.subscription}</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(customer.amount)}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-[160px]">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-500">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No results found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination */}
          <div className="flex items-center justify-between p-4 border-t">
            <div className="text-sm text-muted-foreground">
              Showing {paginatedData.length} of {filteredData.length} entries
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
                  // Show current page and adjacent pages
                  let pageToShow: number;
                  
                  if (totalPages <= 5) {
                    pageToShow = index + 1;
                  } else if (currentPage <= 3) {
                    pageToShow = index + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageToShow = totalPages - 4 + index;
                  } else {
                    pageToShow = currentPage - 2 + index;
                  }
                  
                  if (pageToShow > 0 && pageToShow <= totalPages) {
                    return (
                      <PaginationItem key={pageToShow}>
                        <PaginationLink
                          onClick={() => setCurrentPage(pageToShow)}
                          isActive={currentPage === pageToShow}
                        >
                          {pageToShow}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  }
                  return null;
                })}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableView;
