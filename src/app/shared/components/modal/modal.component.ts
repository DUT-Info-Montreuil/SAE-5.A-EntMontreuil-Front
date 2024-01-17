import { Component, OnInit, OnDestroy, Input, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService, ModalData } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() id!: string;
  private modalSubscription!: Subscription;
  public modalData: ModalData | null = null;

  public visible = false;
  @ViewChild('modalBackdrop') modalBackdrop!: ElementRef;
  @ViewChild('modalContainer') modalContainer!: ElementRef;

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
    this.modalService.add(this); // Ajouter ce modal à la liste des modals
    // S'abonner au service pour écouter les changements
    this.modalSubscription = this.modalService.getModalData().subscribe(data => {
      if (data && data.id === this.id) {
        this.modalData = data;
        this.open();
      }
    });
  }

  ngOnDestroy(): void {
    this.modalService.remove(this.id); // Supprimer ce modal de la liste des modals
    this.modalSubscription.unsubscribe();
  }

  open(): void {
    this.visible = true;
    // Ajouter des classes ou des styles supplémentaires si nécessaire pour l'animation
  }

  close(): void {
    this.modalBackdrop.nativeElement.classList.add('fade-out');
    this.modalContainer.nativeElement.classList.add('zoom-out');

    setTimeout(() => {
      this.visible = false;
      this.modalService.closeModal(); // Réinitialiser les données du modal
      this.modalBackdrop.nativeElement.classList.remove('fade-out');
      this.modalContainer.nativeElement.classList.remove('zoom-out');
    }, 200);
  }
}
/*ENT Montreuil is a Desktop Working Environnement for the students of the IUT of Montreuil
    Copyright (C) 2024  Steven CHING, Emilio CYRIAQUE-SOURISSEAU ALVARO-SEMEDO, Ismail GADA, Yanis HAMANI, Priyank SOLANKI

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.*/