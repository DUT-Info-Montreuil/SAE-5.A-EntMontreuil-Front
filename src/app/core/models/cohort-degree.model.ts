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
    id_promotion: number;
    id_student: number;
    isApprentice: boolean;
    last_name: string;
    promotion: Promotion;
    td: TD[];
    tp: TP[];
    username: string;
}

export interface TD {
    id_td: number;
    name: string;
    training: Training;
}

export interface TP {
    id_tp: number;
    name: string;
}

export interface Training {
    id: number;
    name: string,
    semester: number,
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