export class Degree {
  id!: number; // Unique identifier for the degree
  name!: string; // Name of the degree
  isEditing: boolean = false; // Whether the degree is being edited
  updatedName: string = ''; // Updated name of the degree
}
