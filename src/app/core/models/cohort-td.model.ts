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
/*ENT Montreuil is a Desktop Working Environnement for the students of the IUT of Montreuil
    Copyright (C) 2024  Steven CHING, Emilio CYRIAQUE-SOURISSEAU ALVARO-SEMEDO, Ismail GADA, Yanis HAMANI, Priyank SOLANKI

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.*/