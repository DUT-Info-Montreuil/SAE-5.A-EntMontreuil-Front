import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Degree } from '../models/cohort-degree.model';
import { Observable } from 'rxjs';
import { TreeNode } from 'primeng/api';
import { Promotion } from '../models/cohort-promotion.model';

@Injectable({ providedIn: 'root' })
export class CohortService {
  private apiURL = 'https://localhost:5050';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

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

  getFiles(): Observable<TreeNode[]> {
    return this.http.get<TreeNode[]>(this.apiURL + `/cohort`, this.httpOptions);
  }
}
