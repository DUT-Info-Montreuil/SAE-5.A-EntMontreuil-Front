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



@NgModule({
  declarations: [
    CohortComponent,
    PromotionComponent,
    DegreeComponent
  ],
  imports: [
    CommonModule,
    RespRoutingModule,
    TreeModule,
    ToastModule,
    HttpClientModule,
    TableModule
  ],
  providers: [
    CohortService,
    MessageService
  ]
})
export class RespModule { }
