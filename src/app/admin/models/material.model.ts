export class Material {
  id!: number;
  equipment!: string;

  isEditing: boolean = false;
  isLoading = false;
  updatedEquipment!: string;
}
