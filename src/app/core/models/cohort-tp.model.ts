export interface TP {
    id: number;
    name: string;
    td: TDInfo;
    training: TrainingInfo;
    promotion: PromotionInfo;
    degree: DegreeInfo;
    students: StudentInfo[];
}

export interface TDInfo {
    id: number;
    name: string;
}

export interface TrainingInfo {
    id: number;
    name: string;
    semester: number;
}

export interface PromotionInfo {
    id: number;
    level: number;
    year: number;
}

export interface DegreeInfo {
    id: number;
    name: string;
}

export interface StudentInfo {
    id: number;
    id_student: number;
    username: string;
    first_name: string;
    last_name: string;
    isApprentice: boolean;
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