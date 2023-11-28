import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {

  constructor(private primengConfig: PrimeNGConfig) { }

  ngOnInit() {
    // Activate ripple effect on PrimeNG components
    this.primengConfig.ripple = true;

    this.primengConfig.setTranslation({
      accept: 'Oui',
      reject: 'Non',
    });
  }
}