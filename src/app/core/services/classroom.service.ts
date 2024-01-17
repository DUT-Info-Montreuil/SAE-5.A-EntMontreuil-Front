import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Classroom } from '../models/classroom.model';
import { Equipment } from '../models/equipment.model';
import { ClassroomMaterial } from '../models/classroom_material.model';

@Injectable({
  providedIn: 'root',
})
export class ClassroomService {
  private apiUrl = 'https://localhost:5050'; // Remplacez par l'URL de base de votre API

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getClassroomById(id: number): Observable<Classroom> {
    return this.http
      .get<Classroom[]>(`${this.apiUrl}/classrooms/${id}`, this.httpOptions)
      .pipe(map((classrooms) => classrooms[0]));
  }

  getEquipments(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(
      this.apiUrl + '/materials',
      this.httpOptions
    );
  }

  updateClassroomEquipmentQuantity(
    idClassroom: number,
    idEquipment: number,
    newQuantity: number
  ): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/classrooms/${idClassroom}/equipments/${idEquipment}`,
      { datas: { new_quantity: newQuantity } },
      this.httpOptions
    );
  }

  addEquipmentsToClassroom(
    idClassroom: number,
    equipmentIds: number[]
  ): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/classrooms/${idClassroom}/equipments`,
      { datas: { equipment_ids: equipmentIds } },
      this.httpOptions
    );
  }
  removeEquipmentFromClassroom(
    idClassroom: number,
    idEquipment: number
  ): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}/classrooms/${idClassroom}/equipments/${idEquipment}`,
      this.httpOptions
    );
  }
  updateClassroom(
    id: number,
    updatedClassroom: Partial<Classroom>
  ): Observable<any[]> {
    const url = `${this.apiUrl}/classrooms/${id}`;
    return this.http.put<any[]>(url, updatedClassroom);
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