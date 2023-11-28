import { Component, OnInit } from '@angular/core';
import { Material } from '../../models/material.model';
import { AdminService } from '../../../core/services/admin.service';

@Component({
  selector: 'app-material-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.scss'],
})
export class MaterialListComponent implements OnInit {
  materials: Material[] = [];
  filteredMaterials: Material[] = [];
  searchQuery: string = '';

  constructor(private adminService: AdminService) {}

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
}
