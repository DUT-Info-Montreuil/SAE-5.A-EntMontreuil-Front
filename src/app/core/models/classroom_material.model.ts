export class ClassroomMaterial {
  id!: number;
  equipment!: string;
  quantity!: number;
  isEditing: boolean = false;

  updatedQuantity!: null | number;
}
