import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Absence } from 'src/app/core/models/absence.model';
import { AbsencesService } from 'src/app/core/services/absences.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip
} from 'ng-apexcharts';


@Component({
  selector: 'app-absences-layout',
  templateUrl: './absences-layout.component.html',
  styleUrls: ['./absences-layout.component.scss']
})
export class AbsencesLayoutComponent implements OnInit {
  public chartOptions: any;
  public absencesData: Absence[] = []; // Variable pour stocker les données

  constructor(private absencesService: AbsencesService) { }

  ngOnInit(): void {
    this.absencesService.getStudentAbsences().subscribe(absences => {
      this.absencesData = absences; // Stockage des données récupérées

      const absencesByMonth = this.groupAbsencesByMonth(absences);

      this.chartOptions = {
        series: [
          {
            name: "Absences",
            data: Object.values(absencesByMonth)
          }
        ],
        chart: {
          type: "area",
          height: 300
        },
        xaxis: {
          categories: Object.keys(absencesByMonth)
        },
        yaxis: {
          tickAmount: Math.max(...Object.values(absencesByMonth)), // Pour un nombre de graduations adapté
          labels: {
            formatter: function (val: number) {
              return Math.floor(val); // Arrondir les valeurs à l'entier inférieur
            }
          }
        },
        dataLabels: {
          enabled: false // Désactiver les dataLabels
        },
        stroke: {
          curve: 'smooth',
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 90, 100]
          }
        },
      };

    });
  }

  groupAbsencesByMonth(absences: Absence[]): { [key: string]: number } {
    const absencesByMonth: { [key: string]: number } = {};

    // Initialiser tous les mois du semestre avec 0 absences
    for (let i = 0; i < 12; i++) {
      absencesByMonth[this.getMonthName(i)] = 0;
    }

    // Compter les absences pour chaque mois
    absences.forEach(absence => {
      const month = new Date(absence.course_date).getMonth();
      absencesByMonth[this.getMonthName(month)]++;
    });

    return absencesByMonth;
  }

  getMonthName(monthIndex: number): string {
    const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    return monthNames[monthIndex];
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


}