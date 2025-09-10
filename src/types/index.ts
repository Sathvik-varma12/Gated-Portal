export interface Resident {
  id: string;
  name: string;
  unit: string;
  phone: string;
  email: string;
  accessCode: string;
  isActive: boolean;
  createdAt: string;
  lastEntry?: string;
}

export interface Visitor {
  id: string;
  name: string;
  phone: string;
  hostResident: string;
  accessCode: string;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
  purpose: string;
  vehicleLicense?: string;
}

export interface EntryLog {
  id: string;
  personName: string;
  personType: 'resident' | 'visitor';
  accessCode: string;
  timestamp: string;
  success: boolean;
  unitNumber?: string;
  notes?: string;
}

export interface DashboardStats {
  totalResidents: number;
  activeVisitors: number;
  todayEntries: number;
  recentActivity: EntryLog[];
}