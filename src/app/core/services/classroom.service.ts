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
      .get<Classroom[]>(`${this.apiUrl}/classrooms/${id}`,this.httpOptions)
      .pipe(map((classrooms) => classrooms[0]));
  }

  getEquipments(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(this.apiUrl + '/materials',this.httpOptions);
  }

  addEquipmentToClassroom(equipmentId:number, idClassroom: number): Observable<any> {
    // Convertissez l'équipement en ClassroomMaterial avant l'ajout

    console.log("Salut");
    const equipmentsId: number[] = []; 
    equipmentsId[0] = equipmentId;
    const data = {"datas": {"equipment_ids" :equipmentsId}};

    // Appel à votre API pour ajouter l'équipement à la salle de classe avec la quantité
    return this.http.post<any>(this.apiUrl + `/classrooms/${idClassroom}/equipments`, data,this.httpOptions);
  }

  addQuantityToEquipment(equipmentId:number, quantity:number, idClassroom: number): Observable<any> {
    console.log("Salut c moi");

    
    const data = {"datas" : {"new_quantity" : quantity} };

    return this.http.post<any>(this.apiUrl + `/classrooms/${idClassroom}/equipments/${equipmentId}`, data,this.httpOptions);
  }



}
