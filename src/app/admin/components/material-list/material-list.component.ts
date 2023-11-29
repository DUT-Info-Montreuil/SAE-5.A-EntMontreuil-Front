import { Component, OnInit } from '@angular/core';
import { Material } from '../../models/material.model';
import { AdminService } from '../../../core/services/admin.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-material-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.scss'],
  styles: [
    `
        :host ::ng-deep .p-datatable .p-datatable-thead > tr > th {
            background-color: white;
        }
    `
  ],
})
export class MaterialListComponent implements OnInit {
  materials: Material[] = [];
  filteredMaterials: Material[] = [];
  searchQuery: string = '';
  scroll = 'scroll';
  displayCreateMaterialDialog: boolean = false;

  constructor(
    private adminService: AdminService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService // Injectez MessageService
  ) { }

  ngOnInit(): void {
    this.adminService.getMaterials().subscribe((materials) => {
      this.materials = materials;
      this.filteredMaterials = materials;
    });
  }
  onSearch(): void {
    if (!this.searchQuery) {
      this.filteredMaterials = this.materials;
    } else {
      this.filteredMaterials = this.materials.filter((material) =>
        material.equipment
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
      );
    }
  }
  deleteMaterial(id: number): void {
    this.adminService.deleteMaterial(id).subscribe(() => {
      this.materials = this.materials.filter((material) => material.id !== id);
      this.filteredMaterials = this.filteredMaterials.filter(
        (material) => material.id !== id
      );
      this.messageService.add({
        // Affichez le toast après la suppression
        severity: 'success',
        summary: 'Suppression réussie',
        detail: "L'équipement a été supprimé avec succès.",
      });
    });
  }

  confirmDelete(material: Material): void {
    this.confirmationService.confirm({
      message: `Voulez-vous supprimer l'équipement « ${material.equipment} » ?`,
      accept: () => {
        this.deleteMaterial(material.id);
      },
    });
  }

  showCreateMaterialDialog() {
    this.displayCreateMaterialDialog = false; // Fermer le modal s'il est ouvert
    setTimeout(() => {
      this.displayCreateMaterialDialog = true; // Ouvrir le modal avec un léger délai pour assurer la fermeture
    }, 10);
  }

  refreshMaterials(): void {
    this.adminService.getMaterials().subscribe((materials) => {
      this.materials = materials;
      this.filteredMaterials = materials;
    });
  }
  handleEquipmentCreated(): void {
    console.log('Handle equipment created event'); // Vérifiez si ce message est affiché dans la console
    this.refreshMaterials(); // Rafraîchir la liste après la création de l'équipement
  }

  // ...

  startEditing(material: Material): void {
    material.isEditing = true;
    material.updatedEquipment = material.equipment; // Sauvegardez la valeur d'origine pour la restauration
  }

  stopEditing(material: Material): void {
    material.isEditing = false;

    // Vérifiez s'il y a eu des modifications
    if (material.updatedEquipment !== material.equipment) {
      // Envoyez la mise à jour au service
      const materialUpdate = {
        datas: {
          equipment: material.updatedEquipment.trim(),
        },
      };
      this.adminService
        .updateMaterial(material.id, materialUpdate)
        .subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Modification réussie',
            detail: `L'équipement a été modifié avec succès.`,
          });

          // Mettez à jour la valeur d'équipement avec la nouvelle valeur
          material.equipment = material.updatedEquipment;
        });
    }
  }

  // ...
}
