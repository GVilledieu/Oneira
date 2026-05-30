import { Component, inject, Injectable } from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
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
private dreamService = inject(DreamService);
private formBuilder = inject(FormBuilder);
  
dreamForm = this.formBuilder.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
    type: ['normal', Validators.required],
  });

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

      console.log('Nouveau rêve ajouté :', parsedDream);
      this.dreamService.addDream(parsedDream);
      this.dreamForm.reset();
    } else {
      console.log('Le formulaire est invalide');
    }
  }
}
