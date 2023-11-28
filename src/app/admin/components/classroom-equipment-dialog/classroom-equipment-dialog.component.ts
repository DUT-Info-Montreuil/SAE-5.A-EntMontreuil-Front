import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ClassroomService } from 'src/app/core/services/classroom.service'; // Remplacez par le bon chemin
import { Equipment } from 'src/app/core/models/equipment.model'; // Remplacez par le bon chemin
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-classroom-equipment-dialog',
  templateUrl: './classroom-equipment-dialog.component.html',
  styleUrls: ['./classroom-equipment-dialog.component.scss'], // Assurez-vous que le chemin est correct
})

export class ClassroomEquipmentDialogComponent implements OnInit {
  availableEquipments: Equipment[] = [];
  selectedEquipment!: Equipment;
  selectedQuantity!: number;
  dialogRef!: DynamicDialogRef;
  display = false;
  classroomId!: number;

  constructor(private dialogService: DialogService, private config: DynamicDialogConfig , private classroomService: ClassroomService,private route: ActivatedRoute,) {}

  ngOnInit(): void {
    // Chargez la liste des équipements disponibles depuis le service EquipmentsService
    // Remplacez 'getAvailableEquipments' par la méthode réelle de récupération des équipements.

    this.classroomId = this.config.data.classroomId;

    this.classroomService.getEquipments().subscribe ((equipments) => {
      this.availableEquipments = equipments;
      console.log(this.availableEquipments);
    });
  
  }


  chooseEquipment(idClassroom:number): void {
    // Vérifiez si un équipement est sélectionné et si une quantité est spécifiée
    if (this.selectedEquipment && this.selectedQuantity) {
      // Utilisez le service ClassroomService pour ajouter l'équipement avec la quantité
      this.classroomService.addEquipmentToClassroom(this.selectedEquipment, this.selectedQuantity, idClassroom);

      // Fermez le dialogue en utilisant la référence du dialogue
      this.dialogRef.close();
    } else {
      // Affichez un message d'erreur ou faites quelque chose en conséquence
      console.error('Veuillez sélectionner un équipement et spécifier une quantité.');
    }
  }

  closeDialog(): void {
    this.display = false;
  }
}
