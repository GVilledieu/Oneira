import { Component, inject, effect } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DreamService } from '../../services/dream.service';

@Component({
  selector: 'app-dream-list',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './dream-list.component.html',
  styleUrl: './dream-list.component.css'
})

export class DreamListComponent {

  // Return current theme; used by effect to persist theme changes
  private dreamService = inject(DreamService);

  dreams= this.dreamService.DreamList;
  
  deleteDream(id: number): void {
    this.dreamService.deleteDream(id);
  }


}
