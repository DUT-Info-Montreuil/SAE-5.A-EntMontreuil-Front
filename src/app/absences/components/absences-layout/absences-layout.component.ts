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

}