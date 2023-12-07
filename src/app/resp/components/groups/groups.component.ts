import { Component, OnInit } from '@angular/core';
import { MessageService, TreeNode } from 'primeng/api';
import { GroupsService } from 'src/app/core/services/groups.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
  providers: [MessageService]
})
export class GroupsComponent implements OnInit {

  files!: TreeNode[];
  selectedFile!: TreeNode;

  constructor(private groupsService: GroupsService, private messageService: MessageService) { }

  ngOnInit() {
    this.groupsService.getFiles().then((data) => (this.files = data));
  }

  nodeExpand(event: any) {
    this.messageService.add({ severity: 'success', summary: 'Node Expanded', detail: event.node.label });
  }

  nodeCollapse(event: any) {
    this.messageService.add({ severity: 'warn', summary: 'Node Collapsed', detail: event.node.label });
  }

  nodeSelect(event: any) {
    this.messageService.add({ severity: 'info', summary: 'Node Selected', detail: event.node.label });
  }

  nodeUnselect(event: any) {
    this.messageService.add({ severity: 'info', summary: 'Node Unselected', detail: event.node.label });
  }
}
