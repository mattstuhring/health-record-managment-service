export interface Record {
  id: string;
  name: string;
  dob: string;
  healthcare: Healthcare;
  health: Health;
}

export enum Health {
  EXCELLENT = 'EXCELLENT',
  GOOD = 'GOOD',
  FAIR = 'FAIR',
  POOR = 'POOR',
  UNKNOWN = 'UNKNOWN',
}

export enum Healthcare {
  PRIMARY_HEALTHCARE = 'PRIMARY_HEALTHCARE',
  SPECIALTY_HEALTHCARE = 'SPECIALTY_HEALTHCARE',
  EMERGENCY_HEALTHCARE = 'EMERGENCY_HEALTHCARE',
  MENTAL_HEALTHCARE = 'MENTAL_HEALTHCARE',
}
