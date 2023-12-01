import { ClassroomMaterial } from './classroom_material.model';

export interface Classroom {
  capacity: number;
  id: number;
  materials: ClassroomMaterial[];
  name: string;
  isEditing?: boolean; // Indique si la salle de classe est en cours d'édition
  editedName?: string; // Stocke le nom temporaire pendant l'édition
  editedCapacity?: number; // Stocke la capacité temporaire pendant l'édition
}

export type ClassroomUpdateData = {
  name?: string;
  capacity?: number;
};
