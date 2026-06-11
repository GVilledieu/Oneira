import { Component, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Dream } from '../../../models/dream.model';

@Component({
  selector: 'app-dream-card',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './dream-card.component.html',
  styleUrl: './dream-card.component.css'
})
export class DreamCardComponent {
  dream = input.required<Dream>();

  edit = output<number>();
  delete = output<Dream>(); 
}