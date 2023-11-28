import { Component, OnInit } from '@angular/core';
import { Classroom } from 'src/app/core/models/classroom.model';
import { ClassroomsService } from 'src/app/core/services/classrooms.service';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.component.html',
  styleUrls: ['./classrooms.component.scss']
})
export class ClassroomsComponent implements OnInit{

  classrooms!: Classroom[];

  statuses!: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  constructor(private classroomsService: ClassroomsService) {}

  ngOnInit() {
      this.loadData();

  }

  loadData() {
    this.loading = true;
    // Utilisez subscribe pour traiter les valeurs émises par l'observable
    this.classroomsService.getClassrooms().subscribe(
      (data: Classroom[]) => {
        this.classrooms = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error loading data:', error);
        this.loading = false;
      }
    );
  }


  clear(table: Table) {
      table.clear();
  }

  getSeverity(capacity: number) {
      if (capacity < 10) {
          return 'danger';
      } else if(capacity < 20) {
        return 'warning';
      } else if(capacity > 30) {
        return 'success';
      } else if(capacity > 20) {
        return 'info';
      } else {
        return null;
      }

  }
}
