import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { ModalService } from './core/services/modal.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ENT';

  ngOnInit(): void {

  }

  // Réinitialiser les données du modal à chaque changement de route
  constructor(private router: Router, private modalService: ModalService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe(() => {
      this.modalService.closeModal();
    });
  }
}
