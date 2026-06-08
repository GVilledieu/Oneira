import { Component, inject, output, Output, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DreamService } from '../../services/dream.service';
import { DreamTypeFilter } from '../../models/dream-filters.model';
import { DreamFormComponent } from "../dream-form/dream-form.component";
import { ToastComponent } from "../toast/toast.component";

@Component({
  selector: 'app-dream-list',
  standalone: true,
  imports: [DatePipe, DreamFormComponent, ToastComponent],
  templateUrl: './dream-list.component.html',
  styleUrl: './dream-list.component.css'
})

export class DreamListComponent {

  private dreamService = inject(DreamService);

  // Contrôle l’affichage de la modale « édition/création ».

  isModalOpen = signal<boolean>(false);

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
    this.dreamService.deleteDream(id);
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

  // Masque la modale


  closeModal(): void {
    this.isModalOpen.set(false);
    this.selectedDreamToEdit.set(undefined);
    this.editOrCreateLabel.set("Ajouter un rêve");
  }
}

