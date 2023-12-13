export interface Promotion {
  id: number;
  year: number;
  level: number;
  degree: Degree;
  students: Student[];
}

export interface Degree {
  id: number;
  name: string;
}

export interface Student {
  id: number;
  id_student: number;
  username: string;
  first_name: string;
  last_name: string;
  isApprentice: boolean;
  id_promotion: number;
  td: TD[];
  tp: TP[];
}

export interface TD {
  id_td: number;
  name: string;
}

export interface TP {
  id_tp: number;
  name: string;
}
