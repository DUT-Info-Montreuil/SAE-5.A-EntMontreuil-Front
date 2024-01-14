import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Degree } from '../models/cohort-degree.model';
import { Observable } from 'rxjs';
import { TreeNode } from 'primeng/api';
import { Promotion } from '../models/cohort-promotion.model';
import { Training } from '../models/cohort-training.model';
import { TD } from '../models/cohort-td.model';
import { TP } from '../models/cohort-tp.model';
import { SingleTD } from '../models/single-td.model';
import { SingleTP } from '../models/single-tp.model';

@Injectable({ providedIn: 'root' })
export class CohortService {
  private apiURL = 'https://localhost:5050';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) { }

  getDegreeInfo(id: string) {
    return this.http.get<Degree>(
      this.apiURL + `/degree/${id}`,
      this.httpOptions
    );
  }

  getPromotionInfo(id: string) {
    return this.http.get<Promotion>(
      this.apiURL + `/promotion/${id}`,
      this.httpOptions
    );
  }

  getTrainingInfo(id: string) {
    return this.http.get<Training>(
      this.apiURL + `/training/${id}`,
      this.httpOptions
    );
  }

  getTDInfo(id: string) {
    return this.http.get<TD>(
      this.apiURL + `/td/${id}`,
      this.httpOptions
    );
  }

  getTPInfo(id: string) {
    return this.http.get<TP>(
      this.apiURL + `/tp/${id}`,
      this.httpOptions
    );
  }

  addTD(td: SingleTD): Observable<any> {
    return this.http.post<SingleTD>(
      `${this.apiURL}/td`, // Endpoint pour créer un parcours
      td, // Utilisez la structure adaptée
      this.httpOptions
    );
  }

  addTP(tp: SingleTP): Observable<any> {
    return this.http.post<SingleTP>(
      `${this.apiURL}/tp`, // Endpoint pour créer un parcours
      tp, // Utilisez la structure adaptée
      this.httpOptions
    );
  }

  getFiles(): Observable<TreeNode[]> {
    return this.http.get<TreeNode[]>(this.apiURL + `/cohort`, this.httpOptions);
  }

  getStudentsInPromo(promo_id: number) {
    return this.http.get<any[]>(
      this.apiURL + `/students/promotion/${promo_id}`,
      this.httpOptions
    );
  }

  getStudentsAll() {
    return this.http.get<any[]>(
      this.apiURL + `/students/all`,
      this.httpOptions
    );
  }

  addStudentsToTP(tp_id: number, student_ids: number[]) {
    return this.http.post<any>(
      this.apiURL + `/tp/${tp_id}/add-students`,
      JSON.stringify({ student_ids }),
      this.httpOptions
    );
  }

  removeStudentFromDegree(student_id: number) {
    return this.http.get<any>(
      this.apiURL + `/tp/remove_student/${student_id}`,
      this.httpOptions
    );
  }

  deleteTP(tp_id: number) {
    return this.http.delete<any>(
      this.apiURL + `/tp/${tp_id}`,
      this.httpOptions
    );
  }

  deleteTD(td_id: number) {
    return this.http.delete<any>(
      this.apiURL + `/td/${td_id}`,
      this.httpOptions
    );
  }
}
