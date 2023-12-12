import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, TreeNode } from 'primeng/api';
import { CohortService } from 'src/app/core/services/cohort.service';

@Component({
  selector: 'app-cohort',
  templateUrl: './cohort.component.html',
  styleUrls: ['./cohort.component.scss'],
  providers: [MessageService],
  styles: [` 
  :host ::ng-deep .p-tree {
      height: 88dvh;
      overflow: auto;
      overflow-y: hidden;
  }
  
  :host ::ng-deep .p-tree:hover {
      overflow-y: auto;
  }
  `
  ]
})
export class CohortComponent implements OnInit {

  files!: TreeNode[];
  selectedFile!: TreeNode;

  constructor(private cohortService: CohortService, private messageService: MessageService, private router: Router) { }

  ngOnInit() {
    this.cohortService.getFiles().then((data) => (this.files = data));
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
}
