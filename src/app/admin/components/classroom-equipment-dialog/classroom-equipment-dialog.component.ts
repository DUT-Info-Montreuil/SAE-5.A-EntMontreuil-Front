import { Component, OnInit, Input } from '@angular/core';
import { ClassroomService } from 'src/app/core/services/classroom.service';
import { Equipment } from 'src/app/core/models/equipment.model';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
@Component({
  selector: 'app-classroom-equipment-dialog',
  templateUrl: './classroom-equipment-dialog.component.html',
  styleUrls: ['./classroom-equipment-dialog.component.scss']
})
export class ClassroomEquipmentDialogComponent implements OnInit {
  availableEquipments: Equipment[] = [];
  selectedEquipment: Equipment | null = null;
  selectedQuantity: number = 1;
  classroomId!: number;

  constructor(private classroomService: ClassroomService,private config: DynamicDialogConfig) {}

  ngOnInit(): void {
    if (this.config && this.config.data) {
      this.classroomId = this.config.data.classroomId;
    }
    this.classroomService.getEquipments().subscribe((equipments) => {
      this.availableEquipments = equipments;
    });
  }

  chooseEquipment(): void {
    if (this.selectedEquipment && this.selectedQuantity > 0) {
      // Logique pour ajouter l'équipement à la salle de classe
      console.log(`Ajout de ${this.selectedQuantity} de ${this.selectedEquipment.equipment} à la salle de classe ${this.classroomId}`);
      this.classroomService.addEquipmentToClassroom(this.selectedEquipment.id, this.classroomId).subscribe((response) => {
        
        console.log(response);
          
      });
      this.classroomService.addQuantityToEquipment(this.selectedEquipment.id, this.selectedQuantity,this.classroomId).subscribe((response) => {
        
        console.log(response);
          
      });
    } else {
      console.error('Veuillez sélectionner un équipement et spécifier une quantité valide.');
    }
  }
}
