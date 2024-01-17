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
/*ENT Montreuil is a Desktop Working Environnement for the students of the IUT of Montreuil
    Copyright (C) 2024  Steven CHING, Emilio CYRIAQUE-SOURISSEAU ALVARO-SEMEDO, Ismail GADA, Yanis HAMANI, Priyank SOLANKI

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.*/