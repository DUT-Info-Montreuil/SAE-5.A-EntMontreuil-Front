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
}
