import {
  ConstructionHistoryItem,
  DamagedLocation,
  DepartmentSummary,
  Employee,
  Engineer,
  ReportSubmission,
  SystemSettings,
  User,
} from '../types';

export const initialUsers: User[] = [
  {
    id: 'usr-1',
    name: 'Dr. Sarah Jenkins',
    email: 'admin@civicpulse.gov',
    role: 'authority',
    department: 'Road Department',
    employeeId: 'CP-ADM-901',
    phone: '+1 (555) 349-2001',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'usr-2',
    name: 'Eng. Marcus Vance, PE',
    email: 'engineer@civicpulse.gov',
    role: 'engineer',
    department: 'Road Department',
    employeeId: 'CP-ENG-442',
    phone: '+1 (555) 782-9912',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'usr-3',
    name: 'Elena Rostova',
    email: 'field@civicpulse.gov',
    role: 'field_worker',
    department: 'Electricity Department',
    employeeId: 'CP-FLD-108',
    phone: '+1 (555) 912-3401',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'usr-4',
    name: 'David Chen (Citizen Reporter)',
    email: 'citizen@civicpulse.gov',
    role: 'citizen',
    phone: '+1 (555) 203-8821',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  }
];

export const initialEmployees: Employee[] = [
  {
    id: 'emp-101',
    name: 'Marcus Vance',
    employeeCode: 'EMP-RD-442',
    role: 'Chief Structural Inspector',
    department: 'Road Department',
    email: 'm.vance@civicpulse.gov',
    phone: '+1 (555) 782-9912',
    experienceYears: 14,
    activeProjects: 5,
    resolvedIssues: 128,
    performanceScore: 96,
    status: 'On Duty',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    skills: ['Bridge NDT Analysis', 'Concrete Core Testing', 'Asphalt Rheology', 'Seismic Retrofitting'],
  },
  {
    id: 'emp-102',
    name: 'Amina Al-Mansoor',
    employeeCode: 'EMP-EL-219',
    role: 'Senior Grid Safety Officer',
    department: 'Electricity Department',
    email: 'a.mansoor@civicpulse.gov',
    phone: '+1 (555) 441-8890',
    experienceYears: 9,
    activeProjects: 4,
    resolvedIssues: 94,
    performanceScore: 92,
    status: 'In Field',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80',
    skills: ['High-Voltage Isolation', 'Transformer Thermal Imaging', 'Underground Line Radar', 'Arc Flash Risk Mitigation'],
  },
  {
    id: 'emp-103',
    name: 'Julian Hayes',
    employeeCode: 'EMP-FR-304',
    role: 'Urban Arborist & Canopy Hazard Lead',
    department: 'Forest Department',
    email: 'j.hayes@civicpulse.gov',
    phone: '+1 (555) 672-1144',
    experienceYears: 11,
    activeProjects: 3,
    resolvedIssues: 112,
    performanceScore: 89,
    status: 'In Field',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    skills: ['Sonic Tomography', 'Root Heave Remediation', 'Emergency Canopy Clearing', 'Ecological Impact Assessment'],
  },
  {
    id: 'emp-104',
    name: 'Rachel Sterling',
    employeeCode: 'EMP-TF-511',
    role: 'Intelligent Traffic Systems Specialist',
    department: 'Traffic Department',
    email: 'r.sterling@civicpulse.gov',
    phone: '+1 (555) 890-3321',
    experienceYears: 7,
    activeProjects: 6,
    resolvedIssues: 87,
    performanceScore: 94,
    status: 'On Duty',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    skills: ['SCADA Signal Controllers', 'Junction Flow Optimization', 'Automated Incident Detection', 'V2X Corridor Integration'],
  },
  {
    id: 'emp-105',
    name: 'Carlos Mendoza',
    employeeCode: 'EMP-RD-112',
    role: 'Pavement Maintenance Supervisor',
    department: 'Road Department',
    email: 'c.mendoza@civicpulse.gov',
    phone: '+1 (555) 301-4455',
    experienceYears: 16,
    activeProjects: 7,
    resolvedIssues: 210,
    performanceScore: 98,
    status: 'In Field',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    skills: ['Cold Planing', 'Microsurfacing', 'Sub-base Stabilization', 'Rapid Pothole Infrared Patching'],
  },
  {
    id: 'emp-106',
    name: 'Priya Sharma',
    employeeCode: 'EMP-EL-670',
    role: 'Substation Telemetry Analyst',
    department: 'Electricity Department',
    email: 'p.sharma@civicpulse.gov',
    phone: '+1 (555) 234-9988',
    experienceYears: 6,
    activeProjects: 2,
    resolvedIssues: 63,
    performanceScore: 91,
    status: 'Standby',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    skills: ['SCADA Diagnostic Logging', 'Fault Current Limiters', 'Grounding Grid Impedance', 'Battery Storage Safety'],
  }
];

