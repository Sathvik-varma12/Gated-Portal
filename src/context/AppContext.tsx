import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Resident, Visitor, EntryLog, DashboardStats } from '../types';

interface AppContextType {
  residents: Resident[];
  visitors: Visitor[];
  entryLogs: EntryLog[];
  dashboardStats: DashboardStats;
  addResident: (resident: Omit<Resident, 'id' | 'createdAt'>) => void;
  updateResident: (id: string, updates: Partial<Resident>) => void;
  deleteResident: (id: string) => void;
  addVisitor: (visitor: Omit<Visitor, 'id'>) => void;
  updateVisitor: (id: string, updates: Partial<Visitor>) => void;
  deleteVisitor: (id: string) => void;
  recordEntry: (entry: Omit<EntryLog, 'id' | 'timestamp'>) => void;
  validateAccessCode: (code: string) => { isValid: boolean; person?: Resident | Visitor; type?: 'resident' | 'visitor' };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const generateAccessCode = (): string => {
  return Math.random().toString().slice(2, 8).padStart(6, '0');
};

const generateId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

const mockResidents: Resident[] = [
  {
    id: '1',
    name: 'John Smith',
    unit: 'A-101',
    phone: '(555) 123-4567',
    email: 'john.smith@email.com',
    accessCode: '123456',
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    lastEntry: '2024-01-20T08:30:00Z'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    unit: 'B-205',
    phone: '(555) 987-6543',
    email: 'sarah.j@email.com',
    accessCode: '789012',
    isActive: true,
    createdAt: '2024-01-10T14:00:00Z',
    lastEntry: '2024-01-20T18:45:00Z'
  }
];

const mockVisitors: Visitor[] = [
  {
    id: '1',
    name: 'Mike Wilson',
    phone: '(555) 456-7890',
    hostResident: 'John Smith (A-101)',
    accessCode: '345678',
    validFrom: '2024-01-20T00:00:00Z',
    validUntil: '2024-01-22T23:59:59Z',
    isActive: true,
    purpose: 'Family Visit',
    vehicleLicense: 'ABC-123'
  }
];

const mockEntryLogs: EntryLog[] = [
  {
    id: '1',
    personName: 'John Smith',
    personType: 'resident',
    accessCode: '123456',
    timestamp: '2024-01-20T08:30:00Z',
    success: true,
    unitNumber: 'A-101'
  },
  {
    id: '2',
    personName: 'Sarah Johnson',
    personType: 'resident',
    accessCode: '789012',
    timestamp: '2024-01-20T18:45:00Z',
    success: true,
    unitNumber: 'B-205'
  },
  {
    id: '3',
    personName: 'Mike Wilson',
    personType: 'visitor',
    accessCode: '345678',
    timestamp: '2024-01-20T15:20:00Z',
    success: true,
    notes: 'Visiting John Smith'
  }
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [residents, setResidents] = useState<Resident[]>(() => {
    const saved = localStorage.getItem('residents');
    return saved ? JSON.parse(saved) : mockResidents;
  });

  const [visitors, setVisitors] = useState<Visitor[]>(() => {
    const saved = localStorage.getItem('visitors');
    return saved ? JSON.parse(saved) : mockVisitors;
  });

  const [entryLogs, setEntryLogs] = useState<EntryLog[]>(() => {
    const saved = localStorage.getItem('entryLogs');
    return saved ? JSON.parse(saved) : mockEntryLogs;
  });

  useEffect(() => {
    localStorage.setItem('residents', JSON.stringify(residents));
  }, [residents]);

  useEffect(() => {
    localStorage.setItem('visitors', JSON.stringify(visitors));
  }, [visitors]);

  useEffect(() => {
    localStorage.setItem('entryLogs', JSON.stringify(entryLogs));
  }, [entryLogs]);

  const addResident = (residentData: Omit<Resident, 'id' | 'createdAt'>) => {
    const newResident: Resident = {
      ...residentData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      accessCode: residentData.accessCode || generateAccessCode()
    };
    setResidents(prev => [...prev, newResident]);
  };

  const updateResident = (id: string, updates: Partial<Resident>) => {
    setResidents(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
  };

  const deleteResident = (id: string) => {
    setResidents(prev => prev.filter(r => r.id !== id));
  };

  const addVisitor = (visitorData: Omit<Visitor, 'id'>) => {
    const newVisitor: Visitor = {
      ...visitorData,
      id: generateId(),
      accessCode: visitorData.accessCode || generateAccessCode()
    };
    setVisitors(prev => [...prev, newVisitor]);
  };

  const updateVisitor = (id: string, updates: Partial<Visitor>) => {
    setVisitors(prev => prev.map(v => v.id === id ? { ...v, ...updates } : v));
  };

  const deleteVisitor = (id: string) => {
    setVisitors(prev => prev.filter(v => v.id !== id));
  };

  const recordEntry = (entryData: Omit<EntryLog, 'id' | 'timestamp'>) => {
    const newEntry: EntryLog = {
      ...entryData,
      id: generateId(),
      timestamp: new Date().toISOString()
    };
    setEntryLogs(prev => [newEntry, ...prev]);

    // Update last entry for residents
    if (entryData.personType === 'resident' && entryData.success) {
      const resident = residents.find(r => r.name === entryData.personName);
      if (resident) {
        updateResident(resident.id, { lastEntry: newEntry.timestamp });
      }
    }
  };

  const validateAccessCode = (code: string) => {
    // Check residents first
    const resident = residents.find(r => r.accessCode === code && r.isActive);
    if (resident) {
      return { isValid: true, person: resident, type: 'resident' as const };
    }

    // Check visitors
    const visitor = visitors.find(v => {
      if (v.accessCode !== code || !v.isActive) return false;
      const now = new Date();
      const validFrom = new Date(v.validFrom);
      const validUntil = new Date(v.validUntil);
      return now >= validFrom && now <= validUntil;
    });

    if (visitor) {
      return { isValid: true, person: visitor, type: 'visitor' as const };
    }

    return { isValid: false };
  };

  const getDashboardStats = (): DashboardStats => {
    const today = new Date().toDateString();
    const todayEntries = entryLogs.filter(log => 
      new Date(log.timestamp).toDateString() === today && log.success
    ).length;

    const activeVisitors = visitors.filter(v => {
      if (!v.isActive) return false;
      const now = new Date();
      const validUntil = new Date(v.validUntil);
      return now <= validUntil;
    }).length;

    return {
      totalResidents: residents.filter(r => r.isActive).length,
      activeVisitors,
      todayEntries,
      recentActivity: entryLogs.slice(0, 5)
    };
  };

  const dashboardStats = getDashboardStats();

  const value: AppContextType = {
    residents,
    visitors,
    entryLogs,
    dashboardStats,
    addResident,
    updateResident,
    deleteResident,
    addVisitor,
    updateVisitor,
    deleteVisitor,
    recordEntry,
    validateAccessCode
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};