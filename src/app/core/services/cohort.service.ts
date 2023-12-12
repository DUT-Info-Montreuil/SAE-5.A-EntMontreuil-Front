import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Degree } from '../models/cohort-degree.model';

@Injectable(
    { providedIn: 'root' }
)
export class CohortService {

    private apiURL = 'https://localhost:5050';

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    constructor(private http: HttpClient) { }

    getDegreeInfo(id: string) {
        return this.http.get<Degree>(this.apiURL + `/degree/${id}`, this.httpOptions);
    }

    getTreeNodesData() {
        return [
            {
                label: 'INFO',
                icon: 'pi pi-fw pi-compass',
                data: 'degree',
                url: '/resp/cohort/degree/1',
                children: [
                    {
                        label: 'Promo 2023',
                        data: 'Promotion',
                        url: '/resp/cohort/promotion/1',
                        children: [
                            {
                                label: 'Parcours A',
                                data: 'Parcours',
                                children: [
                                    {
                                        label: 'TDA',
                                        data: 'TD',
                                        children: [
                                            {
                                                label: 'TP A1',
                                                data: 'TP'
                                            },
                                            {
                                                label: 'TP A2',
                                                data: 'TP'
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                label: 'Parcours C',
                                data: 'Parcours',
                                children: [
                                    {
                                        label: '2023',
                                        data: 'TD'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
        ];
    }



    getTreeNodes() {
        return Promise.resolve(this.getTreeNodesData());
    }

    getFiles() {
        return Promise.resolve(this.getTreeNodesData());
    }

};