export const initialEngineers: Engineer[] = [
  {
    id: 'eng-01',
    name: 'Eng. Marcus Vance, PE',
    engineerLicense: 'PE-CIVIL-88421',
    department: 'Road Department',
    specialization: 'Structural Bridges & Elevated Flyovers',
    assignedZone: 'Central Metro Corridor (Zone 1)',
    activeDispatchLocation: 'East River Viaduct #4',
    phone: '+1 (555) 782-9912',
    email: 'm.vance@civicpulse.gov',
    completedAudits: 142,
    rating: 4.9,
    status: 'Dispatched',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    currentWorkOrderId: 'WO-RD-902',
  },
  {
    id: 'eng-02',
    name: 'Eng. Sarah L. Connor, SE',
    engineerLicense: 'SE-STRUCT-99104',
    department: 'Road Department',
    specialization: 'Seismic Retrofitting & Aging Concrete (>18 Yrs)',
    assignedZone: 'Old Port District & Historic Quarter',
    activeDispatchLocation: 'Grand Central Plaza Annex (Built 1996)',
    phone: '+1 (555) 431-7788',
    email: 's.connor@civicpulse.gov',
    completedAudits: 198,
    rating: 5.0,
    status: 'Emergency Inspection',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    currentWorkOrderId: 'WO-AGE-881',
  },
  {
    id: 'eng-03',
    name: 'Eng. Tariq Al-Hassan, EE',
    engineerLicense: 'EE-GRID-33019',
    department: 'Electricity Department',
    specialization: 'High-Voltage Transmission & Ground Faults',
    assignedZone: 'Industrial Park & North Substation Grid',
    phone: '+1 (555) 819-2044',
    email: 't.alhassan@civicpulse.gov',
    completedAudits: 89,
    rating: 4.8,
    status: 'Available',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'eng-04',
    name: 'Eng. Maya Lin, Arborist PE',
    engineerLicense: 'ENV-ARB-77201',
    department: 'Forest Department',
    specialization: 'Urban Root Incursion & Slope Retaining Walls',
    assignedZone: 'West Hills & Green Buffer Belt',
    activeDispatchLocation: 'Pine Ridge Hillside Bypass',
    phone: '+1 (555) 602-1199',
    email: 'm.lin@civicpulse.gov',
    completedAudits: 115,
    rating: 4.7,
    status: 'Dispatched',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    currentWorkOrderId: 'WO-FR-401',
  },
  {
    id: 'eng-05',
    name: 'Eng. Gregory Walsh, TE',
    engineerLicense: 'TE-TRAFFIC-10928',
    department: 'Traffic Department',
    specialization: 'Adaptive Traffic Grid & Smart Pedestrian Safety',
    assignedZone: 'Downtown Commercial Core',
    phone: '+1 (555) 774-8833',
    email: 'g.walsh@civicpulse.gov',
    completedAudits: 167,
    rating: 4.9,
    status: 'Available',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
  }
];

