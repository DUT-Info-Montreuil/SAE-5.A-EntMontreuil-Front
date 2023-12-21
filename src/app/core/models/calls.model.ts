export interface Call {
    id: number;
    id_Course: number;
    is_present: boolean;
    student: {
        id: number;
        first_name: string;
        last_name: string;
      }[];
}