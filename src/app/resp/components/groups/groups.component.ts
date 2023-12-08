import { Component, OnInit } from '@angular/core';
import { MessageService, TreeNode } from 'primeng/api';
import { GroupsService } from 'src/app/core/services/groups.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
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
export class GroupsComponent implements OnInit {

  files!: TreeNode[];
  selectedFile!: TreeNode;

  constructor(private groupsService: GroupsService, private messageService: MessageService) { }

  ngOnInit() {
    this.groupsService.getFiles().then((data) => (this.files = data));
  }

  nodeExpand(event: any) {

  }

  nodeCollapse(event: any) {

  }

  nodeSelect(event: any) {
    this.messageService.add({ severity: 'info', summary: 'Node Selected', detail: event.node.label });
  }

  nodeUnselect(event: any) {
    this.messageService.add({ severity: 'info', summary: 'Node Unselected', detail: event.node.label });
  }
}