export const initialConstructionHistory: ConstructionHistoryItem[] = [
  {
    id: 'bld-01',
    buildingName: 'Municipal Civic Tower & Admin Complex',
    location: '450 Civic Center Blvd, Downtown',
    district: 'Central Metro',
    yearBuilt: 1997,
    ageInYears: 29, // > 18 years!
    structureType: 'Commercial Complex',
    materials: 'Reinforced Cast-in-place Concrete & Steel Trusses',
    riskScore: 88,
    isDangerAbove18: true,
    dangerInstructions: [
      '⚠️ CRITICAL DANGER: Building age is 29 years (exceeds 18-year structural fatigue limit).',
      'Immediate Non-Destructive Ultrasonic Core Testing required on Ground Floor Beams #12 to #18.',
      'Mandatory live-load reduction: Restrict rooftop mechanical equipment weight and upper floor occupancy by 30%.',
      'Deploy carbon-fiber reinforced polymer (CFRP) composite wraps on columns showing hairline sheer cracks.',
      'Establish 24/7 seismic tiltmeter & micro-strain telemetry with automatic municipal alert triggers.'
    ],
    structuralIntegrityGrade: 'Grade D - High Danger / Critical Fatigue',
    lastInspectedDate: '2026-04-10',
    nextScheduledAudit: '2026-09-01 (URGENT)',
    contractor: 'Apex Metro Construction Corp',
    floorsCount: 14,
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=600&auto=format&fit=crop&q=80',
    occupancyCount: 850,
    coordinates: { lat: 37.7749, lng: -122.4194 }
  },
  {
    id: 'bld-02',
    buildingName: 'Victoria Heritage Municipal School & Auditorium',
    location: '88 Schoolhouse Way, Old Quarter',
    district: 'Old Port District',
    yearBuilt: 2002,
    ageInYears: 24, // > 18 years!
    structureType: 'Municipal School',
    materials: 'Unreinforced Masonry, Brickwork, Timber Roof Beams',
    riskScore: 92,
    isDangerAbove18: true,
    dangerInstructions: [
      '⚠️ CRITICAL DANGER: Structure is 24 years old with unreinforced masonry joints deteriorating.',
      'Immediate evacuation and structural shoring of the West Wing Auditorium roof truss.',
      'Urgent seismic tie-back installation to connect load-bearing exterior brick walls to floor diaphragms.',
      'Prohibit student gatherings in Assembly Hall until Grade C retrofit certification is signed by SE engineer.'
    ],
    structuralIntegrityGrade: 'Grade D - Severe Hazard',
    lastInspectedDate: '2026-05-18',
    nextScheduledAudit: '2026-08-25 (OVERDUE)',
    contractor: 'Historic City Builders Ltd',
    floorsCount: 3,
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&auto=format&fit=crop&q=80',
    occupancyCount: 620,
    coordinates: { lat: 37.7833, lng: -122.4167 }
  },
  {
    id: 'bld-03',
    buildingName: 'Highland Overpass & Dual-Deck Flyover Bridge',
    location: 'Interstate 80 & Highland Interchange',
    district: 'Industrial Transit Zone',
    yearBuilt: 2004,
    ageInYears: 22, // > 18 years!
    structureType: 'Flyover Bridge',
    materials: 'Prestressed Post-Tensioned Concrete Box Girders',
    riskScore: 84,
    isDangerAbove18: true,
    dangerInstructions: [
      '⚠️ CRITICAL DANGER: Bridge is 22 years old; heavy freight fatigue detected on Pier 4 expansion bearing.',
      'Enforce strict 20-ton maximum axle weight limit on northbound ramp immediately.',
      'Perform radiographic corrosion scan on post-tensioning tendon anchorages.',
      'Install hydraulic shock transmission units (STUs) to dampen earthquake & heavy truck resonance vibrations.'
    ],
    structuralIntegrityGrade: 'Grade C - High Risk / Inspection Mandated',
    lastInspectedDate: '2026-06-02',
    nextScheduledAudit: '2026-09-15',
    contractor: 'Continental Infrastructure Partners',
    floorsCount: 2,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80',
    occupancyCount: 15000,
    coordinates: { lat: 37.7650, lng: -122.4080 }
  },
  {
    id: 'bld-04',
    buildingName: 'Greenfield Eco-Residences Tower A',
    location: '1200 Bayview Promenade',
    district: 'Waterfront Innovation Quarter',
    yearBuilt: 2019,
    ageInYears: 7, // <= 18 years (Safe)
    structureType: 'Residential High-Rise',
    materials: 'High-Performance Self-Healing Concrete & Basalt Rebar',
    riskScore: 18,
    isDangerAbove18: false,
    dangerInstructions: [
      'Structure is within normal designed operating lifespan (7 years old ≤ 18 yr threshold).',
      'Perform routine bi-annual expansion joint elastomeric sealant re-coating.',
      'Maintain standard sensor telemetry for ground settlement.'
    ],
    structuralIntegrityGrade: 'Grade A - Excellent Structural Health',
    lastInspectedDate: '2026-07-14',
    nextScheduledAudit: '2027-07-14',
    contractor: 'Nexus Green Urban Builders',
    floorsCount: 28,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80',
    occupancyCount: 1100,
    coordinates: { lat: 37.7900, lng: -122.3950 }
  },
  {
    id: 'bld-05',
    buildingName: 'Metropolitan General Hospital East Wing',
    location: '720 Health Sciences Drive',
    district: 'Medical District',
    yearBuilt: 2014,
    ageInYears: 12, // <= 18 years (Safe)
    structureType: 'Hospital Facility',
    materials: 'Base-Isolated Steel Moment Frame with Viscous Dampers',
    riskScore: 24,
    isDangerAbove18: false,
    dangerInstructions: [
      'Structure is within safe operational lifecycle (12 years old ≤ 18 yr threshold).',
      'Conduct regular base-isolator bearing calibration and emergency backup generator load testing.',
      'Zero structural fatigue indicators found.'
    ],
    structuralIntegrityGrade: 'Grade A - Superior Resilience',
    lastInspectedDate: '2026-03-22',
    nextScheduledAudit: '2027-03-22',
    contractor: 'Kaiser-Vanguard Infrastructure',
    floorsCount: 9,
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=600&auto=format&fit=crop&q=80',
    occupancyCount: 1400,
    coordinates: { lat: 37.7550, lng: -122.4250 }
  },
  {
    id: 'bld-06',
    buildingName: 'Harbor Power Distribution Substation 3',
    location: '15 Dockside Industrial Way',
    district: 'Industrial Waterfront',
    yearBuilt: 1999,
    ageInYears: 27, // > 18 years!
    structureType: 'Substation Building',
    materials: 'Heavy Reinforced Concrete Bunker & Blast Deflection Walls',
    riskScore: 86,
    isDangerAbove18: true,
    dangerInstructions: [
      '⚠️ CRITICAL DANGER: 27-year-old high-voltage facility exhibiting saltwater chloride ingress in reinforced slab.',
      'Risk of rebar galvanic corrosion and structural spalling directly above main 115kV bus bars.',
      'Mandatory cathodic protection system overhaul and waterproof membrane renewal.',
      'Install perimeter blast mitigation shields and automatic SF6 gas leak containment.'
    ],
    structuralIntegrityGrade: 'Grade D - High Environmental Fatigue',
    lastInspectedDate: '2026-02-15',
    nextScheduledAudit: '2026-08-30 (URGENT)',
    contractor: 'Pacific Grid & Concrete Engineering',
    floorsCount: 2,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80',
    occupancyCount: 45,
    coordinates: { lat: 37.7480, lng: -122.3880 }
  }
];

