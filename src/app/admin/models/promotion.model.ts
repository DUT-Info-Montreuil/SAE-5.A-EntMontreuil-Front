export class Promotion {
  id: number;
  year: number;
  level: number;
  id_Degree: number;
  degree_name: string;

  constructor(
    id: number,
    year: number,
    level: number,
    id_Degree: number,
    degree_name: string
  ) {
    this.id = id;
    this.year = year;
    this.level = level;
    this.id_Degree = id_Degree;
    this.degree_name = degree_name;
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