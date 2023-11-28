import { ClassroomMaterial } from './classroom_material.model';

export interface Classroom {
  capacity: number;
  id: number;
  materials: ClassroomMaterial[];
  name: string;
}
