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
