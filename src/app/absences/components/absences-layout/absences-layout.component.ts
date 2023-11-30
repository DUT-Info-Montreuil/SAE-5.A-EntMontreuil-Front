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
  public chartOptions: any;
  public absencesData: Absence[] = []; // Variable pour stocker les données

  constructor(private absencesService: AbsencesService) { }

  ngOnInit(): void {
    this.absencesService.getStudentAbsences().subscribe(absences => {
      this.absencesData = absences; // Stockage des données récupérées
    });
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

  calculateHourDifference(dateDebut: Date, dateFin: Date): number {
    const differenceEnMillisecondes = dateFin.getTime() - dateDebut.getTime();
    const differenceEnHeures = differenceEnMillisecondes / (1000 * 60 * 60);
    return differenceEnHeures;
  }

  convertirEtFormaterHeure(heureChaine: string): string {
    // Assurez-vous que la chaîne n'est pas vide
    if (!heureChaine) return '';

    // Créez une date fictive, car seule l'heure nous intéresse
    const dateFictive = new Date(`1970-01-01T${heureChaine}`);

    // Utilisez DatePipe ou une autre méthode pour formater l'heure
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

}