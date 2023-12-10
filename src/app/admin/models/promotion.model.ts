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
