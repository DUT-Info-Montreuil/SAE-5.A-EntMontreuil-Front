export interface Degree {
    id: number;
    name: string;
}

export interface Promotion {
    id: number;
    level: number;
    year: number;
}

export interface Training {
    id: number;
    name: string;
    semester: number;
}

export interface TP {
    id_tp: number;
    name: string;
    student_count?: number;
}

export interface Student {
    first_name: string;
    id: number;
    id_student: number;
    isApprentice: boolean;
    last_name: string;
    tp: TP[];
    username: string;
}

export interface TD {
    id: number;
    name: string;
    promotion: Promotion;
    students: Student[];
    tps: TP[];
    training: Training;
    degree: Degree;
}
