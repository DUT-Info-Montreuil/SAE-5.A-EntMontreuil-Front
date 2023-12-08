export class Ressource {
  id: number;
  name: string;
  training: string;
  id_Training: number;
  color: string;
  is_editing: boolean;
  training_name: string;
  training_semester: number;

  constructor(
    id: number,
    name: string,
    training: string,
    id_Training: number,
    color: string,
    is_editing: boolean = false, // Initialisation par défaut à 'false'
    training_name: string,
    training_semester: number
  ) {
    this.id = id;
    this.name = name;
    this.training = training;
    this.id_Training = id_Training;
    this.color = color;
    this.is_editing = is_editing;
    this.training_name = training_name;
    this.training_semester = training_semester;
  }
}
