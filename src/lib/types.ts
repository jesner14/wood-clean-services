export type UserRole = 'admin' | 'client';

export interface Profile {
  id: string;
  role: UserRole;
  email: string;
  full_name: string | null;
  is_active: boolean;
  created_at: string;
}

export type QuoteRequestStatus = 'new' | 'read' | 'archived';

export interface QuoteRequest {
  id: string;
  full_name: string;
  phone: string | null;
  email: string;
  service: string;
  message: string;
  status: QuoteRequestStatus;
  created_at: string;
}

export interface QuoteRequestInput {
  fullName: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}
