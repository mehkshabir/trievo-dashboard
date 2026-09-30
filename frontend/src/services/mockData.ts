import { PatientCase } from '../types';

export const INITIAL_CASES: PatientCase[] = [
  {
    id: 'CASE-7082',
    mrn: 'TR-8942-01',
    patientName: 'Arthur Vance',
    age: 62,
    gender: 'Male',
    arrivalTime: '18:24',
    scheduledTime: '24 Apr 24',
    serviceCategory: 'Complete Blood Count (CBC)',
    chiefComplaint: 'Acute substernal chest pressure radiating to left arm with diaphoresis (STEMI suspected)',
    vitals: {
      heartRate: 112,
      bpSystolic: 168,
      bpDiastolic: 104,
      spo2: 98.5,
      temperature: 36.9,
      respiratoryRate: 24
    },
    priorityLevel: 1,
    priorityLabel: 'Critical',
    doctor: {
      name: 'Dr. Hetmyer',
      role: 'Interventional Cardiology',
      avatar: '/assets/dr_hetmyer.jpg'
    },
    alertActive: true,
    acknowledged: false,
    verifyFlags: [
      'RULE_V04: Dual antiplatelet contraindication flagged (history of GI bleed in Trievo Vault)',
      'PRIORITY_CRITICAL: ST-elevation pattern detected by ECG parser'
    ],
    explanation: {
      priorityReason: 'Priority Engine classified ESI-1 due to severe ischemic chest pain + hemodynamic compromise requiring immediate catheterization suite prep.',
      verifyStatus: 'FLAGGED_RULE',
      verifyDetails: 'Rule V04 triggered: Patient has active GI ulcer history documented in Trievo Vault. Hold high-dose Aspirin until Attending clearance.',
      recommendedAction: 'Immediate activation of Cath Lab; override or acknowledge Verify alert before medication dispatch.',
      confidenceScore: 0.98
    }
  },
  {
    id: 'CASE-7085',
    mrn: 'TR-4421-08',
    patientName: 'Elena Rostova',
    age: 38,
    gender: 'Female',
    arrivalTime: '18:31',
    scheduledTime: '31 May 24',
    serviceCategory: 'Clinic Visit Appointment',
    chiefComplaint: 'Acute asthma exacerbation with biphasic stridor and intercostal retractions',
    vitals: {
      heartRate: 124,
      bpSystolic: 132,
      bpDiastolic: 84,
      spo2: 91.0,
      temperature: 37.4,
      respiratoryRate: 28
    },
    priorityLevel: 2,
    priorityLabel: 'Emergent',
    doctor: {
      name: 'Dr. Shilpa Rao',
      role: 'Pulmonary & Critical Care',
      avatar: '/assets/dr_shilpa.jpg'
    },
    alertActive: true,
    acknowledged: true,
    verifyFlags: [],
    explanation: {
      priorityReason: 'Priority Engine classified ESI-2 for severe respiratory distress with hypoxia (< 92% SpO2) and work of breathing.',
      verifyStatus: 'VERIFIED_SAFE',
      verifyDetails: 'No medication conflicts detected against Trievo Vault allergy database. Albuterol/Ipratropium protocol safe.',
      recommendedAction: 'Start continuous nebulizer, high-flow nasal cannula at 4L, admit to Resus Bay 2.',
      confidenceScore: 0.94
    }
  },
  {
    id: 'CASE-7089',
    mrn: 'TR-1982-15',
    patientName: 'Marcus Bell',
    age: 29,
    gender: 'Male',
    arrivalTime: '18:36',
    scheduledTime: '02 Jun 24',
    serviceCategory: 'Video Consultation Chat',
    chiefComplaint: 'Post-motorcycle fall: 4.5cm scalp laceration, brief LOC (10 sec), GCS 15',
    vitals: {
      heartRate: 78,
      bpSystolic: 120,
      bpDiastolic: 78,
      spo2: 99.0,
      temperature: 36.8,
      respiratoryRate: 16
    },
    priorityLevel: 3,
    priorityLabel: 'Urgent',
    doctor: {
      name: 'Dr. Kartia Aryan',
      role: 'Emergency Medicine',
      avatar: '/assets/dr_aryan.jpg'
    },
    alertActive: false,
    acknowledged: true,
    verifyFlags: [],
    explanation: {
      priorityReason: 'Priority Engine classified ESI-3: stable hemodynamics requiring 2 resources (imaging/CT + wound closure).',
      verifyStatus: 'VERIFIED_SAFE',
      verifyDetails: 'Vision Model graded wound as Class II laceration with no foreign body. Tetanus shot verified within 5 years.',
      recommendedAction: 'Head CT to rule out intracranial bleed, bedside suture repair with 4-0 Ethilon.',
      confidenceScore: 0.91
    }
  }
];