export const initialDamagedLocations: DamagedLocation[] = [
  {
    id: 'loc-01',
    title: 'Severe Asphalt Fissure & Deep Pothole Cluster',
    department: 'Road Department',
    locationName: 'Oak Street & 5th Avenue Intersection',
    lat: 37.7760,
    lng: -122.4210,
    damageType: 'Pothole & Sub-base Failure',
    severityScore: 89,
    riskLevel: 'CRITICAL',
    status: 'IN_PROGRESS',
    reportedDate: '2026-08-18',
    reportedBy: 'Citizen via App & Vision Scanner',
    estimatedCost: 6500,
    assignedEngineer: 'Eng. Marcus Vance, PE',
    dangerAlert: true,
    description: 'High-speed transit lane features 14-inch deep sinkhole depression damaging vehicle rims and posing motorcycle hazard.',
    imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'loc-02',
    title: 'Exposed 4.8kV Underground Conduit after Storm Washout',
    department: 'Electricity Department',
    locationName: 'Market St & 9th St Junction Pedestrian Walkway',
    lat: 37.7810,
    lng: -122.4150,
    damageType: 'Exposed High-Voltage Wire',
    severityScore: 95,
    riskLevel: 'CRITICAL',
    status: 'PENDING',
    reportedDate: '2026-08-19',
    reportedBy: 'Field Inspector Amina',
    estimatedCost: 12400,
    dangerAlert: true,
    description: 'Cracked pedestrian slab exposed live underground junction box with insulation fraying. Immediate perimeter barrier placed.',
    imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'loc-03',
    title: 'Heavy Ficus Root Sidewalk Uprooting & Retaining Wall Crack',
    department: 'Forest Department',
    locationName: 'Buena Vista Park Western Perimeter Road',
    lat: 37.7680,
    lng: -122.4410,
    damageType: 'Root Heave & Slope Instability',
    severityScore: 72,
    riskLevel: 'HIGH',
    status: 'IN_PROGRESS',
    reportedDate: '2026-08-17',
    reportedBy: 'Arborist Julian Hayes',
    estimatedCost: 8200,
    assignedEngineer: 'Eng. Maya Lin, Arborist PE',
    dangerAlert: false,
    description: 'Historic tree roots have lifted 4 concrete pavement slabs by 9 inches, blocking wheelchair access and destabilizing roadside embankment.',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'loc-04',
    title: 'Multi-Phase Traffic Signal Controller Board Failure',
    department: 'Traffic Department',
    locationName: 'Mission St & 16th St High-Volume Intersection',
    lat: 37.7645,
    lng: -122.4199,
    damageType: 'Signal Logic Outage / Blind Junction',
    severityScore: 91,
    riskLevel: 'CRITICAL',
    status: 'PENDING',
    reportedDate: '2026-08-20',
    reportedBy: 'Automated SCADA Telemetry',
    estimatedCost: 4800,
    assignedEngineer: 'Eng. Gregory Walsh, TE',
    dangerAlert: true,
    description: 'Controller power surge caused flashing red mode in 4 directions during peak morning commute. Manual police traffic control active.',
    imageUrl: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'loc-05',
    title: 'Bridge Expansion Joint Seal Rupture & Water Leakage',
    department: 'Road Department',
    locationName: 'Bay Bridge Approach Pier 12 Ramp',
    lat: 37.7915,
    lng: -122.3900,
    damageType: 'Expansion Joint Corrosion',
    severityScore: 68,
    riskLevel: 'HIGH',
    status: 'PENDING',
    reportedDate: '2026-08-16',
    reportedBy: 'Municipal Drone Survey',
    estimatedCost: 15500,
    dangerAlert: false,
    description: 'Neoprene seal perished allowing de-icing salts to corrode steel cross-girders below. Preventative elastomer seal replacement scheduled.',
    imageUrl: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'loc-06',
    title: 'Leaning Utility Pole with Cracked Composite Base',
    department: 'Electricity Department',
    locationName: 'Sunset Blvd & 24th Ave',
    lat: 37.7550,
    lng: -122.4800,
    damageType: 'Structural Pole Fatigue',
    severityScore: 79,
    riskLevel: 'HIGH',
    status: 'RESOLVED',
    reportedDate: '2026-08-14',
    reportedBy: 'Citizen David Chen',
    estimatedCost: 5200,
    assignedEngineer: 'Eng. Tariq Al-Hassan, EE',
    dangerAlert: false,
    description: 'Class 4 wooden utility pole replaced with new steel tubular pole and reconducted safely.',
    imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600&auto=format&fit=crop&q=80'
  }
];

