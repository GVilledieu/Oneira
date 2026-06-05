import { Component, effect, inject, Injectable } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
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
    if (this.dreamForm.valid) {
      const newDream = this.dreamForm.value;
      
      const parsedDream : Dream = {
        id: Date.now(),
        title: (newDream.title ?? '') as string,
        content: (newDream.content ?? '') as string,
        type: (newDream.type ?? 'normal') as "normal" | "nightmare" | "lucid" | "recurring",
        date: new Date()
      }

      const selectedDream = this.selectedDreamToEdit();

      if (selectedDream){
        parsedDream.id = selectedDream.id;
        parsedDream.date = selectedDream.date;

        this.dreamService.updateDream(selectedDream.id, parsedDream);
        this.dreamForm.reset();
        
  

      } else {
        this.dreamService.addDream(parsedDream);
        this.dreamForm.reset();
      }

    } else {
      console.log('Le formulaire est invalide');
    }
  }

}
