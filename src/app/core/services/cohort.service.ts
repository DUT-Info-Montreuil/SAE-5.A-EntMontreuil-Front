import { Injectable } from '@angular/core';

@Injectable()
export class CohortService {
    getTreeNodesData() {
        return [
            {
                label: 'INFO',
                icon: 'pi pi-fw pi-compass',
                data: 'degree',
                url: '/resp/cohort/promotion/1',
                children: [
                    {
                        label: 'Promo 2023',
                        data: 'Promotion',
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

    getStudentsByGroupType(group_type: string, group_id: number) {

    }

};