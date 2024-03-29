import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

@Injectable({ providedIn: 'root' })
export class ModalService {
    private modals: ModalComponent[] = [];
    private modalData = new BehaviorSubject<ModalData | null>(null);

    openModal(data: ModalData) {
        this.modalData.next(data);
    }

    getModalData(): Observable<ModalData | null> {
        return this.modalData.asObservable();
    }

    getModalById(id: string): ModalComponent | undefined {
        const foundModal = this.modals.find(modal => modal.id === id);
        return foundModal;
    }

    closeModal() {
        this.modalData.next(null);
    }

    add(modal: ModalComponent): void {
        // Ajoute le modal à la liste
        this.modals.push(modal);
    }

    remove(id: string): void {
        // Supprime le modal de la liste
        this.modals = this.modals.filter(m => m.id !== id);
    }
}

export interface ModalData {
    id: string;
    type: 'success' | 'danger' | 'warning' | 'info';
    title: string;
    description: string;
    buttons: ModalButton[];
}

export interface ModalButton {
    text: string;
    action: () => void;
    type: 'cancel' | 'danger' | 'ok' | 'default';  // Type de bouton
    // autres propriétés comme le style, la classe, etc.
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