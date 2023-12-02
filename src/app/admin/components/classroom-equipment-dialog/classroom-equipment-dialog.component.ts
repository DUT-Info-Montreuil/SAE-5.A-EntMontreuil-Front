import { Component, OnInit, Input } from '@angular/core';
import { ClassroomService } from 'src/app/core/services/classroom.service';
import { Equipment } from 'src/app/core/models/equipment.model';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-classroom-equipment-dialog',
  templateUrl: './classroom-equipment-dialog.component.html',
  styleUrls: ['./classroom-equipment-dialog.component.scss'],
})
export class ClassroomEquipmentDialogComponent implements OnInit {
  availableEquipments: Equipment[] = [];
  selectedEquipment: Equipment | null = null;
  selectedQuantity: number = 1;
  classroomId!: number;
  filteredEquipments: Equipment[] = [];
  existingEquipments: string[] = [];
  searchTerm: string = '';
  constructor(
    private classroomService: ClassroomService,
    private config: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef
  ) {}

  ngOnInit(): void {
    if (this.config && this.config.data) {
      this.classroomId = this.config.data.classroomId;
      this.existingEquipments = this.config.data.existingEquipments || [];
    }

    this.classroomService.getEquipments().subscribe((equipments) => {
      this.availableEquipments = equipments.filter(
        (equipment) => !this.existingEquipments.includes(equipment.equipment)
      );
      this.filteredEquipments = [...this.availableEquipments];
    });
  }

  chooseEquipment(): void {
    if (this.selectedEquipment && this.selectedQuantity > 0) {
      const selectedEquipmentId = this.selectedEquipment.id;
      const selectedEquipmentName = this.selectedEquipment.equipment; // Obtenez le nom de l'équipement ici

      this.classroomService
        .addEquipmentsToClassroom(this.classroomId, [selectedEquipmentId])
        .subscribe({
          next: (response) => {
            console.log('Équipement ajouté à la salle de classe:', response);

            // Mettre à jour la quantité de l'équipement
            this.classroomService
              .updateClassroomEquipmentQuantity(
                this.classroomId,
                selectedEquipmentId,
                this.selectedQuantity
              )
              .subscribe({
                next: (updateResponse) => {
                  console.log('Quantité mise à jour:', updateResponse);
                },
                error: (error) => {
                  console.error(
                    'Erreur lors de la mise à jour de la quantité:',
                    error
                  );
                },
              });

            // Ferme le dialogue avec des détails personnalisés
            this.dialogRef.close({
              added: true,
              equipmentId: selectedEquipmentId,
              equipmentName: selectedEquipmentName, // Utilisez le nom ici
              quantity: this.selectedQuantity,
            });
          },
          error: (error) => {
            console.error("Erreur lors de l'ajout de l'équipement:", error);
          },
        });
    } else {
      console.error(
        'Veuillez sélectionner un équipement et spécifier une quantité valide.'
      );
    }
  }
  filterEquipments(): void {
    this.filteredEquipments = this.availableEquipments.filter((equipment) =>
      equipment.equipment.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
