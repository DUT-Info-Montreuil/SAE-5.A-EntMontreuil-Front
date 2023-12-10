export class Training {
  id!: number; // Unique identifier for the training
  name!: string; // Name of the training
  id_Degree!: number; // ID of the associated degree
  degree_name!: string; // Name of the associated degree
  // Additional fields for UI interactions
  isEditing: boolean = false;
  isLoading: boolean = false;
  updatedName!: string; // To hold the updated name during editing
  updatedDegreeId!: number; // To hold the updated degree ID during editing
  updatedPromotionId!: number;
  updatedSemester!: number;
  id_Promotion!: number;
  promotion_year!: number;
  semester!: number;
  constructor(
    id: number,
    name: string,
    id_promotion: number,
    semester: number
  ) {
    this.id = id;
    this.name = name;
    this.id_Promotion = id_promotion;
    this.semester = semester;
  }
}
