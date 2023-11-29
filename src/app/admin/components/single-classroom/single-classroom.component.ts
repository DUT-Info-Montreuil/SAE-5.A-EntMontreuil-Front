import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dialog } from 'primeng/dialog';
import { Classroom } from 'src/app/core/models/classroom.model';
import { Equipment } from 'src/app/core/models/equipment.model';
import { ClassroomService } from 'src/app/core/services/classroom.service';
import { ClassroomEquipmentDialogComponent } from '../classroom-equipment-dialog/classroom-equipment-dialog.component';
import { DialogService } from 'primeng/dynamicdialog';


@Component({
  selector: 'app-single-classroom',
  templateUrl: './single-classroom.component.html',
  styleUrls: ['./single-classroom.component.scss'],
})
export class SingleClassroomComponent implements OnInit {
  classroomId!: number;
  classroomData!: Classroom;
  equipmentData!: Equipment[];

  constructor(
    private route: ActivatedRoute,
    private classroomService: ClassroomService,
    private dialogService: DialogService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam !== null) {
      this.classroomId = +idParam;

      this.classroomService.getClassroomById(this.classroomId).subscribe(
        (classroom: Classroom) => {
          this.classroomData = classroom;
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

  openEquipmentDialog(): void {
    const ref = this.dialogService.open(ClassroomEquipmentDialogComponent, {
      header: 'Choisir un équipement',
      width: '500px',
      data: {
        classroomId: this.classroomId
      }
    });
  
    ref.onClose.subscribe((result: any) => {
      console.log('Dialog closed with result:', result);
      // Traitez le résultat ici, par exemple, en ajoutant l'équipement avec la quantité à votre liste.
    });
  }

  goBack() {
    this.router.navigate(['admin/classrooms']); // Remplacez '/' par le chemin de la page précédente si nécessaire
}

}


