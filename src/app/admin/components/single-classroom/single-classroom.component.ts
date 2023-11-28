import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Classroom } from 'src/app/core/models/classroom.model';
import { ClassroomService } from 'src/app/core/services/classroom.service';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-single-classroom',
  templateUrl: './single-classroom.component.html',
  styleUrls: ['./single-classroom.component.scss']
})
export class SingleClassroomComponent implements  OnInit {

  classroomId!: number;

  classroomData !: Classroom;

  constructor(private route: ActivatedRoute, private classroomService: ClassroomService) { }


  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    // Assurez-vous que idParam n'est pas null avant de convertir en nombre
    if (idParam !== null) {
      this.classroomId = +idParam;
    }

    this.classroomService.getClassroomById(this.classroomId).subscribe(classroom => {
      this.classroomData = classroom;
      console.log(this.classroomData)
    });
    
  }



}
