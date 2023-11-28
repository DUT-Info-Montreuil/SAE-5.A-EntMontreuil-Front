import { Component, OnInit } from '@angular/core';
import { Material } from '../../models/material.model';
import { AdminService } from '../../../core/services/admin.service';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'app-material-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.scss'],
})
export class MaterialListComponent implements OnInit {
  materials: Material[] = [];
  filteredMaterials: Material[] = [];
  searchQuery: string = '';
  scroll = 'scroll';
  constructor(
    private adminService: AdminService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService // Injectez MessageService
  ) {}

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
      message: `Êtes-vous sûr de vouloir supprimer cet équipement ? ID : ${material.id}, Nom : ${material.equipment}`,
      accept: () => {
        this.deleteMaterial(material.id);
      },
    });
  }
}
