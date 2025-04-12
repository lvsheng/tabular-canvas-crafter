
export interface Customer {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive" | "pending";
  lastActive: string;
  amount: number;
  subscription: string;
}

export type SortDirection = "asc" | "desc" | null;

export interface SortState {
  column: string | null;
  direction: SortDirection;
}
