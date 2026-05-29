import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DreamService } from '../../services/dream.service';
import {Injectable} from '@angular/core';
import { Dream } from '../../models/dream.model';

@Component({
  selector: 'app-dream-list',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './dream-list.component.html',
  styleUrl: './dream-list.component.css'
})

@Injectable({
  providedIn: 'root'
})
export class DreamListComponent {

  private dreamService = inject(DreamService);

  dreams: Dream[] = this.dreamService.getDreams();

  deleteDream(id: number): void {
    this.dreamService.deleteDream(id);
    this.dreams = this.dreamService.getDreams();
  }


}
