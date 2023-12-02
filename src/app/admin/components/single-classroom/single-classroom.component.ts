import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dialog } from 'primeng/dialog';
import { Classroom } from 'src/app/core/models/classroom.model';
import { Equipment } from 'src/app/core/models/equipment.model';
import { ClassroomService } from 'src/app/core/services/classroom.service';
import { ClassroomEquipmentDialogComponent } from '../classroom-equipment-dialog/classroom-equipment-dialog.component';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-single-classroom',
  templateUrl: './single-classroom.component.html',
  styleUrls: ['./single-classroom.component.scss'],
  styles: [
    `
        :host ::ng-deep .p-datatable .p-datatable-thead > tr > th {
            background-color: white;
        }
    `
  ],
})
export class SingleClassroomComponent implements OnInit {
  classroomId!: number;
  classroomData!: Classroom;
  equipmentData!: Equipment[];
  editingIndex: number | null = null;
  editingQuantity: number = 0;

  constructor(
    private route: ActivatedRoute,
    private classroomService: ClassroomService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.loadClassroomData();
  }

  loadClassroomData(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam !== null) {
      this.classroomId = +idParam;

      this.classroomService.getClassroomById(this.classroomId).subscribe(
        (classroom: Classroom) => {
          this.classroomData = classroom;
          console.log(this.classroomData);
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
        classroomId: this.classroomId,
        existingEquipments: this.classroomData.materials.map(
          (material) => material.equipment
        ),
      },
    });

    ref.onClose.subscribe((result: any) => {
      if (result && result.added) {
        // Ajoutez le nouvel équipement localement
        const newEquipment = {
          id: result.equipmentId,
          equipment: result.equipmentName,
          quantity: result.quantity,
        };

        this.classroomData.materials.push(newEquipment);

        const detailMessage = `${result.equipmentName} (quantité : ${result.quantity}) a été ajouté avec succès à la salle de classe.`;
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: detailMessage,
        });
      }
    });
  }

  startEdit(index: number, material: any): void {
    this.editingIndex = index;
    this.editingQuantity = material.quantity;
  }
  updateQuantity(materialId: number): void {
    if (this.editingIndex !== null) {
      const materialToUpdate = this.classroomData.materials.find(
        (material) => material.id === materialId
      );

      if (materialToUpdate) {
        // Mettez à jour la quantité localement
        materialToUpdate.quantity = this.editingQuantity;

        // Appeler la méthode de mise à jour du service
        this.classroomService
          .updateClassroomEquipmentQuantity(
            this.classroomId,
            materialId,
            this.editingQuantity
          )
          .subscribe((response) => {
            this.cancelEdit();
            this.messageService.add({
              severity: 'success',
              summary: 'Mise à jour',
              detail: 'Mise à jour de la quantité réussie',
            });
          });
      }
    }
  }

  cancelEdit(): void {
    this.editingIndex = null;
  }

  confirmDelete(equipmentId: number): void {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer cet équipement ?',
      accept: () => {
        this.deleteEquipment(equipmentId);
      },
    });
  }

  deleteEquipment(equipmentId: number): void {
    this.classroomService
      .removeEquipmentFromClassroom(this.classroomId, equipmentId)
      .subscribe({
        next: () => {
          const indexToDelete = this.classroomData.materials.findIndex(
            (material) => material.id === equipmentId
          );

          if (indexToDelete !== -1) {
            // Supprimez l'équipement localement
            this.classroomData.materials.splice(indexToDelete, 1);

            this.messageService.add({
              severity: 'success',
              summary: 'Suppression réussie',
              detail: "L'équipement a été supprimé avec succès.",
            });
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

  goBack() {
    this.router.navigate(['admin/classrooms']); // Remplacez '/' par le chemin de la page précédente si nécessaire
  }
}
