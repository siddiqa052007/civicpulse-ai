export type DepartmentType =
  | 'Road Department'
  | 'Forest Department'
  | 'Electricity Department'
  | 'Traffic Department';

export type UserRole = 'authority' | 'engineer' | 'field_worker' | 'citizen';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: DepartmentType;
  employeeId?: string;
  avatar?: string;
  phone?: string;
}

export interface Employee {
  id: string;
  name: string;
  employeeCode: string;
  role: string;
  department: DepartmentType;
  email: string;
  phone: string;
  experienceYears: number;
  activeProjects: number;
  resolvedIssues: number;
  performanceScore: number; // 0 - 100
  status: 'On Duty' | 'In Field' | 'On Leave' | 'Standby';
  avatar: string;
  skills: string[];
}

export interface Engineer {
  id: string;
  name: string;
  engineerLicense: string;
  department: DepartmentType;
  specialization: string;
  assignedZone: string;
  activeDispatchLocation?: string;
  phone: string;
  email: string;
  completedAudits: number;
  rating: number; // 1-5
  status: 'Dispatched' | 'Available' | 'Emergency Inspection' | 'Off-Duty';
  avatar: string;
  currentWorkOrderId?: string;
}

export interface ConstructionHistoryItem {
  id: string;
  buildingName: string;
  location: string;
  district: string;
  yearBuilt: number;
  ageInYears: number;
  structureType: 'Commercial Complex' | 'Residential High-Rise' | 'Flyover Bridge' | 'Municipal School' | 'Hospital Facility' | 'Substation Building';
  materials: string;
  riskScore: number; // 0 - 100
  isDangerAbove18: boolean;
  dangerInstructions: string[];
  structuralIntegrityGrade: string;
  lastInspectedDate: string;
  nextScheduledAudit: string;
  contractor: string;
  floorsCount: number;
  image: string;
  occupancyCount: number;
  coordinates: { lat: number; lng: number };
}

export interface DamagedLocation {
  id: string;
  title: string;
  department: DepartmentType;
  locationName: string;
  lat: number;
  lng: number;
  damageType: string;
  severityScore: number; // 0 - 100
  riskLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'PENDING' | 'IN_PROGRESS' | 'RESOLVED';
  reportedDate: string;
  reportedBy: string;
  estimatedCost: number;
  assignedEngineer?: string;
  dangerAlert: boolean;
  description: string;
  imageUrl?: string;
}

export interface ReportSubmission {
  id: string;
  trackingCode: string;
  title: string;
  category: DepartmentType;
  description: string;
  locationName: string;
  lat?: number;
  lng?: number;
  imageBase64?: string;
  timestamp: string;
  reporterName: string;
  reporterEmail: string;
  status: 'SUBMITTED' | 'AI_TRIAGED' | 'ASSIGNED' | 'IN_REPAIR' | 'VERIFIED';
  aiAnalysis?: {
    damageType: string;
    severityScore: number;
    riskLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
    recommendedDepartment: string;
    estimatedCostUSD: number;
    estimatedRepairTimeDays: number;
    detectedIssues: string[];
    recommendedAction: string;
    explanation: string;
  };
}

export interface DepartmentSummary {
  name: DepartmentType;
  icon: string;
  headOfDepartment: string;
  totalBudgetUSD: number;
  spentBudgetUSD: number;
  activeIssues: number;
  resolvedIssues: number;
  dangerAlertsCount: number;
  fieldEngineersCount: number;
  color: string;
  description: string;
}

export interface SystemSettings {
  ageDangerThreshold: number; // default 18
  autoDispatchEngineers: boolean;
  highRiskAlertsEnabled: boolean;
  smsNotifications: boolean;
  emailAlerts: boolean;
  aiSensitivityLevel: 'Standard' | 'Aggressive' | 'Conservative';
  cityJurisdiction: string;
  gisTileLayer: 'Standard Vector' | 'Satellite Imagery' | 'Topographic';
  annualMaintenanceBudgetUSD: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
