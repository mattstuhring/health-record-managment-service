export interface Record {
  id: string;
  name: string;
  dob: string;
  health: Health;
}

export enum Health {
  EXCELLENT = 'EXCELLENT',
  GOOD = 'GOOD',
  FAIR = 'FAIR',
  POOR = 'POOR',
}
