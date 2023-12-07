import { Component } from '@angular/core';

@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.scss']
})
export class TableUsersComponent {

  field: string[] | undefined;

  selected: string = 'Utilisateurs';
    
  ngOnInit() {
    this.field = ['Utilisateurs','Enseignants','Étudiants'];
  }

}
