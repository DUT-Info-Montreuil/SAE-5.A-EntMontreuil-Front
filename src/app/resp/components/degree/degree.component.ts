import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { set } from 'date-fns';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Degree, Promotion } from 'src/app/core/models/cohort-degree.model';
import { CohortStudent } from 'src/app/core/models/cohort-students.model';
import { CohortService } from 'src/app/core/services/cohort.service';
import { CohortSharedService } from 'src/app/shared/services/cohort-shared.service';

@Component({
  selector: 'app-degree',
  templateUrl: './degree.component.html',
  styleUrls: ['./degree.component.scss'],
  styles: [
    `
      :host ::ng-deep .p-tabview-panels {
        padding: 0;
        padding-top: 1.5em;
      }
      :host ::ng-deep th {
        background-color: transparent !important;
      }
    `,
  ],
  providers: [MessageService],
})
export class DegreeComponent implements OnInit {
  degreeInfo!: Degree;

  loading: boolean = false;

  menuItemsStudents: MenuItem[] | undefined; // Menu des actions pour les étudiants
  menuItemsPromotions: MenuItem[] | undefined;
  selectedMenu: string = 'nopromotion';
  menuSelectedPromo: Promotion | null = null;
  menuSelectedStudentId: number | null = null;

  searchQuery: string = '';

  studentsList!: CohortStudent[];
  displayedStudents: CohortStudent[] = [];
  selectedStudents: CohortStudent[] = [];
  selectedStudentIds: number[] = [];

  private _isAddStudentsDialogVisible = false;

  constructor(
    private route: ActivatedRoute,
    private cohortService: CohortService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private cohortSharedService: CohortSharedService
  ) { }

  ngOnInit() {
    // Récupérer les informations de la formation (degree) depuis l'API
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.cohortService.getDegreeInfo(id).subscribe(
          (data) => {
            this.degreeInfo = data; // Stockez les données reçues dans la variable
            // console.log(this.degreeInfo);  // Affichez les données dans la console pour vérifier
          },
          (error) => {
            console.error(
              'Erreur lors de la récupération des informations de degree:',
              error
            );
          }
        );
      }
    });

    // Créer le menu des actions pour les étudiants
    this.menuItemsStudents = [
      {
        label: 'Voir',
        icon: 'pi pi-eye',
        command: () => { },
      },
      {
        label: 'Éditer',
        icon: 'pi pi-pencil',
        command: () => { },
      },
      {
        label: 'Retirer de la formation',
        icon: 'pi pi-times',
        command: () => {
          this.cohortService.removeStudentFromDegree(this.menuSelectedStudentId!).subscribe(
            (data) => {
              console.log(data);
              this.refreshDegreeData();

              // Afficher un toast de succès
              this.messageService.add({
                severity: 'success',
                summary: 'Succès',
                detail: 'Cet étudiant a été retiré de la formation.'
              });
            },
            (error) => {
              console.error(
                'Erreur lors de la suppression de l\'étudiant de la formation:',
                error
              );

              this.messageService.add({
                severity: 'error',
                summary: 'Erreur',
                detail: 'Une erreur s\'est produite.'
              });
            }
          );
        },
      },
    ];

    // Créer le menu des actions pour Promotions
    this.menuItemsPromotions = [
      {
        label: 'Voir',
        icon: 'pi pi-eye',
        command: () => { },
      },
      {
        label: 'Éditer',
        icon: 'pi pi-pencil',
        command: () => { },
      },
      {
        label: 'Ajouter des étudiants dans la promotion',
        icon: 'pi pi-user-plus',
        command: () => {
          this.isAddStudentsDialogVisible = true;
        },
      },
    ];
  }

  selectMenuPromotion(promotion: Promotion) {
    this.menuSelectedPromo = promotion;
  }

  selectMenu(menu: string) {
    this.selectedMenu = menu;
    if (menu === 'all') {
      this.loadAllStudents();
    } else if (menu === 'nopromotion') {
      this.loadNoPromoStudents();
    }
  }

  selectMenuStudent(studentId: number) {
    this.menuSelectedStudentId = studentId;
  }

  get isAddStudentsDialogVisible(): boolean {
    return this._isAddStudentsDialogVisible;
  }

  set isAddStudentsDialogVisible(value: boolean) {
    this._isAddStudentsDialogVisible = value;
    if (value) {
      this.loadNoPromoStudents(); // Charger les étudiants lorsque le dialogue est ouvert
    }
  }

  loadAllStudents() {
    this.cohortService.getStudentsAll().subscribe(
      data => {
        this.studentsList = data;
        this.filterStudents(); // Appliquez les filtres actuels aux nouvelles données
      },
      error => {
        console.error("Erreur lors de la récupération de tous les étudiants: ", error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: "Impossible de charger tous les étudiants."
        });
      }
    );
  }

  loadNoPromoStudents() {
    this.cohortService.getStudentsNoPromo().subscribe(
      data => {
        this.studentsList = data;
        this.filterStudents(); // Appliquez les filtres actuels aux nouvelles données
      },
      error => {
        console.error("Erreur lors de la récupération de tous les étudiants: ", error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: "Impossible de charger tous les étudiants."
        });
      }
    );
  }

  // Méthode pour ajouter des étudiants dans une promotion
  addStudents() {
    this.loading = true;

    this.cohortService.addStudentsToPromotion(this.menuSelectedPromo!.id, this.selectedStudentIds).subscribe(
      response => {
        this.isAddStudentsDialogVisible = false;
        this.selectedStudentIds = [];
        this.selectedStudents = [];
        this.displayedStudents = [];
        this.selectedMenu = 'nopromotion';
        this.studentsList = [];
        this.refreshDegreeData();

        // Afficher un toast de succès
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Les étudiants ont été ajoutés avec succès.'
        });

        this.loading = false
      },
      error => {
        console.error("Erreur lors de l'ajout des étudiants à la promotion: ", error);

        // Afficher un toast d'erreur
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: "Une erreur est survenue lors de l'ajout des étudiants."
        });

        this.loading = false
      }
    );
  }

  onRowSelect(event: any) {
    this.selectedStudentIds.push(event.data.student_id);
    console.log('Selected IDs:', this.selectedStudentIds);
  }

  onRowUnselect(event: any) {
    this.selectedStudentIds = this.selectedStudentIds.filter(id => id !== event.data.student_id);
    console.log('Selected IDs:', this.selectedStudentIds);
  }

  filterStudents() {
    let filteredStudents = this.studentsList;

    // Filtrer par recherche si nécessaire
    if (this.searchQuery) {
      filteredStudents = filteredStudents.filter(student =>
        student.first_name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        student.last_name.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }

    this.displayedStudents = filteredStudents;
  }

  getStudentCountByPromotion(id_promotion: number): number {
    return (
      this.students?.filter((student) => student.id_promotion === id_promotion)
        .length || 0
    );
  }

  get promotions() {
    return this.degreeInfo?.promotions;
  }

  get students() {
    return this.degreeInfo?.students;
  }

  refreshDegreeData() {
    const degreeId = this.route.snapshot.paramMap.get('id');
    if (degreeId) {
      this.cohortService.getDegreeInfo(degreeId).subscribe(
        data => {
          this.degreeInfo = data;
        },
        error => {
          console.error('Erreur lors de la récupération des informations du Degree:', error);
        }
      );
    }
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