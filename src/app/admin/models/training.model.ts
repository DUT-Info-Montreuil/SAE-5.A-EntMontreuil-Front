export class Training {
  id!: number; // Unique identifier for the training
  name!: string; // Name of the training
  id_Degree!: number; // ID of the associated degree
  degree_name!: string; // Name of the associated degree
  // Additional fields for UI interactions
  isEditing: boolean = false;
  updatedName!: string; // To hold the updated name during editing
  updatedDegreeId!: number; // To hold the updated degree ID during editing
  constructor(
    id: number,
    name: string,
    id_Degree: number,
    degree_name: string
  ) {
    this.id = id;
    this.name = name;
    this.id_Degree = id_Degree;
    this.degree_name = degree_name;
  }
}
