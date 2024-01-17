export class Degree {
  id!: number; // Unique identifier for the degree
  name!: string; // Name of the degree
  isEditing: boolean = false; // Whether the degree is being edited
  updatedName: string = ''; // Updated name of the degree

  constructor(
    id: number,
    name: string,
  ) {
    this.id = id;
    this.name = name;
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