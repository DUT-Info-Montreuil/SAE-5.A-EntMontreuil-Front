export interface Training {
    id: number;
    name: string;
    semester: number;
    degree: Degree;
    promotion: Promotion;
    students: Student[];
    tds: TD[];
}

export interface Degree {
    id: number;
    name: string;
}

export interface Promotion {
    id: number;
    level: number;
    year: number;
}

export interface Student {
    first_name: string;
    id: number;
    id_student: number;
    isApprentice: boolean;
    last_name: string;
    td: TDInfo[];
    tp: TP[];
    username: string;
}

export interface TD {
    id_td: number;
    name: string;
    student_count: number;
    tp_count: number;
}

export interface TDInfo {
    id_td: number;
    name: string;
}

export interface TP {
    id_tp: number;
    name: string;
}
