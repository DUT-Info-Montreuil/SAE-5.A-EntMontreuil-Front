import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialListComponent } from './components/material-list/material-list.component';
import { AdminRoutingModule } from './admin-routing.module'; // Assurez-vous que le chemin est correct

@NgModule({
  declarations: [MaterialListComponent],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
