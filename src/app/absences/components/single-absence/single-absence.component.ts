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

  constructor(private absencesService: AbsencesService){}

  ngOnInit(): void {
    
  }

}
