import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CohortComponent } from './components/cohort/cohort.component';
import { RespRoutingModule } from './resp-routing.module';
import { TreeModule } from 'primeng/tree';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
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


@NgModule({
  declarations: [
    CohortComponent,
    PromotionComponent,
    DegreeComponent,
    TrainingComponent
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
    BadgeModule
  ],
  providers: [
    CohortService,
    MessageService
  ]
})
export class RespModule { }
