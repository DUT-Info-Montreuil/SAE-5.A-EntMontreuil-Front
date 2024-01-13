import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CohortComponent } from './components/cohort/cohort.component';
import { RespRoutingModule } from './resp-routing.module';
import { TreeModule } from 'primeng/tree';
import { ToastModule } from 'primeng/toast';
import { ContextMenuService, MessageService } from 'primeng/api';
import { CohortService } from '../core/services/cohort.service';
import { PromotionComponent } from './components/promotion/promotion.component';
import { DegreeComponent } from './components/degree/degree.component';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { TabViewModule } from 'primeng/tabview';
import { BadgeModule } from 'primeng/badge';
import { TrainingComponent } from './components/training/training.component';
import { TdComponent } from './components/td/td.component';
import { TpComponent } from './components/tp/tp.component';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MessageModule } from 'primeng/message';

@NgModule({
  declarations: [
    CohortComponent,
    PromotionComponent,
    DegreeComponent,
    TrainingComponent,
    TdComponent,
    TpComponent
  ],
  imports: [
    CommonModule,
    RespRoutingModule,
    TreeModule,
    ToastModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    MenuModule,
    TabViewModule,
    BadgeModule,
    ContextMenuModule,
    DialogModule,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    InputSwitchModule,
    MessageModule
  ],
  providers: [
    CohortService,
    MessageService,
    ContextMenuService
  ]
})
export class RespModule { }
