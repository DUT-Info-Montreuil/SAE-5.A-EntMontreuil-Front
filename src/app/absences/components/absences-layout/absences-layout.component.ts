import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Absence } from 'src/app/core/models/absence.model';
import { AbsencesService } from 'src/app/core/services/absences.service';

@Component({
  selector: 'app-absences-layout',
  templateUrl: './absences-layout.component.html',
  styleUrls: ['./absences-layout.component.scss'],
})
export class AbsencesLayoutComponent implements OnInit {
  absences!: Observable<Absence[]>;
  justifiedAbsences: Absence[] = [];
  unjustifiedAbsences: Absence[] = [];

  constructor(private absencesService: AbsencesService) {}

  ngOnInit(): void {
    this.absences = this.absencesService.getStudentAbsences();
    this.absences.subscribe((data) => {
      this.justifiedAbsences = data.filter((absence) => absence.justify);
      this.unjustifiedAbsences = data.filter((absence) => !absence.justify);
    });
  }
  calculateTotalHours(absences: Absence[]): string {
    let totalMinutes = 0;

    absences.forEach((absence) => {
      const dateStart = new Date(
        absence.course_date + 'T' + absence.course_start_time
      );
      const dateEnd = new Date(
        absence.course_date + 'T' + absence.course_end_time
      );
      totalMinutes += this.calculateMinuteDifference(dateStart, dateEnd);
    });

    return this.convertMinutesToHoursMinutes(totalMinutes);
  }

  calculateMinuteDifference(dateStart: Date, dateEnd: Date): number {
    const differenceInMillis = dateEnd.getTime() - dateStart.getTime();
    return Math.round(differenceInMillis / (1000 * 60));
  }

  convertMinutesToHoursMinutes(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h${remainingMinutes}min`;
  }

  calculateTotalUnjustifiedHours(absences: Absence[]): string {
    let totalUnjustifiedMinutes = 0;

    absences.forEach((absence) => {
      if (!absence.justify) {
        const dateStart = new Date(
          absence.course_date + 'T' + absence.course_start_time
        );
        const dateEnd = new Date(
          absence.course_date + 'T' + absence.course_end_time
        );
        totalUnjustifiedMinutes += this.calculateMinuteDifference(
          dateStart,
          dateEnd
        );
      }
    });

    return this.convertMinutesToHoursMinutes(totalUnjustifiedMinutes);
  }
}
