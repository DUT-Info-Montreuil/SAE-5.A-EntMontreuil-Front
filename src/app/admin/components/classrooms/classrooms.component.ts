import { Component, OnInit } from '@angular/core';
import {
  Classroom,
  ClassroomUpdateData,
} from 'src/app/core/models/classroom.model';
import { ClassroomsService } from 'src/app/core/services/classrooms.service';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.component.html',
  styleUrls: ['./classrooms.component.scss'],
})
export class ClassroomsComponent implements OnInit {
  classrooms!: Classroom[];

  statuses!: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  constructor(
    private classroomsService: ClassroomsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    // Utilisez subscribe pour traiter les valeurs émises par l'observable
    this.classroomsService.getClassrooms().subscribe(
      (data: Classroom[]) => {
        this.classrooms = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error loading data:', error);
        this.loading = false;
      }
    );
  }

  startEdit(classroom: Classroom) {
    classroom.isEditing = true;
    classroom.editedName = classroom.name || ''; // Assurez-vous que ce n'est pas undefined
    classroom.editedCapacity = classroom.capacity || 0; // Utilisez une valeur par défaut si nécessaire
  }

  cancelEdit(classroom: Classroom) {
    classroom.isEditing = false;
  }

  confirmUpdate(classroom: Classroom) {
    if (
      classroom.name !== classroom.editedName ||
      classroom.capacity !== classroom.editedCapacity
    ) {
      this.confirmationService.confirm({
        message: 'Êtes-vous sûr de vouloir effectuer cette modification ?',
        accept: () => {
          this.updateClassroom(classroom);
        },
      });
    } else {
      classroom.isEditing = false;
    }
  }
  updateClassroom(classroom: Classroom) {
    if (classroom.isEditing) {
      const updatedData: ClassroomUpdateData = {
        name: classroom.editedName,
        capacity: classroom.editedCapacity,
      };

      this.classroomsService
        .updateClassroom(classroom.id, { ...classroom, ...updatedData })
        .subscribe(
          (response: any) => {
            const updateMessage = response[0].message;
            const statusCode = response[1];
            console.log(updateMessage); // 'Salle de classe mise à jour avec succès.'
            console.log(statusCode); // 200
            if (statusCode === 200) {
              if (classroom.editedName) {
                classroom.name = classroom.editedName;
              }
              if (classroom.editedCapacity) {
                classroom.capacity = classroom.editedCapacity;
              }
              this.messageService.add({
                severity: 'success',
                summary: 'Modification réussie',
                detail: updateMessage,
              });
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'echec de la modification',
                detail: updateMessage,
              });
            }
            classroom.isEditing = false;
          },
          (error) => {
            console.error('Erreur lors de la mise à jour de la classe', error);
          }
        );
    }
  }

  clear(table: Table) {
    table.clear();
  }

  getSeverity(capacity: number) {
    if (capacity < 10) {
      return 'danger';
    } else if (capacity < 20) {
      return 'warning';
    } else if (capacity > 30) {
      return 'success';
    } else if (capacity > 20) {
      return 'info';
    } else {
      return null;
    }
  }
}
