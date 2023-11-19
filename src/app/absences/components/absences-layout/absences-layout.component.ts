import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Absence } from 'src/app/core/models/absence.model';
import { AbsencesService } from 'src/app/core/services/absences.service';

@Component({
  selector: 'app-absences-layout',
  templateUrl: './absences-layout.component.html',
  styleUrls: ['./absences-layout.component.scss']
})
export class AbsencesLayoutComponent implements OnInit {


  absences!: Observable<Absence[]>;

  constructor(private absencesService: AbsencesService) {}

  ngOnInit(): void {
    this.absences = this.absencesService.getStudentAbsences();
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