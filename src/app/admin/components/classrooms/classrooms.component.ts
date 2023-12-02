import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Classroom,
  ClassroomUpdateData,
} from 'src/app/core/models/classroom.model';
import { ClassroomsService } from 'src/app/core/services/classrooms.service';
import { Table } from 'primeng/table';
import { Observable, Subscription } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Dialog } from 'primeng/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.component.html',
  styleUrls: ['./classrooms.component.scss'],
})
export class ClassroomsComponent implements OnInit, OnDestroy {
  classrooms!: Classroom[];
  statuses!: any[];
  loading: boolean = true;
  activityValues: number[] = [0, 100];

  displayModal: boolean = false;
  classroomForm: FormGroup;

  private classroomsSubscription: Subscription | undefined;

  constructor(
    private classroomsService: ClassroomsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {
    this.classroomForm = this.fb.group({
      name: ['', Validators.required],
      capacity: [0, Validators.required],
    });
  }

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy() {
    // Assurez-vous de vous désabonner lors de la destruction du composant
    if (this.classroomsSubscription) {
      this.classroomsSubscription.unsubscribe();
    }
  }

  loadData() {
    this.loading = true;
    // Utilisez subscribe pour traiter les valeurs émises par l'observable
    this.classroomsSubscription = this.classroomsService.getClassrooms().subscribe(
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

  openModal() {
    this.displayModal = true;
  }

  closeModal() {
    this.displayModal = false;
  }

  createClassroom() {
    // S'assurer que le formulaire est valide avant de créer une classe
    if (this.classroomForm.valid) {
      const formData = this.classroomForm.value;
  
      // Appel du service pour créer la classe
      this.classroomsService.addClassroom(formData.name, formData.capacity).subscribe(
        (response) => {
          // Rafraîchissement la liste après avoir créé la classe
          this.loadData();
  
          // Fermer la fenêtre modale
          this.closeModal();
  
          // Message de succès si nécessaire
          this.messageService.add({
            severity: 'success',
            summary: 'Création réussie',
            detail: 'La classe a été créée avec succès.',
          });
        },
        (error) => {
          console.error('Erreur lors de la création de la classe', error);
  
          // Message d'erreur si nécessaire
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur de création',
            detail: 'Une erreur s\'est produite lors de la création de la classe.',
          });
        }
      );
    } else {
      // Message d'erreur si le formulaire n'est pas valide
      this.messageService.add({
        severity: 'error',
        summary: 'Formulaire invalide',
        detail: 'Veuillez remplir tous les champs du formulaire correctement.',
      });
    }
  }

  deleteClassroom(classroom: Classroom) {
    this.classroomsService.deleteClassroom(classroom.id).subscribe(
      (response: any) => {
        const deleteMessage = response?.message;
        console.log(deleteMessage);
  
        // Vérifie si la réponse est définie pour déterminer le succès
        if (response) {
          // Supprimer la classe du tableau local
          this.classrooms = this.classrooms.filter((c) => c.id !== classroom.id);
  
          this.messageService.add({
            severity: 'success',
            summary: 'Suppression réussie',
            detail: deleteMessage,
          });
        } else  {
          this.messageService.add({
            severity: 'error',
            summary: 'Échec de la suppression',
            detail: 'Une erreur s\'est produite lors de la suppression de la classe.',
          });
        }
      },
      (error) => {
        console.error('Erreur lors de la suppression de la classe', error);

        if (error?.status === 500) {

          this.messageService.add({
            severity: 'error',
            summary: 'Échec de la suppression',
            detail: 'La classe est une salle utilisée pour des cours, il est impossible de la supprimer.',
          });

        } else {

          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: 'Une erreur s\'est produite lors de la suppression de la classe.',
          });

        }
      }
    );
  }
  
  
  

  confirmDelete(classroom: Classroom) {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer cette classe ?',
      accept: () => {
        this.deleteClassroom(classroom);
      },
    });
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
