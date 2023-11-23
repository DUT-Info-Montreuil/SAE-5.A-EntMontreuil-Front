import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService, ModalData } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() id!: string;
  public visible = false;
  private modalSubscription!: Subscription;
  public modalData: ModalData | null = null;

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
    // S'abonner au service pour écouter les changements
    this.modalSubscription = this.modalService.getModalData().subscribe(data => {
      if (data && data.id === this.id) {
        this.modalData = data;
        this.open();
      }
    });
  }

  ngOnDestroy(): void {
    this.modalSubscription.unsubscribe();
  }

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
