// modal.component.ts
import { Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() id!: string;
  public visible = false;

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
    this.modalService.add(this);
  }

  ngOnDestroy(): void {
    this.modalService.remove(this.id);
  }

  // modal.component.ts
  open(): void {
    this.visible = true;
    // Ajouter des classes ou des styles supplémentaires si nécessaire pour l'animation
  }

  close(): void {
    // Gérer l'animation de fermeture
    setTimeout(() => {
      this.visible = false;
    }, 200); // Assurez-vous que cela correspond à la durée de votre animation
  }


}