export const initialDepartments: DepartmentSummary[] = [
  {
    name: 'Road Department',
    icon: 'Hammer',
    headOfDepartment: 'Dr. Sarah Jenkins (Commissioner)',
    totalBudgetUSD: 4500000,
    spentBudgetUSD: 2840000,
    activeIssues: 18,
    resolvedIssues: 142,
    dangerAlertsCount: 6,
    fieldEngineersCount: 24,
    color: '#2563EB', // Blue
    description: 'Oversees 840 lane-miles of arterial streets, viaducts, seismic bridges, pothole rapid repairs, and asphalt resurfacing.',
  },
  {
    name: 'Forest Department',
    icon: 'Trees',
    headOfDepartment: 'Julian Hayes (Lead Arborist)',
    totalBudgetUSD: 1800000,
    spentBudgetUSD: 920000,
    activeIssues: 7,
    resolvedIssues: 88,
    dangerAlertsCount: 2,
    fieldEngineersCount: 14,
    color: '#059669', // Emerald Green
    description: 'Manages municipal tree canopy health, storm canopy trimming, root incursion abatement, and green infrastructure safety.',
  },
  {
    name: 'Electricity Department',
    icon: 'Zap',
    headOfDepartment: 'Amina Al-Mansoor (Grid Director)',
    totalBudgetUSD: 3900000,
    spentBudgetUSD: 2310000,
    activeIssues: 12,
    resolvedIssues: 119,
    dangerAlertsCount: 5,
    fieldEngineersCount: 19,
    color: '#D97706', // Amber
    description: 'Maintains streetlights, underground high-voltage feeders, power substations, transformer telemetry, and electrical hazard isolation.',
  },
  {
    name: 'Traffic Department',
    icon: 'TrafficCone',
    headOfDepartment: 'Rachel Sterling (ITS Chief)',
    totalBudgetUSD: 2400000,
    spentBudgetUSD: 1450000,
    activeIssues: 9,
    resolvedIssues: 104,
    dangerAlertsCount: 4,
    fieldEngineersCount: 16,
    color: '#7C3AED', // Violet
    description: 'Controls adaptive traffic signals, dynamic variable message signs, school crossing beacons, lane striping, and junction safety cameras.',
  }
];

