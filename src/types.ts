export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  vehicles: Vehicle[];
  selectedVehicleId?: string;
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  plate: string;
}

export interface DiagnosisReport {
  id: string;
  vehicleId: string;
  date: string;
  type: 'technician' | 'video' | 'location';
  status: 'completed' | 'pending';
  summary: string;
  details: string;
}

export interface Quote {
  id: string;
  garageName: string;
  rating: number;
  price: number;
  estimatedTime: string;
  description: string;
  distance: string;
}

export interface ServiceRequest {
  id: string;
  type: 'diagnosis' | 'known-issue' | 'saved-report';
  details: any;
  status: 'pending' | 'quoted' | 'booked' | 'completed';
  quotes: Quote[];
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderType: 'user' | 'expert';
  message: string;
  timestamp: string;
  attachments?: string[];
}

export interface Expert {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  isOnline: boolean;
  avatar?: string;
}

export interface MaintenanceItem {
  id: string;
  vehicleId: string;
  type: string;
  description: string;
  dueDate: string;
  dueMileage: number;
  priority: 'low' | 'medium' | 'high';
  estimatedCost: number;
  aiConfidence: number;
}

export interface LoyaltyProgram {
  userId: string;
  points: number;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  totalSpent: number;
  servicesCompleted: number;
}

export interface Fleet {
  id: string;
  companyName: string;
  vehicles: Vehicle[];
  adminId: string;
  drivers: FleetDriver[];
}

export interface FleetDriver {
  id: string;
  name: string;
  phone: string;
  assignedVehicles: string[];
}

export interface Warranty {
  id: string;
  vehicleId: string;
  type: 'manufacturer' | 'extended' | 'service';
  provider: string;
  startDate: string;
  endDate: string;
  coverageDetails: string;
  claimHistory: WarrantyClaim[];
}

export interface WarrantyClaim {
  id: string;
  date: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  amount: number;
}

export interface FinancingOption {
  id: string;
  provider: 'tabby' | 'tamara' | 'postpay';
  totalAmount: number;
  installments: number;
  monthlyAmount: number;
  interestRate: number;
  approved: boolean;
}

// Role-based access types
export type UserRole = 'customer' | 'garage' | 'admin';

export interface AuthUser {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: UserRole;
  garageId?: string; // For garage users
  permissions?: string[]; // For admin users
}

export interface Garage {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  rating: number;
  services: string[];
  workingHours: {
    open: string;
    close: string;
    days: string[];
  };
  location: {
    lat: number;
    lng: number;
  };
  verified: boolean;
  ownerId: string;
}

export interface ServiceRequest {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  vehicleInfo: {
    make: string;
    model: string;
    year: number;
    plate: string;
  };
  serviceType: string;
  description: string;
  urgency: 'low' | 'medium' | 'high';
  preferredDate: string;
  preferredTime: string;
  location?: string;
  photos?: string[];
  status: 'pending' | 'quoted' | 'accepted' | 'in-progress' | 'completed' | 'cancelled';
  quotes: ServiceQuote[];
  createdAt: string;
  updatedAt: string;
}

export interface ServiceQuote {
  id: string;
  garageId: string;
  garageName: string;
  price: number;
  estimatedTime: string;
  description: string;
  validUntil: string;
  status: 'pending' | 'accepted' | 'rejected' | 'expired';
  createdAt: string;
}