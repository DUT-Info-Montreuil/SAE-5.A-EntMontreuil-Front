import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Classroom } from 'src/app/core/models/classroom.model';
import { ClassroomService } from 'src/app/core/services/classroom.service';

@Component({
  selector: 'app-single-classroom',
  templateUrl: './single-classroom.component.html',
  styleUrls: ['./single-classroom.component.scss'],
})
export class SingleClassroomComponent implements OnInit {
  classroomId!: number;
  classroomData!: Classroom;

  constructor(
    private route: ActivatedRoute,
    private classroomService: ClassroomService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam !== null) {
      this.classroomId = +idParam;

      this.classroomService.getClassroomById(this.classroomId).subscribe(
        (classroom: Classroom) => {
          this.classroomData = classroom;
          console.log(this.classroomData.name);
        },
        (error) => {
          console.error(
            'Erreur lors de la récupération de la salle de classe:',
            error
          );
        }
      );
    }
  }
}