export const initialReports: ReportSubmission[] = [
  {
    id: 'rep-991',
    trackingCode: 'CP-2026-8801',
    title: 'Severe pothole damaging vehicle rims near elementary school',
    category: 'Road Department',
    description: 'Large fissure on school drop-off lane. Concrete sub-base is crumbling after rain.',
    locationName: 'Oak St & 5th Ave',
    lat: 37.7760,
    lng: -122.4210,
    timestamp: '2026-08-19 14:32',
    reporterName: 'David Chen',
    reporterEmail: 'citizen@civicpulse.gov',
    status: 'IN_REPAIR',
    aiAnalysis: {
      damageType: 'Pothole & Sub-base Fatigue',
      severityScore: 89,
      riskLevel: 'CRITICAL',
      recommendedDepartment: 'Road Department',
      estimatedCostUSD: 6500,
      estimatedRepairTimeDays: 2,
      detectedIssues: [
        'Sub-base cavitation deeper than 12 inches',
        'Direct collision hazard for school bus route',
        'Moisture ingress accelerating edge asphalt breakage'
      ],
      recommendedAction: 'Dispatch cold milling crew and apply hot-mix polymer asphalt patch.',
      explanation: 'High vehicle volume near educational zone elevates priority risk score from 65 to 89.'
    }
  },
  {
    id: 'rep-992',
    trackingCode: 'CP-2026-8802',
    title: 'Sparks and exposed wires from streetlight base cover missing',
    category: 'Electricity Department',
    description: 'Base cover knocked off by vehicle, exposed 240V wire terminals exposed to rain.',
    locationName: 'Market St & 9th St Junction',
    lat: 37.7810,
    lng: -122.4150,
    timestamp: '2026-08-20 08:15',
    reporterName: 'Officer M. Taylor',
    reporterEmail: 'police.traffic@civicpulse.gov',
    status: 'ASSIGNED',
    aiAnalysis: {
      damageType: 'Exposed High-Voltage Electrical Terminals',
      severityScore: 95,
      riskLevel: 'CRITICAL',
      recommendedDepartment: 'Electricity Department',
      estimatedCostUSD: 2400,
      estimatedRepairTimeDays: 1,
      detectedIssues: [
        'Live 240V phase wires touching damp metal chassis',
        'Extreme electrocution hazard to pedestrians & pets',
        'Arc fault potential in windy conditions'
      ],
      recommendedAction: 'De-energize feeder circuit, replace terminal block and install heavy-duty tamperproof steel cover.',
      explanation: 'Life-safety emergency due to pedestrian foot traffic density.'
    }
  }
];

export const defaultSettings: SystemSettings = {
  ageDangerThreshold: 18, // Default 18 years!
  autoDispatchEngineers: true,
  highRiskAlertsEnabled: true,
  smsNotifications: true,
  emailAlerts: true,
  aiSensitivityLevel: 'Standard',
  cityJurisdiction: 'Metro San Francisco Infrastructure District',
  gisTileLayer: 'Standard Vector',
  annualMaintenanceBudgetUSD: 12600000,
};

