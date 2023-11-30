import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MessageService } from 'primeng/api';
import { MaterialService} from 'src/app/core/services/materials.service';

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
    private materialService: MaterialService,
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
    this.materialService.createMaterial(material).subscribe(
      (response) => {
        this.hideDialog();
        console.log('Response status:', response.message[1]); 
        let code= response.message[1]; 
        let msg= response.message[0];
        console.log('Response msg:', msg);
        // Vérifiez si le code de réponse est inclus dans le JSON et traitez en conséquence
        if ( code !=200 && code !=201) {
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur serveur',
            detail:msg.message, // Utilisez le message d'erreur du JSON
          });
        } else {
          this.messageService.add({
            severity: 'success',
            summary: 'Création réussie',
            detail: "L'équipement a été créé avec succès.",
          });
          this.equipmentCreated.emit(); // Émettre l'événement pour mettre à jour la liste des équipements
        }
      },
      (httpErrorResponse) => {
        // Gérer les erreurs HTTP ici
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: "Une erreur est survenue lors de l'ajout de l'équipement."
        });
      }
    );
    
    
  }
}
