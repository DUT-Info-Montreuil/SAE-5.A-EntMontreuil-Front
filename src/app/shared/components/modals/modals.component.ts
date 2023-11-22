// modals.component.ts
import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss']
})
export class ModalsComponent {
  @Input() modalType: 'danger' | 'info' | 'success' | 'warning' = 'info';
  @Output() closeEvent = new EventEmitter<void>();
  display = false;

  @ViewChild('modalContainer') modalContainer?: ElementRef;
  @ViewChild('modalBackdrop') modalBackdrop?: ElementRef;

  constructor() { }

  open() {
    this.display = true;
  }

  close() {
    if (this.modalBackdrop) {
      this.modalContainer?.nativeElement.classList.add('zoom-out');
    }

    this.modalBackdrop?.nativeElement.classList.add('fade-out');

    setTimeout(() => {
      this.display = false;
      this.closeEvent.emit();

      if (this.modalBackdrop) {
        this.modalContainer?.nativeElement.classList.remove('zoom-out');
      }

      this.modalBackdrop?.nativeElement.classList.remove('fade-out');
    }, 200); // Correspond à la durée de l'animation fadeOut
  }


}
