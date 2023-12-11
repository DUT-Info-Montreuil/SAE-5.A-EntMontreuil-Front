import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CohortComponent } from './components/cohort/cohort.component';
import { RespRoutingModule } from './resp-routing.module';
import { TreeModule } from 'primeng/tree';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CohortService } from '../core/services/cohort.service';
import { PromotionComponent } from './components/promotion/promotion.component';



@NgModule({
  declarations: [
    CohortComponent,
    PromotionComponent
  ],
  imports: [
    CommonModule,
    RespRoutingModule,
    TreeModule,
    ToastModule
  ],
  providers: [
    CohortService,
    MessageService
  ]
})
export class RespModule { }
