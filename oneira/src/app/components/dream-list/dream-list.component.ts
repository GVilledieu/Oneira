import { Component, inject, output, Output, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DreamService } from '../../services/dream.service';
import { DreamTypeFilter } from '../../models/dream-filters.model';
import { DreamFormComponent } from "../dream-form/dream-form.component";
import { ToastComponent } from "../toast/toast.component";
import { ConfirmationModalComponent } from "../confirmation-modal/confirmation-modal.component";
import { Dream } from '../../models/dream.model';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-dream-list',
  standalone: true,
  imports: [DatePipe, DreamFormComponent, ToastComponent, ConfirmationModalComponent],
  templateUrl: './dream-list.component.html',
  styleUrl: './dream-list.component.css'
})

export class DreamListComponent {

  private dreamService = inject(DreamService);
  private toast = inject(ToastService);

  // Contrôle l’affichage de la modale « édition/création ».

  isModalOpen = signal<boolean>(false);
  isConfirmationModalOpen = signal<boolean>(false);
  isImportModalOpen = signal<boolean>(false);
  selectedFile = signal<File | null>(null)
  selectedFileName = signal<string>("");

  // Signals exposés par DreamService.

  dreams = this.dreamService.DreamList;
  filteredDreams = this.dreamService.filteredDreams;
  selectedDreamToEdit = this.dreamService.selectedDreamToEdit;

  // Type de filtre actuellement sélectionné.

  selectedType = this.dreamService.selectedType;

  // Métadonnées UI pour les boutons de filtre par type.

  filters: { label: string; value: DreamTypeFilter; activeClass: string }[] = [
    { label: 'Tous', value: "tous", activeClass: "bg-blue-600" },
    { label: 'Normal', value: "normal", activeClass: "bg-slate-600" },
    { label: 'Cauchemar', value: "nightmare", activeClass: "bg-red-600" },
    { label: 'Lucide', value: "lucid", activeClass: "bg-purple-600" },
    { label: 'Récurrent', value: "recurring", activeClass: "bg-yellow-600" },
  ];

  // Signal de recherche utilisé par DreamService pour filtrer.

  searchQuery = this.dreamService.searchQuery;
  editOrCreateLabel = this.dreamService.editOrCreateLabel;
  dreamToDelete = signal<Dream | undefined>(undefined);
  // Appelée à chaque modification de la barre de recherche.

  onSearchUpdate(searchContent: string): void {
    // Log de debug pour vérifier la liaison de la recherche.

    console.log("Search query updated:", searchContent);
    this.searchQuery.set(searchContent);
  }

  // Met à jour le filtre de type de rêve sélectionné.

  selectType(type: DreamTypeFilter): void {
    this.dreamService.selectedType.set(type);
  }

  // Supprime un rêve à partir de son id.

  deleteDream(id: number): void {
    this.isConfirmationModalOpen.set(true);
    this.dreamService.deleteDream(id);
    this.closeConfirmationModal();
  }

  // Ouvre la modale et démarre l’édition du rêve sélectionné.

  updateDream(id: number): void {
    this.openModal();
    this.dreamService.startEditingDream(id);
  }

  // Retourne le nombre de rêves pour un type donné.

  countDreamsType(type: DreamTypeFilter): number {
    if (type == "tous") {
      return this.dreams().length;
    }

    return this.dreams().filter(x => x.type === type).length;
  }

  // Affiche la modale.

  openModal(): void {
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
    this.selectedDreamToEdit.set(undefined);
    this.editOrCreateLabel.set("Ajouter un rêve");
  }

  openConfirmationModal(dream: Dream): void {
    this.dreamToDelete.set(dream)
    this.isConfirmationModalOpen.set(true);
  }

  closeConfirmationModal(): void {
    this.isConfirmationModalOpen.set(false);
  }

  exportDreams(): void{
    this.dreamService.exportDreams();
  }

  onFileSelected(event: Event) :void {
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

      const dreams = importedDreams.map((dream: any) => ({
        ...dream,
        date: new Date(dream.date)
      }));

      this.dreamService.replaceDreams(dreams);
      this.selectedFileName.set("");
      this.selectedFile.set(null)
      this.isImportModalOpen.set(false);
      this.toast.show("Vos rêves ont bien été importés", "success")
      
    } catch (error) {
      this.toast.show("Une erreur s'est produite", "error")
      this.isImportModalOpen.set(false);
 
    }
  };

  reader.readAsText(file);
}

  openImportModal(){
    this.isImportModalOpen.set(true);
  }

  closeImportModal(){
    this.isImportModalOpen.set(false);
    this.selectedFile.set(null);
    this.selectedFileName.set("")
  }

}

