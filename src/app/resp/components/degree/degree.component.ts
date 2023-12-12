import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Degree } from 'src/app/core/models/cohort-degree.model';
import { CohortService } from 'src/app/core/services/cohort.service';

@Component({
  selector: 'app-degree',
  templateUrl: './degree.component.html',
  styleUrls: ['./degree.component.scss']
})
export class DegreeComponent implements OnInit {

  degreeInfo!: Degree;

  constructor(private route: ActivatedRoute, private cohortService: CohortService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.cohortService.getDegreeInfo(id).subscribe(
          data => {
            this.degreeInfo = data;  // Stockez les données reçues dans la variable
            // console.log(this.degreeInfo);  // Affichez les données dans la console pour vérifier
          },
          error => {
            console.error('Erreur lors de la récupération des informations de degree:', error);
          }
        );
      }
    });
  }

  get promotions() {
    return this.degreeInfo?.promotions;
  }

  get students() {
    return this.degreeInfo?.students;
  }


}
