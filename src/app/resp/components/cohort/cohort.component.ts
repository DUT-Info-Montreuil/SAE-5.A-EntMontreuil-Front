import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, TreeNode } from 'primeng/api';
import { CohortService } from 'src/app/core/services/cohort.service';

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
  showTreeCohort = true;
  hoverOnPipeIcon = false;

  toggleTreeCohort() {
    this.showTreeCohort = !this.showTreeCohort;
  }

  files!: TreeNode[];
  selectedFile!: TreeNode;

  constructor(
    private cohortService: CohortService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cohortService.getFiles().subscribe(
      (data) => {
        this.files = data;
      },
      (error) => {
        console.error(
          'Erreur lors de la récupération des données de l’arbre:',
          error
        );
      }
    );
  }

  nodeSelect(event: any) {
    // this.messageService.add({ severity: 'info', summary: 'Node Selected', detail: event.node.label });

    if (event.node.url) {
      this.router.navigateByUrl(event.node.url); // Utilisez l'URL pour la navigation
    }
  }

  nodeUnselect(event: any) {
    // this.messageService.add({ severity: 'info', summary: 'Node Unselected', detail: event.node.label });
  }

  onPlusButtonClick(node: TreeNode) {
    // Gérer l'action lorsque le bouton + est cliqué
  }
}
