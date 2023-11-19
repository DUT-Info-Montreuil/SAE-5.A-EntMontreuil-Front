import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Absence } from 'src/app/core/models/absence.model';
import { AbsencesService } from 'src/app/core/services/absences.service';

@Component({
  selector: 'app-single-absence',
  templateUrl: './single-absence.component.html',
  styleUrls: ['./single-absence.component.scss']
})
export class SingleAbsenceComponent implements OnInit{

  @Input() absence!: Absence;
  dateStart!: Date;
  dateEnd!: Date;

  constructor(private absencesService: AbsencesService){
  }

  ngOnInit(): void {
    
    this.dateStart = new Date(this.absence.course_date + 'T' + this.absence.course_start_time);
    this.dateEnd = new Date(this.absence.course_date + 'T' + this.absence.course_end_time);
  }

  calculateHourDifference(dateDebut: Date, dateFin: Date): number {
    const differenceEnMillisecondes = dateFin.getTime() - dateDebut.getTime();

    const differenceEnHeures = differenceEnMillisecondes / (1000 * 60 * 60);

    return differenceEnHeures;
  }

}
