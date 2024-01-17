export class Ressource {
  id: number;
  name: string;
  id_Training: number;
  color: string;
  is_editing: boolean;
  training_name: string;
  training_semester: number;
  originalName: string;
  originalId_Training: number;
  originalColor: string;

  constructor(
    id: number,
    name: string,
    id_Training: number,
    color: string,
    is_editing: boolean = false,
    training_name: string,
    training_semester: number
  ) {
    this.id = id;
    this.name = name;
    this.id_Training = id_Training;
    this.color = color;
    this.is_editing = is_editing;
    this.training_name = training_name;
    this.training_semester = training_semester;
    this.originalName = name;
    this.originalId_Training = id_Training;
    this.originalColor = color;
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