export type ESILevel = 1 | 2 | 3 | 4 | 5;

export interface Vitals {
  heartRate: number;
  bpSystolic: number;
  bpDiastolic: number;
  spo2: number;
  temperature: number;
  respiratoryRate: number;
}

export interface Doctor {
  name: string;
  role: string;
  avatar: string;
}

export interface PriorityExplanation {
  priorityReason: string;
  verifyStatus: 'VERIFIED_SAFE' | 'FLAGGED_RULE' | 'OVERRIDDEN';
  verifyDetails: string;
  recommendedAction: string;
  confidenceScore: number;
}

export interface PatientCase {
  id: string;
  mrn: string;
  patientName: string;
  age: number;
  gender: string;
  arrivalTime: string;
  scheduledTime: string;
  serviceCategory: string; // e.g. "Complete Blood Count (CBC)", "Clinic Visit Appointment", "Video Consultation Chat"
  chiefComplaint: string;
  vitals: Vitals;
  priorityLevel: ESILevel;
  priorityLabel: 'Critical' | 'Emergent' | 'Urgent' | 'Stable' | 'Routine';
  doctor: Doctor;
  alertActive: boolean;
  acknowledged: boolean;
  verifyFlags: string[];
  explanation: PriorityExplanation;
}

export type StaffRole = 'staff' | 'admin';
