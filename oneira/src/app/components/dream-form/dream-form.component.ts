import { Component, effect, inject } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { DreamService } from '../../services/dream.service';
import { Dream } from '../../models/dream.model';



@Component({
  selector: 'app-dream-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './dream-form.component.html',
  styleUrl: './dream-form.component.css'
})

export class DreamFormComponent {
constructor(){
  effect(() => {
    const dream = this.selectedDreamToEdit();

    if(dream){
      this.fillFormWithDream(this.dreamForm, dream);
    }
  }
  )
}


private dreamService = inject(DreamService);
private formBuilder = inject(FormBuilder);

selectedDreamToEdit = this.dreamService.selectedDreamToEdit;
  
dreamForm = this.formBuilder.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
    type: ['normal', Validators.required],
  });

  fillFormWithDream(dreamForm: FormGroup, dream: Dream): void {
      dreamForm.patchValue({
      title: dream.title,
      content: dream.content,
      type: dream.type
    });
  }
  
dreamformSubmit(): void {
  
    if (!this.dreamForm.valid) {
      console.log('Le formulaire est invalide');
      return;
    }

    const formValue = this.dreamForm.value;

    const selectedDream = this.selectedDreamToEdit();

    if (selectedDream) {
      const updatedDream: Dream = {
        ...selectedDream,
        title: formValue.title ?? '',
        content: formValue.content ?? '',
        type: (formValue.type ?? 'normal') as Dream['type']
      };

      this.dreamService.updateDream(selectedDream.id, updatedDream);
    } else {
      const newDream: Dream = {
        id: Date.now(),
        date: new Date(),
        title: formValue.title ?? '',
        content: formValue.content ?? '',
        type: (formValue.type ?? 'normal') as Dream['type']
      };

      this.dreamService.addDream(newDream);
    }

    this.dreamForm.reset({ type: 'normal' });
  }

}
