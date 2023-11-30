import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Material } from '../../admin/models/material.model';

@Injectable({
  providedIn: 'root',
})
export class MaterialService implements OnInit {
  private apiURL = 'https://127.0.0.1:5050';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getMaterials(): Observable<Material[]> {
    return this.http.get<Material[]>(
      this.apiURL + '/materials',
      this.httpOptions
    );
  }

  deleteMaterial(id: number): Observable<any> {
    return this.http.delete<any>(
      `${this.apiURL}/materials/${id}`,
      this.httpOptions
    );
  }
  createMaterial(material: { datas: { equipment: string } }): Observable<any> {
    return this.http.post<any>(
      `${this.apiURL}/materials`,
      material,
      this.httpOptions
    );
  }

  updateMaterial(
    id: number,
    material: { datas: { equipment: string } }
  ): Observable<any> {
    return this.http.put<any>(
      `${this.apiURL}/materials/${id}`,
      material,
      this.httpOptions
    );
  }
}
