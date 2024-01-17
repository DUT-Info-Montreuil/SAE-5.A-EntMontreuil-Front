import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService, TreeNode } from 'primeng/api';
import { CohortService } from 'src/app/core/services/cohort.service';
import { CohortSharedService } from 'src/app/shared/services/cohort-shared.service';

@Component({
  selector: 'app-cohort',
  templateUrl: './cohort.component.html',
  styleUrls: ['./cohort.component.scss'],
  providers: [MessageService],
  styles: [
    `
      :host ::ng-deep .p-tree {
        height: 88dvh;
        overflow: auto;
        overflow-y: hidden;
        border: none;
        box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.02),
          0px 0px 2px rgba(0, 0, 0, 0.05), 0px 1px 4px rgba(0, 0, 0, 0.08) !important;
      }

      :host ::ng-deep .p-tree:hover {
        overflow-y: auto;
      }
    `,
  ],
})
export class CohortComponent implements OnInit {

  currentUrl: string = '';

  showTreeCohort = true;
  hoverOnPipeIcon = false;

  toggleTreeCohort() {
    this.showTreeCohort = !this.showTreeCohort;
  }

  isDataLoaded: boolean = false;

  files!: TreeNode[];
  selectedFile!: TreeNode;

  items!: MenuItem[]; // Items pour le context menu
  selectedNode!: TreeNode; // Noeud sélectionné

  showAskSelectMessage: boolean = false;

  constructor(
    private cohortService: CohortService,
    private messageService: MessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cohortSharedService: CohortSharedService
  ) { }

  ngOnInit() {

    this.router.events.subscribe(event => {
      this.showAskSelectMessage = (this.router.url === '/resp/cohort');
    });

    this.cohortSharedService.refreshNeeded$.subscribe(() => {
      this.loadFiles();
    });

    this.loadFiles();
  }

  loadFiles() {
    this.cohortService.getFiles().subscribe(
      data => {
        this.files = data;
        this.isDataLoaded = true;
      },
      error => {
        console.error(
          'Erreur lors de la récupération des données de l’arbre:',
          error
        );
      }
    );
  }

  nodeRightClick(event: any) {
    event.originalEvent.preventDefault(); // Empêcher l'action par défaut du MouseEvent
    this.selectedNode = event.node;
    console.log('Clic droit détecté');

    // Personnalisez le menu contextuel ici en fonction de node.data
    if (this.selectedFile.data === 'Formation') {
      this.items = [
        { label: 'Action Formation', icon: 'pi pi-fw pi-cog', command: () => console.log("Action Formation") }
      ];
    } else {
      // Configuration par défaut ou pour d'autres types
      this.items = [
        { label: 'Autre Action', icon: 'pi pi-fw pi-cog', command: () => console.log("Autre Action") }
      ];
    }

  }

  nodeSelect(event: any) {
    if (event.node.url) {
      this.router.navigateByUrl(event.node.url); // Utilisez l'URL pour la navigation
    }
  }

  nodeUnselect(event: any) {
    // this.messageService.add({ severity: 'info', summary: 'Node Unselected', detail: event.node.label });
  }
}
/*ENT Montreuil is a Desktop Working Environnement for the students of the IUT of Montreuil
    Copyright (C) 2024  Steven CHING, Emilio CYRIAQUE-SOURISSEAU ALVARO-SEMEDO, Ismail GADA, Yanis HAMANI, Priyank SOLANKI

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.*/