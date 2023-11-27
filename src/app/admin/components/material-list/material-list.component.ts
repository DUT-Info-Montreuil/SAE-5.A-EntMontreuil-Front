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

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {}
}
