import { Component, OnInit } from '@angular/core';
import { Absence } from 'src/app/core/models/absence.model';
import { AbsencesService } from 'src/app/core/services/absences.service';

@Component({
  selector: 'app-absences-layout',
  templateUrl: './absences-layout.component.html',
  styleUrls: ['./absences-layout.component.scss'],
  styles: [
    `
        :host ::ng-deep .p-datatable .p-datatable-thead > tr > th {
            background-color: white;
        }
    `
  ],
})
export class AbsencesLayoutComponent implements OnInit {
  isLoading: boolean = true;
  public chartOptions: any;
  public absencesData: Absence[] = []; // Variable pour stocker les données
  public filteredAbsences: Absence[] = []; // Pour les absences filtrées
  public searchText: string = ''; // Pour stocker la chaîne de recherche
  public onlyUnjustified = false; // Suivre l'état du switch

  public displayJustifyModal: boolean = false;
  public selectedAbsence: Absence | null = null;


  constructor(private absencesService: AbsencesService) { }

  ngOnInit(): void {
    this.absencesService.getStudentAbsences().subscribe(absences => {
      this.absencesData = absences; // Stockage des données récupérées
      this.filteredAbsences = [...this.absencesData]; // Initialisation avec toutes les données
      this.isLoading = false;
    });
  }

  // Activation ou désactivation du filtre "Uniquement les absences injustifiées"
  toggleOnlyUnjustified(): void {
    this.onlyUnjustified = !this.onlyUnjustified;
    this.filterAbsences();
  }

  // Modal de justification ============================================================================
  openJustifyModal(absence: Absence) {
    this.selectedAbsence = absence; // Assurez-vous que selectedAbsence est défini dans votre composant
    this.displayJustifyModal = true; // Ce booléen doit être relié au modal
  }

  handleModalClose() {
    this.displayJustifyModal = false;
    this.selectedAbsence = null;
    // Rafraîchir les données ici
  }

  // Fin modal de justification ========================================================================

  // Fonctions de filtrage ============================================================================

  filterAbsences(): void {
    if (this.onlyUnjustified) {
      this.applyUnjustifiedFilter();
    } else {
      this.applyRegularFilter();
    }
  }

  applyUnjustifiedFilter(): void {
    this.filteredAbsences = this.getUnjustifiedAbsences();
  }

  applyRegularFilter(): void {
    if (!this.searchText) {
      this.filteredAbsences = [...this.absencesData];
    } else {
      this.filteredAbsences = this.absencesData.filter(absence => {
        return absence.resource_name.toLowerCase().includes(this.searchText.toLowerCase()) ||
          absence.reason.toLowerCase().includes(this.searchText.toLowerCase());
      });
    }
  }

  getJustifiedAbsences(): Absence[] {
    return this.absencesData.filter(absence => absence.justify);
  }

  getUnjustifiedAbsences(): Absence[] {
    return this.absencesData.filter(absence => !absence.justify);
  }

  // Fin fonctions de filtrage ============================================================================

  // Fonctions de conversion des heures ============================================================

  calculateTotalJustifiedHours(): string {
    const justifiedAbsences = this.getJustifiedAbsences();
    return this.calculateTotalHoursString(justifiedAbsences);
  }

  calculateTotalHours(absences: Absence[]): number {
    let totalHours = 0;

    absences.forEach(absence => {
      const dateStart = new Date(absence.course_date + 'T' + absence.course_start_time);
      const dateEnd = new Date(absence.course_date + 'T' + absence.course_end_time);
      totalHours += this.calculateHourDifference(dateStart, dateEnd);
    });

    return totalHours;
  }

  calculateTotalHoursString(absences: Absence[]): string {
    let totalHours = 0;

    absences.forEach(absence => {
      const dateStart = new Date(absence.course_date + 'T' + absence.course_start_time);
      const dateEnd = new Date(absence.course_date + 'T' + absence.course_end_time);
      totalHours += this.calculateHourDifference(dateStart, dateEnd);
    });

    // Séparation des heures entières et des minutes
    const hours = Math.floor(totalHours);
    const minutes = Math.round((totalHours - hours) * 60);

    // Formatage du résultat en "4h30"
    return `${hours}h${minutes.toString().padStart(2, '0')}`;
  }

  calculateHourDifference(dateDebut: Date, dateFin: Date): number {
    const differenceEnMillisecondes = dateFin.getTime() - dateDebut.getTime();
    const differenceEnHeures = differenceEnMillisecondes / (1000 * 60 * 60);
    return differenceEnHeures;
  }

  convertirEtFormaterHeure(heureChaine: string): string {
    if (!heureChaine) return '';

    // Créer une date fictive, car seule l'heure nous intéresse
    const dateFictive = new Date(`1970-01-01T${heureChaine}`);

    return dateFictive.getHours().toString().padStart(2, '0') + 'h' + dateFictive.getMinutes().toString().padStart(2, '0');
  }

  calculateTimeDifference(start: string, end: string): string {
    const startDate = new Date(`1970-01-01T${start}`);
    const endDate = new Date(`1970-01-01T${end}`);

    const differenceInMs = endDate.getTime() - startDate.getTime();
    const hours = Math.floor(differenceInMs / (1000 * 60 * 60));
    const minutes = Math.floor((differenceInMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}h${minutes.toString().padStart(2, '0')}`;
  }

  // Fin fonctions de conversion des heures ============================================================

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