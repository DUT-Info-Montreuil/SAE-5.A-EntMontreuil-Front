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
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { ClassroomEquipmentDialogComponent } from '../classroom-equipment-dialog/classroom-equipment-dialog.component';
import { Equipment } from 'src/app/core/models/equipment.model';
import { ClassroomService } from 'src/app/core/services/classroom.service';
import { ClassroomMaterial } from 'src/app/core/models/classroom_material.model';
@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.component.html',
  styleUrls: ['./classrooms.component.scss'],
  styles: [
    `
      :host ::ng-deep .p-datatable .p-datatable-thead > tr > th {
        background-color: white;
      }
    `,
  ],
})
export class ClassroomsComponent implements OnInit, OnDestroy {
  classrooms!: Classroom[];
  statuses!: any[];
  loading: boolean = true;
  activityValues: number[] = [0, 100];

  displayModal: boolean = false;
  classroomForm: FormGroup;
  selectedClassroom: Classroom | null = null;

  private classroomsSubscription: Subscription | undefined;

  constructor(
    private classroomsService: ClassroomsService,
    private SingleclassroomService: ClassroomService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private dialogService: DialogService
  ) {
    // Dans le constructeur
    this.classroomForm = this.fb.group({
      name: ['', Validators.required],
      capacity: [0, [Validators.required, this.greaterThanZeroValidator()]],
      addEquipment: [false], // Champ pour la case à cocher
    });
  }
  greaterThanZeroValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valid = control.value > 0;
      return valid ? null : { greaterThanZero: { value: control.value } };
    };
  }
  resetForm(): void {
    this.classroomForm.reset({
      name: '',
      capacity: 0,
      addEquipment: false,
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
    this.classroomsSubscription = this.classroomsService
      .getClassrooms()
      .subscribe(
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
    this.selectedClassroom = null;
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
      this.classroomsService
        .addClassroom(formData.name, formData.capacity)
        .subscribe(
          (response: any) => {
            console.log(response);
            if (response[1] === 201) {
              const newClassroom: Classroom = {
                id: response[0].id,
                name: formData.name,
                capacity: formData.capacity,
                materials: [],
              };

              // Ajoutez le nouvel objet à la liste des classes
              this.classrooms = [...this.classrooms, newClassroom];
              if (formData.addEquipment == true) {
                this.selectedClassroom = newClassroom; // Mise à jour de la salle de classe sélectionnée
              } else {
                this.closeModal();
              }
              this.resetForm();
              // Message de succès si nécessaire
              this.messageService.add({
                severity: 'success',
                summary: 'Création réussie',
                detail: 'La classe a été créée avec succès.',
              });
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Erreur de création',
                detail: response[0].message,
              });
            }
          },
          (error) => {
            console.error('Erreur lors de la création de la classe', error);

            // Message d'erreur si nécessaire
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur de création',
              detail:
                "Une erreur s'est produite lors de la création de la classe.",
            });
          }
        );
    } else {
      let detail =
        'Veuillez remplir tous les champs du formulaire correctement.';
      if (this.classroomForm.hasError('greaterThanZero', 'capacity')) {
        detail = 'La capacité doit être supérieur à 0.';
      }
      this.messageService.add({
        severity: 'error',
        summary: 'Formulaire invalide',
        detail: detail,
      });
    }
  }

  openEquipmentDialog(): void {
    if (this.selectedClassroom) {
      const ref = this.dialogService.open(ClassroomEquipmentDialogComponent, {
        header: 'Ajouter un équipement',
        width: '500px',
        data: {
          classroomId: this.selectedClassroom.id,
          existingEquipments: this.selectedClassroom.materials.map(
            (material) => material.equipment
          ),
        },
      });

      ref.onClose.subscribe((result: any) => {
        if (result && result.added && this.selectedClassroom) {
          const newEquipment = {
            id: result.equipmentId,
            equipment: result.equipmentName,
            quantity: result.quantity,
            updatedQuantity: result.quantity,
            isEditing: false,
          };
          console.log(newEquipment);
          this.selectedClassroom.materials.push(newEquipment);

          const detailMessage = `${result.equipmentName} (quantité : ${result.quantity}) a été ajouté avec succès à la salle de classe.`;
          this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: detailMessage,
          });
        }
      });
    }
  }

  startEditEquipment(material: ClassroomMaterial): void {
    material.isEditing = true;
    material.updatedQuantity = material.quantity; // Initialisez avec la valeur actuelle
  }

  saveEditEquipment(material: ClassroomMaterial): void {
    if (material.updatedQuantity && this.selectedClassroom) {
      // Logique pour sauvegarder les modifications
      material.isEditing = false;
      material.quantity = material.updatedQuantity; // Mettez à jour la quantité
      this.SingleclassroomService.updateClassroomEquipmentQuantity(
        this.selectedClassroom.id,
        material.id,
        material.quantity
      ).subscribe((response) => {
        this.cancelEditEquipment(material);
        this.messageService.add({
          severity: 'success',
          summary: 'Mise à jour',
          detail: 'Mise à jour de la quantité réussie',
        });
      });
    }
  }

  cancelEditEquipment(material: ClassroomMaterial): void {
    // Annule l'édition et réinitialise les valeurs
    material.isEditing = false;
  }

  confirmDeleteEquipment(material: Equipment): void {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer cet équipement ?',
      accept: () => {
        this.DeleteEquipment(material);
      },
    });
  }

  DeleteEquipment(material: Equipment): void {
    if (this.selectedClassroom) {
      this.SingleclassroomService.removeEquipmentFromClassroom(
        this.selectedClassroom?.id,
        material.id
      ).subscribe({
        next: () => {
          if (this.selectedClassroom) {
            const indexToDelete = this.selectedClassroom.materials.findIndex(
              (material) => material.id === material.id
            );

            if (indexToDelete !== -1) {
              // Supprimez l'équipement localement
              this.selectedClassroom.materials.splice(indexToDelete, 1);

              this.messageService.add({
                severity: 'success',
                summary: 'Suppression réussie',
                detail: "L'équipement a été supprimé avec succès.",
              });
            }
          }
        },
        error: (error) => {
          console.error(
            'Erreur lors de la suppression de l’équipement:',
            error
          );
          // Afficher un message d'erreur approprié
        },
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
          this.classrooms = this.classrooms.filter(
            (c) => c.id !== classroom.id
          );

          this.messageService.add({
            severity: 'success',
            summary: 'Suppression réussie',
            detail: deleteMessage,
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Échec de la suppression',
            detail:
              "Une erreur s'est produite lors de la suppression de la classe.",
          });
        }
      },
      (error) => {
        console.error('Erreur lors de la suppression de la classe', error);

        if (error?.status === 500) {
          this.messageService.add({
            severity: 'error',
            summary: 'Échec de la suppression',
            detail:
              'La classe est une salle utilisée pour des cours, il est impossible de la supprimer.',
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail:
              "Une erreur s'est produite lors de la suppression de la classe.",
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
