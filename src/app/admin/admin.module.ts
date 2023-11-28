import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialListComponent } from './components/material-list/material-list.component';
import { AdminRoutingModule } from './admin-routing.module'; // Assurez-vous que le chemin est correct
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [MaterialListComponent],
  imports: [CommonModule, AdminRoutingModule, FormsModule],
})
export class AdminModule {}
