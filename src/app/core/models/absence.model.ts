import { Time } from "@angular/common";

export interface Absence {
    course_date: Date;
    course_start_time: string;
    course_end_time: string;
    id_Course: number;
    id_Student: number;
    justify: boolean;
    reason: string;
    resource_name: string;
    student_first_name: string;
    student_last_name: string;
}