export const documentationSections = [
  {
    id: 'sec-1',
    number: '01',
    title: 'Project Overview',
    subtitle: 'Executive Summary & Vision',
    content: `**Project Name:** CivicPulse AI
**One-Line Description:** An AI-driven municipal infrastructure risk intelligence platform that predicts structural degradation, forecasts building age fatigue (>18 years danger protocols), triages citizen multi-modal camera reports, and optimizes departmental repair budgets.

**What the System Does:**
CivicPulse AI shifts municipal governance from reactive, chaotic repair to proactive, predictive risk management. It continuously audits civic assets, runs multi-department workflows (Road, Forest, Electricity, Traffic), utilizes computer vision damage classification, and alerts authorities when any construction surpasses 18 years of age.

**Who Will Use It:**
- **City Authorities & Commissioners:** High-level risk dashboards, AI budget allocation, predictive lifecycle forecasting.
- **Structural Engineers & Inspectors:** Detailed forensic logs, ultrasonic test orders, construction history audits, age-based danger instructions.
- **Field Crews:** Dispatched mobile work orders, instant navigation, photo proof verification.
- **Citizens:** 1-click live camera reporting with instant tracking codes and transparent status updates.`
  },
  {
    id: 'sec-2',
    number: '02',
    title: 'Problem Statement',
    subtitle: 'Why Reactive Repair Fails Modern Cities',
    content: `**What Cities Currently Face:**
Municipalities worldwide struggle under aging infrastructure backlogs. With limited tax revenues and thousands of reported potholes, failing bridges, exposed electrical junctions, and hazardous tree roots, cities are overwhelmed.

**Why Reactive Infrastructure Repair is Inefficient:**
1. **The "Squeaky Wheel" Bias:** In legacy 311 systems, whoever complains loudest gets repaired first, regardless of actual structural danger.
2. **Hidden Degradation:** Critical structures like bridges and buildings over 18 years old quietly accumulate concrete carbonation, rebar corrosion, and foundation settling without surface alarms until catastrophic failure occurs.
3. **Siloed Departments:** Road, Forest, Electricity, and Traffic departments work in isolation, duplicating logistics and stalling cross-jurisdictional hazards.
4. **Equal Treatment Fallacy:** A cosmetic sidewalk scuff cannot be treated with the same priority as an exposed 4.8kV conduit or an 18+ year-old crumbling school masonry wall.`
  },
  {
    id: 'sec-3',
    number: '03',
    title: 'Proposed Solution',
    subtitle: 'The Predictive End-to-End Pipeline',
    content: `CivicPulse AI implements a closed-loop intelligence architecture:

**Data Collection** (Citizen Camera / Drone / IoT / Historic Archives)
  ↓
**AI Multi-Modal Damage & Age Analysis** (Vision Models & Civil Engineering Heuristics)
  ↓
**Dynamic Risk Scoring (1-100)** (Fatigue, traffic exposure, life-safety risk)
  ↓
**Building Age Danger Classification** (Construction > 18 yrs automatically triggers mandatory danger instructions & retrofitting mandates)
  ↓
**Algorithmic Budget Optimization** (Linear optimization maximizing lives protected per dollar spent)
  ↓
**Field Dispatch & Real-Time Tracking** (Geo-tagged work orders with engineer specializations)
  ↓
**Post-Repair Verification** (Before/After photographic proof & structural integrity sign-off)`
  },
  {
    id: 'sec-4',
    number: '04',
    title: 'Innovation & USP',
    subtitle: 'Beyond Traditional Complaint Management',
    content: `**Traditional Legacy 311 Systems:**
\`Report → Complaint Ticket → Queued by Date → Reactive Repair\`

**CivicPulse AI Paradigm Shift:**
\`Report / Audit → Multi-Modal AI Analysis → Age & Fatigue Prediction (>18yr Alert) → Dynamic Risk Scoring → Knapsack Budget Optimization → Autonomous Crew Dispatch → AI Verified Closure\`

**Key Differentiators (USP):**
- **Automated 18-Year Construction Age Danger Trigger:** Instantly identifies structural lifecycle fatigue in aging buildings and prescribes exact civil engineering danger instructions.
- **Explainable AI (XAI):** Rather than giving a black-box score, CivicPulse provides civil engineering justifications (e.g. *“Pothole severity upgraded to 89 due to proximity to school bus corridor and sub-base moisture erosion”*).
- **Integrated Multi-Department Hub:** Road, Forest, Electricity, and Traffic departments synchronized on a single live GIS layer.`
  },
  {
    id: 'sec-5',
    number: '05',
    title: 'Key Features',
    subtitle: 'Comprehensive Module Capabilities',
    content: `1. **Construction History & Age Fatigue Predictor:** Calculates building construction years; triggers high danger warnings & retrofitting instructions for any structure > 18 years old.
2. **Citizen & Field Camera Reporting ("Repart"):** Capture live video/photo feeds, auto-detect location, and receive instant AI damage triage with tracking IDs.
3. **Interactive Danger & Risk GIS Maps:** Visualizes damaged roads, high-risk structures, and alert zones color-coded by severity (Critical / High / Medium / Low).
4. **Cross-Department Command Center:** Specialized consoles for Road, Forest, Electricity, and Traffic departments.
5. **Engineer Roster & Dispatch Hub:** Match certified PE/SE engineers to specific hazard types and live zones.
6. **Executive Dashboard & Project Analytics:** Visual pie charts, budget expenditure vs impact graphs, employee performance metrics, and pending vs resolved KPIs.
7. **CivicPulse AI Copilot:** Interactive civil engineering AI chatbot answering questions, formulating work orders, and clarifying municipal codes.`
  },
  {
    id: 'sec-6',
    number: '06',
    title: 'System Workflow',
    subtitle: 'Step-by-Step Data Flow',
    content: `1. **Ingestion:** Citizen snaps a photo via camera on the Reports page, or an engineer enters building construction details.
2. **Neural Inference:** Computer vision extracts damage boundaries; LLM assesses structural fatigue, construction age, and material vulnerability.
3. **Threshold Check:** If structure age > 18 years, the system marks the asset in DANGER, auto-generates 5 critical remediation steps, and flags it on the GIS map in red.
4. **Triage & Priority Matrix:** The engine computes the combined Risk Score (0-100) factoring pedestrian foot-traffic, vehicle velocity, and hazard type.
5. **Budget Optimization:** Allocates available municipal funds across the highest impact work orders.
6. **Dispatch & Field Execution:** Assigns work order to qualified on-duty engineer with direct navigation coordinates.
7. **Verification & Audit Closure:** Field worker uploads completion photo; AI verifies repair quality before marking the ticket as RESOLVED.`
  },
  {
    id: 'sec-7',
    number: '07',
    title: 'AI / Machine Learning Approach',
    subtitle: 'Forensic Engineering & Vision Models',
    content: `**Data Sources Utilized:**
- Building cadastral records, construction permits, historic blueprint archives.
- High-resolution camera imagery from citizen devices and municipal drones.
- Telemetry from SCADA traffic controllers and power grid sensors.

**Core AI Components:**
- **Vision Foundation Model (Gemini 3.7 Flash):** Identifies surface cracking, concrete spalling, exposed wiring, water ingress, and structural sagging.
- **Construction Age & Fatigue Engine:** Predicts structural age from architecture/materials and applies concrete creep/rebar corrosion models to assets older than 18 years.
- **Explainability Layer:** Formulates natural language justifications for every score, ensuring transparent accountability for public officials and citizens.`
  },
  {
    id: 'sec-8',
    number: '08',
    title: 'System Architecture & Tech Stack',
    subtitle: 'Robust Full-Stack Implementation',
    content: `**Frontend Layer:**
- React 19 + TypeScript + Vite
- Tailwind CSS (Zero AI-slop, mathematically balanced layout)
- Lucide React Icons & Motion Animations
- Canvas Camera Capture & Geolocation Web APIs

**Backend & AI Layer:**
- Node.js + Express 4 server (with tsx runtime)
- Google GenAI SDK (@google/genai) with Gemini 3.7 Flash server-side integration
- Multi-modal image analysis & prompt engineering pipelines

**Data & Analytics:**
- Modular state management with durable mock seeds and real-time updates
- Interactive SVG & CSS-based Data Visualizers (Pie charts, progress arcs, bar metrics)`
  },
  {
    id: 'sec-9',
    number: '09',
    title: 'User Roles & Modules',
    subtitle: 'Role-Based Access Control (RBAC)',
    content: `**1. Authority / City Administrator:**
- High-level oversight of total municipal budgets and danger hotspots.
- Policy adjustments (e.g. tuning the age danger threshold from 18 years).
- Cross-department performance analytics and audit approvals.

**2. Senior Structural Engineer & Field Inspector:**
- Access to detailed forensic checklists, ultrasonic NDT requests, and age-fatigue work orders.
- Direct dispatch mapping with live GPS coordinates.
- Work order progress updates and repair verification sign-offs.

**3. Field Workers:**
- Mobile task queues, emergency tool checklists, before/after camera uploads.

**4. Citizen Reporter:**
- Frictionless reporting via phone/web camera without mandatory account friction.
- Live ticket tracking code to view progress from report to verified repair.`
  },
  {
    id: 'sec-10',
    number: '10',
    title: 'Expected Impact & Benefits',
    subtitle: 'Quantifiable Municipal Value',
    content: `**Key Metrics & Benefits:**
- **38% Reduction in Catastrophic Structural Failures:** Proactive detection of >18 year old building and bridge fatigue before collapse occurs.
- **52% Faster Emergency Triage:** High-voltage exposed wires and deep traffic sinkholes are routed to response crews in minutes, not days.
- **40% Budget Efficiency Gain:** AI knapsack optimizer ensures municipal tax dollars prevent high-cost disasters rather than cosmetic fixes.
- **Public Trust & Transparency:** Citizens see exactly where their reports are in the pipeline with clear explainable AI feedback.`
  },
  {
    id: 'sec-11',
    number: '11',
    title: 'Future Scope & Roadmap',
    subtitle: 'Scaling to Smart Megacities',
    content: `**Post-Hackathon Expansion:**
1. **IoT Sensor Integration:** Vibration accelerometers on all bridges over 18 years old for real-time seismic strain alarms.
2. **Satellite Synthetic Aperture Radar (SAR):** Millimeter-level ground subsidence and building tilt tracking from space.
3. **Automated Drone Swarm Audits:** Scheduled autonomous drone flights capturing high-rise facades and thermal insulation leaks.
4. **Predictive Weather Integration:** Auto-dispatching road & drainage teams ahead of heavy atmospheric river rainstorms.
5. **Open Civic Data API:** Public APIs for researchers, insurance auditors, and civic watchdog organizations.`
  }
];

export const INITIAL_EMPLOYEES = initialEmployees;
export const INITIAL_ENGINEERS = initialEngineers;
export const INITIAL_DAMAGED_LOCATIONS = initialDamagedLocations;
export const INITIAL_CONSTRUCTION_HISTORY = initialConstructionHistory;
export const INITIAL_DEPARTMENTS = initialDepartments;
export const INITIAL_REPORTS = initialReports;
export const DOCUMENTATION_SECTIONS = documentationSections;

