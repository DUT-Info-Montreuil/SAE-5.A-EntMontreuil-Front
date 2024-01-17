export interface Student {
    apprentice: boolean;
    email: string;
    first_name: string;
    last_name: string;
    student_id: number;
    username: string;
    is_absent: boolean;
}

export interface StudentABS {
    group_id: string;
    group_type: string;
    course_id: string;
    students: Student[];
}