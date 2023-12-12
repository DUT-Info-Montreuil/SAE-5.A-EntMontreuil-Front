export interface Degree {
    id: number;
    name: string;
    promotions: Promotion[];
    students: Student[];
}

export interface Promotion {
    id: number;
    level: number;
    year: number;
}

export interface Student {
    first_name: string;
    id: number;
    last_name: string;
    td: TD[];
    tp: TP[];
    username: string;
}

export interface TD {
    id_td: number;
    name: string;
}

export interface TP {
    id_tp: number;
    name: string;
}
