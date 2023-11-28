import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-create-material',
  templateUrl: './create-material.component.html',
  styleUrls: ['./create-material.component.scss'],
})
export class CreateMaterialComponent {
  newEquipmentName: string = ''; // Variable pour stocker le nom de l'équipement
  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>(); // Émetteur d'événement pour mettre à jour la propriété display
  @Output() equipmentCreated = new EventEmitter<void>(); // Événement pour signaler la création d'équipement

  constructor(
    private adminService: AdminService,
    private messageService: MessageService
  ) {} // Injectez MessageService) {}
  hideDialog() {
    this.display = false;
    this.displayChange.emit(this.display); // Émettre l'événement pour mettre à jour la propriété display dans le composant parent
  }

  createEquipment() {
    const material = {
      datas: {
        equipment: this.newEquipmentName,
      },
    };

    this.adminService.createMaterial(material).subscribe(() => {
      this.hideDialog();
      this.messageService.add({
        severity: 'success',
        summary: 'Création réussie',
        detail: "L'équipement a été créé avec succès.",
      });
      console.log('Equipment created event emitted'); // Vérifiez si ce message est affiché dans la console
      this.equipmentCreated.emit(); // Émettre l'événement pour signaler la création d'équipement
    });
  }
}
