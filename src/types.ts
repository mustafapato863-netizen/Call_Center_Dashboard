// --- Core Data Types ---

export interface AgentRecord {
  identity: {
    name: string;
    month: string;
  };
  calls: {
    inbound: number;
    outbound: number;
    total_handled: number;
    abandoned: number;
    aht_raw: string;
  };
  geo: {
    bookings: GeoBreakdown;
    attended: GeoBreakdown;
  };
  actual: {
    booking_rate: number;
    attend_rate: number;
    abandon_rate: number;
  };
  achievement: {
    booking_ach: number;
    attend_ach: number;
  };
  evaluation: {
    score: number;
    grade: string;
  };
}

export interface GeoBreakdown {
  dubai: number;
  sharjah: number;
  ajman: number;
  clinics: number;
}

export type LocationKey = 'all' | 'dubai' | 'sharjah' | 'ajman' | 'clinics';

export type MonthKey = 'All' | 'January' | 'February' | 'March';

export const LOCATION_OPTIONS: { value: LocationKey; label: string }[] = [
  { value: 'all', label: 'All Locations' },
  { value: 'dubai', label: 'Dubai' },
  { value: 'sharjah', label: 'Sharjah' },
  { value: 'ajman', label: 'Ajman' },
  { value: 'clinics', label: 'Clinics' },
];

export const MONTH_OPTIONS: MonthKey[] = ['All', 'January', 'February', 'March'];
