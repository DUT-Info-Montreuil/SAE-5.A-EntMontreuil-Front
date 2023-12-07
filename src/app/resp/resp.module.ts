import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsComponent } from './components/groups/groups.component';
import { RespRoutingModule } from './resp-routing.module';
import { TreeModule } from 'primeng/tree';
import { GroupsService } from '../core/services/groups.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';



@NgModule({
  declarations: [
    GroupsComponent
  ],
  imports: [
    CommonModule,
    RespRoutingModule,
    TreeModule,
    ToastModule
  ],
  providers: [
    GroupsService,
    MessageService
  ]
})
export class RespModule { }
