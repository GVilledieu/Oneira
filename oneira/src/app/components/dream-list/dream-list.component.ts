import { Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';

import { DreamService } from '../../services/dream.service';
import { ToastService } from '../../services/toast.service';

import { Dream } from '../../models/dream.model';
import { DreamTypeFilter } from '../../models/dream-filters.model';

import { DreamFormComponent } from './dream-form/dream-form.component';
import { ToastComponent } from './toast/toast.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { DreamCardComponent } from "./dream-card/dream-card.component";

@Component({
  selector: 'app-dream-list',
  standalone: true,
  imports: [
    DreamFormComponent,
    ToastComponent,
    ConfirmationModalComponent,
    DreamCardComponent
],

  templateUrl: './dream-list.component.html',
  styleUrl: './dream-list.component.css'
})

export class DreamListComponent {

  private dreamService = inject(DreamService);
  private toast = inject(ToastService);

  isModalOpen = signal(false);
  isConfirmationModalOpen = signal(false);
  isImportModalOpen = signal(false);

  selectedFile = signal<File | null>(null);
  selectedFileName = signal('');

  dreamToDelete = signal<Dream | undefined>(undefined);

  dreams = this.dreamService.DreamList;
  selectedDreamToEdit = this.dreamService.selectedDreamToEdit;
  selectedType = this.dreamService.selectedType;
  searchQuery = this.dreamService.searchQuery;
  editOrCreateLabel = this.dreamService.editOrCreateLabel;
  filteredDreams = this.dreamService.filteredDreams;

  filters: { label: string; value: DreamTypeFilter; activeClass: string }[] = [
    { label: 'Tous', value: 'tous', activeClass: 'bg-blue-600' },
    { label: 'Normal', value: 'normal', activeClass: 'bg-slate-600' },
    { label: 'Cauchemar', value: 'nightmare', activeClass: 'bg-red-600' },
    { label: 'Lucide', value: 'lucid', activeClass: 'bg-purple-600' },
    { label: 'Récurrent', value: 'recurring', activeClass: 'bg-yellow-600' },
  ];

  onSearchUpdate(searchContent: string): void {
    this.searchQuery.set(searchContent);
  }

  selectType(type: DreamTypeFilter): void {
    this.selectedType.set(type);
  }

  countDreamsType(type: DreamTypeFilter): number {
    if (type === 'tous') {
      return this.dreams().length;
    }

    return this.dreams().filter(dream => dream.type === type).length;
  }

  openModal(): void {
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
    this.selectedDreamToEdit.set(undefined);
    this.editOrCreateLabel.set('Ajouter un rêve');
  }

  openConfirmationModal(dream: Dream): void {
    this.dreamToDelete.set(dream);
    this.isConfirmationModalOpen.set(true);
  }

  closeConfirmationModal(): void {
    this.isConfirmationModalOpen.set(false);
    this.dreamToDelete.set(undefined);
  }

  deleteDream(id: number): void {
    this.dreamService.deleteDream(id);
    this.closeConfirmationModal();
    this.toast.show('Rêve supprimé', 'success');
  }

  updateDream(id: number): void {
    this.openModal();
    this.dreamService.startEditingDream(id);
  }

  exportDreams(): void {
    this.dreamService.exportDreams();
  }

  openImportModal(): void {
    this.isImportModalOpen.set(true);
  }

  closeImportModal(): void {
    this.isImportModalOpen.set(false);
    this.selectedFile.set(null);
    this.selectedFileName.set('');
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    this.selectedFile.set(file);
    this.selectedFileName.set(file.name);
  }

  confirmImport(): void {
    const file = this.selectedFile();

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      try {
        const content = reader.result as string;
        const importedDreams = JSON.parse(content);

        const dreams: Dream[] = importedDreams.map((dream: any) => ({
          ...dream,
          date: new Date(dream.date),
        }));

        this.dreamService.replaceDreams(dreams);
        this.closeImportModal();
        this.toast.show('Vos rêves ont bien été importés', 'success');
      } catch {
        this.closeImportModal();
        this.toast.show("Une erreur s'est produite", 'error');
      }
    };

    reader.readAsText(file);
  }
}