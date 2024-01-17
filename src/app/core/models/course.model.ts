export class Course {
  id: number;
  startTime: string;
  endTime: string;
  dateCourse: string;
  control: boolean;
  resource: {
    id: number;
    name: string;
    color: string;
  };
  td: number[];
  training: number[];
  tp: number[];
  promotion: number[];
  teacher: {
    id: number;
    first_name: string;
    last_name: string;
    initial: string;
    username: string;
  }[];
  classroom: {
    id: number;
    name: string;
    capacity: number;
  }[];

  constructor(data: any) {
    this.id = data.id;
    this.startTime = data.startTime;
    this.endTime = data.endTime;
    this.dateCourse = data.dateCourse;
    this.control = data.control;
    this.resource = {
      id: data.resource.id,
      name: data.resource.name,
      color: data.resource.color,
    };
    this.td = data.td;
    this.tp = data.tp;
    this.promotion = data.promotion;
    this.teacher = data.teacher;
    this.classroom = data.classroom;
    this.training = data.training;
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