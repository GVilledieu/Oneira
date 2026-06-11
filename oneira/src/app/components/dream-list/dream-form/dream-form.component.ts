import { Component, effect, inject, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DreamService } from '../../../services/dream.service';
import { Dream } from '../../../models/dream.model';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-dream-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './dream-form.component.html',
  styleUrl: './dream-form.component.css'
})
export class DreamFormComponent {
  constructor() {
    // Quand un rêve est sélectionné pour édition, le formulaire est automatiquement pré-rempli.
    effect(() => {
      const dream = this.selectedDreamToEdit();

      if (dream) {
        this.fillFormWithDream(this.dreamForm, dream);
      }
    });
  }

  // Logique métier + état de l’application.
  private dreamService = inject(DreamService);
  private formBuilder = inject(FormBuilder);
  private toast = inject(ToastService);

  // Informe le composant parent (DreamListComponent) que la soumission est terminée.
  formSubmitted = output<void>();
  cancel = output<void>();

  // Signal contenant le rêve actuellement édité (si présent).
  selectedDreamToEdit = this.dreamService.selectedDreamToEdit;
  editOrCreateLabel = this.dreamService.editOrCreateLabel;

  // Formulaire réactif utilisé pour la création et l’édition.
  dreamForm = this.formBuilder.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
    type: ['normal', Validators.required],
  });

  // Copie les valeurs du rêve sélectionné dans les contrôles du formulaire.
  fillFormWithDream(dreamForm: FormGroup, dream: Dream): void {
    dreamForm.patchValue({
      title: dream.title,
      content: dream.content,
      type: dream.type,
    });
  }

  // Gère la soumission : met à jour un rêve existant ou en crée un nouveau.
  dreamformSubmit(): void {
    // Vérifie l’état du formulaire (valide ou non).
    if (!this.dreamForm.valid) {
      console.log('Formulaire invalide');
      return;
    }

    const formValue = this.dreamForm.value;
    const selectedDream = this.selectedDreamToEdit();

    if (selectedDream) {
      // Parcours d’édition.
      const updatedDream: Dream = {
        ...selectedDream,
        title: formValue.title ?? '',
        content: formValue.content ?? '',
        type: (formValue.type ?? 'normal') as Dream['type'],
      };
      
      this.dreamService.updateDream(selectedDream.id, updatedDream);
      this.toast.show("Rêve modifié", "info")
      
    } else {
      // Parcours de création.
      const newDream: Dream = {
        id: Date.now(),
        date: new Date(),
        title: formValue.title ?? '',
        content: formValue.content ?? '',
        type: (formValue.type ?? 'normal') as Dream['type'],
      };
      this.dreamService.addDream(newDream);
      this.toast.show("Rêve ajouté", "success")
    }

    // Permet au parent de fermer la modale et de réinitialiser le formulaire
    this.formSubmitted.emit();
    this.dreamForm.reset({ type: 'normal' });
  }
}


